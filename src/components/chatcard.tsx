import React from "react";
import "./styles/chat-card.css"

interface props{
    text?: string
    thumbnail?: boolean
    media?: string
    timestamp: string
}
interface state{

}

export default class ChatCard extends React.Component<props, state>{
    render(){
    return(
        <div>
            <div className="chat-card" > 
            <img src={"#"} alt={"#"} />
            <p className="chat-text">{this.props.text}</p>
            <span className="chat-delivery-time">{this.props.timestamp}</span>
            </div>
        </div>)
        
    }
}