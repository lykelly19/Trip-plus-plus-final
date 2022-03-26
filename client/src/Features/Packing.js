import React from 'react';



const Budgeting = () => {
  const [currentInput, setCurrentInput] = React.useState('')
  const [list, setList] = React.useState([])

  const addItem = event =>{
    event.preventDefault();
    const newList = list;

  newList.unshift({content:currentInput,isCompleted:false});
  setList([...newList]);
  setCurrentInput("");
  };
  const deleteItem = (index) =>{
    var newList = list;
    newList.splice(index, 1);
    setList([...newList]);

  };
  const deleteAll = event =>{
    var newList = [];

    setList([...newList]);

  };
    return(
        <div>
        <div className="outer-box">
          <h1>Packing List</h1>
          <div className="del-button" onClick={()=>deleteAll()}>Delete All</div>
          <form className="input-box">
            <input className="input" onChange={event=> {
              setCurrentInput(event.target.value);
            }}
              value={currentInput}
            />
            <button clasName="add-button" onClick={addItem}>+</button>
            </form>
            {list.map(({content}, index)=>{
              return (
                <div className="packing-container">
                <div className="del-button" onClick={()=>deleteItem()}>X</div>
                <div className="packing-main-content">
                <div className="packing-content">{content}</div>
                </div>

                </div>
              );
            })}
            </div>
            </div>
            //}
    );
};
//ReactDOM.render(<Budgeting/>, document.getElementById('root'))

export default Budgeting
