import React from 'react';
import { Link } from 'react-router-dom';

function ContactPage() {
    return (
        <>
            <h1>Contact Page</h1>
            <Link className="App-link" to="/">Go the Home Page</Link>
            <Link className="App-link" to="/about">Go the About Page</Link>
        </>
    );
}

export default ContactPage;