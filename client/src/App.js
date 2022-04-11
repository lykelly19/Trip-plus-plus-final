import './App.css';
import logo from './trip-plus-plus.svg'
import React from "react";
import {BrowserRouter as Router, Routes, Route, NavLink, useNavigate} from "react-router-dom";

import Home from './Features/Home';
import Itinerary from './Features/Itinerary';
import Packing from './Features/Packing';
import Budgeting from './Features/Budgeting';
import Login from './Features/Auth/Login';
import AuthButton from './Features/Auth/AuthButton';
import Register from './Features/Auth/Register';
// import CountView from './Features/CountView';

function App() {
  return (
    <div id="pageWrapper">
      <Router>
        <div className="header">
          <img src={logo} className="appLogo" alt="logo" />
          <AuthButton/>
        </div>

        <nav className="navBar">
          <NavLink className="navLink" to="/"> HOME </NavLink>
          <NavLink className="navLink" to="/budgeting"> BUDGETING </NavLink>
          <NavLink className="navLink" to="/itinerary"> ITINERARY </NavLink>
          <NavLink className="navLink" to="/packing"> PACKING </NavLink>
        </nav>

        <div className="featureComponents">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/budgeting" element ={<Budgeting/>}/>
            <Route path="/itinerary" element ={<Itinerary/>}/>
            <Route path="/packing" element ={<Packing/>}/>
            <Route path="/login" element ={<Login/>}/>
            <Route path="/register" element = {<Register/>}/>
          </Routes>
        </div>

        <div className="footer">
          <p>Copyright &#169; 2022 Trip++</p>
        </div>
      </Router>
    </div>
  );
}

export default App;