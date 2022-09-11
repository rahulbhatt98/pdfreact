import React, { useState } from 'react'
import {  Accordion, Card, Form } from "react-bootstrap";
import moment from 'moment';
import { editICon, deleteIcon, manageDocICon, openDocument } from "utils/icons";
import { SaveNewDocuments, getDocuments } from 'store/actions/documents';
import {  useDispatch } from "react-redux"
import { getDocumentSets } from 'pages/Extract/ExtractDocumentSlice';


const AccordianDisplayDocument = (props: any) => {
    const [selectedId, setSelectedId] = useState<string | null>("");
    const dispatch = useDispatch()

    const [selectedDocs, setSelectedDocs] = useState<object[]>([])
    const handleDocChange = (e: any, data: any, index1: string) => {
        
        setSelectedId(index1)

        if (e.target.checked) {
            setSelectedDocs([...selectedDocs, data])
        } else {
            setSelectedDocs(selectedDocs.filter((item: any) => {
                return item.id !== data.id
            }))
        }
    }
    const deleteDoc = async (name: string) => {

        let filterData = props.allData.filter((e: any) => {

            return (Object.keys(e))[0] === name
        });

        
        if (selectedDocs.length) {
            let idList = filterData[0][name]['documents'].filter((itemA: any) => {
                return !selectedDocs.find((itemB: any) => {
                    return itemA.document_name === itemB.document_name;
                })
            })

            await dispatch(SaveNewDocuments({ idList, name }))
            dispatch(getDocumentSets())
            dispatch(getDocuments())
            var clsElements = document.querySelectorAll(".cs-check-btn input");
            clsElements.forEach(function (node) {
                const ele = node as HTMLInputElement;
                ele.checked = false;
            });
            setSelectedDocs([])
 
        }
        
    }
   
    return (
           <Accordion  alwaysOpen >
            {props.allData && props.allData.map((item: any, index: string) => {
                let name = Object.keys(item)[0]
                return (
                        <Accordion.Item eventKey={`${index}`} key={index} className="mb-2">
                            <Accordion.Header>{name}
                                <div className="action-button-outer">
                                <span className="badge-secondary badge" style={{background: "#dfdfdf", lineHeight: "15px", color: "#333"}} onClick={(e: any) => {
                                        props.editFunction(e, "documents")
                                        props.setDocumentName(name)
                                        props.setDocName(name)
                                    }}>Rename document</span>
                                <span className="mx-2 custom-action-btn" onClick={(e)=>props.createFunction(item)}>{editICon}</span>
                                   
                                    <span className="custom-action-btn" onClick={(e: any) => {
                                        props.setDocumentName(name)
                                        props.setDocName(name)
                                        props.deleteFunction(e, "documents")
                                    }}>{deleteIcon}</span>
                                </div>
                            </Accordion.Header>

                            <Accordion.Body>
                                <div>
                                    {selectedDocs.length && index===selectedId?
                                        <div className="alert zr-doc-alert py-1 px-3 d-flex justify-content-between align-items-baseline" role="alert">
                                            <p className="m-0">Are your sure you Wants to delete the selected items?</p>
                                            <button className=" btn btn-primary btn-sm" onClick={() => deleteDoc(name)}>delete</button>
                                        </div > : ""}
                                    <div className="doc-card">
                                        {item[name].documents.map((i: any, index1: string) => {
                                            return (
                                                
                                                <Card key={index1}>
                                                    <Form.Check
                                                        onClick={(e) => handleDocChange(e, {
                                                            "document_name": i.document_name,
                                                            "index": "10k",
                                                            "num_pages": i.num_pages,
                                                            "id": i.id,
                                                            // [format]: singleItem[format]
                                                        }, index)}
                                                        id={index}
                                                        className="cs-check-btn input"

                                                    />
                                                  
                                                    <Card.Body className="p-0">
                                                        <span>
                                                            {manageDocICon}
                                                            <span className="ms-2">{i.document_name}</span>
                                                        </span>

                                                        <div className="ps-4 d-flex flex-column mt-2">
                                                            <span><span className="text-black-50">Number of Pages:</span> {i.num_pages}</span>
                                                            <span><span className="text-black-50">Date:</span> {moment(item[name].date_created).format("YYYY-MM-DD")}</span>
                                                            <span><span className="text-black-50">Owner:</span> {item[name].owner}</span>
                                                        </div>

                                                    </Card.Body>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                   
                )
            })}
             </Accordion>
    )
}

export default AccordianDisplayDocument