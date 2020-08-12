import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function SignUp({ history, show, onHide, handleLogin }) {


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [facechart, setFaceChart] = useState("124")
    const [background_color, setBackgroundColor] = useState("#9c5941")

    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleSubmit = (evt) => {
      evt.preventDefault()
      fetch(`http://localhost:3000/users`, {
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
            localStorage.setItem("token", data.token)
            handleLogin(data.user)
            onHide()
            history.push('/feed')
        }
        else {
            console.log(data)
        }
    })
  }

    return (
        <Modal
        show={show}
        onHide={onHide}
        scrollable={true}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="">
          {/* <Modal.Title id="contained-modal-title-vcenter" className="">
            create an account
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
        <div>   

                <h1 style={{textAlign: 'center'}}>create an account</h1>
                <input className="underline-input" value={username} onChange={handleUsernameChange} type="text" placeholder="username"/>
                <br/>
                <input className="underline-input"  value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
                <br/>

                <div id="color-preference-container">
                    <div>
                        <p>select skin tone</p>
                        <p>this can be updated in your profile later</p>
                    </div>
                    <input type="color" value={background_color} onChange={(e) => setBackgroundColor(e.target.value)} className="align-middle"></input>
                </div>

                
        </div>
        <div className="form-footer">
             <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
        </Modal.Body>
      </Modal>
    )
}


// export default class SignUp extends React.Component {
//     componentDidMount() {
//         console.log('mounted')
//     }

//     componentWillUnmount() {
//         console.log('unmounted')
//     }

//     render() {
//         return (
//                     <Modal
//                     {...this.props}
//                     size="lg"
//                     aria-labelledby="contained-modal-title-vcenter"
//                     centered
//                   >
//                     <Modal.Header closeButton>
//                       <Modal.Title id="contained-modal-title-vcenter">
//                         Modal heading
//                       </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                       <h4>Centered Modal</h4>
//                       <p>
//                         Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//                         dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//                         consectetur ac, vestibulum at eros.
//                       </p>
//                     </Modal.Body>
//                     <Modal.Footer>
//                       <button onClick={this.props.onHide}>Close</button>
//                     </Modal.Footer>
//                   </Modal>
//                 )
//     }
// }