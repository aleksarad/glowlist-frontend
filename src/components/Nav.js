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
                            <Link className="logo" to='/feed'>glowlist</Link>
                        </li>
                        <li id="newlook-profile-container">
                            <Link to='/look' className="new-look">new look</Link> <br/>
                            <Link to='/profile' id="profile-link">profile</Link> 
                        </li>
                        <li>
                        <button className="link-button logout" onClick={handleLogout}>
                        log out
                        </button>
                        </li>
                    </>
                        :
                    <>
                        <li>
                        <button className="link-button" style={{color: '#ff3aad', fontWeight: '500'}} onClick={() => showSignUpModal()}>
                            sign up
                        </button>
                        </li>
                        <li>
                        <button className="link-button" style={{color: '#ff3aad', fontWeight: '500'}} onClick={() => showLoginModal()}>
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