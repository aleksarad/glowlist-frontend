import React from 'react';
import { fabric } from "fabric";

export default class LookForm extends React.Component {
    state = {
        sketch: null,
        name: '',
        description: '',
        colors: ["pink", "purple", "green"],
        user_id: 1
    }

    componentDidMount() {
        const canvas = new fabric.Canvas("new-canvas", {
            isDrawingMode:true
        })

        // fabric.Image.fromURL("ihttps://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/Facechart_728x700.png", function (img) {    
        //     canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        //         scaleX: canvas.width / img.width,
        //         scaleY: canvas.height / img.height
        //     });
        // });
        const img = 'https://i.pinimg.com/474x/aa/0a/a3/aa0aa341add4066fe4bffc9f0880d84d.jpg'
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            width: canvas.width,
            height: canvas.height,
            originX: 'left',
            originY: 'top'
        });


        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = 30;

        // const newObj = {
        //     objs: JSON.stringify(canvas._objects)
        // }

        this.setState({
            sketch: canvas
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(JSON.stringify(this.state))

        // fetch('http://localhost:3000/looks', {
        //     method: 'POST',
        //     headers: {
        //     "Content-Type": "application/json",
        //     "Accept": "application/json",
        //   },
        //   body: JSON.stringify(this.state)
        // })
        // .then(r => r.json())
        // .then(console.log)
    }

    // t.string "name"
    // t.string "description"
    // t.string "finished_look", default: ""
    // t.string "colors", default: [], array: true
    // t.boolean "completed", default: false
    // t.integer "user_id"
    // t.json "sketch", default: {}
    // t.datetime "created_at", precision: 6, null: false
    // t.datetime "updated_at", precision: 6, null: false


    render(){
    return (
        <form onSubmit={this.handleSubmit}> 
            <input type="text" value={this.state.name} onChange={this.handleInput} name="name" placeholder="look name"></input>
            <input type="text" value={this.state.description} onChange={this.handleInput} name="description" placeholder="description"></input>


            <div>
            <canvas id="new-canvas" width="500" height="600"></canvas>
            </div>
            <button type="submit">submit</button>
        </form>
    )}
}