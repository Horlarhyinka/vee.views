import React from "react";
import "./styles/friend-card.css";
import default_img from "../public/default_img.png";
import { useAppSelector } from "../containers/store/hooks";
import { trimTosize } from "../utils/funcs";

interface state{

}

interface props{
    username: string
    email?: string
    message?: string 
    avatar: string 
    lastMessage?: string
    handleChatClick: ( id: string)=>void
    id: string
    unread: number
}

const FriendCard = (props: props)=>{
    const chats = useAppSelector(state=>state.chat.chats)
    const chat = chats.find(c=>String(c._id)===String(props.id))

        return <div className="friend-card" onClick={(e)=>props.handleChatClick(props.id)}>
            <img className="avatar" src={default_img} alt="avatar" />
            <div className="card-info">
            <p className="username" >{props.username}</p>
            <p className="message">{
                trimTosize(!chat?.messages.length?
                "no message yet":
                chat.messages[chat.messages.length - 1].file?
                `${props.username} sent a file`:
                chat.messages[chat.messages.length - 1].body, 24)
            }</p>
            </div>
        </div>
    }


export default FriendCard;