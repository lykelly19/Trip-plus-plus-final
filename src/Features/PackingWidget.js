import React , {useState, useEffect}from 'react'

import {readLeftToPack} from './DB/readingfb.js'


function PackingWidget() {

    const [input, setInput] = useState('0');

  
    useEffect(() => {
        readLeftToPack().then((data) => {
          console.log(data);
          setInput(data);
      }).catch((error) => {
          console.log("error")
      });

  });
  
    
  return (
    <span>{input}</span>
  )
}

export default PackingWidget