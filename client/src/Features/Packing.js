import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./packing.css";
import "reactjs-popup/dist/index.css";

import { CommonItems}  from "./Suggestions.js";

import {db} from '../firebase.js'
import { collection, getDocs } from "firebase/firestore"

export default class Packing extends Component {
  state = {
    items: [],
    itemText: "",
    isEditing: false /* var is false if no edit is done or is the item object if true*/,
    /*isChecked: false,*/
  };


  getUsers = async () =>{
    const usersCollectionRef = collection(db, "users");
    const data = await getDocs(usersCollectionRef);
    console.log(data);
  }
  /* editing has been clicked 
      swtich to input el*/
  toggleInput = (item) => {
    this.setState({ isEditing: item });
    item.editing = true;
  };

  /* when form input out of focus and if text is empty it deletes li*/
  doneEdit = () => {
    var item = this.state.isEditing;
    if (item.name == "") {
      this.handleDel(item);
      this.setState({ isEditing: false });
    }

    /* exits out of edit mode for all items */
    for (var i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i] != null) this.state.items[i].editing = false;
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



  addSuggestion = item =>{

    this.setState(({ items }) => ({
      items: [
        ...items,
        { id: items.length + 1, name: item, done: false, editing: false },
      ],
      isEditing: false,
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
          { id: items.length + 1, name: itemText, done: false, editing: false },
        ],
        itemText: "",
        isEditing: false,
      }));
    }
  };

  /* wanted the orig input to also be able to have key enter input
   but function is not working*/
  onSubmitItem2 = (e) => {
    if (e.key === "Enter") this.onSubmitItem();
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
    const comItems = CommonItems;  
    console.log(comItems)
    this.getUsers();

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
                    onKeyDown={this.onSubmitItem2}
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
              <div className="px-3 py-4 p-md-5 mx-md container sugDiv">
                <h4>Some suggestions for your packing list</h4>
                {/*<h2>Your packing list</h2>*/}
                <SugList list={comItems} AddSuggestion={this.addSuggestion}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const SugList = ({ list,AddSuggestion}) => (
  <ul>
    {/* flex-container*/}
    {list.map((item, index) => (
      <li
        className="SugList"
        key={index}
      >
      {item}
      <span className="sugBtn btn" onClick={() => AddSuggestion(item)}>
        Add
      </span>
      </li>
    ))}
  </ul>
);


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
        key={item}
        /*style={{ textDecoration: item.done ? "line-through" : null }}*/
        onClick={() => onChangeBox(item)}
        defaultChecked={item.done}
      >
        <span>
          <p style={{ display: item.editing? "none": null}}   onDoubleClick={() => toggleInput(item)} >{item.name}</p>
          <input className="input-edit" style={{ display: item.editing? null: "none"}} 
                  type="text" value={item.name}
                  onChange={onChangeInputEdit} onKeyDown={doneEdit2} onBlur={doneEdit} />
        
        </span>
        {/*box-shadow p-2*/}


        

        <span
          className="editBtn"
          style={{ display: item.editingditing ? "none" : null }}
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
