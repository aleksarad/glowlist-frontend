import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Nav from './components/Nav'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import Profile from './components/Profile'
import LookContainer from './components/LookContainer'
import LookForm from './components/LookForm'
// import './App.css';

function App() {
    const [signUpShow, setSignUpModal] = useState(false);
    const [loginShow, setLoginModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null)
    const [editing, setEditing] = useState(null)
    const [looks, setLooks] = useState([])


    useEffect(() => {
        console.log("mounted app.js")
        // fetch(`http://localhost:3000/users/${currentUser}`)
        // .then(r => r.json())
        // .then(user => {
        //     // console.log(user.looks)
        //     setLooks(user.looks)
        // })
    }, []);

    const handleLogin = (user) => {
        setCurrentUser(user)
        const token = localStorage.getItem("token")

        fetch(`http://localhost:3000/users/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        .then(r => r.json())
        .then(user => {
            // console.log(user.looks)
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
        {console.log("loooks", looks)}
        {/* {console.log(localStorage.getItem('token'))} */}
    <main>
    <BrowserRouter>
            <Nav showSignUpModal={showSignUpModal} showLoginModal={showLoginModal}/> 
            <Route
                exact
                path="/"
                render={(routeProps) => (
                <>
                    <h1>HOME/WELCOME</h1>
                    <SignUp {...routeProps} show={signUpShow}
                    onHide={() => setSignUpModal(false)}/>
                    <LogIn {...routeProps} show={loginShow}
                    onHide={() => setLoginModal(false)} handleLogin={handleLogin}/>
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
