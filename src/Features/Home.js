import React, { useEffect, useState, useCallback } from "react";
import "./widget.css";
import "./Home.css";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { getUserID } from "./DB/readingfb";
import BudgetingPreviewChart from "./Budget Preview Chart.png";
import { isEmpty } from "@firebase/util";
import ItineraryWidget from "./ItineraryWidget";
import PackingWidget from "./PackingWidget";
import WeatherWidget from "./Widget/Weather/weatherWidget";

const Home = () => {
  const [allPrice, setAllPrice] = useState(0);
  const [countList, setCountList] = useState([]);

  useEffect(async () => {
    setTimeout(async () => {
      const firebaseDoc = doc(db, "users", getUserID());
      const budgetList = await getDoc(firebaseDoc);
      // set for allPrice
      if (budgetList.exists()) {
        setCountList(budgetList.data().budgetList);
      }
    }, 1000);
    // return clearTimeout(timer)
  }, []);

  useEffect(async () => {
    const allPrice = countList.reduce((a, b) => {
      return a + b.price;
    }, 0);
    setAllPrice(allPrice);
  }, [countList]);
  return (
    <div className="container">
      <div className="row">
        <div className="greeting col-md-5">
          <h1 className="display-4">Welcome to Trip++</h1>
          <p className="lead">make your trip positive</p>
        </div>
        <div class="col-md-7">
          {/*weatherDiv*/}
          <WeatherWidget />
        </div>
      </div>
      <div className="container widgets">
        <div className="row mb-3 text-center">
          <div className="col-md-4 d-flex">
            <div className="card mb-4 box-shadow mx-2 flex-fill">
              {/*
              <div className="card-header widget-header">
                <p className="card-title" id="upcomingText">
                  Upcoming in your itinerary
                </p>
              </div>
              */}
              <img
                src={require("../map.jpg")}
                className="card-img-top"
                alt="..."
              ></img>
              <div className="card-body">
                <h5 class="card-title">Upcoming in your itinerary</h5>
                <ItineraryWidget className="card-text" />
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
            <div className="card mb-4 box-shadow mx-2 flex-fill">
              {/*
              <div className="card-header widget-header">
                <p className="card-title">Your budget</p>
              </div>
  */}
              <img
                src={require("../money.jpg")}
                className="card-img-top"
                alt="..."
              ></img>
              <div className="card-body all-price">
                <h5 class="card-title">Your budget</h5>
                <p className="card-text" id="numItems">
                  ${allPrice}
                </p>
                {/* <img
                  src={BudgetingPreviewChart}
                  alt="preview budgeting donut chart"
                ></img> */}
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
            <div className="card mb-4 box-shadow mx-2 flex-fill">
              {/*
              <div className="card-header widget-header">
                <p className="card-title">Items left to pack</p>
              </div>
              */}
              <img
                src={require("../packing.jpg")}
                className="card-img-top"
                alt="..."
              ></img>
              <div className="card-body">
                <h5 class="card-title">Items left to pack</h5>
                <p className="card-text" id="numItems">
                  <PackingWidget />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// raw script
//!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
