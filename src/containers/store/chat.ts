import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { chat_type } from "../chats.types";
import { user_int } from "./auth";
import { user_profile } from "../chats.types";
import { message_type } from "../../services/socket";
 
type initial_state = {
    chats: chat_type[]
    users: user_profile[]
}

const initialState: initial_state = {
    chats: [],
    users:[]
}

const chatSlice = createSlice({
    name: "chats",
    reducers: {
        setChats: (state, params)=>{
            const chatsList = params.payload as chat_type[]
            state.chats = chatsList;
        },
        setUsers: (state, params)=>{
            const usersList:user_profile[] = params.payload
            state.users = usersList;
        },
        setChatMessage: (state, param) =>{
            const pyld:{id: string, message: message_type} = param.payload
            const indx = state.chats.findIndex(chat=>String(chat._id)=== String(pyld.id))
            if(indx < 0)return;
            const target = state.chats[indx]
            state.chats[indx].messages = [...target.messages, pyld.message]
        }
    },
    initialState,
})

const {reducer, actions} = chatSlice;

const {setChats, setUsers, setChatMessage} = actions

export { setChats, setUsers, setChatMessage }


export default reducer;