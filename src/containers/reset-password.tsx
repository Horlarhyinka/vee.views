import React from "react";
import "./styles/register.css";
import { Icon } from '@iconify/react';

interface props{

}

interface state{

}

class ResetPassword extends React.Component<props, state>{
    render(): React.ReactNode {
        return <div className="login">
            <form className="register-form">
                <h2>reset password</h2>
                <p>create a new password. strong passwords with greater than or eqaul to 6 characters are recommended</p>

                <div className="register-input-wrapper" >
                    <div className="register-input-icn-wrapper" >
                    <Icon className="icn" icon="carbon:password" />
                    </div>
                    <input type="text" placeholder="enter a password" />
                </div>
                <div className="register-input-wrapper" >
                    <div className="register-input-icn-wrapper" >
                    <Icon className="icn" icon="carbon:password" />
                    </div>
                    <input type="text" placeholder="confirm your password" />
                </div>
                <button>reset password</button>
            </form>
        </div>
    }
}

export default ResetPassword