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
        console.log("mounted lookform")
        const editing = this.props.editing
        if (editing !== null) {
            console.log("editing!")

            this.setState({
                sketch: JSON.stringify(this.saveableCanvas.getSaveData()),
                name: editing.name,
                description: editing.description,
                colors: editing.colors,
                user_id: editing.user_id,
                background_image: editing.background_image,
                //this should come from users BC
                background_color: editing.background_color
            })

        }
        console.log("new")
    }

    componentWillUnmount() {
        this.props.setEditing(null)
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const editing = this.props.editing
        if (editing !== null) {
            console.log("editing")
              fetch(`http://localhost:3000/looks/${editing.id}`, {
                method: 'PATCH',
                headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify(this.state)
              })
              .then(r => r.json())
              .then(edit => this.props.updateLookState(edit))
        }
        else {
            console.log("new")
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
        }

        this.saveableCanvas.clear()
        this.props.history.push('/feed')
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
                brushRadius={5}
                lazyRadius={0}
                canvasWidth={this.state.width}
                canvasHeight={this.state.height}
                imgSrc={this.state.background_image}
                backgroundColor={this.state.background_color}
                saveData={this.props.editing !== null ? JSON.stringify(this.props.editing.sketch) : ''}
                immediateLoading={true}
            />

            <div>
            </div>
            <button type="submit">submit</button>
        </form>
    )}
}