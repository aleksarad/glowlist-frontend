import React, { useState, useEffect } from 'react';
import { fabric } from "fabric";

// export default function LookCard({ look }) {
//     useEffect(() => {
//         const disabledCanvas = new fabric.Canvas("card-canvas")
//         disabledCanvas.loadFromJSON(look.sketch)
//     }, 
//     []);

//     return (
//         <div>
//             <p>{look.name}</p>
//             <p>{look.description}</p>
//             <canvas id="card-canvas" width="500" height="600"></canvas>
//         </div>
//     )
// }

export default class LookCard extends React.Component {
    componentDidMount() {
        const disabledCanvas = new fabric.Canvas(`${this.props.look.id}`, {
            isDrawingMode: false,
            selection: false
        })
        const json = this.props.look.sketch
        
        this.loadCanvas(json, disabledCanvas)
    }

            
    loadCanvas = (json, canvas) => {

        // parse the data into the canvas
        canvas.loadFromJSON(json);
      
        // re-render the canvas
        canvas.renderAll();
      }

    render() {
        // console.log(JSON.stringify(this.props.look.sketch))
        const { look } = this.props
        return (
            <div>
                <p>{look.name}</p>
                <p>{look.description}</p>
                <canvas width="500" height="600" id={look.id}></canvas>
            </div>
        )
    }
}