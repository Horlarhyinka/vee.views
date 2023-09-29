import {Socket, io} from "socket.io-client";
import { user_int } from "../containers/store/auth";


export type file_type = {name: string, size: number, url: string}
export interface message_type {body: string, file?: file_type, chatId: string, sentBy: string, _id: string, timestamp: timestamp_type}
export type post_input_type = {body: string, file?: file_type, replyTo?: string}
export interface post_type extends post_input_type{
    _id: string
    postedBy: profile_int
    createdAt: string | number
    likes: string[]
    comments: string[]
}

export interface profile_int extends user_int{
    about?: string
    avatar?: string
    _id: string
}

export type message_data = {body: string, file?: file_type, chatId: string}

export interface timestamp_type{
    sentAt: number
    readAt: number
}
interface client_to_server_events{
    message: (data: message_data)=>void
    post: (data: post_input_type)=>void
    read: (data:{chatId: string})=>void
    new_chat: (data:{userId: string, chatId: string})=>void
    like: (data: {postId: string})=>void
    comment: (data: {postId: string, comment: post_input_type})=>void
}

interface server_to_client_events{
    client_error: (err:Error)=>void 
    message: (data: message_type)=>void
    post: (data: post_type)=>void
    read: (data:{chatId: string})=>void
    logout: ()=>void
    like: (data:{postId: string, userId: string})=>void
    comment: (data:{postId: string, userId: string})=>void
}

interface interserver_events{

}

interface socket_data{
    
}


const useSocket = (authToken: string) =>{
    const socket:Socket<server_to_client_events, client_to_server_events> = io( String(process.env.REACT_APP_API_HOST!),{ auth: {token: authToken} })
    return socket
}
export default useSocket

export type app_socket_type = ReturnType<typeof useSocket>
