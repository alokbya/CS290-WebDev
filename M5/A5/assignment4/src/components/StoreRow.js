// Import Dependencies
import React from "react";

function StoreRow({city, state, zip, id}) {
    // Return JSX
    return (
        <>
            <tr id={id} key={id}>
                <td>{city}</td>
                <td>{state}</td>
                <td>{zip}</td>
            </tr>
        </>
    );
}
export default StoreRow;