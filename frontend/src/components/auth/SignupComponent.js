import React from 'react';
import '../LoginComponent.css';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useMyContext} from '../authProvider';

function SignupComponent() {
  const navigateSignup = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const { token, setToken, user, setUser } = useMyContext();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one letter and one number

  function handleUserName(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function validate() {
    let tempErrors = {};
    tempErrors.email = emailRegex.test(email) ? '' : 'Email is not valid';
    tempErrors.password = passwordRegex.test(password) ? '' : 'Password must be at least 8 characters long and contain both letters and numbers';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  }

  async function handleSignUp(e) {
    e.preventDefault();
    if (!validate()) return;

    let data = {
      username,
      password,
      email,
    };

    try {
      const response = await axios.post('http://localhost:4000/api/signup', data);
      console.log(response.data);
      navigateSignup('/login');
    } catch (error) {
      console.error('There was an error!', error);
    }
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
              type="email"
              id="email"
              value={email}
              onChange={handleEmail}
              required
            />
            <label>Email</label>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-control">
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePassword}
              required
            />
            <label>Password</label>
            {errors.password && <span className="error">{errors.password}</span>}
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