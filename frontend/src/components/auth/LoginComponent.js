import React from "react";
import '../LoginComponent.css';
import { useNavigate } from "react-router-dom";

function LoginComponent(){
    const navigate = useNavigate();
    function handleLogin(){
        navigate('/dashboard');
    }
    function handleSignup(){
        navigate('/signup');
    }
    return(
        <div class="form-wrapper">
        <h2>LogIn</h2>
        <form action="#">
            <div className="form-control">
                <input type="text" required/>
                <label>email or Username</label>
            </div>
            <div className="form-control">
                <input type="password" required/>
                <label>Password</label>
            </div>
            <button onClick={()=>handleLogin()} type="submit">Login</button>
            <div className="form-help"> 
                <div className="remember-me">
                    <input type="checkbox" id="remember-me"/>
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <a href="#">Need help?</a>
            </div>
        </form>
        <p>Do not have an account?<button onClick={()=>handleSignup()} type="button">Sign up</button></p>
    </div>
    );
}

export default LoginComponent;