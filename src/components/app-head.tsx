import React from "react";
import { Icon } from "@iconify/react";
import "./styles/app-head.css";
import {ReactComponent as Logo} from "../public/Logo.svg";
import SideNav from "./side-nav";

interface props{
    hasSearch?: boolean
    handleSearch?: Function
    searchRef?: React.RefObject<HTMLInputElement>
    searchplaceholder?: string
}
interface state{
    navOpen: boolean
}

class AppHead extends React.Component<props, state>{
    state ={
        navOpen: false
    }
    render(){
        return <><div className="app-head">
            <a href="/" className="app-logo">
                <Logo className="logo" />
                <h1>Chat<span>Box</span></h1>
            </a>
            {this.props.hasSearch && <div className="search-box" >
                <input type="text" placeholder={this.props.searchplaceholder || "search here..."} ref={this.props.searchRef} />
                <Icon className="icn" onClick={()=>this.props.handleSearch && this.props.handleSearch()} icon="fluent:search-16-regular" />
                </div>}
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/chats">Chats</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
            <div onClick={()=>{this.state.navOpen?this.setState({navOpen: false}): this.setState({navOpen: true})}} className="handburger">
                <hr></hr>
                <hr></hr>
            </div>
        </div>
        {this.state.navOpen && <SideNav 
        hasSearch={this.props.hasSearch}
        handleSearch={this.props.handleSearch}
        searchRef={this.props.searchRef}
         />}
        </>
    }
}

export default AppHead