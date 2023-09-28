import React from "react";
import "./styles/profile-card-mini.css";
import default_img from "../public/default_img.png"

interface prop{
    user: {_id: string, avatar?: string, username: string}
}
interface state{

}

class ProfileCardMini extends React.Component<prop,state>{
    render(){
        return <a href={`/users/${this.props.user._id}`} className="profile">
        <img src={!this.props.user.avatar?default_img: this.props.user.avatar} alt="" className="avatar" />
        <p className="username">{this.props.user.username}</p>
    </a>
    }
}

export default ProfileCardMini