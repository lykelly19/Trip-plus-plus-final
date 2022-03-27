import React from 'react';
import './Modal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const Modal = ({children, modalIsOpen, closeModal}) => {
    return(
        <div className="page-background">
            <div className="itinerary-modal">
                <Button id="close-button" onClick={closeModal}>X</Button>
                <div className="modal-section" id="first-modal-section">
                    <p className="modal-heading">Event Name</p>
                    <input></input>
                </div>
                <div className="modal-section">
                    <p className="modal-heading">Date</p>
                    <input></input>
                </div>
                <div className="modal-section">
                    <p className="modal-heading">Time</p>
                    <input></input>
                </div>
                <div className="modal-section">
                    <p className="modal-heading">Location</p>
                    <input></input>
                </div>
                <div className="modal-section">
                    <p className="modal-heading">Notes</p>
                    <textarea></textarea>
                </div>
                <div className="modal-section">
                    <Button id="delete-button">Delete</Button>
                    <Button id="save-button">Save</Button>
                </div>
            </div>
        </div>
    )
}

export default Modal;;