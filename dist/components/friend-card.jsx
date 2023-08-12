import React from "react";
import robo_earth from "../public/robo_earth.png";
import "./styles/friend-card.css";
console.log("friiii");
class FriendCard extends React.Component {
    render() {
        return <div className="friend-card">
            <img className="avatar" src={robo_earth} alt="avatar"/>
            <div className="card-info">
            <p className="username">My Name</p>
            <p className="message">here is my boring chat with a white dude...</p>
            </div>
            <span className="notification">1</span>
        </div>;
    }
}
export default FriendCard;
