import React from 'react';
import CanvasDraw from "react-canvas-draw";

export default class LookForm extends React.Component {
    state = {
        sketch: null,
        name: '',
        description: '',
        colors: ["pink", "purple", "green"],
        user_id: 1,
        color: "#00a6ff",
        width: 600,
        height: 700,
        brushRadius: 5,
        lazyRadius: 0,
        background_image: "https://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/Facechart_728x700.png",
        //this should come from users BC
        background_color: "#ffe0d4"
    }

    componentDidMount() {

    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)

        fetch('http://localhost:3000/looks', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(this.state)
        })
        .then(r => r.json())
        .then(newLook => {
            console.log(newLook)
            this.props.setLooks(prevLooks => [newLook, ...prevLooks])
        })

        this.saveableCanvas.clear()
    }

    render() {
    return (
        <form onSubmit={this.handleSubmit}> 
            <input type="text" value={this.state.name} onChange={this.handleInput} name="name" placeholder="look name"></input>
            <input type="text" value={this.state.description} onChange={this.handleInput} name="description" placeholder="description"></input>

            <CanvasDraw
                onChange={()=> {this.setState({sketch: JSON.parse(this.saveableCanvas.getSaveData())})}}
                hideGrid
                ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                brushColor={this.state.color}
                brushRadius={this.state.brushRadius}
                lazyRadius={this.state.lazyRadius}
                canvasWidth={this.state.width}
                canvasHeight={this.state.height}
                imgSrc={this.state.background_image}
                backgroundColor={this.state.background_color}
            />

            <div>
            </div>
            <button type="submit">submit</button>
        </form>
    )}
}