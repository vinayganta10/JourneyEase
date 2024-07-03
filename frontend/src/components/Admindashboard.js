import '../styles/HomeComponent.css';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminComponent () {
  const [type, setType] = useState('car');
  const navigate = useNavigate ();
  const [details, setDetails] = useState({});
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  function clickHome () {
    navigate ('/home');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/api/admin/${type}s`, details);
      setDetails({});
      if (response.status === 200) {
        toast.success('Booked successfully!');
      } else {
        toast.error('Failed to book.');
      }
    } catch (error) {
      console.error('There was an error adding the item:', error);
      alert('Failed to add the item.');
    }
  };
  return (
    <div className='App'>
      <ul>
        <li className="main" onClick={clickHome}>Journey Ease</li>
      </ul>
      <h1>Hello,Admin</h1>
      <Container>
      <Row>
        <Col>
          <h1>Add a new {type}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="car">Car</option>
                <option value="hotel">Hotel</option>
                <option value="flight">Flight</option>
              </Form.Control>
            </Form.Group>

            {type === 'car' && (
              <>
                <Form.Group controlId="formCarId">
                  <Form.Label>CarId</Form.Label>
                  <Form.Control type="text" name="carId" onChange={handleChange} className="form-control-sm" />
                </Form.Group>
                <Form.Group controlId="formMake">
                  <Form.Label>Make</Form.Label>
                  <Form.Control type="text" name="make" onChange={handleChange} className="form-control-sm"/>
                </Form.Group>
                <Form.Group controlId="formModel">
                  <Form.Label>Model</Form.Label>
                  <Form.Control type="text" name="model" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" name="price" onChange={handleChange} />
                </Form.Group>
              </>
            )}

            {type === 'hotel' && (
              <>
                <Form.Group controlId="formHotelId">
                  <Form.Label>HotelId</Form.Label>
                  <Form.Control type="text" name="hotelId" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" name="location" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" name="price" onChange={handleChange} />
                </Form.Group>
              </>
            )}

            {type === 'flight' && (
              <>
                <Form.Group controlId="formFlightId">
                  <Form.Label>Airline</Form.Label>
                  <Form.Control type="text" name="flightId" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formOrigin">
                  <Form.Label>Origin</Form.Label>
                  <Form.Control type="text" name="origin" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formDestination">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control type="text" name="destination" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formDepartureTime">
                  <Form.Label>Departure Time</Form.Label>
                  <Form.Control type="text" name="departureTime" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formArrivalTime">
                  <Form.Label>Arrival Time</Form.Label>
                  <Form.Control type="text" name="arrivalTime" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" name="price" onChange={handleChange} />
                </Form.Group>
              </>
            )}

            <Button variant="primary" type="submit">
              Add {type}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    <ToastContainer/>
    </div>
  );
}

export default AdminComponent;
