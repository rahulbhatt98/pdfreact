import React from 'react'
import { Modal } from "react-bootstrap";

const ZoomModal = (props:any) => {
  return (
    <Modal
    show={props.show3}
    onHide={props.handleClose}
    dialogClassName="zr-custom-extract-modal-dialogue"
    className="zr-custom-extract-modal"
>
    <Modal.Header closeButton>
        <Modal.Title>{props.displayType}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="zr-custom-modal-body">
    {(props.displayType === "table_html" || props.displayType === "table_xml" || props.displayType === "page_xml")?
     <div dangerouslySetInnerHTML={{ __html:props.imageName}}></div>: <img src={props.imageName} className="img-fluid" alt="img png" />}
      
    </Modal.Body>
    <Modal.Footer>
        
    </Modal.Footer>
</Modal>
  )
}

export default ZoomModal