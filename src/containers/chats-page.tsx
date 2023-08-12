import React from "react";
import FriendCard from "../components/friend-card";
import Chat from "./chat";
import "./styles/chats-page.css";
import AppHead from "../components/app-head";

interface state{

}

interface props{

}

class ChatsPage extends React.Component<props, state>{
    render(){
        return <div className="chats-page" >
            <div className="friends-card-list" >
            <FriendCard username="My name" avatar="http://test.png" />
            <FriendCard username="My name" avatar="http://test.png" />
            <FriendCard username="My name" avatar="http://test.png" />
            <FriendCard username="My name" avatar="http://test.png" />
            <FriendCard username="My name" avatar="http://test.png" />
            <FriendCard username="My name" avatar="http://test.png" />
            <FriendCard username="My name" avatar="http://test.png" />
            <FriendCard username="My name" avatar="http://test.png" />
            <FriendCard username="My name" avatar="http://test.png" />
            <FriendCard username="My name" avatar="http://test.png" />
            <FriendCard username="My name" avatar="http://test.png" />
            <FriendCard username="My name" avatar="http://test.png" />
            </div>
            <div className="chat-wrapper" >
                <Chat />
                
            </div>
        </div>
    }
}

export default ChatsPage;