import React , {useState, useEffect}from 'react'
import axios from 'axios'

import {readFirstLocation} from '../../DB/readingfb'


export default function WeatherWidget() {
    const [weatherData, setWeatherData] = useState({});
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [location, setLocation] = useState('');

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alert&units=imperial&appid=9892f1d9ad6b9ba1ef521593e8a298d6`

    const updateWeatherData = () => {
        axios.get(url).then((response) => {
            setWeatherData(response.data);
        })
    }

    const generateDate = (period) => {
        let current = new Date();
        current.setDate(current.getDate() + period);
        return `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
    }

    const generateWeatherComponent = (period) => {
        if(Object.keys(weatherData).length === 0){
            return <div></div>
        } else {
            return(
                <div>
                    {weatherData.daily[period] ?                     
                    <div className="temp">
                        {weatherData.daily[period].temp.day}F°
                    </div> 
                    : null}
                    {weatherData.daily[period] ?                     
                    <div className="weather">
                        {weatherData.daily[period].weather[0].main}
                    </div> 
                    : null}
                </div>
            )
        }
    }

    useEffect(() => {
        readFirstLocation().then((data) => {
            setLatitude(data.lat);
            setLongitude(data.lng);
            setLocation(data.location);
            updateWeatherData();
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        updateWeatherData();
    }, [longitude])

    const generateWeeklyWeather = () => {
        const weeklyWeatherDays = [0, 1, 2, 3, 4 ,5, 6]
        const weeklyWeather = weeklyWeatherDays.map((days) => 
            <div className="weatherComponent">
                {generateDate(days)}
                {generateWeatherComponent(days)}
            </div>
        )
        return weeklyWeather;
    }


    return (
        <div>
            {location}
            {generateWeeklyWeather()}
        </div>
    )
}
