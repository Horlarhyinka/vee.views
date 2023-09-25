import React from "react";
import "./styles/chat.css";
import ChatHead from "../components/Chathead";
import ChatCard from "../components/chatcard";
import ChatInputs from "../components/chat-inputs";
export default class Chat extends React.Component {
    render() {
        return <div className="chat">
            <ChatHead />
            <ChatCard timestamp={"12:00"} text={"Hello"}/>
            <ChatCard timestamp={"12:00"} text={"Hello"}/>
            <ChatInputs />
        </div>;
    }
}
