import React, { useState } from 'react';
import '../App.css';
import '../styles/HomeComponent.css';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from './authProvider';
import { useEffect } from 'react';
import axios from 'axios';
import {
  Spinner,
  Alert,
  Container,
  Row,
  Col,
  Card,
  Button,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('car');

  const { token, user, handleLogout } = useMyContext();

  const clickHome = () => {
    navigate('/home');
  };

  const clickProfile = () => {
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
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setBookings(response.data);
        setLoading(false);
        console.log(bookings);
        if(bookings.length==0){
          setLoading(false);
          setError('No bookings.');
        }
      } catch (error) {
        setLoading(false);
        setError('Failed to fetch bookings.');
        console.error('There was an error fetching the bookings:', error);
      }
    };
    if (user) fetchBookings();
  }, [user]);

  useEffect(() => {
    if (filterType === 'all') {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(
        (booking) => booking.items.type === filterType,
      );
      setFilteredBookings(filtered);
    }
  }, [bookings, filterType]);

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleCancel = async (id) => {
    let res = await axios.delete(`http://localhost:4000/api/bookings/${id}`);
    window.location.reload();
  };

  if (loading) return <Spinner animation='border' />;
  if (error) return <Alert variant='danger'>{error}</Alert>;

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
      <div className='list'>
        <Container>
          <DropdownButton id='dropdown-item-button' title='Filter by Type'>
            <Dropdown.Item
              as='button'
              onClick={() => handleFilterChange('all')}
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              as='button'
              onClick={() => handleFilterChange('car')}
            >
              Car
            </Dropdown.Item>
            <Dropdown.Item
              as='button'
              onClick={() => handleFilterChange('hotel')}
            >
              Hotel
            </Dropdown.Item>
            <Dropdown.Item
              as='button'
              onClick={() => handleFilterChange('flight')}
            >
              Flight
            </Dropdown.Item>
          </DropdownButton>
          <Row>
            {filteredBookings.map((booking) => (
              <Col key={booking.bookingId} md={4}>
                <Card style={{ margin: '10px' }}>
                  <Card.Header>Booking ID: {booking.bookingId}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {Object.entries(booking.items).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: '8px' }}>
                          <strong>{key}:</strong>{' '}
                          {typeof value === 'object'
                            ? JSON.stringify(value)
                            : value}
                        </div>
                      ))}
                    </Card.Text>
                  </Card.Body>
                  <Button onClick={() => handleCancel(booking.bookingId)}>
                    Cancel
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default MyBookings;
