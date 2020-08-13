import React, { useState } from 'react';

export default function Profile({ currentUser, setCurrentUser }) {
    // const { background_color, facechart, id, username, password_digest } = currentUser
    console.log(currentUser)

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
        .then(updatedUser => setCurrentUser(updatedUser))
    }

    return (
        <div>
               <input className="underline-input" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username"/>
                <br/>
                <input className="underline-input"  value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
                <br/>

                <div>
                    <div>
                        <p>select skin tone</p>
                        <p>this can be updated in your profile later</p>
                    </div>
                    <input type="color" value={background_color} onChange={(e) => setBackgroundColor(e.target.value)} className="align-middle"></input>
                </div>

                <button type="submit" onClick={handleSubmit}>Submit</button>

        </div>
    )
}