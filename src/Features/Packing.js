import React, { Component } from "react";
import Popup from 'reactjs-popup';
import './packing.css'
import 'reactjs-popup/dist/index.css';

export default class Packing extends Component {
  state = {
    isEditing: false,  /* var is false if no edit is done or is the item object if true*/
    items: [],
    itemText: "",
  };



  /* editing has been clicked 
      swtich to input el*/
  toggleInput = item => {
      this.setState( { isEditing: item});
  };

  

  

  /* when form input out of focus and if text is empty it deletes li*/
  doneEdit = () =>{
    var item = this.state.isEditing;
    if(item.name == ""){
      this.handleDel(item)
      this.setState({ isEditing: false}); 
    }
    this.setState({ isEditing: false});
  };

  /* Doneedit is just with the enter key */
  doneEdit2= e => {
    if (e.key === 'Enter'){
        this.doneEdit();
    }
  };



  onChangeInput = e => {
    this.setState({ itemText: e.target.value });
  };



  /* when in edit mode p element is switched to input el*/
  onChangeInputEdit = e =>{
    var item = this.state.isEditing.id
    var itemsnew = this.state.items;
    var index = itemsnew.findIndex(x => x.id === item);
    itemsnew[index].name = e.target.value;
    this.setState(({ items }) => ({
      items: itemsnew
    }));
  };


  onSubmitItem = () => {
    if(this.state.itemText){ //prevent empty item from being added
    this.setState(({ items, itemText, setToggle }) => ({
      items: [...items, { id: items.length + 1, name: itemText, done: false }],
      itemText: "",
      isEditing: false
    }));
  }
  };

  /* wanted the orig input to also be able to have key enter input
   but function is not working*/
  onSubmitItem2 = e =>{
    if(e.key === 'Enter'){
       this.onSubmitItem();
    }
  }

  onChangeBox = item => {
    this.setState(({ items }) => ({
      items: items.map(el =>
        el.id === item.id ? { ...el, done: !el.done } : el
      )
    }));
  };

  handleDel = item => {
    this.setState(({ items }) => ({
      items: items.filter(el => el.id !== item.id)
    }));
  };


  deleteAll = () => {
    this.setState(({ items }) => ({
      items: []
    }));
  
  };


  render() {
    const { items, itemText, isEditing} = this.state;


    return (
      <div className="P-content">
        <h2>Packing List:</h2>
        <div className="deleteAllDiv">

        <Popup
          trigger={<button className="deleteAllBtn"> Delete All </button>}
          modal
          nested
        > 
            {close => (
              <div className="popup-confirm">
                <button className="close-packing" onClick={close}>
                  &times;
                </button>
                <div className="popup-text">
                  {' '}
                    Would you like to delete all the items in the checklist? 
                    <br />
                    Action cant be undone. 
                </div>
                <div className="popup-actions">


                <button
                    className="deleteAllAction cancel-b"
                    onClick={() => {
                      close();
                    }}
                  >
                    Cancel
                  </button>
                  
                  <button
                    className="deleteAllAction"
                    onClick={() => {
                      this.deleteAll()
                      console.log('all items deleted in packing');
                      close();
                    }}
                  >

                  Delete
            
                  </button>
              
                </div>
              </div>
            )}
        </Popup>

        </div>
        <div className="inputDiv">
        <Input value={itemText} onChange={this.onChangeInput} onKeyDown={this.onSubmitItem2}/>
        <Button className="P-form-add" onClick={this.onSubmitItem}>+</Button>
        </div>
        <div className="listDiv">
        <List
          list={items}
          onChangeBox={this.onChangeBox}
          handleDel={this.handleDel}
          toggleInput={this.toggleInput}
          isEditing={this.state.isEditing}
          doneEdit={this.doneEdit}
          doneEdit2 = {this.doneEdit2}
          onChangeInputEdit={this.onChangeInputEdit}
        />
        </div>
      </div>
    );
  }
}

export const Button = ({ onClick, children }) => (
  <button type="button" className="btn" onClick={onClick}>
    {children}
  </button>
);

export const Checkbox = ({ onClick, defaultChecked }) => (
  <input type="checkbox" onClick={onClick} defaultChecked={defaultChecked} />
);

export const Input = ({ value, onChange, onSubmitItem2 }) => (
  <input type="text" value={value} onChange={onChange} onKeyDown={onSubmitItem2} />
);

export const List = ({ list, onChangeBox, handleDel, toggleInput, onChangeInputEdit, isEditing, doneEdit, doneEdit2}) => (
  <ul>
    {list.map(item => (
      <li
        key={item.id}
        style={{ textDecoration: item.done ? "line-through" : null }}
      >
        <Checkbox className="checkbox"
          onClick={() => onChangeBox(item)}
          defaultChecked={item.done}
        />

     


      {/* toggles between p and input element
         bug: does it for ALL when i want only One to be swtiched*/}
      <p style={{ display: isEditing? "none": null}}>{item.name}</p>
      <input className="input-edit" style={{ display: isEditing? null: "none"}} type="text" value={item.name}
       onChange={onChangeInputEdit} onKeyDown={doneEdit2} onBlur={doneEdit} />



        <button style= {{ display: isEditing? "none": null}} onClick={() => toggleInput(item)}> EDIT </button>
        <Button className="deleteButton btn" onClick={() => handleDel(item)}>X</Button>
        
        
      </li>
    ))}
  </ul>
);