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
        <div>
            <p>{look.name}</p>
            <p>{look.description}</p>
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
            <p>complete: {`${look.completed}`}</p>
            <button onClick={toggleComplete}> mark complete </button>
            <button onClick={deleteLook}>delete look</button>
            <button onClick={() => {
                handleEditing(look)
                history.push('/look')
                }}>edit</button>
        </div>
    )
}

