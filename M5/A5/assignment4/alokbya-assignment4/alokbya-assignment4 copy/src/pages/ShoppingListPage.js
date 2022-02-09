// Import Dependencies
import React from "react";

// Import Pages
import GroceryTable from "../components/GroceryTable";

function ShoppingListPage({items}) {
    return (
        <>
            <article>
                <h2>Shopping List</h2>
                <p>Build your shopping list with the foods we have in stock!</p>
                <GroceryTable items={items}/>
            </article>
        </>
    );
}

export default ShoppingListPage;