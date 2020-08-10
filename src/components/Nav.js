import React from 'react';
import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';

export default function Nav({ showSignUpModal, showLoginModal }) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/profile'>profile</Link>
                </li>
                <li>
                    <Link to='/'>welcome</Link>
                </li>
                <li>
                    <Link to='/feed'>feed</Link>
                </li>
                <li>
                    <Link to='/look'>look</Link>
                </li>
                <li>
                <button onClick={() => showSignUpModal()}>
                    Sign Up
                </button>
                </li>
                <li>
                <button onClick={() => showLoginModal()}>
                   Log In
                </button>
                </li>
            </ul>
        </nav>
    )
}