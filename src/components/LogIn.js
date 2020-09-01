import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function Login({ history, show, onHide, handleLogin, setCurrentUser, setLogIn }) {

    const [error, setError] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://glowlist-api.herokuapp.com/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(r => r.json())
        .then(data => {
            if(data.token) {
                setCurrentUser(data.user)
                localStorage.setItem("token", data.token)
                handleLogin(data.user)
                onHide()
                history.push('/feed')
            }
            else {
                console.log(data)
                setError(data.error)
            }
        })
    }



    return (
        <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
        <div className="modal-body-container">   

                <h1 style={{textAlign: 'center'}}>log in</h1>
                <p style={{textAlign: 'center', fontStyle: 'italic'}}>{error}</p>
                <input className="underline-input" value={username} onChange={handleUsernameChange} type="text" placeholder="username"/>
                <br/>
                <input className="underline-input"  value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
                <br/>

                
        </div>
        <div className="form-footer">
             <button className="important-button" type="submit" onClick={handleSubmit}>Submit</button>
        </div>
        </Modal.Body>
      </Modal>
    )
}