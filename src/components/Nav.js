import React from 'react';
import { Link, withRouter } from "react-router-dom";
// import Button from 'react-bootstrap/Button';

function Nav({ showSignUpModal, showLoginModal, logout, history, currentUser }) {

    const handleLogout = () => {
        logout()
        history.push('/')
    }

    return (
        <nav>
            <ul>
                { currentUser !== null ?
                    <>
                        <li>
                            <Link to='/profile'>profile</Link>
                        </li>
                        {/* <li>
                            <Link to='/feed'>feed</Link>
                        </li> */}
                        <li>
                            <Link to='/look'>look</Link>
                        </li>
                        <li>
                        <button onClick={handleLogout}>
                        Log Out
                        </button>
                        </li>
                    </>
                        :
                    <>
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
                    </>
                }  
            </ul>
        </nav>
    )
}
export default withRouter(Nav)