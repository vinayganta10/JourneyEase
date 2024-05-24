import React, { useState } from "react";
import '../App.css';
import Dashboard from "./Dashboard";
import '../styles/HomeComponent.css';
import { useNavigate } from "react-router-dom";

function HomeComponent() {
    const navigateHome = useNavigate();
    const [loggedIn,setLoggedIn] = useState(false);
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
                        {loggedIn?(<><li className="auth" onClick={()=>clickLogin()}>Login</li>
                        <li className="auth" onClick={()=>clickSignup()}>Sign up</li></>):(<profile/>)}
                    </ul>
                </div>

        </div>
    );
}

export default HomeComponent;