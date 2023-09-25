import React from "react";
import "./styles/mail-consent.css"
import { Icon } from "@iconify/react";

const MailConsent = () =>{
    return <div className="mail-consent">
        <Icon className="icn" icon="fontisto:email" />
        <p>a password reset link has been sent to your mail, click the link to complete password reset.</p>
    </div>
}

export default MailConsent