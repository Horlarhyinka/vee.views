import React, { RefObject, createRef, useState, MouseEvent } from "react";
import "./styles/register.css";
import { Icon } from '@iconify/react';
import Consent from "./mail-consent";
import { emailRegex } from "../utils/regex";
import axios from "axios";

const url = "http://localhost:8000/api/v1/auth/forget-password";

const ForgetPassword =() =>{
    const [showConsent, setShowConsent] = useState(false);
    const [errMsg, setErrMsg] = useState<string>()

    const mailRef: RefObject<HTMLInputElement> = createRef()

    const handleChange = () =>{
        if(!emailRegex.test(mailRef.current!.value)){
            setErrMsg("invalid email address")
        }else{
            setErrMsg(undefined)
        }
    }

    const handleSubmit = async(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        if(!emailRegex.test(mailRef.current!.value))return;
        try{
        const res = await axios.post(url, {email: mailRef.current!.value})
        if(String(res.status).startsWith("2") || String(res.status).startsWith("3")){
            setShowConsent(true)
        }
        }catch(ex: any){
            const message = ex?.response.data.message
            setErrMsg(message)
        }
    }
    
        return !showConsent?<div className="login">
            <form className="register-form">
                <h2>forgot password?</h2>
                <p>please enter your email address, you will get a link to complete your password reset.</p>
                <div className="register-input-wrapper" >
                    <div className="register-input-icn-wrapper" >
                    <Icon className="icn" icon="fontisto:email" />
                    </div>
                    <input ref={mailRef} onChange={handleChange} type="text" placeholder="enter your email adress" />
                </div>
                <p className="message">{errMsg}</p>
                <button onClick={(e)=>handleSubmit(e)} >send email verification</button>
            </form>
        </div>: <Consent/>
}

export default ForgetPassword