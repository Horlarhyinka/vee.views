import React, {useEffect, useState} from "react";
import Chat from "./chat";
import {useAppSelector, useAppDispatch} from "./store/hooks";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles/chat-preview.css"
import { chat_type } from "./chats.types";
import { app_socket_type } from "../services/socket";
import authRequest from "../utils/auth-request"
import { getToken } from "../utils/token";
import { message_type, file_type } from "../services/socket";

const url = process.env.REACT_APP_API_URL + "/chats"

interface prop{
    socket: app_socket_type
}

const ChatPreview = (props: prop) =>{
    const params = useParams()
    const chatId = params.id || params.chatId;
    const [chat, setChat] = useState<chat_type>()
    const [errorMessage, setErrorMessage] = useState<string>()
    useEffect(()=>{
        authRequest(()=>axios.get(url+"/"+chatId, {headers:{"Authorization": `Bearer ${getToken()}`}}))
        .then(res=>{
            const target: chat_type = res.data.data
            setChat(target)
        })
        .catch(ex=>{
            const message = ex.response?.data?.message || "failed to get chat"
            setErrorMessage(message)
        })
    },[chatId])

    const displayMessage = (data: message_type) =>{
        chat?.messages.push(data)
    }

    const emitMessage = (data: {body: string, file?: file_type}) =>{
        props.socket.emit("message", {body: data.body, chatId: chat!._id})
    }

    return <div className="chatpreview">
        {errorMessage? 
        <p className="err">{ errorMessage }</p>:
        <Chat displayMessage={displayMessage} emitMessage={emitMessage} profile={chat?.friend} messages={chat?.messages} />}
    </div>
}

export default ChatPreview;