import './App.css';
import logo from './trip-plus-plus.svg'

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import Home from './Features/Home';
import Budgeting from './Features/Budgeting';
import Itinerary from './Features/Itinerary';
import Packing from './Features/Packing';

function App() {
  return (
    <Router>
      <div className="header">
        <img src={logo} className="App-logo" alt="logo" />
        <button>Logout/in</button>
      </div>

      <nav className="navBar">
        <Link to="/"> Home </Link>
        <Link to="/budgeting"> Budgeting </Link>
        <Link to="/itinerary"> Itinerary </Link>
        <Link to="/packing"> Packing </Link>
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
        Footer copy right and stuff
      </div>
    </Router>
  );
}

export default App;

