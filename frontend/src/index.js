import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import  {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/auth/LoginComponent';
import SignupComponent from './components/auth/SignupComponent';
import Dashboard from './components/Dashboard';
import ProfileComponent from './components/profileComponent.js';
import AdminComponent from './components/Admindashboard';
import MyBookings from './components/MyBookings.js';
import {MyProvider} from './components/authProvider.js'
import AdminListingComponent from './components/AdminListingComponent.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MyProvider>
    <Router>
      <Routes>
        <Route index element={<HomeComponent/>}/>
        <Route path='/Home' element={<HomeComponent/>}/>
        <Route path='/Login' element={<LoginComponent/>}/>
        <Route path='/signup' element={<SignupComponent/>}/>
        <Route path='profile/:user' element={<ProfileComponent/>}/>
        <Route path='/dashboard/:type' element={<Dashboard/>}/>
        <Route path='/admin' element={<AdminComponent/>}/>
        <Route path='/admin/:type' element={<AdminListingComponent/>}></Route>
        <Route path='/mybookings' element={<MyBookings/>}/>
        <Route path='*' element={<h1>404 Not Found</h1>}/>
      </Routes>
    </Router>
  </MyProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
