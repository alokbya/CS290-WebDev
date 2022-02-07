// Import Dependencies
import React from "react";

// Import Pages
import GroceryTable from "../components/GroceryTable";

function ShoppingListPage({items}) {
    return (
        <>
            <article>
                <h2>Shopping List</h2>
                <p>Build your shopping list by using the table below. Increment and decrement the number of items you'd like to order.</p>
                <GroceryTable items={items}/>
            </article>
        </>
    );
}

export default ShoppingListPage;