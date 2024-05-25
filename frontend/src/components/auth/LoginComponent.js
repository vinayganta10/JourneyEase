import React, { useState } from "react";
import '../LoginComponent.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useMyContext} from "../authProvider"

function LoginComponent() {
    const navigate = useNavigate();
    const [username, setUser] = useState("");
    const [password, setPassword] = useState("");
    const {token,setToken} = useMyContext();
    function handleUserName(e) {
        setUser(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }
    async function handleLogin(e) {
        //e.preventDefault();
        let data = { username, password };
        await axios.post('http://localhost:4000/api/login', data).then((response) => {console.log(response.data);setToken(response.data);}).catch((error) => {throw error;});
        localStorage.setItem("token", token);
        navigate('/home');
    }
    function handleSignup() {
        navigate('/signup');
    }
    return (
        <div className="form-wrapper">
            <h2>LogIn</h2>
            <form>
                <div className="form-control">
                    <input type="text" id="username" value={username} onChange={handleUserName} required autoComplete="true" />
                    <label>email or username</label>
                </div>
                <div className="form-control">
                    <input type="password" id="password" value={password} required onChange={handlePassword} autoComplete="true" />
                    <label>Password</label>
                </div>
                <button onClick={() => handleLogin()} type="button">Login</button>
                <div className="form-help">
                    <div className="remember-me">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <a href="#">Need help?</a>
                </div>
            </form>
            <p>Do not have an account?<button onClick={() => handleSignup()}>Sign up</button></p>
        </div>
    );
}

export default LoginComponent;