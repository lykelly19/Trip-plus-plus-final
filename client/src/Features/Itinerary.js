import "./Itinerary.css";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ItineraryModal from "./ItineraryModal";
import "bootstrap/dist/css/bootstrap.min.css";
import editIcon from "./edit-event-icon.png";
import MapContainer from "./Map";

export default class Itinerary extends Component {
  state = {
    show: false,
    items: [],
    numItems: 1,
    prefill: {
      itemNumber: "",
      date: "",
      eventName: "",
      location: "",
    },
    prefillItem: null,
    locationCoordinates: [],
    defaultCoordinates: { lat: 41.3851, lng: 2.1734 }
  };

  showModal = (e) => {
    this.setState({
      show: true,
    });
  };

  closeModal = () => {
    this.setState({
      show: false,
      prefill: {
        itemNumber: "",
        date: "",
        eventName: "",
        location: "",
      },
    });
  };

  incrementNumItems = () => {
    this.setState({
      numItems: this.state.numItems + 1,
    });
  };

  onSubmitItineraryItem = () => {
    // if this is editing an item, change item to have values equal to the newly added item
    if (this.state.prefill["itemNumber"]) {
      // from the list, remove the item with the same itemNumber
      this.state.items = this.state.items.filter(
        (i) => i.itemNumber !== this.state.prefill.itemNumber
      );
    }

    // sort by date
    this.state.items.sort(function (a, b) {
      let DateA = new Date(a.date);
      let DateB = new Date(b.date);

      // create Date object with
      if(a.time) {
        DateA.setHours(a.time.substr(0 ,a.time.indexOf(":")));
        DateA.setMinutes(a.time.substr(a.time.indexOf(":")+1));
      }

      if(b.time) {
        DateB.setHours(b.time.substr(0 ,b.time.indexOf(":")));
        DateB.setMinutes(b.time.substr(b.time.indexOf(":")+1));
      }

      return DateA - DateB;
    });

    // reset itinerary numbers
    this.state.items.map((item, i) => (item.itemNumber = i + 1));

    // create location coordinates array
    const arr = this.state.items.map(element => (
      { 
        name: element.itemNumber,
        location: {
          lat: element.lat, 
          lng: element.lng 
        }
      }
    ));

    // get only the valid coordinates
    let validCoordinates = arr.filter(e => e.location.lat !== null);
    this.state.locationCoordinates = validCoordinates;

    // set the default location to be the first element with a valid location
    if(validCoordinates.length > 0)
      this.state.defaultCoordinates = validCoordinates[Object.keys(validCoordinates)[0]]["location"];

    // close modal
    this.closeModal();
  };

  handleEdit = (item) => {
    // set prefill data
    this.setState({
      show: true,
      prefill: item,
    });
  };

  handleDelX = (item) => {

    this.setState({
      show: false
    });

    // from the list, remove the item with the same itemNumber
    this.state.items = this.state.items.filter(
      (i) => i.itemNumber !== item.itemNumber
    );

    // sort by date
    this.state.items.sort(function (a, b) {
      let DateA = new Date(a.date);
      let DateB = new Date(b.date);

      // create Date object with
      if(a.time) {
        DateA.setHours(a.time.substr(0 ,a.time.indexOf(":")));
        DateA.setMinutes(a.time.substr(a.time.indexOf(":")+1));
      }

      if(b.time) {
        DateB.setHours(b.time.substr(0 ,b.time.indexOf(":")));
        DateB.setMinutes(b.time.substr(b.time.indexOf(":")+1));
      }

      return DateA - DateB;
    });

    // reset itinerary numbers
    this.state.items.map((item, i) => (item.itemNumber = i + 1));

    // delete coordinates from map
    this.state.locationCoordinates = this.state.locationCoordinates.filter(element => element.location.lat != item.lat && element.location.lng != item.lng);

    // get only the valid coordinates
    let validCoordinates = this.state.locationCoordinates.filter(e => e.location.lat !== null);

    // set the default location to be the first element with a valid location
    if(validCoordinates.length > 0)
     this.state.defaultCoordinates = validCoordinates[Object.keys(validCoordinates)[0]]["location"];

  };

  handleDel = (itemNumber) => {
    
    // only delete item if the item has previously been saved
    if (itemNumber !== "") {
      // from the list, remove the item with the same itemNumber
      this.state.items = this.state.items.filter(
        (i) => i.itemNumber !== this.state.prefill.itemNumber
      );
    }

    // sort by date
    this.state.items.sort(function (a, b) {
      let DateA = new Date(a.date);
      let DateB = new Date(b.date);
      return DateA - DateB;
    });

    // reset itinerary numbers
    this.state.items.map((item, i) => (item.itemNumber = i + 1));

    // close modal
    this.closeModal();
  };

  render() {
    return (
      <div className="container">
        {this.state.show && (
          <ItineraryModal
            closeModal={this.closeModal}
            onSubmitItineraryItem={this.onSubmitItineraryItem}
            myItems={this.state.items}
            incrementNumItems={this.incrementNumItems}
            numItems={this.state.numItems}
            handleDel={this.handleDel}
            itemPrefill={this.state.prefill}
          ></ItineraryModal>
        )}
        <div className="itinerary-container table-responsive-sm card px-5">
          {" "}
          {/*py-4 px-5 mt-4*/}
          <ItineraryTable
            items={this.state.items}
            handleEdit={this.handleEdit}
            handleDelX={this.handleDelX}
          ></ItineraryTable>
        </div>
        {/*
        <Button
          className="mt-4 py-2 px-3"
          id="add-button"
          onClick={(e) => {
            this.showModal();
          }}
        >
          Add new itinerary item
        </Button>
        */}

        <button
          className="mt-4 py-2 px-3"
          id="add-button"
          onClick={(e) => {
            this.showModal();
          }}
        >
          Add itinerary item
        </button>
        <div id="map-section">
          <h2 className="text-center pb-3">Map</h2>
          <MapContainer myCoordinates={this.state.locationCoordinates} defaultCoordinates={this.state.defaultCoordinates} className="mx-auto"></MapContainer>
        </div>
      </div>
    );
  }
}

export const ItineraryTable = ({ items, handleEdit, handleDelX }) => (
  <table id="itinerary-table" className="table table-striped table-hover">
    {/*table-borderless*/}
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
      {items.map((item, i) => (
        <tr
          className="d-flex"
          key={i}
        >
          {/*my-auto*/}
          <th className="col-1 align-middle my-auto" 
            onClick={() => handleEdit(item)}
            data-bs-toggle="tooltip"
            title="edit this event">
            {item.itemNumber}
          </th>
          <td className="col-1 align-middle"
            onClick={() => handleEdit(item)}
            data-bs-toggle="tooltip"
            title="edit this event">
            {item.date}
          </td>
          <td className="col-1 align-middle"
            onClick={() => handleEdit(item)}
            data-bs-toggle="tooltip"
            title="edit this event">
            {item.time}
          </td>
          <td className="col-2"
            onClick={() => handleEdit(item)}
            data-bs-toggle="tooltip"
            title="edit this event">
            {item.eventName}
          </td>
          <td className="col-2"
            onClick={() => handleEdit(item)}
            data-bs-toggle="tooltip"
            title="edit this event">
            {item.location}</td>
          <td className="col-4"            
            onClick={() => handleEdit(item)}
            data-bs-toggle="tooltip"
            title="edit this event">
            {item.notes}
          </td>
          <td className="it-del-div col-1"
            onClick={() => handleDelX(item)}>
            <span
              data-bs-toggle="tooltip"
              title="delete"
              className="itinerary-delete-btn"
            >
              X
            </span>
            {/*}
            <button onClick={() => handleEdit(item)} className="editIconButton">
              <img
                src={editIcon}
                className="edit-icon"
                alt="edit itineary item icon"
      ></img>
      </button>*/}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
