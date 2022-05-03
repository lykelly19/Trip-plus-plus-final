import React, { useEffect, useState, useCallback } from "react";
import "./widget.css";
import "./Home.css";
import { db } from "../firebase";
import {
  getDoc,
  doc
} from "firebase/firestore";
import { getUserID} from "./DB/readingfb";
import BudgetingPreviewChart from "./Budget Preview Chart.png";
import { isEmpty } from "@firebase/util";
import ItineraryWidget from "./ItineraryWidget";
import PackingWidget from "./PackingWidget";
import WeatherWidget from "./Widget/Weather/weatherWidget";
export function AddWeather() {
  const script = document.createElement("script");
  script.innerHTML =
    "!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');";
  script.async = false;
  document.body.appendChild(script);
}

const Home = () => {
 
  const [allPrice,setAllPrice] = useState(0);
  const [countList, setCountList] = useState([]);
  
  useEffect(async () => {
    setTimeout(async()=>{
      const firebaseDoc = doc(db,"users",getUserID());
      const budgetList = await getDoc(firebaseDoc);
      // set for allPrice
      if (budgetList.exists()) {
        setCountList(budgetList.data().budgetList)
      }
    },1000)
    // return clearTimeout(timer)
  },[])

  useEffect(async () => {
    const allPrice = countList.reduce((a,b)=>{return a + b.price},0);
    setAllPrice(allPrice)
  }, [countList]);
  return (
    <div className="container">
      <div className="row">
        <div className="greeting col-md-5">
          <h1 className="display-4">Welcome to Trip++</h1>
          <p className="lead">make your trip positive</p>
        </div>
        <div class="weatherDiv col-md-7">
          <WeatherWidget/>
          {/* <a
            className="weatherwidget-io mx-auto"
            href="https://forecast7.com/en/52d5213d40/berlin/"
            data-label_1="BERLIN"
            data-label_2="WEATHER"
            theme="dark"
          >
            BERLIN WEATHER
          </a>

          {
            !(function (d, s, id) {
              var js,
                fjs = d.getElementsByTagName(s)[0];
              js = d.createElement(s);
              js.id = id;
              js.src = "https:weatherwidget.io/js/widget.min.js";
              fjs.parentNode.insertBefore(js, fjs);
            })(document, "script", "weatherwidget-io-js")
          }

          {AddWeather()} */}
        </div>
      </div>
      <div className="container widgets">
        <div className="row mb-3 text-center">
          <div className="col-md-4 d-flex">
            <div className="card mb-4 box-shadow mx-2 flex-fill">
              <div className="card-header">
                <p className="card-title" id="upcomingText">
                  Upcoming in your itinerary
                </p>
              </div>
              <div className="card-body">
                <ItineraryWidget className="card-text"/> 
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
            <div className="card mb-4 box-shadow mx-2 flex-fill">
              <div className="card-header">
                <p className="card-title">Your budget</p>
              </div>
              <div className="card-body all-price">
                ${allPrice}
                {/* <img
                  src={BudgetingPreviewChart}
                  alt="preview budgeting donut chart"
                ></img> */}
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
            <div className="card mb-4 box-shadow mx-2 flex-fill">
              <div className="card-header">
                <p className="card-title">Items left to pack</p>
              </div>
              <div className="card-body">
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
