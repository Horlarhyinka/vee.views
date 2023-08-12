import React from "react";
import "./styles/app-head.css";
import { Icon } from '@iconify/react';

interface props{
    title?: string

}

interface state{
    menuActive: boolean
}

class AppHead extends React.Component<props, state>{

    setMenu = () =>{
        console.log("setting")
        const menusState = this.state?.menuActive;
        if(menusState){
            this.setState({menuActive: false})
        }else{
            this.setState({menuActive: true})
        }
    }
    HandburgerIcon = !this.state?.menuActive? <Icon icon="ci:menu-duo-md" className="icn" />: <Icon icon="line-md:close-small" className="icn" />;
    render(){
        return <><div className="app-head" >
            {/* <span className="app-logo">
                L
            </span> */}
            <h1 className="app-page-title">{this.props.title}</h1>
            <div onClick={this.setMenu} className="handburger">
                {/* <Icon icon="ci:menu-duo-md" className="icn" /> */}
                {/* <Icon icon="line-md:close-small" className="icn" /> */}
                {/* {this.HandburgerIcon} */}
                {!this.state?.menuActive? <Icon icon="ci:menu-duo-md" className="icn" />: <Icon icon="line-md:close-small" className="icn" />}
                </div>
        </div>
        {this.state?.menuActive && (<div className="menu" >
    <a href="#">Home</a>
    <a href="#">chats</a>
    <a href="#">communities</a>
    <a href="#">notifications</a>
    <div className="close" onClick={this.setMenu} >
        <Icon icon="line-md:close-small" className="icn" />
    </div>
</div>)}
        </>
    }
}

export default AppHead;