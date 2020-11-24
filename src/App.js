import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Nav from './components/Nav'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import Profile from './components/Profile'
import LookContainer from './components/LookContainer'
import LookForm from './components/LookForm'
import HomePage from './components/HomePage'
import SearchBar from './components/SearchBar'
import Filter from './components/Filter'
import Loading from './components/Loading'
import FeedEmpty from './components/FeedEmpty'

function App() {
    const [signUpShow, setSignUpModal] = useState(false);
    const [loginShow, setLoginModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null)
    const [editing, setEditing] = useState(null)
    const [looks, setLooks] = useState([])
    const [searchTerm, setSearch] = useState("")
    const [filter, setFilter] = useState("")
    const [loading, setLoading] = useState(true)
    


    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
          fetch(`https://glowlist-api.herokuapp.com/auto_login`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(resp => resp.json())
          .then(data => {
              setCurrentUser(data)
              fetchLooks(token, data)
            })
        }

    }, []);

    const handleLogin = (user) => {
        const token = localStorage.getItem("token")
        fetchLooks(token, user)
    }

    const logout = () => {
        setCurrentUser(null)
        setLooks([])
        localStorage.removeItem("token")
    }

    //reused in handle login and autologin
    const fetchLooks = (token, user) => {
        setLoading(true)
        
        fetch(`https://glowlist-api.herokuapp.com/users/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(user => {
            setLooks(user.looks)
            setLoading(false)
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

    const searchFilterLooks = () => {
            let filtered = looks.filter(look => look.name.toLowerCase().includes(searchTerm))
            if (filter === 'complete') {
                filtered = filtered.filter(look => look.completed === true)
            }
            if (filter === 'incomplete') {
                filtered = filtered.filter(look => look.completed === false)
            }
            if (filter === 'all') {
                return filtered
            }
            return filtered
    }

    return ( 
    <> 
    {console.log(currentUser)}
    <BrowserRouter>
            <Nav logout={logout} showSignUpModal={showSignUpModal} showLoginModal={showLoginModal} currentUser={currentUser}/> 
            <main>
            <Route
                exact
                path="/"
                render={(routeProps) => (
                <>{ currentUser !== null ? <Redirect push to="/feed"/> :
                    <>
                    <HomePage />
                    <SignUp {...routeProps} show={signUpShow}
                    onHide={() => setSignUpModal(false)} handleLogin={handleLogin} setCurrentUser={setCurrentUser}/>
                    <LogIn {...routeProps} show={loginShow}
                    onHide={() => setLoginModal(false)} handleLogin={handleLogin} setCurrentUser={setCurrentUser}/>
                    </>
                }
                </>
            )}/>
            <Route
                path="/profile"
                render={() => (
                    <> 
                        {currentUser ? <Profile currentUser={currentUser} setCurrentUser={setCurrentUser}/> : <Loading/>}
                    </>
            )}/>
            <Route
                path="/look"
                render={(routeProps) => (
                    <>
                    { loading ? <Loading/> : <LookForm {...routeProps}
                    currentUser={currentUser} 
                    updateLookState={updateLookState} 
                    setLooks={setLooks} editing={editing}
                    setEditing={setEditing}/> }
                    </>
            )}/>
            <Route
                path="/feed"
                render={(routeProps) => (
                        <>
                            { loading ? <Loading/> : 
                            <>
                                { looks.length === 0 ? <FeedEmpty/> :
                                <div id="feed-container">
                                    <SearchBar setSearch={setSearch}/>
                                    <Filter setFilter={setFilter}/>
                                    <LookContainer routeProps={routeProps}
                                    looks={searchFilterLooks()} 
                                    setLooks={setLooks}
                                    updateLookState={updateLookState}
                                    handleEditing={handleEditing}/>
                                </div> 
                                }
                            </>
                            }
                        </>
                 )} />
            </main>
    </BrowserRouter>
    </>);
}

export default App;
