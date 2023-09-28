import React from "react";
import "./styles/chat.css";
import ChatHead from "../components/Chathead";
import MessageCard from "../components/message-card";
import ChatInputs from "../components/chat-inputs";
import type {file_type, message_type} from "../services/socket"
import type { user_profile } from "./chats.types";
import { getAuthCredntials } from "../utils/token";

interface props{
    profile?: user_profile
    messages: message_type[] | [] | undefined
    displayMessage: (data:message_type)=>void
    emitMessage: (data: {body: string, file?: file_type})=>void
    open?:boolean
    handleChatClose:()=>void
}

const Chat = (props: props)=>{
    const {user} = getAuthCredntials()
    const listMessage = props.messages?.map((message, i)=>{
        const self = String(message.sentBy) === String(user?._id)
    
    return <MessageCard key={i} sentAt={message.timestamp?.sentAt} self={self} body={message.body} file={message.file} />
})

        return <div className="chat" >
            {props.profile && <ChatHead handleChatClose={props.handleChatClose} profile={props.profile} />}
                {
                !props.messages?.length?<div className="null">
                    <p style={{color: "rgb(114, 114, 114)"}} >no messages here...</p>
                </div>:listMessage
                }
            {props.profile && <ChatInputs emitMessage={props.emitMessage} />}
            </div>
}

export default Chat;