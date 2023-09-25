import React, {RefObject, createRef, useState} from "react";
import "./styles/register.css";
import { Icon } from '@iconify/react';
import {emailRegex, passwordRegex} from "../utils/regex";
import { useAppDispatch } from "./store/hooks";
import { setCredentials, user_int } from "./store/auth";
import axios from "axios";
import { setAuthCredentials } from "../utils/token";

const url = process.env.REACT_APP_API_URL + "/auth/login"

const Login= () =>{      
    
    const dispatch = useAppDispatch()
    const [errMessages, setErrMessages] = useState<{email?: string, password?: string, general?: string}>({email: undefined, password: undefined, general: undefined})

    const emailRef = createRef<HTMLInputElement>()
    const passwordRef = createRef<HTMLInputElement>()

    const handleFieldChange = (ref: RefObject<HTMLInputElement>, regex: RegExp, fieldname: string) =>{
        if(!regex.test(ref.current!.value)){
            setErrMessages({...errMessages, [fieldname]: "invalid "+ fieldname})
            return false
        };
        setErrMessages({...errMessages, [fieldname]: undefined})
        return true;
    }

    const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        const validateEmail = handleFieldChange(emailRef, emailRegex, "email")
        const validatePass = handleFieldChange(passwordRef, passwordRegex, "password")
        if(!validateEmail || !validatePass)return;
        const email = emailRef.current!.value
        const password = passwordRef.current!.value
        axios.post(url, {email, password}).then(res=>{
            const data = res.data?.data as {
                user: {email: string, _id: string, username: string},
                token: string
            };
            const user: user_int = {email: data.user?.email, username: data.user?.username}
            const token = data.token
            setCredentials({user, token})
            setAuthCredentials({token, user:{email: user.email, _id: data.user._id}})
            if(window.location.href.includes("/login")){
                window.location.assign("/")
            }
            // else{
            //     console.log(window.location)
            // }
        }).catch(ex=>{
            const message = ex.response?.data.message?ex.response?.data.message: ex.message
            console.log(message)
            setErrMessages({...errMessages, general: message})
        })
    }


    return <div className="login">
            <form className="register-form">
                <h2>Login</h2>
                <p className="message">{errMessages?.general}</p>
                <div className="register-input-wrapper" >
                    <div className="register-input-icn-wrapper" >
                    <Icon className="icn" icon="fontisto:email" />
                    </div>
                    <input onChange={()=>handleFieldChange(emailRef, emailRegex, "email")} ref={emailRef} type="text" placeholder="enter your email adress" />
                </div>
                <p className="message">{errMessages?.email}</p>
                <div className="register-input-wrapper" >
                    <div className="register-input-icn-wrapper" >
                    <Icon className="icn" icon="carbon:password" />
                    </div>
                    <input onChange={()=>handleFieldChange(passwordRef, passwordRegex, "password")} ref={passwordRef} type="text" placeholder="enter a password" />
                </div>
                <p className="message">{errMessages?.password}</p>
                <button onClick={(e)=>handleSubmit(e)} >login</button>
                <p>don't have an account?<a href="/register" > sign up.</a></p>
            </form>
        </div>
}

export default Login