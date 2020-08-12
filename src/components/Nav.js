import React from 'react';
import { Link, withRouter } from "react-router-dom";

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
                            <Link to='/feed'>LOGO</Link>
                        </li>
                        <li>
                            <Link to='/profile'>profile</Link> <br/>
                            <Link to='/look'>look</Link>
                        </li>
                        <li>
                        <button className="link-button" onClick={handleLogout}>
                        log out
                        </button>
                        </li>
                    </>
                        :
                    <>
                        <li>
                        <button className="link-button" onClick={() => showSignUpModal()}>
                            sign up
                        </button>
                        </li>
                        <li>
                        <button className="link-button" onClick={() => showLoginModal()}>
                        log in
                        </button>
                        </li>
                    </>
                }  
            </ul>
        </nav>
    )
}
export default withRouter(Nav)