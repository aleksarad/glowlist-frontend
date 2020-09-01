import React from 'react';
import { Link, useRouteMatch, Redirect } from "react-router-dom";

function Nav({ showSignUpModal, showLoginModal, logout, currentUser }) {

    let home = useRouteMatch({
        path: '/',
        exact: true
      })
    
    

    const handleLogout = () => {
        logout()
    }

    return (
        <nav>
            <ul>
                { 
                //if current user exists, show nav for logged in user (feed, profile, logout)
                //if no current user:
                //check if at home page:
                    //at home page -> render sign up/sign in
                    //not at home page -> redirect home
                currentUser !== null ?
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
                        { home ?
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
                         : 
                         <Redirect push to="/"/>
                        }
                    </>
                }  
            </ul>
        </nav>
    )
}
export default Nav