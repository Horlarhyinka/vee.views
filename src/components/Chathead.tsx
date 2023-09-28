import React from "react";
import "./styles/chathead.css";
import { Icon } from "@iconify/react";
import { user_profile } from "../containers/chats.types";
import default_img from "../public/default_img.png"

interface props{
    profile: user_profile
    handleChatClose: ()=>void
}
interface state{

}

export default class ChatHead extends React.Component<props, state>{
    render(){
        return <div className="chat-head">
            <span onClick={this.props.handleChatClose} className="back-icn"><Icon className="icn" icon="ion:chevron-back" /></span>
            <a href={"/users/"+String(this.props.profile._id)} className="header-wrapper">
                <p className="head-username">{this.props.profile.username}</p>{this.props.profile.online && <><div className="status-indicator"></div><p className="status"> online</p></>}</a>
            <img src={this.props.profile.avatar || default_img} alt="profile" />
        </div>
    }
}