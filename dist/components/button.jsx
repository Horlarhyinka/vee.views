import React from "react";
import "./styles/button.css";
class Button extends React.Component {
    render() {
        return <button className="btn">{this.props.text}</button>;
    }
}
export default Button;
