import React, {createRef, useState, RefObject, MouseEvent} from "react";
import "./styles/register.css";
import RoboChat from "../public/register-img.png";
import { Icon } from '@iconify/react';
import {emailRegex, passwordRegex, usernameRegex} from "../utils/regex";
import { useAppDispatch } from "./store/hooks";
import { setCredentials, user_int } from "./store/auth";
import axios from "axios";
import { setAuthCredentials } from "../utils/token";

const url = process.env.REACT_APP_API_URL + "/auth/register"

const Register = () =>{

    const [errMessages, setErrMessages] = useState<{username?: string, email?: string, password?: string, general?: string}>({
        username: undefined, email: undefined, password: undefined, general: undefined
    })

    const dispatch = useAppDispatch()
    const emailRef = createRef<HTMLInputElement>()
    const passwordRef = createRef<HTMLInputElement>()
    const usernameRef = createRef<HTMLInputElement>()

    const handleFieldChange = (ref: RefObject<HTMLInputElement>, regex: RegExp, fieldname: string) =>{
        if(!regex.test(ref.current!.value)){
            setErrMessages({...errMessages, [fieldname]: "invalid "+ fieldname})
            return false
        };
        setErrMessages({...errMessages, [fieldname]: undefined})
        return true;
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        const validateEmail = handleFieldChange(emailRef, emailRegex, "email")
        const validatePass = handleFieldChange(passwordRef, passwordRegex, "password")
        const validateUsername = handleFieldChange(usernameRef, usernameRegex, "username")

        if(!validateEmail || !validatePass || !validateUsername)return;

        const email = emailRef.current!.value
        const password = passwordRef.current!.value
        const username = usernameRef.current!.value

        axios.post(url, {email, username, password}).then((res=>{

            const data = res.data.data as {
                user: {email: string, _id: string, username: string},
                token: string
            };
            const user: user_int  = {email: data.user.email, username: data.user.username} 
            const token: string = data.token
            dispatch(setCredentials({user, token}))
            setAuthCredentials({token, user:{email:user.email, _id: data.user._id}})
            window.location.assign("/")
        })).catch(ex=>{
            console.log(ex)
            const message = ex.response?.data?.message || "authentication error";
            setErrMessages({...errMessages, general: message})
        })
    }


        return <div className="register">
            <div className="register-pic" >
                <img src={RoboChat} alt="chat robot" />
            </div>
            <form className="register-form">
                <h2>create your account</h2>
                <p>create an account to enjoy the best chat experience.</p>
                <p className="message">{errMessages.general}</p>
                <div className="register-input-wrapper" >
                    <div className="register-input-icn-wrapper" ><Icon icon="iconamoon:profile-circle-thin" className="icn" /></div>
                    <input ref={usernameRef} onChange={()=>handleFieldChange(usernameRef, usernameRegex, "username")} type="text" placeholder="enter your username" />
                </div>
                <p className="message">{errMessages.username}</p>
                <div className="register-input-wrapper" >
                    <div className="register-input-icn-wrapper" >
                    <Icon className="icn" icon="fontisto:email" />
                    </div>
                    <input ref={emailRef} onChange={()=>handleFieldChange(emailRef, emailRegex, "email")} type="text" placeholder="enter your email adress" />
                </div>
                <p className="message">{errMessages.email}</p>
                <div className="register-input-wrapper" >
                    <div className="register-input-icn-wrapper" >
                    <Icon className="icn" icon="carbon:password" />
                    </div>
                    <input ref={passwordRef} onChange={()=>handleFieldChange(passwordRef, passwordRegex, "password")} type="text" placeholder="enter a password" />
                </div>
                <p className="message">{errMessages.password}</p>
                <button onClick={(e)=>handleSubmit(e)} >register</button>
                <p>already have an account?<a href="/login" > sign in.</a></p>
            </form>
        </div>
}

export default Register