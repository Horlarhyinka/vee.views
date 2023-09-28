import React from "react";
import ProfileCardMini from "./profile-card-mini";
import {deleteToken, getAuthCredntials} from "../utils/token";
import "./styles/side-nav.css";
import { Icon } from '@iconify/react';

interface props{
    hasSearch?: boolean
    handleSearch?: Function
    searchRef?: React.RefObject<HTMLInputElement>
    searchplaceholder?: string
}
interface state{

}

class SideNav extends React.Component<props,state>{
    logout = () =>{
        deleteToken()
        window.location.reload()
    }
    render(){
        const {user} = getAuthCredntials() as {user:{_id: string, email: string}}
        return <div className="side-nav">
            <ProfileCardMini user={{...user, username: user.email}} />
            {this.props.hasSearch && <div className="search-box" >
                <input type="text" placeholder={this.props.searchplaceholder || "search here..."} ref={this.props.searchRef} />
                <Icon className="icn" onClick={()=>this.props.handleSearch && this.props.handleSearch()} icon="fluent:search-16-regular" />
                </div>}
            <ul>
                <li><a href="/" >Home</a></li>
                <li><a href="/chats">Chats</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
            <div onClick={this.logout} className="logout">logout <Icon className="icn" icon="carbon:logout" /></div>
        </div>
    }
}

export default SideNav