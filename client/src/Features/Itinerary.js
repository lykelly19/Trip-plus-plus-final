import "./Itinerary.css";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ItineraryModal from "./ItineraryModal";
import "bootstrap/dist/css/bootstrap.min.css";
import editIcon from "./edit-event-icon.png";

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
      return DateA - DateB;
    });

    // reset itinerary numbers
    this.state.items.map((item, i) => (item.itemNumber = i + 1));

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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12111.098223862644!2d22.91428943685055!3d40.63485351944406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a8390b30348339%3A0xcc9bc9976b0cada1!2sPort%20of%20Thessaloniki!5e0!3m2!1sen!2sus!4v1648344303067!5m2!1sen!2sus"
            id="itinerary-map"
            className="mx-auto"
            title="itineraryMap"
          ></iframe>
        </div>
      </div>
    );
  }
}

export const ItineraryTable = ({ items, handleEdit }) => (
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
        <tr className="d-flex" key={i}>
          {/*my-auto*/}
          <th className="col-1 align-middle my-auto">{item.itemNumber}</th>
          <td className="col-1 align-middle">{item.date}</td>
          <td className="col-1 align-middle">{item.time}</td>
          <td className="col-2">{item.eventName}</td>
          <td className="col-2">{item.location}</td>
          <td className="col-4">{item.notes}</td>
          <td className="it-del-div col-1">
            <span className="itinerary-delete-btn">X</span>
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
