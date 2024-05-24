import React from "react";
import '../App.css';
import Dashboard from "./Dashboard";
import '../styles/HomeComponent.css';
import { useNavigate } from "react-router-dom";

function HomeComponent() {
    const navigateHome = useNavigate();
    function clickHome(){
        navigateHome('/home');
    }
    function clickLogin(){
        navigateHome('/login');
    }
    function clickSignup(){
        navigateHome('/signup');
    }
    return (
        <div className="App">
                <div>
                    <ul>
                        <li className="main" onClick={()=>clickHome()}>Journey Ease</li>
                        <li className="auth" onClick={()=>clickLogin()}>Login</li>
                        <li className="auth" onClick={()=>clickSignup()}>Sign up</li>
                    </ul>
                </div>
                <div className="home">
                    <h1>Welcome to the best travelling booking site</h1>
                    
                </div>
        </div>
    );
}

export default HomeComponent;