import React from "react";
// import {user_profile} from "../containers/chats.types";
import { profile_int } from "../services/socket";
import "./styles/profile-card-mini.css"

interface prop{
    user: profile_int
}
interface state{

}

const API_BASE_URL = process.env.REACT_APP_API_URL

class ProfileCardMini extends React.Component<prop,state>{
    render(){
        return <a href={`${API_BASE_URL}/users/${this.props.user._id}`} className="profile">
        <img src={this.props.user.avatar} alt="" className="avatar" />
        <p className="username">{this.props.user.username}</p>
    </a>
    }
}

export default ProfileCardMini