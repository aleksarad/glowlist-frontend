import React from 'react';
import CanvasDraw from "react-canvas-draw";
import {ChromePicker, BlockPicker, HuePicker, AlphaPicker, CompactPicker, GithubPicker} from 'react-color';
import reactCSS from 'reactcss'
import faceChart1 from '../images/faceChart1.png'
import faceChart2 from '../images/faceChart2.png'
import faceChart3 from '../images/faceChart3.png'

const findFaceChart = (faceChart) => {
    if(faceChart.includes("faceChart1")) {
        return faceChart1
    }
    else if(faceChart.includes("faceChart2")) {
        return faceChart2
    }
    else if(faceChart.includes("faceChart3")) {
        return faceChart3
    }
}


export default class LookForm extends React.Component {
    state = {
        sketch: null,
        name: '',
        description: '',
        colors: [],
        user_id: this.props.currentUser.id,
        color: "rgba(255,51,153,1)",
        width: 550,
        height: 550,
        brushRadius: 5,
        lazyRadius: 0,
        background_image: findFaceChart(this.props.currentUser.facechart),
        //this should come from users BC
        background_color: this.props.currentUser.background_color,
        displayColorPicker: false
    }

    componentDidMount() {
        const editing = this.props.editing
        if (editing !== null) {
            this.setState({
                sketch: JSON.stringify(this.saveableCanvas.getSaveData()),
                name: editing.name,
                description: editing.description,
                colors: editing.colors,
                user_id: editing.user_id,
                background_image: findFaceChart(editing.background_image),
                background_color: editing.background_color
            })
        }
    }

    componentWillUnmount() {
        this.props.setEditing(null)
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = () => {
        this.setState(prevState => ({
            displayColorPicker: !prevState.displayColorPicker
        }))
    }

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleColorChange = (color) => {
        const rgbColor = `rgba(${color.r},${color.g},${color.b},${color.a})`;
        this.setState({color: rgbColor})
    }

    handleChangeComplete = (color) => {
        const colorsArr = this.state.colors 
        if (colorsArr.length > 8) {
            console.log("too many colors!")
        }
        else {
            colorsArr.push(color.hex)
        }
        this.setState({ colors: colorsArr, displayColorPicker: false})
    }

    deleteColor = (deleting) => {
        const colorsArr = this.state.colors 
        const filtered = colorsArr.filter(color => color !== deleting)
        this.setState({ colors: filtered })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        const editing = this.props.editing

        if (editing !== null) {
            console.log("editing")
            fetch(`http://localhost:3000/looks/${editing.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                    body: JSON.stringify(this.state)
                })
                .then(r => r.json())
                .then(edit => this.props.updateLookState(edit))
        } else {
            console.log("new")
            fetch('http://localhost:3000/looks', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                    body: JSON.stringify(this.state)
                })
                .then(r => r.json())
                .then(newLook => {
                    console.log(newLook)
                    this.props.setLooks(prevLooks => [
                            newLook, ...prevLooks
                        ])
                })
        }

        this.saveableCanvas.clear()
        this.props.history.push('/feed')
    }

    render() {
        console.log(this.props.editing)
        const popover = {
            position: 'absolute',
            zIndex: '2',
          }
          const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          }

          console.log(this.state.colors)
        return (
            <div id="look-form-container">
                <div id="look-form">
                <input
                    className="underline-input top-input"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleInput}
                    name="name"
                    placeholder="look name"></input>
                    <br/>
                <textarea
                    className="description top-input"
                    value={this.state.description}
                    onChange={this.handleInput}
                    name="description"
                    placeholder="description"></textarea>
                <br/>
                <p style={{textAlign: 'left'}} className="sketch-label">sketch</p>

                <div id="sketch-container">
                    <div id="clear-undo-container">
                        <button id="clear" onClick={() => this.saveableCanvas.clear()}>
                        <svg viewBox="0 0 16 16" class="bi bi-x" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                            <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                        </svg>
                        </button>
                        <button id="undo" onClick={() => this.saveableCanvas.undo()}>
                        <svg viewBox="0 0 16 16" class="bi bi-arrow-counterclockwise" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M12.83 6.706a5 5 0 0 0-7.103-3.16.5.5 0 1 1-.454-.892A6 6 0 1 1 2.545 5.5a.5.5 0 1 1 .91.417 5 5 0 1 0 9.375.789z"/>
                            <path fill-rule="evenodd" d="M7.854.146a.5.5 0 0 0-.708 0l-2.5 2.5a.5.5 0 0 0 0 .708l2.5 2.5a.5.5 0 1 0 .708-.708L5.707 3 7.854.854a.5.5 0 0 0 0-.708z"/>
                        </svg>
                        </button>
                    </div>

                    <CanvasDraw
                        style={{backgroundColor: `${this.state.background_color}`}}
                        className="form-canvas-container"
                        onChange={() => {
                        this.setState({
                            sketch: JSON.parse(this.saveableCanvas.getSaveData())
                        })
                    }}
                        hideGrid
                        ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                        brushColor={this.state.color}
                        brushRadius={this.state.brushRadius}
                        lazyRadius={this.state.lazyRadius}
                        // canvasWidth={this.state.width}
                        // canvasHeight={this.state.height}
                        imgSrc={this.state.background_image}
                        // backgroundColor={this.state.background_color}
                        saveData={this.props.editing !== null
                        ? JSON.stringify(this.props.editing.sketch)
                        : ''}
                        immediateLoading={true}/>

                    <label>brush:</label>
                    <input
                        className="underline-input brush-input"
                        type="number"
                        value={this.state.brushRadius}
                        onChange={e => this.setState({
                        brushRadius: parseInt(e.target.value, 10)
                    })}/>

                    <HuePicker className="color-picker" color={this.state.color} onChange={(color) => this.handleColorChange(color.rgb)} onChangeComplete={this.handleChangeComplete} />
                    <AlphaPicker className="color-picker opacity" color={this.state.color} onChange={(color) => this.handleColorChange(color.rgb)} />
                </div>
                <br/>

                <div id="color-story-container">
                    <p className="sketch-label">color story</p>
                    <button className="button" onClick={ this.handleClick }>add swatch</button>
                </div>

                { this.state.displayColorPicker ? <div style={ popover }>
                    <div style={ cover } onClick={ this.handleClose }/>
                    <CompactPicker onChangeComplete={this.handleChangeComplete}/>
                </div> : null }
                    <br/>
                    <br/>

                <div>{this.state.colors.map(color => <span 
                onClick={() => this.deleteColor(color)}
                style={{backgroundColor:color,
                    height: '50px', width: '50px', display: 'inline-block'}}>
                    </span>)}
                </div>
                <br/>
                <button className="important-button" onClick={this.handleSubmit}>submit</button>
                </div>
            </div> 
        )
    }
}