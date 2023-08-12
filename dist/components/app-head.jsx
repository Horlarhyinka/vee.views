import React from "react";
import "./styles/app-head.css";
import { Icon } from '@iconify/react';
class AppHead extends React.Component {
    constructor() {
        var _a;
        super(...arguments);
        this.setMenu = () => {
            var _a;
            console.log("setting");
            const menusState = (_a = this.state) === null || _a === void 0 ? void 0 : _a.menuActive;
            if (menusState) {
                this.setState({ menuActive: false });
            }
            else {
                this.setState({ menuActive: true });
            }
        };
        this.HandburgerIcon = !((_a = this.state) === null || _a === void 0 ? void 0 : _a.menuActive) ? <Icon icon="ci:menu-duo-md" className="icn"/> : <Icon icon="line-md:close-small" className="icn"/>;
    }
    render() {
        var _a, _b;
        return <><div className="app-head">
            {/* <span className="app-logo">
                L
            </span> */}
            <h1 className="app-page-title">{this.props.title}</h1>
            <div onClick={this.setMenu} className="handburger">
                {/* <Icon icon="ci:menu-duo-md" className="icn" /> */}
                {/* <Icon icon="line-md:close-small" className="icn" /> */}
                {/* {this.HandburgerIcon} */}
                {!((_a = this.state) === null || _a === void 0 ? void 0 : _a.menuActive) ? <Icon icon="ci:menu-duo-md" className="icn"/> : <Icon icon="line-md:close-small" className="icn"/>}
                </div>
        </div>
        {((_b = this.state) === null || _b === void 0 ? void 0 : _b.menuActive) && (<div className="menu">
    <a href="#">Home</a>
    <a href="#">chats</a>
    <a href="#">communities</a>
    <a href="#">notifications</a>
    <div className="close" onClick={this.setMenu}>
        <Icon icon="line-md:close-small" className="icn"/>
    </div>
            </div>)}
        </>;
    }
}
export default AppHead;
