import './Itinerary.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Itinerary = () => {
    return(
        <div>
            <div class="container itinerary-container py-4 px-5 mt-4">
                    <table id="" class="table table-striped table-borderless">
                        <thead>
                            <tr class="d-flex">
                                <th class="col-1">#</th>
                                <th class="col-1">Date</th>
                                <th class="col-1">Time</th>
                                <th class="col-2">Event Name</th>
                                <th class="col-2">Location</th>
                                <th class="col-5">Notes</th>
                            </tr>
                        </thead>
                        <tbody class="itinerary-items-container">
                            <tr class="d-flex">
                                <th class="col-1">#</th>
                                <th class="col-1">Date</th>
                                <th class="col-1">Time</th>
                                <th class="col-2">Event Name</th>
                                <th class="col-2">Location</th>
                                <th class="col-5">Notes</th>
                            </tr>
                            <tr class="d-flex">
                                <th class="col-1">#</th>
                                <th class="col-1">Date</th>
                                <th class="col-1">Time</th>
                                <th class="col-2">Event Name</th>
                                <th class="col-2">Location</th>
                                <th class="col-5">Notes</th>
                            </tr>
                            <tr class="d-flex">
                                <th class="col-1">#</th>
                                <th class="col-1">Date</th>
                                <th class="col-1">Time</th>
                                <th class="col-2">Event Name</th>
                                <th class="col-2">Location</th>
                                <th class="col-5">Notes</th>
                            </tr>
                            <tr class="d-flex">
                                <th class="col-1">#</th>
                                <th class="col-1">Date</th>
                                <th class="col-1">Time</th>
                                <th class="col-2">Event Name</th>
                                <th class="col-2">Location</th>
                                <th class="col-5">Notes</th>
                            </tr>
                        </tbody>
                    </table>
            </div>

            <Button id="add-button">Add new itinerary item</Button>  

            <div class="container">
                <h2 class="text-center">Map</h2>
            </div>
            
        </div>
    )
}

export default Itinerary;