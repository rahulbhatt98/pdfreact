import React from 'react'
import { Modal,Form,Button } from "react-bootstrap";

const RenameModal = (props:any) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>SAVE NEW {props.typeName?.toUpperCase()}  SET</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="px-5">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Save New {props.typeName?.toUpperCase()}  as</Form.Label>
                            <Form.Control type="text" value={`${props.docName}`} onChange={(e: any) => props.setDocName(e.target.value)} />
                        </Form.Group>
                        <span className="text-danger">{props.docName === '' || props.condition ? props.NameError : ""}</span>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.saveNewDoc}>
                        Save
                    </Button>
                    <Button variant="light" onClick={props.handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
  )
}

export default RenameModal