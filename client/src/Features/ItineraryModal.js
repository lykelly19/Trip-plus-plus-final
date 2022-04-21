import React, { Component } from "react";
import { createPortal } from "react-dom";
import "./ItineraryModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import TableDatePicker from "./TableDatePicker";

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
        <div className="itinerary-modal">
          <div>
            <button
              className="btn"
              id="close-button"
              onClick={this.props.closeModal}
            >
              X
            </button>
          </div>
          <form className="it-form" onSubmit={this.submitModalForm}>
            <div className="form-group modal-section" id="first-modal-section">
              <label for="event" className="modal-heading">
                Event Name
              </label>
              <input
                className="form-control"
                id="event"
                defaultValue={this.props.itemPrefill["eventName"]}
              ></input>
            </div>
            <div className="form-group modal-section">
              <label for="date" className="modal-heading">
                Date
              </label>
              <TableDatePicker
                id="date"
                className="datePicker form-control"
                selected={this.props.itemPrefill["date"]}
              />
            </div>
            <div className="form-group modal-section">
              <label for="time" className="modal-heading">
                Time
              </label>
              <input
                id="time"
                className="form-control"
                defaultValue={this.props.itemPrefill["time"]}
              ></input>
              {/* <TableTimePicker/> */}
            </div>
            <div className="form-group modal-section">
              <label for="location" className="modal-heading">
                Location
              </label>
              <input
                id="location"
                className="form-control"
                defaultValue={this.props.itemPrefill["location"]}
              ></input>
            </div>
            <div className="form-group modal-section">
              <label for="notes" className="modal-heading">
                Notes
              </label>
              <textarea
                id="notes"
                className="form-control"
                defaultValue={this.props.itemPrefill["notes"]}
              ></textarea>
            </div>
            <div className="d-flex justify-content-end py-3 modal-section">
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
