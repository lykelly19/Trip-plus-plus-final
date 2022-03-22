import React, {useState} from 'react'
import PForm from './PForm'
import PList from './PList'


const Packing = () => {

    return(
        <div className='packing'>
            <p>Packing component</p>
            <div className='P-content'>
            <PList />
            <PForm />
            </div>
        </div>
    )
}

export default Packing