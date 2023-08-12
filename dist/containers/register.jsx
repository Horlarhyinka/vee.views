import React from "react";
import "./styles/register.css";
import RoboChat from "../public/register-img.png";
import { Icon } from '@iconify/react';
class Register extends React.Component {
    render() {
        return <div className="register">
            <div className="register-pic">
                <img src={RoboChat} alt="chat robot"/>
            </div>
            <form className="register-form">
                <h2>create your account</h2>
                <p>create an account to enjoy the best chat experience.</p>
                <div className="register-input-wrapper">
                    <div className="register-input-icn-wrapper"><Icon icon="iconamoon:profile-circle-thin" className="icn"/></div>
                    <input type="text" placeholder="enter your username"/>
                </div>
                <div className="register-input-wrapper">
                    <div className="register-input-icn-wrapper">
                    <Icon className="icn" icon="fontisto:email"/>
                    </div>
                    <input type="text" placeholder="enter your email adress"/>
                </div>
                <div className="register-input-wrapper">
                    <div className="register-input-icn-wrapper">
                    <Icon className="icn" icon="carbon:password"/>
                    </div>
                    <input type="text" placeholder="enter a password"/>
                </div>
                <button>register</button>
                <p>already have an account?<a href="/login"> sign in.</a></p>
            </form>
        </div>;
    }
}
export default Register;
