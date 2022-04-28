import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./packing.css";
import "reactjs-popup/dist/index.css";


import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

import { CommonItems } from "./Suggestions.js";

import { db } from "../firebase.js";
import { increment, deleteField, getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";

import { readPacking, getUserID} from "./DB/readingfb.js";

export default class Packing extends Component {
  state = {
    fb: [],
    items: [],
    itemText: "",
    isEditing: false /* var is false if no edit is done or is the item object if true*/,
    /*isChecked: false,*/

  };

  /* editing has been clicked 
      swtich to input el*/
  toggleInput = (item) => {
    this.setState({ isEditing: item });
    item.editing = true;
  };

  /* when form input out of focus and if text is empty it deletes li*/
  doneEdit = () => {
    const ref = (doc(db, "users", getUserID()));
    var item = this.state.isEditing;
 
    if (item.name == "") {
      this.handleDel(item);
      this.setState({ isEditing: false });
    }

    /* exits out of edit mode for all items */
    for (var i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i] != null) this.state.items[i].editing = false;
    }


    //updates item to fb
    updateDoc(ref, {
      packing: this.state.items
    });

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

  addSuggestion = (item) => {
    const theid = this.randomNum();
    this.setState(({ items }) => ({
      items: [
        ...items,
        { id: theid, name: item, done: false, editing: false },
      ],
      isEditing: false,
    }))

    this.submitToDB(theid, item);
  };

  onChangeInput = (e) => {
    this.setState({ itemText: e.target.value });
  };


  submitToDB = (id, name) =>{
    const data = {
      id: id,
      name: name,
      done: false,
    };

   const ref = (doc(db, "users", getUserID()));

    updateDoc(ref, {
      packing: arrayUnion(data),
      leftToPack: increment(1),
  
    });
    
  };


  randomNum = () => {
    return Math.floor(Math.random() * 100000);
  }

  onSubmitItem = () => {
    if (this.state.itemText) {
      //prevent empty item from being added
      var theid = this.randomNum();

    
      this.setState(({ items, itemText }) => ({
        items: [
          ...items,
          { id: theid , name: itemText, done: false, editing: false },
        ],
        itemText: "",
        isEditing: false,
      }));


      this.submitToDB(theid, this.state.itemText);
    }
  };

  /* wanted the orig input to also be able to have key enter input
   but function is not working*/
  onSubmitItem2 = (e) => {
    if (e.key === "Enter") this.onSubmitItem();
  };


  

  onChangeBox = (item) => {

    var val = !item.done;

    const ref = (doc(db, "users", getUserID()));

    var cp = this.state.items; //db copy

  
    //keeps track of packing widget
    if(item.done){
      updateDoc(ref, {
        leftToPack: increment(1)
      });
    }else{
      updateDoc(ref, {
        leftToPack: increment(-1)
      });
    }

    //changes state
    this.setState(({ items }) => ({
      items: items.map((el) =>
        el.id === item.id ? { ...el, done: val} : el
      ),
    }));

    //updates property for db
    for(var i = 0; i < cp.length; i++){
        if(cp[i].id == item.id){
           cp[i].done = val;
        }
    }
    
    updateDoc(ref, {
      packing: cp
    });

  };

  handleDel = (item) => {
    const ref = (doc(db, "users", getUserID()));

  
    var cp = this.state.items;
 
    this.setState(({ items }) => ({
      items: items.filter((el) => el.id !== item.id),
    }));

    var k = cp.filter((el) => el.id !== item.id);
  
    if(item.done){
      updateDoc(ref, {
        leftToPack: increment(-1),
      });}

    updateDoc(ref, {
      packing: k
    });


  };

 
  deleteDB = () => {

    const ref = (doc(db, "users", getUserID()));

    updateDoc(ref, {
      packing: deleteField(),
      leftToPack: 0,
    });

  }
  deleteAll = () => {

    this.deleteDB();
    this.setState(({ items }) => ({
      items: [],
    }));
  };



  /* this function initiziale the state with firestore storage 

  constructor(props) {
    super(props)
    var fbArray= []; 
  
    readPacking().then((data) => {
        fbArray= data;
        for(var i = 0; i <  fbArray.length; i++){
          const obj = { id: fbArray[i].id, name: fbArray[i].name, done: fbArray[i].done, editing: false };

          this.setState(({ items }) => ({
            items: [
              ...items,
              obj,
            ],
          }));
          
        }
    }).catch((error) => {
        console.log("error in init packing")
    }); 
  } */


  componentDidMount() {
    setTimeout(() => {
      var fbArray= []; 
  
        readPacking().then((data) => {
            fbArray= data;
            for(var i = 0; i <  fbArray.length; i++){
              const obj = { id: fbArray[i].id, name: fbArray[i].name, done: fbArray[i].done, editing: false };

              this.setState(({ items }) => ({
                items: [
                  ...items,
                  obj,
                ],
              }));
              
            }
        }).catch((error) => {
            console.log("error in init packing")
        });
    }, 1000)
  }

  
  render() {
    const { items, itemText, isEditing } = this.state;


    const comItems = CommonItems;

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
                <p>Click one to add it to your list</p>
                {/*<h2>Your packing list</h2>*/}
                <div className="sugList-container">
                  <SugList list={comItems} AddSuggestion={this.addSuggestion} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export const SugList = ({ list, AddSuggestion }) => (
  <ul>
    {/* flex-container*/}
    {list.map((item, index) => (
      <li className="SugList" key={index} onClick={() => AddSuggestion(item)}>
        {item}
        {/*
        <span className="sugBtn btn" onClick={() => AddSuggestion(item)}>
          Add
        </span>
    */}
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
        data-bs-toggle="tooltip"
        title={
          item.done ? "click here to uncheck" : "click here to check this off"
        }
      >
        <span>
          <p
            style={{ display: item.editing ? "none" : null }}
            onDoubleClick={() => toggleInput(item)}
          >
            {item.name}
          </p>
          <input
            className="input-edit"
            style={{ display: item.editing ? null : "none" }}
            type="text"
            value={item.name}
            onChange={onChangeInputEdit}
            onKeyDown={doneEdit2}
            onBlur={doneEdit}
            onClick={(e) => {
              e.stopPropagation();
            }}
            autoFocus
          />
        </span>
        {/*box-shadow p-2*/}

        <span
          className="editBtn fas"
          data-bs-toggle="tooltip"
          title="click here to edit this packing item"
          /*style={{ display: isEditing ? "none" : null }}*/
          style={{ display: item.editing ? "none" : null }}
          /*onClick={() => toggleInput(item)}*/
          onClick={(e) => {
            e.stopPropagation();
            toggleInput(item);
          }}
        >
          {/*&#xf304;*/}
          EDIT
        </span>
        <span
          className="deleteBtn"
          data-bs-toggle="tooltip"
          title="delete"
          onClick={() => handleDel(item)}
        >
          X
        </span>
      </li>
    ))}
  </ul>
);
