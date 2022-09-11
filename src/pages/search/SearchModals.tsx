import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from "react-bootstrap";
// import { SelectContainer } from 'react-select/dist/declarations/src/components/containers';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';



const SearchModals = (props:any) => {

    const [StoredNamePage, setStoredNamePage] = useState<any[]>([])
    const { dataPage } = useSelector((state: RootState) => state.GetPageSets)
    
    let singleOptions:any=[]
    
    useEffect(() => {
        if (dataPage && ("myPageSets") in dataPage) {
            let dataArray: any = [];
            let name: any = [];
            // setAllDataPage(dataPage["myPageSets"])
            dataPage["myPageSets"].forEach((e: any) => {
                let key = null;
                key = Object.keys(e);
                name.push(Object.keys(e)[0])
                dataArray.push(e[key[0]])
            });
            setStoredNamePage(name)
        }
    }, [dataPage])
    
    StoredNamePage?.forEach((el:any) => {
        singleOptions.push({ value: el, label: el })
    });
        
  return (
    <div>
        <Modal show={props.showPop} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>DELETE SAVED SEARCH</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="px-5">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Are you sure you want to delete this?</Form.Label>

                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.deleteSearchdata}>
                        Yes
                    </Button>
                    <Button variant="light" onClick={props.handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
        </Modal>

        <Modal show={props.showPop2} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>UPDATE SEARCH SET</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="px-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Update Search as</Form.Label>
                        <Form.Control type="text" value={`${props.searchFileName}`} onChange={(e: any) => props.setSearchFileName(e.target.value)} />
                        {/* <Form.Control type="text" /> */}
                    </Form.Group>
                    <span className="text-danger">{props.searchFileName.trim() === '' || props.condition ? props.NameError : ""}</span>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" onClick={saveNewDoc}> */}
                <Button variant="secondary" onClick={props.saveNewSearchedterm}>
                    Save
                </Button>
                <Button variant="light" onClick={props.handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={props.showPopSavePage} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Save Page</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="px-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                    <input type="radio" name="fav_language" value="new" onChange={props.handleInputChange}/>
                    <label className='ms-1'>Add New</label><br />
                    <input type="radio" name="fav_language" value="existing" onChange={props.handleInputChange} defaultChecked/>
                    <label className='ms-1'>Add Existing</label><br />

                    {props.radioType==="new" ?
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Save New Pages As</Form.Label>
                        
                        <Form.Control type="text"  onChange={(e: any) => props.setSavePageFileName(e.target.value)} />

                    </Form.Group> 
                     :
                     <>
                        
                        <Select value={props.savePageFileName} onChange={(e: any) => {props.setSavePageFileName(e)}} options={StoredNamePage? singleOptions || []:[] } />
                    </>
                    }
                    </Form.Group>
                    <span className="text-danger">{props.searchFileName.trim() === '' || props.condition ? props.NameError : ""}</span> 
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" onClick={saveNewDoc}> */}
                <Button variant="secondary" onClick={props.savePageSearched}>
                    Save
                </Button>
                <Button variant="light" onClick={props.handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>


        <Modal show={props.showSaveSearchModal} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Save New SEARCH SET</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="px-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Save New Search as</Form.Label>
                        <Form.Control type="text" onChange={(e: any) => props.setSaveSearchFileName(e.target.value)} />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" onClick={saveNewDoc}> */}
                <Button variant="secondary" onClick={props.save_search}>
                    Save
                </Button>
                <Button variant="light" onClick={props.handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>


        {/* <Modal className="zr-PdfPopUp" show={props.showFrame} onHide={props.handleClossPDF}>
            <Modal.Header closeButton>
                <Modal.Title>Document</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="px-2">
                    <Form.Group controlId="formBasicEmail">
                        <div className="bg-white p-4 d-flex justify-content-center zr-pdfFrame-popUp">
                            <iframe src={`data:application/pdf;base64,${props.selectedDoc}`} className="img-fluid"/>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal> */}

    </div>
  )
}

export default SearchModals