import React, {RefObject, useState} from "react";
import FriendCard from "../components/friend-card";
import type { chat_type } from "./chats.types";
import "./styles/chats-list.css"
import { Icon } from '@iconify/react';
import type { user_profile } from "./chats.types";
import {getUnreadCount} from "../utils/funcs"
import NotFriendCard from "../components/non-friend-card";

interface props{
    chats: chat_type[]
    message?: string
    handleChatClick: (id: string)=>void
    handleAddChat: (id: string)=>void
    users: user_profile[]
    searchRef: RefObject<HTMLInputElement>
    handleSearch:()=>void
    open?:boolean | string
}
const ChatsList = (props: props) =>{

    const [searchActive, setSearchActive] = useState<boolean>(false)
    const toggleSearch = ()=>{
        if(searchActive){
            props.searchRef.current!.value = "";
            setSearchActive(false)
        }else{
            setSearchActive(true)
        }
    }
    const chatsList = props.chats.map((curr)=>{
                const {friend, messages, _id: id} = curr
                const lastIndx = messages.length - 1
                let lastMessage = messages[lastIndx]?.body
                let unread = getUnreadCount(curr)
                return <FriendCard unread={unread} handleChatClick={props.handleChatClick} id={id} lastMessage={lastMessage} key={String(id)} username={friend.username} avatar="test.jpg" />
            })
    const userslist = 
    props.users.map((u)=>{
    return <NotFriendCard user={u} key={u._id} handleAddChat={props.handleAddChat} />})


return <div className={`friends-card-list chats-list ${props.open}`} >
        {
           props.message?<div className="err" >
            <span>??</span>
            <p>{props.message}</p></div>:<div>
                <div className="searchbar">
                    <div onClick={toggleSearch} className="icn"><Icon icon="mdi:search-web" /></div>
                    {searchActive && <input ref={props.searchRef} onChange={props.handleSearch} placeholder="search or add friends" type="text" />}
                </div>
                {chatsList}
                <p style={{
                    display: "block", textAlign: "left",
                    margin: "24px 10px 18px", color: "rgb(159,159,159)",
                    fontWeight: "420"
                }}>add new friends</p>
                <div className="users-list">{userslist}</div>
                
            </div>
        }
    </div>}

export default ChatsList;