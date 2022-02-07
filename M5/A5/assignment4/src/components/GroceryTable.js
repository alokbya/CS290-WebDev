// Import Dependencies
import React from "react";

// Import Components
import GroceryRow from "./GroceryRow";

function GroceryTable({items}) {
    // Return JSX
    return (
        <>
            <table id="grocery-table">
                <caption>Adjust the grocery quantities you would like to order.</caption>
                    <thead>
                        <tr class="table-header-row">
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Create unique id/key value for each row */}
                        {items.map((item, i) => <GroceryRow key={i} id={i + "" + item.id} name={item.name} price={item.price} /> )}
                    </tbody>
            </table>
        </>
    );
}
export default GroceryTable;