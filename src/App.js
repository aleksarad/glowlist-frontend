import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Nav from './components/Nav'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import Profile from './components/Profile'
import LookContainer from './components/LookContainer'
import LookForm from './components/LookForm'
import { propTypes } from 'react-bootstrap/esm/Image';

function App(props) {
    const [signUpShow, setSignUpModal] = useState(false);
    const [loginShow, setLoginModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null)
    const [editing, setEditing] = useState(null)
    const [looks, setLooks] = useState([])


    useEffect(() => {
        console.log("mounted app.js")
        const token = localStorage.getItem("token")
        // let history = useHistory();

        if (token) {
          fetch(`http://localhost:3000/auto_login`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(resp => resp.json())
          .then(data => {
              setCurrentUser(data)
              fetchLooks(token, data)
            })
            // history.push('/feed')
        }
    }, []);

    const handleLogin = (user) => {
        setCurrentUser(user)
        const token = localStorage.getItem("token")
        fetchLooks(token, user)
    }

    const logout = () => {
        setCurrentUser(null)
        localStorage.removeItem("token")
    }

    //reused in handle login and autologin
    const fetchLooks = (token, user) => {
        fetch(`http://localhost:3000/users/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(user => {
            setLooks(user.looks)
        })
    }

    const showSignUpModal = () => {
        setSignUpModal(true)
    }

    const showLoginModal = () => {
        setLoginModal(true)
    }

    const handleEditing = (look) => {
        setEditing(look)
    }

    const updateLookState = (editedLook) => {
        const updatedLooks = looks.map(look => {
            if (look.id === editedLook.id) {
              return editedLook
            } else {
              return look
            }
          }) 
          setLooks(updatedLooks)
    }

    return ( 
    <div> 
    <main>
    <BrowserRouter>
            <Nav logout={logout} showSignUpModal={showSignUpModal} showLoginModal={showLoginModal} currentUser={currentUser}/> 
            <Route
                exact
                path="/"
                render={(routeProps) => (
                <>{ currentUser !== null ? <Redirect push to="/feed"/> :
                    <>
                    <h1>HOME/WELCOME</h1>
                    <SignUp {...routeProps} show={signUpShow}
                    onHide={() => setSignUpModal(false)} handleLogin={handleLogin}/>
                    <LogIn {...routeProps} show={loginShow}
                    onHide={() => setLoginModal(false)} handleLogin={handleLogin}/>
                    </>
                }
                </>
            )}/>
            <Route
                path="/profile"
                render={() => (
                <Profile/>
            )}/>
            <Route
                path="/look"
                render={(routeProps) => (
                <LookForm {...routeProps} currentUser={currentUser} updateLookState={updateLookState} setLooks={setLooks} editing={editing} setEditing={setEditing}/>
            )}/>
            <Route
                path="/feed"
                render={(routeProps) => ( <> <LookContainer  routeProps={routeProps} looks={looks} setLooks={setLooks} handleEditing={handleEditing}/> 
                {/* <LookForm/> */}
                 </>)} />
            <Route
                path="/login"
                render={() => (
                <h1>LOG IN HERE</h1>
            )}/>

    </BrowserRouter>
    </main>
    </div>);
}

export default App;
