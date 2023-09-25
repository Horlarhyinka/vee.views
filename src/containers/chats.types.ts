import { message_type } from "../services/socket"

export type chat_type = {
    _id: string
    friend: user_profile
    messages: message_type[]
}

export interface user_profile{
    avatar: string
    about: string
    _id: string
    online: boolean
    email: string
    username: string
}

