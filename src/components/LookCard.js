import React, { useEffect } from 'react';
import CanvasDraw from "react-canvas-draw";
import { Popover, OverlayTrigger, Overlay } from 'react-bootstrap/'
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

export default function LookCard({ look, setLooks, handleEditing, history, updateLookState }) {
    useEffect(() => {
    }, 
    []);


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

    const popover = (
        <Popover id="popover-basic">
          <Popover.Content>
            <button className="delete-button" onClick={deleteLook}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                    </svg>
            </button>
          </Popover.Content>
        </Popover>
      );

    return (
        <div className="look-card">

            <div className="left-column">
                <h2 
                className="look-name"
                style={{textShadow: `0px 0px 10px ${look.colors[0]}, 0px 0px 15px ${look.colors[0]}, 0px 0px 20px ${look.colors[0]}`}}>
                {look.name}</h2>
                <p className="look-description">{look.description}</p>
                <div>
                    <p className="color-story-label">color story: </p>
                    {look.colors.map(color => <span 
                    style={{backgroundColor:color,
                        height: '50px', width: '50px',
                        display: 'inline-block',
                        borderRadius: '5px',
                        marginRight: '5px'}}>
                    </span>)}
                </div>
                <div>
                    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                        <span style={{fontWeight: '700', fontSize: '2.5rem', cursor: 'pointer'}} class="align-middle">...</span>
                    </OverlayTrigger>
                    <button className="edit-button" onClick={() => {
                        handleEditing(look)
                        history.push('/look')
                        }}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                    </button>
                </div>
            </div>

            <div className="right-column">
                <CanvasDraw
                    style={{backgroundColor: `${look.background_color}`}}
                    className="disabled-canvas"
                    saveData={JSON.stringify(look.sketch)}
                    disabled
                    hideGrid
                    immediateLoading={true}
                    imgSrc={look.background_image}
                    // canvasHeight={height}
                    // canvasWidth={width}
                    // backgroundColor={look.background_color}
                />
                <div className="mark-completed">
                    <span>mark complete</span>
                    { !look.completed ?
                    <svg onClick={toggleComplete} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    </svg>
                    :
                    <svg onClick={toggleComplete} style={{boxShadow:'0px 0px 2px #ff76c6, 0px 0px 5px #ff76c6, 0px 0px 10px #ff76c6, 0px 0px 15px #ff76c6'}} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="#ff76c6" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                    </svg>
                    }
                </div>
            </div>
        </div>
    )
}

