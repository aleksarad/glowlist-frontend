import React, { useEffect, useState, useRef } from 'react';
import CanvasDraw from "react-canvas-draw";
import { Popover, OverlayTrigger, Overlay } from 'react-bootstrap/'


export default class LookCard extends React.Component {
    state = {
        width: 400,
        height: 400
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize);

        // this is reusblable, store in function!
        if(window.innerWidth < 768) {
            this.setState({
                height: 250,
                width: 250,
            })
            this.saveableCanvas.loadSaveData(
                JSON.stringify(this.props.look.sketch))
        }
        if(window.innerWidth > 786 && window.innerWidth < 992) {
            this.setState({
                height: 250,
                width: 250,
            })
            this.saveableCanvas.loadSaveData(
                JSON.stringify(this.props.look.sketch))
        }
        if(window.innerWidth > 992 && window.innerWidth < 1200) {
            this.setState({
                height: 300,
                width: 300,
            })
            this.saveableCanvas.loadSaveData(
                JSON.stringify(this.props.look.sketch))
        }
        if(window.innerWidth > 1200 && window.innerWidth < 1440) {
            //my laptop
            this.setState({
                height: 400,
                width: 400,
            })
            this.saveableCanvas.loadSaveData(
                JSON.stringify(this.props.look.sketch))
        }
        if(window.innerWidth > 1440) {
            this.setState({
                height: 650,
                width: 650,
            })
            this.saveableCanvas.loadSaveData(
                JSON.stringify(this.props.look.sketch))
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    onResize = (event) => {

        if(window.innerWidth < 768) {
            this.setState({
                height: 200,
                width: 200,
            })
            this.saveableCanvas.loadSaveData(
                JSON.stringify(this.props.look.sketch))
        }
        if(window.innerWidth > 786 && window.innerWidth < 992) {
            this.setState({
                height: 250,
                width: 250,
            })
            this.saveableCanvas.loadSaveData(
                JSON.stringify(this.props.look.sketch))
        }
        if(window.innerWidth > 992 && window.innerWidth < 1200) {
            this.setState({
                height: 300,
                width: 300,
            })
            this.saveableCanvas.loadSaveData(
                JSON.stringify(this.props.look.sketch))
        }
        if(window.innerWidth > 1200 && window.innerWidth < 1440) {
            //my laptop
            this.setState({
                height: 400,
                width: 400,
            })
            this.saveableCanvas.loadSaveData(
                JSON.stringify(this.props.look.sketch))
        }
        if(window.innerWidth > 1440) {
            this.setState({
                height: 600,
                width: 600,
            })
            this.saveableCanvas.loadSaveData(
                JSON.stringify(this.props.look.sketch))
        }
    }

    deleteLook = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        
        fetch(`http://localhost:3000/looks/${this.props.look.id}`, {
          method: 'DELETE',
          headers: {
            "Authorization": `Bearer ${token}`
          },
        })
        .then(r => r.json())
        .then(this.props.setLooks(prevLooks => prevLooks.filter(l => l.id !== this.props.look.id))) 
    }

    toggleComplete = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        fetch(`http://localhost:3000/looks/${this.props.look.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                    body: JSON.stringify({completed: !this.props.look.completed})
                })
                .then(r => r.json())
                .then(updatedObj => this.props.updateLookState(updatedObj))
    }


    render () {
        const popover = (
            <Popover id="popover-basic">
              <Popover.Content>
                <button className="delete-button" onClick={this.deleteLook}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                        </svg>
                </button>
              </Popover.Content>
            </Popover>
          )
        const look = this.props.look
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
                        this.props.handleEditing(look)
                        this.props.history.push('/look')
                        }}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                    </button>
                </div>
            </div>

            <div className="right-column">
                <div className="disabled-canvas-container">
                    <CanvasDraw
                        className="disabled-canvas"
                        saveData={JSON.stringify(look.sketch)}
                        disabled
                        hideGrid
                        immediateLoading={true}
                        imgSrc={look.background_image}
                        ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                        canvasHeight={this.state.width}
                        canvasWidth={this.state.height}
                        backgroundColor={look.background_color}
                    />
                </div>
                <div className="mark-completed">
                    <span>mark complete</span>
                    { !look.completed ?
                    <svg onClick={this.toggleComplete} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    </svg>
                    :
                    <svg onClick={this.toggleComplete} style={{boxShadow:'0px 0px 2px #ff76c6, 0px 0px 5px #ff76c6, 0px 0px 10px #ff76c6, 0px 0px 15px #ff76c6'}} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="#ff76c6" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                    </svg>
                    }
                </div>
            </div>
        </div>
    )}
}



// export default function LookCard({ look, setLooks, handleEditing, history, updateLookState }) {
//     const loadCanvas = useRef(null)

//     let onResize = (event) => {
//         if(window.innerWidth < 992) {
//             console.log("i'm small")
//             setHeight(100)
//             setWidth(100)
//             // loadCanvas.loadSaveData(
//             //     JSON.stringify(look.sketch)
//             // )
//         }
//         if(window.innerWidth > 992) {
//             console.log("big boy")
//             setHeight(600)
//             setWidth(600)
//             // loadCanvas.loadSaveData(
//             //     JSON.stringify(look.sketch)
//             // )
//         }
//     }
    
//     useEffect(() => {
//         if (window){
//           window.addEventListener('resize', onResize);
//         }
//         return () => {
//           window.removeEventListener('resize', onResize);
//         }
//     }, []);

//     const [width, setWidth] = useState(400)
//     const [height, setHeight] = useState(400)


//     const deleteLook = (e) => {
//         e.preventDefault()
//         const token = localStorage.getItem("token")
        
//         fetch(`http://localhost:3000/looks/${look.id}`, {
//           method: 'DELETE',
//           headers: {
//             "Authorization": `Bearer ${token}`
//           },
//         })
//         .then(r => r.json())
//         .then(setLooks(prevLooks => prevLooks.filter(l => l.id !== look.id))) 
//     }

//     const toggleComplete = (e) => {
//         e.preventDefault()
//         const token = localStorage.getItem("token")

//         fetch(`http://localhost:3000/looks/${look.id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                     body: JSON.stringify({completed: !look.completed})
//                 })
//                 .then(r => r.json())
//                 .then(updatedObj => updateLookState(updatedObj))
//     }

//     const popover = (
//         <Popover id="popover-basic">
//           <Popover.Content>
//             <button className="delete-button" onClick={deleteLook}>
//                     <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                         <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
//                     </svg>
//             </button>
//           </Popover.Content>
//         </Popover>
//       );

//     return (
//         <div className="look-card">
//             <div className="left-column">
//                 <h2 
//                 className="look-name"
//                 style={{textShadow: `0px 0px 10px ${look.colors[0]}, 0px 0px 15px ${look.colors[0]}, 0px 0px 20px ${look.colors[0]}`}}>
//                 {look.name}</h2>
//                 <p className="look-description">{look.description}</p>
//                 <div>
//                     <p className="color-story-label">color story: </p>
//                     {look.colors.map(color => <span 
//                     style={{backgroundColor:color,
//                         height: '50px', width: '50px',
//                         display: 'inline-block',
//                         borderRadius: '5px',
//                         marginRight: '5px'}}>
//                     </span>)}
//                 </div>
//                 <div>
//                     <OverlayTrigger trigger="click" placement="left" overlay={popover}>
//                         <span style={{fontWeight: '700', fontSize: '2.5rem', cursor: 'pointer'}} class="align-middle">...</span>
//                     </OverlayTrigger>
//                     <button className="edit-button" onClick={() => {
//                         handleEditing(look)
//                         history.push('/look')
//                         }}>
//                     <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
//                         <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
//                     </svg>
//                     </button>
//                 </div>
//             </div>

//             <div className="right-column">
//                 <CanvasDraw
//                     style={{backgroundColor: `${look.background_color}`}}
//                     className="disabled-canvas"
//                     saveData={JSON.stringify(look.sketch)}
//                     disabled
//                     hideGrid
//                     immediateLoading={true}
//                     imgSrc={look.background_image}
//                     ref={t => (loadCanvas = t)}
//                     canvasHeight={width}
//                     canvasWidth={height}
//                     // backgroundColor={look.background_color}
//                 />
//                 <div className="mark-completed">
//                     <span>mark complete</span>
//                     { !look.completed ?
//                     <svg onClick={toggleComplete} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                         <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
//                     </svg>
//                     :
//                     <svg onClick={toggleComplete} style={{boxShadow:'0px 0px 2px #ff76c6, 0px 0px 5px #ff76c6, 0px 0px 10px #ff76c6, 0px 0px 15px #ff76c6'}} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="#ff76c6" xmlns="http://www.w3.org/2000/svg">
//                         <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
//                         <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
//                     </svg>
//                     }
//                 </div>
//             </div>
//             {console.log(loadCanvas)}
//         </div>
//     )
// }

