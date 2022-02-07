// Import Dependencies
import React from "react";

// Import Components
import StoreRow from "./StoreRow";

function StoreTable({stores, id}) {
    // Return JSX
    return (
        <>
            <table id={id} className="store-table">
                <caption>Shopping list builder</caption>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Create unique id/key value for each row */}
                        {stores.map((store, i) => <StoreRow key={i} id={i + "" + store.id} city={store.city} state={store.state} zip={store.zipCode} /> )}
                    </tbody>
            </table>
   
        </>
    )
}
export default StoreTable;