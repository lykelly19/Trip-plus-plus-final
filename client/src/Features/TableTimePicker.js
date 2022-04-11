import React, { useState } from 'react';
// import TimePicker from 'react-time-picker/dist/entry.nostyle';
import TimePicker from 'react-time-picker';

export default function TableTimePicker() {
  
    const [value, onChange] = useState('00:00');

  return (
    <div>
      <TimePicker onChange={onChange} value={value} disableClock={true} clearIcon={null}/>
    </div>
  );
}