import React from "react";
import "./styles/chathead.css";
import robot from "../public/robo_earth.png";
import { Icon } from "@iconify/react";

interface props{

}
interface state{

}

export default class ChatHead extends React.Component<props, state>{
    render(){
        return <div className="chat-head">
            <span className="back-icn"><Icon className="icn" icon="ion:chevron-back" /></span>
            <div className="header-wrapper"><p className="head-username">UserName</p><div className="status-indicator"></div><p className="status"> online</p></div>
            <img src={robot} alt="profile" />
        </div>
    }
}