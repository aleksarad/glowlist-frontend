import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Nav from './components/Nav'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import LookContainer from './components/LookContainer'
import LookForm from './components/LookForm'
// import './App.css';

function App() {
    const [modalShow, setModalShow] = useState(false);
    const [currentUser, setCurrentUser] = useState(1)
    const [editing, setEditing] = useState(null)
    const [looks, setLooks] = useState([])


    useEffect(() => {
        fetch(`http://localhost:3000/users/${currentUser}`)
        .then(r => r.json())
        .then(user => {
            // console.log(user.looks)
            setLooks(user.looks)
        })
    }, []);

    const showModal = () => {
        setModalShow(true)
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
            <Nav showModal={showModal}/> 
            <Route
                exact
                path="/"
                render={() => (
                <>
                    <h1>HOME/WELCOME</h1>
                    <SignUp show={modalShow}
                    onHide={() => setModalShow(false)}/>
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
                <LookForm {...routeProps} updateLookState={updateLookState} setLooks={setLooks} editing={editing} setEditing={setEditing}/>
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
