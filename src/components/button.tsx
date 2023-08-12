import React from "react";
import "./styles/button.css";

interface props{
    text: string,
    handler?: any
}
interface state{

}
class Button extends React.Component<props, state>{
    render(){
        return <button className="btn" >{this.props.text}</button>
    }
}
export default Button