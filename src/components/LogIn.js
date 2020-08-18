import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function Login({ history, show, onHide, handleLogin }) {

    useEffect(() => console.log("mounted"))

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
        console.log(username, password)
        fetch(`http://localhost:3000/login`, {
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
                localStorage.setItem("token", data.token)
                handleLogin(data.user)
                onHide()
                history.push('/feed')
            }
            else {
                console.log(data)
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
          {/* <Modal.Title id="contained-modal-title-vcenter">
            Login
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
        <div className="modal-body-container">   

                <h1 style={{textAlign: 'center'}}>log in</h1>
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