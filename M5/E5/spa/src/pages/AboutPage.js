import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
    return (
        <>
            <h1>About Page</h1>
            <Link className="App-link" to="/">Go the Home Page</Link>
            <Link className="App-link" to="/contact">Go the Contact Page</Link>


        </>
    );
}

export default AboutPage;