import React from 'react';

function LogoutButton({loggedIn, setLoggedIn}) {
    
    const logoutUser = () => {
        const response = await fetch('/auth/logout', {
            method: 'DELETE',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            setLoggedIn(false);
            history.push('/');
        }
    }

    return (
        <>
            <button id="logout-button">Logout</button>
        </>
    );
}

export default LogoutButton;