import React from "react";
import"./styles/home.css";
import robo_earth from "../public/robo_earth.png";
import Button from "../components/button";
import AppHead from "../components/app-head";

type state = {}
type props = {}

class Home extends React.Component<props, state>{
    render(){
        return (<div className="home">
            <AppHead title="home" />
            <h1>The Best way to chat</h1>
            <img src={robo_earth} alt={""} />
            <span className="vee-s">Vee</span>
            <p>meet 10k+ friends</p>
            <Button text={"start chatting" } />
        </div>)
    }
}

export default Home;