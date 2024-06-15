import React from 'react';
import {useMyContext} from './authProvider';
import '../styles/HomeComponent.css'

function ProfileComponent () {
  let {token, user} = useMyContext ();
  return (
    <div>
      <ul>
        <li className="main">Journey Ease</li>
        
      </ul>
      <h1>Welcome {user}</h1>
    </div>
  );
}

export default ProfileComponent;
