import React, {useState} from 'react';
import '../LoginComponent.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useMyContext} from '../authProvider';
import {Alert} from 'react-bootstrap';

function LoginComponent () {
  const navigate = useNavigate ();
  const [username, setUsername] = useState ('');
  const [password, setPassword] = useState ('');
  const {token, setToken} = useMyContext ();
  const [error, setError] = useState(null);

  function handleUserName (e) {
    setUsername (e.target.value);
  }
  function handlePassword (e) {
    setPassword (e.target.value);
  }
  const clickHome = () => {
    navigate('/home');
  };
  async function handleLogin (e) {
    //e.preventDefault();
    let data = {username, password};
    try{
      const response = await axios.post ('http://localhost:4000/api/login', data)
      console.log(response.token);
      localStorage.setItem ('token', response.token);
      localStorage.setItem ('user', username);
      navigate ('/home');
      window.location.reload();
    }catch(error){
      setError('User authentication failed');
      console.log("login failed",error);
      
    }
  }
  
  function handleSignup () {
    navigate ('/signup');
  }

  if (error) return <Alert variant='danger'>{error}</Alert>;

  return (
    <div className="App">
      <div>
        <ul>
          <li className="main" onClick={clickHome}>Journey Ease</li>
        </ul>
      </div>
      <div className="form-wrapper">
        <h2>LogIn</h2>
        <form>
          <div className="form-control">
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUserName}
              required
              autoComplete="true"
            />
            <label>email or username</label>
          </div>
          <div className="form-control">
            <input
              type="password"
              id="password"
              value={password}
              required
              onChange={handlePassword}
              autoComplete="true"
            />
            <label>Password</label>
          </div>
          <button onClick={() => handleLogin ()} type="button">Login</button>
          <div className="form-help">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <a href="#">Need help?</a>
          </div>
        </form>
        <p>
          Do not have an account?
          <button onClick={() => handleSignup ()}>Sign up</button>
        </p>
      </div>
    </div>
  );
}

export default LoginComponent;
