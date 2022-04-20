import React, { Component } from "react";
import "./packing.css";

export default class Packing extends Component {
  state = {
    items: [],
    itemText: "",
    isEditing: false /* var is false if no edit is done or is the item object if true*/,
    /*isChecked: false,*/
  };

  /* editing has been clicked 
      swtich to input el*/
  toggleInput = (item) => {
    this.setState({ isEditing: item });
  };

  /* when form input out of focus and if text is empty it deletes li*/
  doneEdit = () => {
    var item = this.state.isEditing;
    if (item.name == "") {
      this.handleDel(item);
      this.setState({ isEditing: false });
    }
    this.setState({ isEditing: false });
  };

  /* Doneedit is just with the enter key */
  doneEdit2 = (e) => {
    if (e.key === "Enter") {
      this.doneEdit();
    }
  };
  /* when in edit mode p element is switched to input el*/
  onChangeInputEdit = (e) => {
    var item = this.state.isEditing.id;
    var itemsnew = this.state.items;
    var index = itemsnew.findIndex((x) => x.id === item);
    itemsnew[index].name = e.target.value;
    this.setState(({ items }) => ({
      items: itemsnew,
    }));
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
        isEditing: false,
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
    const { items, itemText, isEditing } = this.state;

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
                    isEditing={this.state.isEditing}
                    toggleInput={this.toggleInput}
                    doneEdit={this.doneEdit}
                    doneEdit2={this.doneEdit2}
                    onChangeInputEdit={this.onChangeInputEdit}
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

export const List = ({
  list,
  onChangeBox,
  handleDel,
  toggleInput,
  onChangeInputEdit,
  isEditing,
  doneEdit,
  doneEdit2,
}) => (
  <ul className="">
    {/* flex-container*/}
    {list.map((item) => (
      <li
        className={item.done ? "checked" : null}
        key={item.id}
        /*style={{ textDecoration: item.done ? "line-through" : null }}*/
        onClick={() => onChangeBox(item)}
        defaultChecked={item.done}
      >
        <span>{item.name}</span>
        {/*box-shadow p-2*/}

        <span
          className="editBtn"
          style={{ display: isEditing ? "none" : null }}
          onClick={() => toggleInput(item)}
        >
          EDIT
        </span>
        <span className="deleteBtn" onClick={() => handleDel(item)}>
          X
        </span>
      </li>
    ))}
  </ul>
);
