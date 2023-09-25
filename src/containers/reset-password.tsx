import React, { RefObject, createRef, useState } from "react";
import { setCredentials, type user_int } from "./store/auth";
import "./styles/register.css";
import { Icon } from '@iconify/react';
import { passwordRegex } from "../utils/regex";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () =>{

    const dispatch = useAppDispatch()

    const params = useParams()
    const token = params.token!

    const url = "http://localhost:8000/api/v1/auth/reset-password"

    const [errMessages, setErrMessages] = useState<{password?: string, confirm?: string, general?: string}>()

    const passwordRef: RefObject<HTMLInputElement> = createRef()
    const confirmRef: RefObject<HTMLInputElement> = createRef()

    const testPass = () =>passwordRegex.test(passwordRef.current!.value)
    const testConfirm = () => passwordRef.current!.value === confirmRef.current!.value

    const validateChange = (test: ()=>boolean, field: "password" | "confirm") =>{
        if(!test()){
           if(field === "password"){
            setErrMessages({...errMessages, "password": "password is invalid"})
           }
           if(field === "confirm"){
            setErrMessages({...errMessages, "confirm": "password and confirm password must be the same"})
           }
           return false
        }else{
            setErrMessages({...errMessages, [field]: undefined})
        return true;
        }
    }

    const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        if(!validateChange(testPass, "password") || !validateChange(testConfirm, "confirm"))return;
        try {
        const res = await axios.patch(url + "/" + token, {newPassword: passwordRef.current!.value})
        const data = res.data.data as {token: string, user: user_int}
        dispatch(setCredentials({token: data.token, user: {email: data.user.email, username: data.user.username}}))
        } catch (error: any) {
            if(String(error.response.status) === "404"){
            setErrMessages({...errMessages, general: "user not found"})
            }else{
            setErrMessages({...errMessages, general: "error occured"})
            }
        }
    }
        return <div className="login">
            <form className="register-form">
                <h2>reset password</h2>
                <p>create a new password. strong passwords with greater than or eqaul to 6 characters are recommended</p>
                <p className="message">{errMessages?.general}</p>
                <div className="register-input-wrapper" >
                    <div className="register-input-icn-wrapper" >
                    <Icon className="icn" icon="carbon:password" />
                    </div>
                    <input onChange={()=>validateChange(testPass, "password")} ref={passwordRef} type="text" placeholder="enter a password" />
                </div>
                <p className="message">{errMessages?.password}</p>
                <div className="register-input-wrapper" >
                    <div className="register-input-icn-wrapper" >
                    <Icon className="icn" icon="carbon:password" />
                    </div>
                    <input onChange={()=>validateChange(testConfirm, "confirm")} ref={confirmRef} type="text" placeholder="confirm your password" />
                </div>
                <p className="message">{errMessages?.confirm}</p>
                <button onClick={(e)=>handleSubmit(e)} >reset password</button>
            </form>
        </div>
}

export default ResetPassword