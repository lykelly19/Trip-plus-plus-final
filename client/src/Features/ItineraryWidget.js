import React, {useState, useEffect} from 'react'
import {readFirstLocation} from './DB/readingfb.js'



function ItineraryWidget() {

    const [name, setName] = useState('set a name for your event');
<<<<<<< HEAD
    const [loc, setLoc] = useState('select a location');
=======
    const [loc, setLoc] = useState('set a loc');
>>>>>>> 49cdc9b (added it widget)
    const [time, setTime] = useState('set a time');
    const [date, setDate] = useState('set a date');
   
    useEffect(() => {
        readFirstLocation().then((data) => {
<<<<<<< HEAD

            if(data.eventName != '')
            setName(data.eventName);

            if(data.location != '')
            setLoc(data.location);

            if(data.time != "")
            setTime(data.time);

            if(data.date != '')
=======
            console.log(data);
            setName(data.eventName);
            setLoc(data.location);
            setTime(data.setTime);
>>>>>>> 49cdc9b (added it widget)
            setDate(data.date);
        }).catch((error) => {
            console.log( error + "error in It");
        });
    });
    
  return (
    <span>
        <p> {date} @ {time}</p>
        <p>{name}</p>
        <p>{loc}</p>    
    </span>
  )
}

export default ItineraryWidget