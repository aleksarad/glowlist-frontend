import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import faceChart1 from '../images/faceChart1.png'
import faceChart2 from '../images/faceChart2.png'
import faceChart3 from '../images/faceChart3.png'

export default function SignUp({ history, show, onHide, handleLogin, setCurrentUser }) {

    const [error, setError] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [facechart, setFaceChart] = useState("")
    const [background_color, setBackgroundColor] = useState("#9c5941")


    const handleSubmit = (evt) => {
      evt.preventDefault()
      fetch(`https://glowlist-api.herokuapp.com/users`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify({
              username,
              password,
              background_color,
              facechart
          })
      })
      .then(resp => resp.json())
      .then(data => {
        if(data.token) {
            setCurrentUser(data.user)
            localStorage.setItem("token", data.token)
            handleLogin(data.user)
            setError(null)
            onHide()
            history.push('/feed')
        }
        else {
            console.log(data)
            setError(data.error)
        }
    })
  }

  const updateFace = (e) => {
    setFaceChart(e.target.name)
  }

  const renderErrors = error.map(err => <p style={{textAlign: 'center', fontStyle: 'italic'}}>{err}</p>)

    return (
        <Modal
        show={show}
        onHide={onHide}
        scrollable={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="">
        </Modal.Header>
        <Modal.Body>
        <div className="modal-body-container">   

                <h1 style={{textAlign: 'center'}}>create an account</h1>
                {renderErrors}
                <input className="underline-input" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username"/>
                <br/>
                <input className="underline-input"  value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
                <br/>

                <div id="color-preference-container">
                    <div>
                        <p>select skin tone</p>
                        <p className="smaller-p">this can be updated in your profile later</p>
                    </div>
                    <input type="color" value={background_color} onChange={(e) => setBackgroundColor(e.target.value)} className="align-middle"></input>
                </div>

                <div className="facechart-preference-container">
                    <div className="p-container">
                        <p>select face chart</p>
                        <p className="smaller-p">this can be updated in your profile later</p>
                    </div>
                    <div className="face-chart-container">
                      <img src={faceChart1} alt="face chart style 1: an oval shaped face with brown eyes and prominent cheekbones" style={{backgroundColor: background_color}} className={facechart === "faceChart1" ? 'selected-chart facechart' : 'facechart'} name="faceChart1" onClick={updateFace}></img>
                      <img src={faceChart2} alt="face chart style 2: a diamond shaped face with blue eyes" style={{backgroundColor: background_color}} className={facechart === "faceChart2" ? 'selected-chart facechart' : 'facechart'} name="faceChart2" onClick={updateFace}></img>
                      <img src={faceChart3} alt="face chart style 3: a heart shaped face with green eyes" style={{backgroundColor: background_color}} className={facechart === "faceChart3" ? 'selected-chart facechart' : 'facechart'} name="faceChart3" onClick={updateFace}></img>
                    </div>
                </div>

                
        </div>
        <div className="form-footer">
             <button className="important-button" type="submit" onClick={handleSubmit}>Submit</button>
        </div>
        </Modal.Body>
      </Modal>
    )
}