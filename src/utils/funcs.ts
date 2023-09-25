import {chat_type} from "../containers/chats.types"
import { app_socket_type } from "../services/socket"

export const getUnreadCount = (chat: chat_type) =>{
    let count = 0
    for(let i = chat.messages.length - 1; i >= 0; i--){
        if(chat.messages[i].timestamp?.readAt)return count
        count++
    }
    return count;
}

export const getHandleLike = (socket: app_socket_type) =>(e: React.MouseEvent<HTMLDivElement>, postId: string):void=>{
    socket.emit("like",{postId})
}

export const trimTosize = (text:string, count: number) =>{
    console.log("before trim", text.length, text.slice(0,count+1))
    if(text.length > count)return text.slice(0,count+1) + "..."
    return text
}