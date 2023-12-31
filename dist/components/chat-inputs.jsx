import React from "react";
import { Icon } from "@iconify/react";
import "./styles/chat-inputs.css";
export default class ChatInputs extends React.Component {
    render() {
        return <form className="chat-inputs">
            <div className="file-select">
            <Icon className="icn" icon="teenyicons:attach-outline"/>
            </div>
            <div className="text-icn-input">
                <input type="text" name="chat-text-input" placeholder="type here..." className="chat-text-input"/>
                <div className="icn-input"></div>
            </div>
            <button className="send-btn">
            <Icon icon="bi:send" className="icn"/>
            </button>
        </form>;
    }
}
