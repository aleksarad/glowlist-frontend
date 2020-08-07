import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function SignUp(props) {

    useEffect(() => console.log("mounted"))

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
            <button onClick={props.onHide}>close</button>
        </Modal.Footer>
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