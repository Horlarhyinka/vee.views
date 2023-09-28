import React from "react";
import { profile_int } from "../services/socket";
import "./styles/not-friend-card.css";
import { trimTosize } from "../utils/funcs";
import default_img from "../public/default_img.png"
interface props{
    user: profile_int
    handleAddChat: (id:string)=>void
}
interface state{

}


class NotFriendCard extends React.Component<props,state>{
    
    render(){
        console.log("trimmed", trimTosize(this.props.user.email, 6))
        return <div className="not-friend-card">
                    <img src={
                        this.props.user.avatar? 
                        this.props.user.avatar: 
                        default_img
                        } alt={this.props.user.username} />
                    <p className="username">{trimTosize(this.props.user.username, 14)}</p>
                    <p className="email">{trimTosize(this.props.user.email, 12)}</p>
                    <button onClick={()=>this.props.handleAddChat(this.props.user._id)} >add</button>
                </div>
    }
}

export default NotFriendCard