import React from 'react'
import { Modal } from 'react-bootstrap'
import PdftronTableCells from 'PdftronTableCells'
const PdftronModal = (props:any) => {
  return (
    <Modal
        show={props.show}
        onHide={props.handleClose}
        dialogClassName="zr-custom-extract-modal-dialogue"
        className="zr-custom-extract-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>PDF</Modal.Title>
        </Modal.Header>
        <Modal.Body className="zr-custom-modal-body-dp">
          {/* <iframe src={`${imageName}#toolbar=0`} title={`${imageName}`} className="img-fluid" /> */}
          <PdftronTableCells document={props.document} highlightTextMag={props.highlightTextMag} highlightText={props.highlightText} rectCords={props.rectCords}/>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
  )
}

export default PdftronModal