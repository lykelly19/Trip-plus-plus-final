import React, { Component } from "react";
import { createPortal } from "react-dom";
import "./ItineraryModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import TableDatePicker from "./TableDatePicker";
import Autocomplete from "react-google-autocomplete";

const modalStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  paddingTop: "60px",
  backgroundColor: "rgba(0,0,0,.2)",
};

export default class Modal extends Component {
  submitModalForm = (event) => {
    // add validation

    event.preventDefault();

    const formItems = {};
    const formItemsKeys = ["eventName", "date", "time", "location", "notes"];

    // add the five items into formItems
    for (let i = 0; i < 5; i++)
      formItems[formItemsKeys[i]] = event.target[i].value;

    formItems["itemNumber"] = this.props.numItems;

    this.props.incrementNumItems();

    this.props.myItems.push(formItems);
    this.props.onSubmitItineraryItem();
  };

  render() {
    return createPortal(
      <div style={modalStyle}>
        <div className="card itinerary-modal">
          <Button id="close-button" onClick={this.props.closeModal}>
            X
          </Button>
          <form onSubmit={this.submitModalForm}>
            <div className="modal-section" id="first-modal-section">
              <p className="modal-heading">Event Name</p>
              <input
                className="form-control"
                defaultValue={this.props.itemPrefill["eventName"]}
              ></input>
            </div>
            <div className="modal-section">
              <p className="modal-heading">Date</p>
              <TableDatePicker
                className="datePicker form-control"
                selected={this.props.itemPrefill["date"]}
              />
            </div>
            <div className="modal-section">
              <p className="modal-heading">Time</p>
              <input
                className="form-control"
                defaultValue={this.props.itemPrefill["time"]}
              ></input>
              {/* <TableTimePicker/> */}
            </div>
            <div className="modal-section">
              <p className="modal-heading">Location</p>

              <Autocomplete
                className="form-control"
                defaultValue={this.props.itemPrefill["location"]}
                apiKey={""}
                onPlaceSelected={(place) => {
                  console.log(place);
                }}
                options={{
                  types: ["geocode", "establishment"]
                }}      
                placeholder=""
              />
              {/* <input
                className="form-control"
                defaultValue={this.props.itemPrefill["location"]}
              ></input> */}
            </div>
            <div className="modal-section">
              <p className="modal-heading">Notes</p>
              <textarea
                className="form-control"
                defaultValue={this.props.itemPrefill["notes"]}
              ></textarea>
            </div>
            <div className="modal-section">
              <button
                className="btn"
                id="delete-button"
                onClick={(e) =>
                  this.props.handleDel(this.props.itemPrefill["itemNumber"])
                }
              >
                Delete
              </button>
              <button className="btn" id="save-button" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.getElementById("modal_root")
    );
  }
}
