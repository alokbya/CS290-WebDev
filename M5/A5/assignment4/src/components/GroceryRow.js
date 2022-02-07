// Import Dependencies
import React from "react";

// Import Components
import SelectQuantity from "./SelectQuantity";

function GroceryRow({name, price, id}) {
    // Return JSX
    return (
        <>
            <tr id={id} key={id}>
                <td className="grocery-name">{name}</td>
                <td className="grocery-price">${price}</td>
                <td>
                    <SelectQuantity className="select-quantity"/>
                </td>
            </tr>
        </>
    );
}
export default GroceryRow;