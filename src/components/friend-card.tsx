import React from "react";
import robo_earth from "../public/robo_earth.png";
import "./styles/friend-card.css"

interface state{

}

interface props{
    username: string
    email?: string
    message?: string 
    avatar: string 
    lastMessage?: string
    handleChatClick: ( id: string)=>void
    id: string
    unread: number
}

class FriendCard extends React.Component<props, state>{
    render(){
        return <div className="friend-card" onClick={(e)=>this.props.handleChatClick(this.props.id)}>
            <img className="avatar" src={robo_earth} alt="avatar" />
            <div className="card-info">
            <p className="username" >{this.props.username}</p>
            <p className="message">{!this.props.lastMessage?
             "no messages yet": 
             this.props.lastMessage?.length >24?
             this.props.lastMessage.slice(0,24)+"...": 
             this.props.lastMessage}</p>
            </div>
            {Number(this.props.unread) < 1?"":<span className="notification"></span>}
        </div>
    }
}

export default FriendCard;