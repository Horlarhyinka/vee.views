import React, {useState, useEffect, useRef} from "react";
import Chat from "./chat";
import "./styles/chats-page.css";
import ChatsList from "./chats-list";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setUsers, setChats, setChatMessage } from "./store/chat";
import { chat_type } from "./chats.types";
import axios from "axios";
import { user_profile } from "./chats.types";
import { app_socket_type } from "../services/socket";
import authRequest from "../utils/auth-request";
import { logout } from "./store/auth";
import { getToken } from "../utils/token";
import { message_type, file_type } from "../services/socket";
import AppHead from "../components/app-head";

const user_url = process.env.REACT_APP_API_URL + "/users"
const chat_url = process.env.REACT_APP_API_URL + "/chats"

interface prop{
    socket: app_socket_type
}

const ChatsPage = (props: prop) =>{
        const chats = useAppSelector((state)=>state.chat.chats)
        const users = useAppSelector(state=>state.chat.users)
        const bearerToken = "Bearer " + getToken()
        const [errorMessage, setErrorMessage] = useState()
        const searchRef = useRef() as React.RefObject<HTMLInputElement>
        const [chatState, setChatState] = useState<chat_type[]>(chats)
        const [usersState, setUsersState] = useState<user_profile[]>(useAppSelector(state=>state.chat.users))
        const dispatch = useAppDispatch()
        const [selected, setSelected] = useState<chat_type>()
        const [chatOpen, setChatOpen] = useState<boolean | string>("")
        const [friendListOpen, setFriendListOpen] = useState<boolean | string>("")


        const openChat = () =>{
            setChatOpen(true)
            setFriendListOpen(false)
        }

        const closeChat = () =>{
            setChatOpen(false)
            setFriendListOpen(true)
            setSelected(undefined)
        }

        const handleChatClick = (id: string) =>{
                const target = chats.findIndex((chat)=>String(chat._id) === String(id))
            if(target<0)return
                setSelected(chats[target])
                openChat()
            // props.socket.off("read").emit("read", {chatId: String(chats[target]._id)})

        }
        const handleAddChat = async(id: string) =>{
            const exists  = chats.findIndex(c=>c._id === String(id))
            if(exists >= 0)return;
            try {
            const res = await authRequest(()=>axios.post(chat_url, {friend: id}, {headers: {"Authorization": bearerToken}}))
            const newChat: chat_type = res.data.data
                dispatch(setChats([...chats, newChat]))
                setChatState([...chats, newChat])
                const filtered = users.filter(u=>String(u._id) !== String(id))
                dispatch(setUsers(filtered))
                setUsersState(filtered)
                props.socket.emit("new_chat", {userId: newChat.friend._id, chatId: newChat._id})
            } catch (ex) {
                console.log(ex)
            }
        }

        useEffect(()=>{
            authRequest(()=>axios.get(chat_url,{headers: {"Authorization": bearerToken}}).then(res=>{
                const chats = res.data.data as chat_type[]
                setChatState(chats)
                dispatch(setChats(chats))
            }).catch(ex=>{
                const message = ex.response?.data?.message || "could not get chats";
                setErrorMessage(message)
            }))
            authRequest(()=>axios.get(user_url, {headers: {"Authorization": bearerToken}}).then(res=>{
                const users = res.data.data as user_profile[]
                setUsersState(users)
                dispatch(setUsers(users))
            }).catch(ex=>{
                const message = ex.response?.data?.message || "could not get users";
                if(message.toLowerCase().includes("unauthenticated")){
                    dispatch(logout())
                }
                setErrorMessage(message)
            }))
        },[bearerToken, dispatch])

        const handleSearch = () =>{
            const currentValue = searchRef.current?.value.toLowerCase();
            if(!currentValue?.length){
                setChatState(chats)
                setUsersState(users)
                return;
            }
            setChatState(chats.filter(chat=>chat.friend?.username?.toLowerCase().includes(currentValue) || chat.friend?.email?.includes(currentValue)))
            setUsersState(users.filter(user=>user.username?.includes(currentValue) || user.email?.includes(currentValue)))
        }

        const displayMessage = (data: message_type) =>{
            if(!selected)return
            setSelected({...selected!, messages: [...selected!.messages, data]})
            dispatch(setChatMessage({id: selected!._id, message: data}))
            handleSearch()
        }

        const emitMessage = (data: {body: string, file?: file_type}) =>{
            if(!selected)return;
            if(!data.file && !data.body.length)return;
            props.socket.emit("message", {body: data.body, chatId: selected!._id, file: data.file})

        }

        props.socket.off("message").on("message",(data: message_type)=>{
            displayMessage(data)
            // if(String(selected?._id)===String(data.chatId)){
            //     props.socket.off("read").emit("read",{chatId: data.chatId})
            // }
        })

        // props.socket.off("read").on("read", data=>{
        //     const chatId = data.chatId
        //     const indx = chats.findIndex(c=>String(c._id)===String(chatId))
        //     if(indx < 0)return;
        //     const target = chats[indx]
        //     const upMsg = [...target.messages].map(c=>{
        //         const c_c = {...c}
        //         const c_timestamp = {...c_c.timestamp}
        //         c_c.timestamp = c_timestamp
        //         c_c.timestamp.readAt = Date.now()
        //         return c_c
        //     })
        //     const updatedChat = {...target, messages: [...upMsg]}
        //     const updatedChats = [...chats]
        //     updatedChats[indx] = updatedChat
        //     dispatch(setChats(updatedChats))
        // })

        return <div className="chats-page" >
            <AppHead />
            {
                errorMessage?
                <p className="err" >{errorMessage}</p>:
                !chats?
                <p className="null">no chats yet</p>:
                <ChatsList 
                handleSearch={handleSearch} 
                users={usersState} 
                handleChatClick={handleChatClick} 
                handleAddChat={handleAddChat} 
                searchRef={searchRef} 
                message={errorMessage} 
                chats={chatState}
                open={
                    friendListOpen
                }
                 />
            }
            <div className={`chat-wrapper ${!(window.innerWidth <= 820)?"": chatOpen}`} >
                <Chat 
                displayMessage={displayMessage} 
                emitMessage={emitMessage} 
                profile={selected?.friend} 
                messages={selected?.messages} 
                handleChatClose={closeChat}
                />
            </div>
        </div>
}

export default ChatsPage;