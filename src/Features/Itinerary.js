import './Itinerary.css';
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import ItineraryModal from './ItineraryModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import editIcon from './edit-event-icon.png';

const Itinerary = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
 
    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    return(
        <div className="container">
            { modalIsOpen && <ItineraryModal modalIsOpen={modalIsOpen} closeModal={closeModal}></ItineraryModal> }
            <div className="itinerary-container py-4 px-5 mt-4">
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
                            <th className="col-4">Bring Camera</th>
                            <th className="col-1">
                                <img src={editIcon} className="edit-icon" alt="edit itineary item icon"></img>
                            </th>
                        </tr>
                        <tr className="d-flex">
                            <th className="col-1">2</th>
                            <th className="col-1">Date</th>
                            <th className="col-1">Time</th>
                            <th className="col-2">Event Name</th>
                            <th className="col-2">Location</th>
                            <th className="col-4">Notes</th>
                            <th className="col-1">
                                <img src={editIcon} className="edit-icon" alt="edit itineary item icon"></img>
                            </th>
                        </tr>
                        <tr className="d-flex">
                            <th className="col-1">3</th>
                            <th className="col-1">Date</th>
                            <th className="col-1">Time</th>
                            <th className="col-2">Event Name</th>
                            <th className="col-2">Location</th>
                            <th className="col-4">Notes</th>
                            <th className="col-1">
                                <img src={editIcon} className="edit-icon" alt="edit itineary item icon"></img>
                            </th>
                        </tr>
                        <tr className="d-flex">
                            <th className="col-1">4</th>
                            <th className="col-1">Date</th>
                            <th className="col-1">Time</th>
                            <th className="col-2">Event Name</th>
                            <th className="col-2">Location</th>
                            <th className="col-4">Notes</th>
                            <th className="col-1">
                                <img src={editIcon} className="edit-icon" alt="edit itineary item icon"></img>
                            </th>
                        </tr>
                        <tr className="d-flex">
                            <th className="col-1">5</th>
                            <th className="col-1">Date</th>
                            <th className="col-1">Time</th>
                            <th className="col-2">Event Name</th>
                            <th className="col-2">Location</th>
                            <th className="col-4">Notes</th>
                            <th className="col-1">
                                <img src={editIcon} className="edit-icon" alt="edit itineary item icon"></img>
                            </th>
                        </tr>
                        <tr className="d-flex">
                            <th className="col-1">6</th>
                            <th className="col-1">Date</th>
                            <th className="col-1">Time</th>
                            <th className="col-2">Event Name</th>
                            <th className="col-2">Location</th>
                            <th className="col-4">Notes</th>
                            <th className="col-1">
                                <img src={editIcon} className="edit-icon" alt="edit itineary item icon"></img>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>


            <Button className="mt-4 py-2 px-3" id="add-button" onClick={openModal}>Add new itinerary item</Button>  
            

            <div id="map-section">
                <h2 className="text-center pb-3">Map</h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12111.098223862644!2d22.91428943685055!3d40.63485351944406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a8390b30348339%3A0xcc9bc9976b0cada1!2sPort%20of%20Thessaloniki!5e0!3m2!1sen!2sus!4v1648344303067!5m2!1sen!2sus" id="itinerary-map" className="mx-auto" title="itineraryMap"></iframe>
            </div>
        </div>
    )
}

export default Itinerary;