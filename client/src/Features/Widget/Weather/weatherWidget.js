import React, { useState, useEffect } from "react";
import axios from "axios";

import { readFirstLocation } from "../../DB/readingfb";

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alert&units=imperial&appid=251f287140b1a65e4f5316aa6573bf9f`;

  const updateWeatherData = () => {
    axios.get(url).then((response) => {
      setWeatherData(response.data);
      console.log("API Requested");
    });
  };

  const generateDate = (period) => {
    let current = new Date();
    current.setDate(current.getDate() + period);
    /*
    return `${
      current.getMonth() + 1
    }/${current.getDate()}/${current.getFullYear()}`;
*/
    let dayOfWeek = current.getDay();
    return isNaN(dayOfWeek)
      ? null
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOfWeek];
  };

  const generateWeatherComponent = (period) => {
    if (Object.keys(weatherData).length === 0) {
      return <div></div>;
    } else {
      return (
        <div
          className={`card-body ${weatherData.daily[period].weather[0].main}`}
        >
          {weatherData.daily[period] ? (
            <div className="temp">
              {Math.round(weatherData.daily[period].temp.day)} °F
            </div>
          ) : null}
          {weatherData.daily[period] ? (
            <div className="weather">
              {weatherData.daily[period].weather[0].main}
            </div>
          ) : null}
        </div>
      );
    }
  };

  useEffect(() => {
    readFirstLocation()
      .then((data) => {
        setLatitude(data.lat);
        setLongitude(data.lng);
        setLocation(data.location);
        updateWeatherData();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    updateWeatherData();
  }, [longitude]);

  const generateWeeklyWeather = () => {
    const weeklyWeatherDays = [0, 1, 2, 3, 4, 5, 6];
    const weeklyWeather = weeklyWeatherDays.map((days) => (
      <div className="card weatherComponent">
        <div className="weatherDay card-header">{generateDate(days)}</div>
        {/*<div className="card-body">*/}
        {generateWeatherComponent(days)}
        {/*</div>*/}
      </div>
    ));
    return weeklyWeather;
  };

  return (
    <div className="weatherDiv">
      <div className="row weatherHeader">
        <h4>{location}</h4>
        <p>weather for this week</p>
      </div>
      <div className="d-flex flex-column d-sm-flex flex-sm-row justify-content-between weatherContent">
        {generateWeeklyWeather()}
      </div>
    </div>
  );
}
