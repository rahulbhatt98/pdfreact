
import React, { useState } from 'react'
import { Form, Button, Modal, Col, Row } from "react-bootstrap";
import Select from 'react-select';


const EditModal = (props: any) => {

    const [selectedOption, setSelectedOption] = useState<string | null>("");
    const [radioType, setRadioType] = useState<any>("")

    let singleOptions: any = []
    const handleChange = (e: any) => {
        setRadioType(e.target.value)
    }

    props.name?.forEach((el: any) => {
        singleOptions.push({ value: el, label: el })
    });

    const handleChange2 = (e: any) => {
        setSelectedOption(e)

        props.setDocName(e.value)
    }


    return (
        <Modal
            show={props.modalshow}
            onHide={props.handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>SAVE NEW {(props.typeN).toUpperCase()} SET</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="px-5">
                    <Row className='mb-3'>
                        <Col>
                            <label>
                                <input type="radio" name="fav_language" value="new" onChange={handleChange} style={{ marginRight: "5px" }} />
                                Add New
                            </label>
                        </Col>
                        <Col>
                            <label>
                                <input type="radio" name="fav_language" value="existing" onChange={handleChange} defaultChecked style={{ marginRight: "5px" }} />
                                Add to Existing
                            </label>
                        </Col>
                    </Row>


                    {radioType === "new" ? <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Save New {props.typeN} as</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name"
                            onChange={(e) => props.setDocName(e.target.value)} />
                    </Form.Group> : <Select
                        // isMulti
                        value={selectedOption}
                        onChange={(e: any) => handleChange2(e)}
                        options={props.name ? singleOptions || [] : []}
                    // closeMenuOnSelect={false}
                    />}
                    <span className="text-danger">{props.docName === '' || props.condition ? props.NameError : ""}</span>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {(props.isSaved && props.isBlocked) ?
                    <Button variant="secondary">
                        Saved
                    </Button> :
                    <Button variant="secondary"
                        onClick={props.continueSvingDoc}>
                        Save
                    </Button>}
                <Button variant="light" onClick={props.handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditModal