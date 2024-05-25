import React, {useContext, useState} from 'react';
import '../App.css';
import Dashboard from './Dashboard';
import '../styles/HomeComponent.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useMyContext} from './authProvider'

function HomeComponent () {
  const navigateHome = useNavigate ();
  const navigateLogin = useNavigate();
  const [fromPlace, setFromPlace] = useState('');
  const [toPlace, setToPlace] = useState('');
  const [quantity, setQuantity] = useState('');
  const {token} = useMyContext;


  const handleFromChange = (e) => {
    setFromPlace(e.target.value);
  };

  const handleToChange = (e) => {
    setToPlace(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();   
    console.log(`Searching from ${fromPlace} to ${toPlace} with quantity ${quantity}`);
  };
  function clickHome () {
    navigateHome ('/home');
  }
  function clickLogin (e) {
    e.preventDefault();
    navigateLogin ('/login');
  }
  function clickSignup () {
    navigateHome ('/signup');
  }
  return (
    <div className="App">
      <div>
        <ul>
          <li className="main" onClick={clickHome}>Journey Ease</li>
          {token===""?<>
              <li className="auth" onClick={clickLogin}>Login</li>
              <li className="auth" onClick={clickSignup}>Sign up</li>
            </>:<><li className='auth'>Logout</li></>}
        </ul>
      </div>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fromPlace">From:</label>
          <input
            type="text"
            id="fromPlace"
            value={fromPlace}
            onChange={handleFromChange}
            placeholder="Enter origin"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="toPlace">To:</label>
          <input
            type="text"
            id="toPlace"
            value={toPlace}
            onChange={handleToChange}
            placeholder="Enter destination"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="Enter quantity"
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default HomeComponent;
