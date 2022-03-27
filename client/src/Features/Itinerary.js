import './Itinerary.css';
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from './Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const Itinerary = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
 
    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    return(
        <div>
            { modalIsOpen && <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}></Modal> }

            <div className="container itinerary-container py-4 px-5 mt-4">
                <table id="itinerary-table" className="table table-striped table-borderless">
                    <thead>
                        <tr className="d-flex">
                            <th className="col-1">#</th>
                            <th className="col-1">Date</th>
                            <th className="col-1">Time</th>
                            <th className="col-2">Event Name</th>
                            <th className="col-2">Location</th>
                            <th className="col-5">Notes</th>
                        </tr>
                    </thead>
                    <tbody className="itinerary-items-container">
                        <tr className="d-flex">
                            <th className="col-1">1</th>
                            <th className="col-1">2/21/2022</th>
                            <th className="col-1">7:21 PM</th>
                            <th className="col-2">Visit Thessaliniki</th>
                            <th className="col-2">Port of Thessaliniki</th>
                            <th className="col-5">Bring Camera</th>
                        </tr>
                        <tr className="d-flex">
                            <th className="col-1">2</th>
                            <th className="col-1">Date</th>
                            <th className="col-1">Time</th>
                            <th className="col-2">Event Name</th>
                            <th className="col-2">Location</th>
                            <th className="col-5">Notes</th>
                        </tr>
                        <tr className="d-flex">
                            <th className="col-1">3</th>
                            <th className="col-1">Date</th>
                            <th className="col-1">Time</th>
                            <th className="col-2">Event Name</th>
                            <th className="col-2">Location</th>
                            <th className="col-5">Notes</th>
                        </tr>
                        <tr className="d-flex">
                            <th className="col-1">4</th>
                            <th className="col-1">Date</th>
                            <th className="col-1">Time</th>
                            <th className="col-2">Event Name</th>
                            <th className="col-2">Location</th>
                            <th className="col-5">Notes</th>
                        </tr>
                        <tr className="d-flex">
                            <th className="col-1">5</th>
                            <th className="col-1">Date</th>
                            <th className="col-1">Time</th>
                            <th className="col-2">Event Name</th>
                            <th className="col-2">Location</th>
                            <th className="col-5">Notes</th>
                        </tr>
                        <tr className="d-flex">
                            <th className="col-1">6</th>
                            <th className="col-1">Date</th>
                            <th className="col-1">Time</th>
                            <th className="col-2">Event Name</th>
                            <th className="col-2">Location</th>
                            <th className="col-5">Notes</th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Button id="add-button" onClick={openModal}>Add new itinerary item</Button>  
            <div className="container">
                <h2 className="text-center">Map</h2>
            </div>
            
        </div>
    )
}

export default Itinerary;