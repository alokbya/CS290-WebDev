// Import Dependencies
import React, { useState } from "react";
import {MdArrowCircleUp, MdArrowCircleDown} from 'react-icons/md'

function SelectQuantity() {
    // Manage state
    const [counter, setCounter] = useState(0);
    const incrementCounter = () => counter >= 10 ? counter : setCounter(counter + 1);
    const decrementCounter = () => counter <= 0 ? counter : setCounter(counter - 1);
    
    // Return JSX
    return (
        <>
            <MdArrowCircleDown className="adjust-quantity decrement" size={20} onClick={decrementCounter}></MdArrowCircleDown>
           <span className="grocery-counter">{counter}</span>
           <MdArrowCircleUp className="adjust-quantity increment" size={20} onClick={incrementCounter}></MdArrowCircleUp>
        </>
    );
}
export default SelectQuantity;