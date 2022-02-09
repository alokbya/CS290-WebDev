// Import Dependencies
import React from "react";

function StoreRow({city, state, zip, id}) {
    // Return JSX
    return (
        <>
            <tr id={id} key={id}>
                <td className="store-city">{city}</td>
                <td className="store-state">{state}</td>
                <td className="store-zip">{zip}</td>
            </tr>
        </>
    );
}
export default StoreRow;