import {React,useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useMyContext } from './authProvider';
import axios from 'axios';

function Dashboard () {
  const { token, user, handleLogout } = useMyContext();
  const navigate = useNavigate ();
  const [cars, setCars] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [flights, setFlights] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:4000/api/cars")
      .then((res) => setCars(res.data))
      .catch((error) => console.error('Error fetching cars:', error));

    // Uncomment if you want to fetch hotels and flights data as well
    // axios.get("http://localhost:4000/api/hotels")
    //   .then((res) => setHotels(res.data))
    //   .catch((error) => console.error('Error fetching hotels:', error));
    //
    // axios.get("http://localhost:4000/api/flights")
    //   .then((res) => setFlights(res.data))
    //   .catch((error) => console.error('Error fetching flights:', error));
  }, []);

  const clickHome = () => {
    navigate ('/home');
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

  return (
    <div>
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
        <div>
        {cars.map((car) => (
          <Card key={car._id}>
            <Card.Header>Cars</Card.Header>
            <Card.Body>
              <Card.Title>{car.make} {car.model}</Card.Title>
              <Card.Text>Price: ${car.price}</Card.Text>
              <Button variant="primary">book now</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Dashboard;
