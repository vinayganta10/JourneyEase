import React, { useState } from 'react';
import '../App.css';
import '../styles/HomeComponent.css';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from './authProvider';

function HomeComponent() {
  const navigate = useNavigate();
  const [fromPlace, setFromPlace] = useState('');
  const [toPlace, setToPlace] = useState('');
  const [quantity, setQuantity] = useState('');
  const { token, user, handleLogout } = useMyContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Searching from ${fromPlace} to ${toPlace} with quantity ${quantity}`);
  };

  const clickHome = () => {
    navigate('/home');
  };

  const clickLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const clickSignup = () => {
    navigate('/signup');
  };

  const clickProfile = () => {
    console.log(user);
    navigate(`/profile/${user}`);
  };

  const logOut = () => {
    handleLogout();
    navigate('/login');
    window.location.reload();
  };

  const handleData = (e) => {
    e.preventDefault();
    const type = e.target.value;
    navigate(`/dashboard/${type}`);
  };

  return (
    <div className="App">
      <div>
        <ul>
          <li className="main" onClick={clickHome}>Journey Ease</li>
          {token == null ? (
            <>
              <li className="auth" onClick={clickLogin}>Login</li>
              <li className="auth" onClick={clickSignup}>Sign up</li>
            </>
          ) : (
            <>
              <li className="auth" onClick={logOut}>Logout</li>
              <li className="auth" onClick={clickProfile}>
                <img
                  src="https://th.bing.com/th/id/OIP.puOmlMTXgIAxHkFn80A-XgHaHa?w=204&h=204&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  height="40px"
                  width="40px"
                  alt="Profile"
                />
              </li>
              <li className="auth">My bookings</li>
            </>
          )}
        </ul>
      </div>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <button value="cars" onClick={handleData}>Cars</button>
        </div>
        <div className="form-group">
          <button value="flights" onClick={handleData}>Flights</button>
        </div>
        <div className="form-group">
        <button value="hotels" onClick={handleData}>Hotels</button>
        </div>
      </form>
    </div>
  );
}

export default HomeComponent;
