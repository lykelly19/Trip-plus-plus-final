import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TableDatePicker(itemPrefill) {
    
    const [date, setDate] = useState(null);
    let placeholder = "";
    let dateObject = null;
    
    if(itemPrefill["selected"] !== "") {
        placeholder = itemPrefill["selected"];
        dateObject = new Date(placeholder);
    }

    return (
        <DatePicker selected={date ? date : dateObject} onChange={date => setDate(date)} />
    );
}