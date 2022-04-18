import React, { Component } from "react";
import "./packing.css";

export default class Packing extends Component {
  state = {
    items: [],
    itemText: "",
    isChecked: false,
  };

  onChangeInput = (e) => {
    this.setState({ itemText: e.target.value });
  };

  onSubmitItem = () => {
    if (this.state.itemText) {
      //prevent empty item from being added
      this.setState(({ items, itemText }) => ({
        items: [
          ...items,
          { id: items.length + 1, name: itemText, done: false },
        ],
        itemText: "",
      }));
    }
  };

  onChangeBox = (item) => {
    this.setState(({ items }) => ({
      items: items.map((el) =>
        el.id === item.id ? { ...el, done: !el.done } : el
      ),
    }));
  };

  handleDel = (item) => {
    this.setState(({ items }) => ({
      items: items.filter((el) => el.id !== item.id),
    }));
  };
  deleteAll = () => {
    this.setState(({ items }) => ({
      items: [],
    }));
  };

  render() {
    const { items, itemText } = this.state;

    return (
      <div className="container">
        <div className="card">
          <div className="row g-0">
            <div className="col-lg-8">
              <div className="card-body p-md-5 mx-md-4">
                {/*
                <div className="text-center reg-intro">
                  <h2>Your packing list</h2>
    </div>*/}
                <div className="deleteAllDiv">
                  <button
                    className="deleteAllBtn btn box-shadow"
                    onClick={this.deleteAll}
                  >
                    Delete All
                  </button>
                </div>
                <div className="inputDiv">
                  <input
                    className="pack-input form-control"
                    value={itemText}
                    placeholder="Type something here"
                    onChange={this.onChangeInput}
                  />
                  <button
                    className="addBtn btn box-shadow P-form-add"
                    onClick={this.onSubmitItem}
                  >
                    Add
                  </button>
                </div>
                <div className="container listDiv">
                  <List
                    list={items}
                    onChangeBox={this.onChangeBox}
                    handleDel={this.handleDel}
                  />
                </div>
              </div>
            </div>
            <div className="packing-side col-lg-4 d-flex align-items-center">
              <div className="px-3 py-4 p-md-5 mx-md 4">
                <h4>Some suggestions for your packing list</h4>
                {/*<h2>Your packing list</h2>*/}
                <p className="small mb-0">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
                  iure ratione quasi molestiae quia? Aliquam quia sapiente aut
                  voluptas, deleniti ab saepe adipisci accusamus quisquam dicta
                  eligendi placeat molestiae impedit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
/*
export const Button = ({ onClick, children }) => (
  <button type="button" className="btn" onClick={onClick}>
    {children}
  </button>
);

export const Checkbox = ({ onClick, defaultChecked }) => (
  <input type="checkbox" onClick={onClick} defaultChecked={defaultChecked} />
);

export const Input = ({ value, onChange }) => (
  <input type="text" value={value} onChange={onChange} />
);
*/
export const List = ({ list, onChangeBox, handleDel }) => (
  <ul className="">
    {/* flex-container*/}
    {list.map((item) => (
      <li
        className={item.done ? "checked" : null}
        key={item.id}
        style={{ textDecoration: item.done ? "line-through" : null }}
        onClick={() => onChangeBox(item)}
        defaultChecked={item.done}
      >
        {/*
        <input
          type="checkbox"
          className="checkbox p-2"
          onClick={() => onChangeBox(item)}
          defaultChecked={item.done}
    />*/}
        {item.name}
        {/*box-shadow p-2*/}
        <span className="deleteBtn" onClick={() => handleDel(item)}>
          X
        </span>
      </li>
    ))}
  </ul>
);
