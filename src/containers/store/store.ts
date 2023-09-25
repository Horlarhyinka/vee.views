import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat";
import userReducer from "./auth";
import postReducer from "./post"
import thunk, { ThunkDispatch } from "redux-thunk";


const store = configureStore({
    reducer:{
        chat: chatReducer,
        user: userReducer,
        post: postReducer
    }
})

export type App_Root_State = ReturnType<typeof store.getState>
export type App_Dispatch = typeof store.dispatch

export default store;