import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function LoginForm({loggedIn, setLoggedIn, email, setEmail, password, setPassword, loginUser, setLoginUser, registerUser, setRegisterUser}) {

    // Cookie information
    const [ cookies, setCookie ] = useCookies(['token']);

    const history = useHistory();

    const authenticateUser = async () => {
        const response = fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.status === 200) {
                setLoggedIn(true);
                history.push('/');
            }
        })
        .catch(error => {
            console.error(error);
            alert(error);
        });
        
    }

    const registrationRedirect = () => {
        setLoginUser(false);
        setRegisterUser(true);
    }

    return (
        <>
            <div id="auth-form">
            <h2>Login</h2>
                <input
                    className="auth-input"
                    type="text"
                    placeholder="Email address"
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button id="login-btn" className="auth-btn" onClick={authenticateUser}>Login</button>
                <p className="redirect" id="register-redirect">Don't have an account? <a className="auth-link" onClick={registrationRedirect}>Sign up here!</a></p>
            </div>
        </>
    );
}

export default LoginForm;