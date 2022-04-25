import React , {useState}from 'react'

import {readLeftToPack} from './DB/readingfb.js'


function PackingWidget() {

    const [input, setInput] = useState('');

    
    const read = () =>{
   
        readLeftToPack().then((data) => {
            console.log(data);
            setInput(data);
        }).catch((error) => {
            console.log("error")
        });

    }
    
    
  return (
    <span onLoad={read()}>{input}</span>
  )
}

export default PackingWidget