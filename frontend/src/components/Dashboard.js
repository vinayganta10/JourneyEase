import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useMyContext } from './authProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Dashboard.css';

function Dashboard() {
  const { type } = useParams();
  const { token, user, handleLogout } = useMyContext();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [flights, setFlights] = useState([]);
  const [search,setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/cars',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
      .then((res) => setCars(res.data))
      .catch((error) => toast.error('Please login'));
    axios
      .get('http://localhost:4000/api/hotels',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
      .then((res) => setHotels(res.data))
      .catch((error) => toast.error('Please login'));

    axios
      .get('http://localhost:4000/api/flights',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
      .then((res) => setFlights(res.data))
      .catch((error) => toast.error('Please login'));
  }, []);

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

  const clickBookings = () => {
    navigate('/mybookings');
  };

  const logOut = () => {
    handleLogout();
    navigate('/login');
    window.location.reload();
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(search);
    window.location.reload();
  };

  async function book(items) {
    let res = await axios.get(`http://localhost:4000/api/customers/${user}`);
    let email = res.data.email;
    console.log(res.data);
    let data = { userId: user, bookingId: Date.now(), items,email:email };
    try {
      let response = await axios.post(
        'http://localhost:4000/api/bookings/',
        data,
      );
      if (response.status === 200 && user!=null) {
        downloadTicket(data,data.items);
        toast.success('Booked successfully!');
      } else {
        toast.error('Please login');
      }
    } catch (error) {
      toast.error('Failed to book. Please try again.');
    }
  }

  const downloadTicket = (ticketData) => {
    const blob = new Blob([JSON.stringify(ticketData)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'ticket.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000000);

  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);


  const filteredCars = cars.filter(car => 
    (car.make.toLowerCase().includes(search.toLowerCase()) || search === "") &&
    car.price >= minPrice && car.price <= maxPrice
  );

  const filteredHotels = hotels.filter(hotel => 
    (hotel.name.toLowerCase().includes(search.toLowerCase()) || search === "") &&
    hotel.price >= minPrice && hotel.price <= maxPrice
  );

  const filteredFlights = flights.filter(flight => 
    flight.price >= minPrice && flight.price <= maxPrice
  );

  const carsList = filteredCars.map((car) => (
    <Card key={car._id}>
      <Card.Header>Cars</Card.Header>
      <Card.Body>
        <Card.Title>
          {car.make} {car.model}
        </Card.Title>
        <Card.Text>Price: ${car.price}</Card.Text>
        <Button
          variant='primary'
          onClick={() =>
            book({ id: car._id, type: 'car', name: car.make, model: car.model })
          }
        >
          book now
        </Button>
      </Card.Body>
    </Card>
  ));

  const hotelsList = filteredHotels.map((hotel) => (
    <Card key={hotel._id}>
      <Card.Header>Hotels</Card.Header>
      <Card.Body>
        <Card.Title>{hotel.name}</Card.Title>
        <Card.Text>{hotel.location}</Card.Text>
        <Card.Text>Price: ${hotel.price}</Card.Text>
        <Button
          variant='primary'
          onClick={() =>
            book({
              id: hotel._id,
              type: 'hotel',
              name: hotel.name,
              location: hotel.location,
              price: hotel.price,
            })
          }
        >
          book now
        </Button>
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
        <Button
          variant='primary'
          onClick={() =>
            book({
              id: flight._id,
              type: 'flight',
              origin: flight.origin,
              destination: flight.destination,
              arrivalTime: flight.arrivalTime,
              departureTime: flight.departureTime,
              price: flight.price,
            })
          }
        >
          book now
        </Button>
      </Card.Body>
    </Card>
  ));

  return (
    <div>
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
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search cars or hotels..." 
            value={search} 
            onChange={handleSearch} 
            id="search-input"
          />
        </div>
        <div className="price-filter">
          <h2>Price filter</h2>
          <label>Min(in dollars)</label>
          <input 
            type="number" 
            placeholder="Min price" 
            value={minPrice} 
            onChange={handleMinPriceChange} 
          />
          <label>Max(in dollars)</label>
          <input 
            type="number" 
            placeholder="Max price" 
            value={maxPrice} 
            onChange={handleMaxPriceChange} 
          />
        </div>
        <div>
          {type === 'cars'
            ? carsList
            : type === 'hotels'
            ? hotelsList
            : flightsList}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
