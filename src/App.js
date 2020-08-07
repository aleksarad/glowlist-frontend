import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Nav from './components/Nav'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import LookContainer from './components/LookContainer'
// import './App.css';

function App() {
    const [modalShow, setModalShow] = React.useState(false);

    const showModal = (arg) => {
        setModalShow(arg)
    }

    return ( <> 
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
                path="/feed"
                render={() => ( <> <LookContainer/> <h1> new canvas modal </h1> </>)} />
            <Route
                path="/login"
                render={() => (
                <h1>LOG IN HERE</h1>
            )}/>

    </BrowserRouter>
    </main>
    </>);
}

export default App;
