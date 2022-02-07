// Import Dependencies
import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
    // Return JSX
    return (
        <>
            <nav>
                <Link to="/" exact>Home</Link>
                <Link to="/shoppinglist">Shopping List</Link>
                <Link to="/stores">Store List</Link>
            </nav>
        </>
    );
}
export default Navigation;