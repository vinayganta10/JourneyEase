import React from 'react';
import '../LoginComponent.css';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useMyContext} from '../authProvider';

function SignupComponent () {
  const navigateSignup = useNavigate ();
  const [username, setUsername] = useState ('');
  const [password, setPassword] = useState ('');
  const [email, setEmail] = useState ('');
  const {token, setToken, user, setUser} = useMyContext ();
  function handleUserName (e) {
    setUsername (e.target.value);
  }

  function handlePassword (e) {
    setPassword (e.target.value);
  }

  function handleEmail (e) {
    setEmail (e.target.value);
  }
  async function handleSignUp (e) {
    let data = {
      username,
      password,
      email,
    };
    const response = await axios.post (
      'http://localhost:4000/api/signup',
      data
    );
    console.log (response.data);
    localStorage.setItem ('token', response.data);
    localStorage.setItem ('user', username);
    navigateSignup ('/home');
    window.location.reload ();
  }
  const clickHome = () => {
    navigateSignup('/home');
  };
  return (
    <div className="App">
      <div>
        <ul>
          <li className="main" onClick={clickHome}>Journey Ease</li>
        </ul>
      </div>
      <div className="form-wrapper">
        <h2>Signup</h2>
        <form action="#">
          <div className="form-control">
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUserName}
              required
            />
            <label>Username</label>
          </div>
          <div className="form-control">
            <input
              type="text"
              id="password"
              value={password}
              onChange={handlePassword}
              required
            />
            <label>Email</label>
          </div>
          <div className="form-control">
            <input
              type="password"
              id="email"
              value={email}
              onChange={handleEmail}
              required
            />
            <label>Password</label>
          </div>
          <button onClick={handleSignUp} type="button">Signup</button>
          <div className="form-help">
            <a href="#">Need help?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupComponent;
