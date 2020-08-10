import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function Login({history, show, onHide, handleLogin}) {

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

        setUsername("")
        setPassword("")
    }



    return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input value={username} onChange={handleUsernameChange} type="text" placeholder="username"/>
                </div>
                <div>
                    <label>Password</label>
                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </Modal.Body>
        {/* <Modal.Footer>
            <button onClick={props.onHide}>close</button>
        </Modal.Footer> */}
      </Modal>
    )
}