import { createSlice } from "@reduxjs/toolkit";
import { setToken, getToken, deleteToken } from "../../utils/token";

export interface user_int{
    email: string
    username: string
}

interface initial_state{
    user: user_int | undefined
    // token: string | undefined
    messsage?: string
}

const initialState: initial_state = {
    user: undefined,
    // token: undefined
}

const userSlice = createSlice({
    name: "user",
    initialState ,
    reducers: {
        logout: (state)=>{
            state.messsage = undefined
            state.messsage = undefined
            // state.token = undefined
            deleteToken()
        },
        setCredentials: (state, param)=>{
            const data =  param.payload as {token: string, user: user_int} 
            // state.token = data.token
            state.user = data.user
            setToken(data.token)
        }
    }
})

const {reducer, actions} = userSlice

const {logout, setCredentials} = actions;

export { logout, setCredentials}

export default reducer;