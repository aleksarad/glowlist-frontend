import React from 'react';
import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';

export default function Nav({ showModal }) {
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
                <button onClick={() => showModal(true)}>
                    Launch vertically centered modal
                </button>
                </li>
            </ul>
        </nav>
    )
}