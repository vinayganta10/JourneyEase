import React from "react";
import '../LoginComponent.css';
import { useNavigate } from "react-router-dom";

function SignupComponent() {
    const navigateSignup = useNavigate();
    function handleSignUp(){
        navigateSignup('/');
    }
    return (
        <div class="form-wrapper">
            <h2>Signup</h2>
            <form action="#">
                <div className="form-control">
                    <input type="text" required />
                    <label>Username</label>
                </div>
                <div className="form-control">
                    <input type="text" required />
                    <label>Email</label>
                </div>
                <div className="form-control">
                    <input type="password" required />
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