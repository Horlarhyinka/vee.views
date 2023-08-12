import React from "react";
import "./styles/register.css";
import { Icon } from '@iconify/react';
class ForgetPassword extends React.Component {
    render() {
        return <div className="login">
            <form className="register-form">
                <h2>forgot password?</h2>
                <p>please enter your email address, you will get a link to complete your password reset.</p>
                <div className="register-input-wrapper">
                    <div className="register-input-icn-wrapper">
                    <Icon className="icn" icon="fontisto:email"/>
                    </div>
                    <input type="text" placeholder="enter your email adress"/>
                </div>
                <button>send email verification</button>
            </form>
        </div>;
    }
}
export default ForgetPassword;
