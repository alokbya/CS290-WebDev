import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <>
            <nav>
                <Link id="home-link" class="nav-item" to='/' exact>Home</Link>
                <Link to="/create-exercise">Create Exercise</Link>
                {/* <Link id="create-link" class="nav-item" to='/create-exercise'>Create Exercise</Link> */}
                {/* <Link to='/edit-exercise'>Edit Exercise</Link> */}
            </nav>
        </>
    );
}
export default Navigation;