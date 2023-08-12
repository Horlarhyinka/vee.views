import React from "react";
import "./styles/register.css";
import { Icon } from '@iconify/react';
class Login extends React.Component {
    render() {
        return <div className="login">
            <form className="register-form">
                <h2>Login</h2>
                <p>login to connect with 1k+ friends and families.</p>
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
                <p>already have an account?<a href="/login"> sign up.</a></p>
            </form>
        </div>;
    }
}
export default Login;
