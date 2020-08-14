import React, { useState, useEffect } from 'react';
import CanvasDraw from "react-canvas-draw";

export default function LookCard({ look, setLooks, handleEditing, history, updateLookState }) {
    useEffect(() => {
    }, 
    []);

    const  [width, setWidth] = useState(400);
    const  [height, setHeight] = useState(400);

    const deleteLook = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        
        fetch(`http://localhost:3000/looks/${look.id}`, {
          method: 'DELETE',
          headers: {
            "Authorization": `Bearer ${token}`
          },
        })
        .then(r => r.json())
        .then(setLooks(prevLooks => prevLooks.filter(l => l.id !== look.id))) 
    }

    const toggleComplete = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        fetch(`http://localhost:3000/looks/${look.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                    body: JSON.stringify({completed: !look.completed})
                })
                .then(r => r.json())
                .then(updatedObj => updateLookState(updatedObj))
    }

    return (
        <div className="look-card">

            <div className="left-column">
                <h2 className="look-name">{look.name}</h2>
                <p className="look-description">{look.description}</p>
                <div>
                    <p>color story: </p>
                    {look.colors.map(color => <span 
                    style={{backgroundColor:color,
                        height: '50px', width: '50px',
                        display: 'inline-block',
                        borderRadius: '5px',
                        marginRight: '5px'}}>
                    </span>)}
                </div>
                <div>
                    <button onClick={deleteLook}>delete look</button>
                    <button onClick={() => {
                        handleEditing(look)
                        history.push('/look')
                        }}>edit</button>
                </div>
            </div>

            <div className="right-column">
                <CanvasDraw
                    saveData={JSON.stringify(look.sketch)}
                    disabled
                    hideGrid
                    immediateLoading={true}
                    imgSrc={look.background_image}
                    canvasHeight={height}
                    canvasWidth={width}
                    backgroundColor={look.background_color}
                />
                <div className="mark-completed">
                    <span>mark complete</span>
                    {/* <button onClick={toggleComplete}> mark complete </button> */}
                    { !look.completed ?
                    <svg onClick={toggleComplete} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    </svg>
                    :
                    <svg onClick={toggleComplete} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                    </svg>
                    }
                </div>
            </div>

            {/* <button onClick={deleteLook}>delete look</button>
            <button onClick={() => {
                handleEditing(look)
                history.push('/look')
                }}>edit</button> */}
        </div>
    )
}

