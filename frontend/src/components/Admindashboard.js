import Form from 'react-bootstrap/Form';
import '../styles/HomeComponent.css';
import {useMyContext} from './authProvider';
import {useNavigate} from 'react-router-dom';

function AdminComponent () {
  const navigate = useNavigate ();
  function clickHome () {
    navigate ('/home');
  }
  const carForm = (
    <div>
        <Form.Control size="lg" type="number" placeholder="car id"/>
        <Form.Control size="lg" type="string" placeholder="car name"/>
        <Form.Control size="lg" type="number" placeholder="car model"/>
        <Form.Control size="lg" type="number" placeholder="car price"/>
    </div>
  );


  return (
    <div>
      <ul>
        <li className="main" onClick={clickHome}>Journey Ease</li>
      </ul>
      <h1>Hello,Admin</h1>
      <Form>
        <Form.Select aria-label="Default select example">
          <option>Select the type</option>
          <option value="1">Car</option>
          <option value="2">Hotel</option>
          <option value="3">Flight</option>
        </Form.Select>
        {carForm}
      </Form>
    </div>
  );
}

export default AdminComponent;
