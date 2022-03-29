
import React, {useState} from 'react'

function PForm(props) {

const [input, setInput] = useState('');

const handleChange = e =>{
    setInput(e.target.value);
};


const handleSubmit = e =>{
 
    e.preventDefault();

    props.onSubmit({
        id: Math.floor(Math.random() * 100000),
        text: input
    });

    setInput('');
};

  return (
    <div className='P-form'>PForm
        <form>
            <input
                placeholder='enter to packing list'
                type='text'
                value={input}
                name='text'
                className='P=form-input'
                onChange={handleChange}
            />
        <button className='P-form-add' onClick={handleSubmit}>+</button>  
        </form>
    </div>
  );
}

export default PForm