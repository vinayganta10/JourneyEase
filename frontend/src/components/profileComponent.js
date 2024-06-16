import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useMyContext} from './authProvider';
import '../styles/HomeComponent.css'

function ProfileComponent () {
  const navigate = useNavigate();
  let {token, user} = useMyContext ();
  function clickHome(){
    navigate('/home');
  }
  return (
    <div class="prof">
      <ul>
        <li className="main" onClick={clickHome}>Journey Ease</li>
      </ul>
      <h1>Welcome {user}</h1>
    </div>
  );
}

export default ProfileComponent;
