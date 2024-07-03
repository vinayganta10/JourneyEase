import React, { useState } from 'react';
import '../App.css';
import '../styles/HomeComponent.css';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from './authProvider';
import { Card, Container, Row, Col, Table, Spinner, Alert } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token, user, handleLogout } = useMyContext();
  const clickHome = () => {
    navigate('/home');
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

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/bookings/${user}`,
        );
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        setError(false);
        console.error('There was an error fetching the bookings:', error);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className='App'>
      <div>
        <ul>
          <li className='main' onClick={clickHome}>
            Journey Ease
          </li>
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
        </ul>
      </div>
      <Container>
      <Row>
        {bookings.map((booking) => (
          <Col key={booking.bookingId} md={4}>
            <Card style={{ margin: '10px' }}>
              <Card.Header>Booking ID: {booking.bookingId}</Card.Header>
              <Card.Body>
                <Card.Text>
                  {Object.entries(booking.items).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '8px' }}>
                      <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
                    </div>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
}

export default MyBookings;
