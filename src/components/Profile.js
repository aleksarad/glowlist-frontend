import React, { useState } from 'react';
import faceChart1 from '../images/faceChart1.png'
import faceChart2 from '../images/faceChart2.png'
import faceChart3 from '../images/faceChart3.png'

export default function Profile({ currentUser, setCurrentUser }) {

    const [error, setError] = useState([])
    const [updateStatus, setUpdateStatus] = useState(false)
    const [username, setUsername] = useState(currentUser.username)
    const [password, setPassword] = useState("")
    const [facechart, setFaceChart] = useState(currentUser.facechart)
    const [background_color, setBackgroundColor] = useState(currentUser.background_color)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(username, password, facechart, background_color)
        const token = localStorage.getItem("token")

        fetch(`http://localhost:3000/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                username,
                password,
                background_color,
                facechart
            })
        })
        .then(resp => resp.json())
        .then(updatedUser => {
            if(!updatedUser.error) {
                setCurrentUser(updatedUser.user)
                setUpdateStatus(true)
            }
            else {
                setError(updatedUser.error)
                console.log(updatedUser.error)
            }
        })
    }

    const updateFace = (e) => {
        setFaceChart(e.target.name)
    }

    const renderErrors = error.map(err => <p style={{textAlign: 'center', fontStyle: 'italic'}}>{err}</p>)


    return (
        <div className="profile-container">
            <h1 id="username">{username}'s profile</h1>
            {updateStatus ? <p style={{textAlign: 'center'}}>update successful!</p> : null}
            <div>
               <input className="underline-input" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username"/>
                <br/>
                <input className="underline-input"  value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
                <br/>

                <div id="profile-background-selector">
                    <p>select skin tone</p>
                    <input type="color" value={background_color} onChange={(e) => setBackgroundColor(e.target.value)} className="align-middle"></input>
                </div>
                <div className="facechart-preference-container">
                    <div>
                        <p>select face chart</p>
                    </div>
                    <div className="face-chart-container">
                      <img src={faceChart1} alt="face chart style 1: an oval shaped face with brown eyes and prominent cheekbones" style={{backgroundColor: background_color}} className={facechart === "faceChart1" ? 'selected-chart facechart' : 'facechart'} name="faceChart1" onClick={updateFace}></img>
                      <img src={faceChart2} alt="face chart style 2: a diamond shaped face with blue eyes" style={{backgroundColor: background_color}} className={facechart === "faceChart2" ? 'selected-chart facechart' : 'facechart'} name="faceChart2" onClick={updateFace}></img>
                      <img src={faceChart3} alt="face chart style 3: a heart shaped face with green eyes" style={{backgroundColor: background_color}} className={facechart === "faceChart3" ? 'selected-chart facechart' : 'facechart'} name="faceChart3" onClick={updateFace}></img>
                    </div>
                </div>
                <br/>
                {renderErrors}
                <div id="button-container">
                    <button className="important-button" type="submit" onClick={handleSubmit}>update</button>
                </div>
            </div>
        </div>
    )
}