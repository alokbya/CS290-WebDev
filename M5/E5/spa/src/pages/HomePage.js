import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <>
            <h1>HomePage</h1>
            <Link className="App-link" to="/about">Go the About Page</Link>
            <Link className="App-link" to="/contact">Go the Contact Page</Link>
        </>
    );
}

export default HomePage;