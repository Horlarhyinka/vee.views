import React from "react";
import { Icon } from "@iconify/react";
import "./styles/app-head.css"

interface props{
    hasSearch?: boolean
    handleSearch?: Function
    searchRef?: React.RefObject<HTMLInputElement>
    searchplaceholder?: string
}
interface state{

}

class AppHead extends React.Component<props, state>{
    render(){
        return <div className="app-head">
            <div className="app-logo">
            </div>
            {this.props.hasSearch && <div className="search-box" >
                <input type="text" placeholder={this.props.searchplaceholder || "search here..."} ref={this.props.searchRef} />
                <Icon className="icn" icon="fluent:search-16-regular" />
                </div>}
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/chats">Chats</a></li>
                <li><a href="/profile">Profile</a></li>

                {/* <li>Developer</li> */}
            </ul>
        </div>
    }
}

export default AppHead