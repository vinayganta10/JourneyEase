import React from "react";
import '../LoginComponent.css';
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from 'axios';

function SignupComponent() {
    const navigateSignup = useNavigate();
    const [user,setUser] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    function handleUserName(e) {
        setUser(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }
    async function handleSignUp(e){
        let data = {
            user,password,email
        };
        let token = "";
        await axios.post("http://localhost:4000/api/signup",data).then((response)=>{token=response.data}).catch((err)=>{throw err});
        localStorage.setItem("token", token);
        navigateSignup('/');
    }
    return (
        <div className="form-wrapper">
            <h2>Signup</h2>
            <form action="#">
                <div className="form-control">
                    <input type="text" id="username" value={user} onChange={handleUserName} required />
                    <label>Username</label>
                </div>
                <div className="form-control">
                    <input type="text" id="password" value={password} onChange={handlePassword} required />
                    <label>Email</label>
                </div>
                <div className="form-control">
                    <input type="password" id="email" value={email} onChange={handleEmail} required />
                    <label>Password</label>
                </div>
                <button onClick={() => handleSignUp()} type="submit">Signup</button>
                <div className="form-help">
                    <a href="#">Need help?</a>
                </div>
            </form>
        </div>
    );
}

export default SignupComponent;