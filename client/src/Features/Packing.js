import React, { Component } from "react";

export default class Packing extends Component {
  state = {
    items: [],
    itemText: ""
  };

  onChangeInput = e => {
    this.setState({ itemText: e.target.value });
  };

  onSubmitItem = () => {
    if(this.state.itemText){ //prevent empty item from being added
    this.setState(({ items, itemText }) => ({
      items: [...items, { id: items.length + 1, name: itemText, done: false }],
      itemText: ""
    }));
  }
  };

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
    const { items, itemText } = this.state;

    return (
      <div className="P-form">
        <h2>Packing List:</h2>
        <div className="deleteAllDiv">
        <Button className="deleteAllBtn" onClick={this.deleteAll}>Delete All</Button>
        </div>
        <div className="inputDiv">
        <Input value={itemText} onChange={this.onChangeInput} />
        <Button className="P-form-add" onClick={this.onSubmitItem}>+</Button>
        </div>
        <div className="listDiv">
        <List
          list={items}
          onChangeBox={this.onChangeBox}
          handleDel={this.handleDel}
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

export const Input = ({ value, onChange }) => (
  <input type="text" value={value} onChange={onChange} />
);

export const List = ({ list, onChangeBox, handleDel }) => (
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
        {item.name}
        <Button className="deleteButton btn" onClick={() => handleDel(item)}>X</Button>
      </li>
    ))}
  </ul>
);
