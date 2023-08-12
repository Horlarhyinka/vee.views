import React from "react";
import "./styles/chat-card.css";
export default class ChatCard extends React.Component {
    render() {
        return (<div>
            <div className="chat-card"> 
            <img src={"#"} alt={"#"}/>
            <p className="chat-text">{this.props.text}</p>
            <span className="chat-delivery-time">{this.props.timestamp}</span>
            </div>
        </div>);
    }
}
