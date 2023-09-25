import React from "react";
import "./styles/chat-card.css";
import {formatDate} from "../utils/date"
import { file_type } from "../services/socket";
// import Thumbnail from "./thumbnail"

interface props{
    body?: string
    file?: file_type
    sentAt: number
    self: boolean
}
interface state{

}

export default class MessageCard extends React.Component<props, state>{
    render(){
        console.log(this.props.self)
    return(
        <div>
            <div className={`chat-card ${this.props.self?"self":""}`} > 
            {!this.props.file?
            <p className="chat-text">{this.props.body}</p>:
            <a href={this.props.file.url} download={this.props.file.name} >
                <img src={this.props.file.thumbnail} alt={this.props.file.name} />
                </a>
            }
            <span className="chat-delivery-time">{formatDate(this.props.sentAt)}</span>
            </div>
        </div>)
        
    }
}