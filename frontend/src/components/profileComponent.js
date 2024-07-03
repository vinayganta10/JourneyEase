import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useMyContext} from './authProvider';
import '../styles/HomeComponent.css';
import { Card, Button, Form, Modal } from 'react-bootstrap';

function ProfileComponent () {
  const navigate = useNavigate();
  let {token, user,handleLogout} = useMyContext ();
  function clickHome(){
    navigate('/home');
  }

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

  const clickBookings = ()=>{
    navigate('/mybookings');
  }

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userProfilePic, setUserProfilePic] = useState(user.profilePic);

  const handleEdit = () => setIsEditing(true);
  const handleClose = () => setIsEditing(false);

  const handleSave = () => {
    onSave({ name: userName, email: userEmail, profilePic: userProfilePic });
    handleClose();
  };

  return (
    <div class="prof">
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
              <li className="auth" onClick={clickBookings}>My bookings</li>
            </>
          )}
      </ul>
      <h1>Welcome {user}</h1>
      <div className="profile">
      <Card  style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={'https://tse1.mm.bing.net/th?id=OIP.CF3qxticF_-k2Af04uKBcQHaES&pid=Api&P=0&h=180'} alt="Profile Picture" />
        <Card.Body>
          <Card.Title>{user}</Card.Title>
          <Card.Text>nehaa@gmail.com</Card.Text>
          <Button variant="primary" onClick={handleEdit}>Edit</Button>
        </Card.Body>
      </Card>

      <Modal show={isEditing} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUserName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter name" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
              />
            </Form.Group>
            <Form.Group controlId="formUserEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={userEmail} 
                onChange={(e) => setUserEmail(e.target.value)} 
              />
            </Form.Group>
            <Form.Group controlId="formUserProfilePic">
              <Form.Label>Profile Picture URL</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter profile picture URL" 
                value={userProfilePic} 
                onChange={(e) => setUserProfilePic(e.target.value)} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
}

export default ProfileComponent;
