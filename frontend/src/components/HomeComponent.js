import React, { useState } from 'react';
import '../App.css';
import '../styles/HomeComponent.css';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from './authProvider'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';;
import { ReactTyped } from "react-typed";

function HomeComponent() {
  const navigate = useNavigate();
  const [fromPlace, setFromPlace] = useState('');
  const [toPlace, setToPlace] = useState('');
  const [quantity, setQuantity] = useState('');
  const { token, user, handleLogout } = useMyContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Searching from ${fromPlace} to ${toPlace} with quantity ${quantity}`,
    );
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

  const clickBookings = () => {
    navigate('/mybookings');
  };

  const handleData = (e) => {
    e.preventDefault();
    const type = e.target.value;
    navigate(`/dashboard/${type}`);
  };

  return (
    <div className='App'>
      <div>
        <ul>
          <li className='main' onClick={clickHome}>
            Journey Ease
          </li>
          {token == null ? (
            <>
              <li className='auth' onClick={clickLogin}>
                Login
              </li>
              <li className='auth' onClick={clickSignup}>
                Sign up
              </li>
            </>
          ) : (
            <>
              <li className='auth' onClick={logOut}>
                Logout
              </li>
              <li className='auth' onClick={clickProfile}>
                <img
                  src='https://th.bing.com/th/id/OIP.puOmlMTXgIAxHkFn80A-XgHaHa?w=204&h=204&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                  height='40px'
                  width='40px'
                  alt='Profile'
                />
              </li>
              <li className='auth' onClick={clickBookings}>
                My bookings
              </li>
            </>
          )}
        </ul>
      </div>
      <div className='intro'>
        <h1>
          W{""}
          <ReactTyped strings={["elcome To journey Ease"]} typeSpeed={60} />
        </h1>
      </div>
      <div className='home'>
        <form className='search-form' onSubmit={handleSubmit}>
          <label>What do you want to book {user}?</label>
          <div className='form-group'>
            <button value='cars' onClick={handleData}>
              Cars
            </button>
          </div>
          <div className='form-group'>
            <button value='flights' onClick={handleData}>
              Flights
            </button>
          </div>
          <div className='form-group'>
            <button value='hotels' onClick={handleData}>
              Hotels
            </button>
          </div>
        </form>
        <Card className = 'para' style={{ width: '30rem' }}>
          <Card.Body>
            <Card.Text>
              Journey Ease is an all-encompassing e-travel booking platform designed to cater to the diverse needs of modern travelers. Whether you are planning a family vacation, a business trip, or a solo adventure, Journey Ease provides a seamless and comprehensive solution for booking cars, hotels, and flights.
            </Card.Text>
            <Button variant="primary">Book something</Button>
          </Card.Body>
        </Card>
      </div>


      <footer className='footer'>
        <div className='footer-container'>
          <div className='footer-about'>
            <h3>About Us</h3>
            <p>
              We provide the best travel experiences tailored just for you.
              Explore the world with us!
            </p>
          </div>
          <div className='footer-contact'>
            <h3>Contact Us</h3>
            <p>Email: info@etravel.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 Travel St, Adventure City, World</p>
          </div>
          <div className='footer-social'>
            <h3>Follow Us</h3>
            <a href='https://facebook.com' target='_blank'>
              <i className='fab fa-facebook-f'></i>
            </a>
            <a href='https://twitter.com' target='_blank'>
              <i className='fab fa-twitter'></i>
            </a>
            <a href='https://instagram.com' target='_blank'>
              <i className='fab fa-instagram'></i>
            </a>
            <a href='https://linkedin.com' target='_blank'>
              <i className='fab fa-linkedin-in'></i>
            </a>
          </div>
        </div>
        <div className='footer-bottom'>
          <p>&copy; 2024 eTravel. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomeComponent;
