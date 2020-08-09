import React, { useState, useEffect } from 'react';
import CanvasDraw from "react-canvas-draw";

export default function LookCard({ look, setLooks }) {
    useEffect(() => {
    }, 
    []);

    const  [width, setWidth] = useState(400);
    const  [height, setHeight] = useState(400);

    const deleteLook = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/looks/${look.id}`, {
          method: 'DELETE'
        })
        .then(r => r.json())
        .then(setLooks(prevLooks => prevLooks.filter(l => l.id !== look.id))) 
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
            <button onClick={deleteLook}>delete look</button>
            <button>edit</button>
        </div>
    )
}

