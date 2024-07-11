import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/HomeComponent.css';
import { useNavigate, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useMyContext } from './authProvider';

function AdminListingComponent() {
  const { token, user, handleLogout } = useMyContext();
  const { type } = useParams();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [flights, setFlights] = useState([]);

  function clickHome() {
    navigate('/home');
  }

  function handleDelete(e) {
    let value = e.target.value;
    console.log(e.target.value);
    let item = cars.find((car) => {
      if (car.id == value) {
        axios.delete(`http://localhost:4000/api/admin/${type}/${value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    });
    navigate('/admin');
    window.location.reload();
  }

  function handleUpdate(e) {
    let value = e.target.value;
  }

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/cars', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCars(res.data))
      .catch((error) => console.error('Error fetching cars:', error));
    axios
      .get('http://localhost:4000/api/hotels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setHotels(res.data))
      .catch((error) => console.error('Error fetching hotels:', error));

    axios
      .get('http://localhost:4000/api/flights', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setFlights(res.data))
      .catch((error) => console.error('Error fetching flights:', error));
  }, []);

  const carsList = cars.map((car) => (
    <Card key={car._id}>
      <Card.Header>Cars</Card.Header>
      <Card.Body>
        <Card.Title>
          {car.make} {car.model}
        </Card.Title>
        <Card.Text>Price: ${car.price}</Card.Text>
        <div className='items'>
          <Button value={car.id} variant='primary' onClick={handleDelete}>
            delete
          </Button>
          <Button variant='primary'>update</Button>
        </div>
      </Card.Body>
    </Card>
  ));

  const hotelsList = hotels.map((hotel) => (
    <Card key={hotel._id}>
      <Card.Header>Hotels</Card.Header>
      <Card.Body>
        <Card.Title>{hotel.name}</Card.Title>
        <Card.Text>{hotel.location}</Card.Text>
        <Card.Text>Price: ${hotel.price}</Card.Text>
        <div className='items'>
          <Button variant='primary' value={hotel.id} onClick={handleDelete}>
            delete
          </Button>
          <Button variant='primary'>update</Button>
        </div>
      </Card.Body>
    </Card>
  ));

  const flightsList = flights.map((flight) => (
    <Card key={flight._id}>
      <Card.Header>Flights</Card.Header>
      <Card.Body>
        <Card.Title>
          {flight.origin}----{flight.destination}
        </Card.Title>
        <Card.Text>Price: ${flight.price}</Card.Text>
        <div className='items'>
          <Button value={flight.id} variant='primary' onClick={handleDelete}>
            delete
          </Button>
          <Button variant='primary'>update</Button>
        </div>
      </Card.Body>
    </Card>
  ));

  console.log(type);
  return (
    <div className='App'>
      <ul>
        <li className='main' onClick={clickHome}>
          Journey Ease
        </li>
      </ul>
      <div>
        {type === 'cars'
          ? carsList
          : type === 'hotels'
          ? hotelsList
          : flightsList}
      </div>
    </div>
  );
}

export default AdminListingComponent;
