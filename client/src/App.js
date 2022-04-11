import "./App.css";
import logo from "./tpp.png";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Home from "./Features/Home";
import Itinerary from "./Features/Itinerary";
import Packing from "./Features/Packing";
import Budgeting from "./Features/Budgeting";
// import CountView from './Features/CountView';

function App() {
  return (
    <div className="container" id="pageWrapper">
      <Router>
        <header className="header">
          <div className="row d-flex flex-row flex-nowrap justify-content-between align-items-center">
            <div className="col-4">
              <img src={logo} className="appLogo" alt="logo" />
            </div>
            <div className="col-4 d-flex justify-content-end">
              <button id="authButton">Log out</button>
            </div>
          </div>
        </header>

        <nav className="navBar">
          <ul className="flex-container">
            <li>
              <NavLink className="navLink p-2 box-shadow" to="/">
                {" "}
                HOME{" "}
              </NavLink>
            </li>
            <li>
              <NavLink className="navLink p-2 box-shadow" to="/budgeting">
                {" "}
                BUDGETING{" "}
              </NavLink>
            </li>
            <li>
              <NavLink className="navLink p-2 box-shadow" to="/itinerary">
                {" "}
                ITINERARY{" "}
              </NavLink>
            </li>
            <li>
              <NavLink className="navLink p-2 box-shadow" to="/packing">
                {" "}
                PACKING{" "}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="featureComponents">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/budgeting" element={<Budgeting />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/packing" element={<Packing />} />
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
