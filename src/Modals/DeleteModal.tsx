import React from 'react'
import { Modal,Form,Button } from "react-bootstrap";

const DeleteModal = (props:any) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>DELETE {props.typeName?.toUpperCase()}  SET</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="px-5">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Are you sure you want to delete this</Form.Label>

                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.deleteData}>
                        Yes
                    </Button>
                    <Button variant="light" onClick={props.handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
  )
}

export default DeleteModal