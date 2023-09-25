import React from "react";
import "./styles/chathead.css";
import robot from "../public/robo_earth.png";
import { Icon } from "@iconify/react";
import { user_profile } from "../containers/chats.types";

interface props{
    profile: user_profile
}
interface state{

}

export default class ChatHead extends React.Component<props, state>{
    render(){
        return <div className="chat-head">
            <span className="back-icn"><Icon className="icn" icon="ion:chevron-back" /></span>
            <div className="header-wrapper">
                <p className="head-username">{this.props.profile.username}</p>{this.props.profile.online && <><div className="status-indicator"></div><p className="status"> online</p></>}</div>
            <img src={this.props.profile.avatar || robot} alt="profile" />
        </div>
    }
}