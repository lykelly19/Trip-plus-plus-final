import React, {useState} from 'react'



function PList() {

    const [topacks, setToPack] = useState([]);

    const addToPack = topack => {

        if(!topack.text || /^\s*$/.test(topack.text)){
            return;
        }

        const newToPack = [topack, ...topacks]; 

        setToPack(newToPack);  
        
        console.log(topack, ...topacks);
    };



  return (
    <div className='P-list'>PList

    </div>
  );                    
}

export default PList