import './App.css';
import logo from './trip-plus-plus.svg'

import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";

import Home from './Features/Home';
import Budgeting from './Features/Budgeting';
import Itinerary from './Features/Itinerary';
import Packing from './Features/Packing';

function App() {
  return (
    <div id="pageWrapper">
      <Router>
        <div className="header">
          <img src={logo} className="appLogo" alt="logo" />
          <button id="authButton">Log out</button>
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
          </Routes>
        </div>

        <div className="footer">
          <p>Copyright text</p>
        </div>
      </Router>
    </div>
  );
}

export default App;