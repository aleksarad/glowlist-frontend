import React from 'react';
import CanvasDraw from "react-canvas-draw";
import {ChromePicker, BlockPicker} from 'react-color';
import reactCSS from 'reactcss'

export default class LookForm extends React.Component {
    state = {
        sketch: null,
        name: '',
        description: '',
        colors: [
            "pink", "purple", "green"
        ],
        // user_id: this.props.currentUser.id,
        color: "rgba(155,12,60,0.3)",
        width: 500,
        height: 500,
        brushRadius: 5,
        lazyRadius: 0,
        background_image: "https://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/Facechart_728x700.png",
        //this should come from users BC
        background_color: "#ffe0d4",
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
                background_image: editing.background_image,
                //this should come from users BC
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
                    this
                        .props
                        .setLooks(prevLooks => [
                            newLook, ...prevLooks
                        ])
                })
        }

        this.saveableCanvas.clear()
        this.props.history.push('/feed')
    }

    render() {
        const styles = reactCSS({
            'default': {
              color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background:`${this.state.color}`,
              },
              swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              },
              popover: {
                position: 'absolute',
                zIndex: '2',
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
            },
        });

        return (
            <div>
            <h1>Look</h1>

            <input
                type="text"
                value={this.state.name}
                onChange={this.handleInput}
                name="name"
                placeholder="look name"></input>
            <input
                type="text"
                value={this.state.description}
                onChange={this.handleInput}
                name="description"
                placeholder="description"></input>

            <button className="button" onClick={() => this.saveableCanvas.clear()}>
                clear
            </button>
            <button className="button undo" onClick={() => this.saveableCanvas.undo()}>
                undo
            </button>

            <CanvasDraw
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
                canvasWidth={this.state.width}
                canvasHeight={this.state.height}
                imgSrc={this.state.background_image}
                backgroundColor={this.state.background_color}
                saveData={this.props.editing !== null
                ? JSON.stringify(this.props.editing.sketch)
                : ''}
                immediateLoading={true}/>

            <label>brush:</label>
            <input
                type="number"
                value={this.state.brushRadius}
                onChange={e => this.setState({
                brushRadius: parseInt(e.target.value, 10)
            })}/>

            <div style={ styles.swatch } onClick={ this.handleClick }>
                <div style={ styles.color } />
            </div>
                { this.state.displayColorPicker ? <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.handleClose }/>
                <ChromePicker color={ this.state.color } onChange={(color) => this.handleColorChange(color.rgb)} />
             </div> : null }


            <button onClick={this.handleSubmit}>submit</button>
        </div> 
        )
    }
}