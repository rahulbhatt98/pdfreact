import React, { useState } from 'react'
import { Accordion, Card, CardImg, Form, Button } from "react-bootstrap";
import moment from 'moment';
import { editICon, deleteIcon } from "utils/icons";
import { useDispatch } from "react-redux"

import { ExtractNewDocuments } from 'store/actions/documents'
import { ExtractNewImage } from "store/actions/documents";
import { ExtractNewPage } from "store/actions/documents";
import { getPageSets } from "store/actions/getPageSets";
import { getImageSets } from "store/actions/getImageSets";
import { getTableSets } from "pages/ManageDocuments/getTableSetsSlice";

// new
const AccordianDisplay = (props: any) => {
    const dispatch = useDispatch()
    const [selectedId, setSelectedId] = useState<string | null>("");

    const [selectedDocs, setSelectedDocs] = useState<object[]>([])
    const handleDocChange = (e: any, data: any, index: string) => {

        setSelectedId(index)

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

            let idList = filterData[0][name][props.TypeName].filter((itemA: any) => {
                return !selectedDocs.find((itemB: any) => {
                    return itemA.id === itemB.id;
                })
            })

            if (props.TypeName === "tables") {

                await dispatch(ExtractNewDocuments({ idList, name }))
                dispatch(getTableSets())
                setSelectedDocs([])

            }
            else if (props.TypeName === "images") {

                await dispatch(ExtractNewImage({ idList, name }))
                dispatch(getImageSets())
                setSelectedDocs([])

            }
            else if (props.TypeName === "pages") {

                await dispatch(ExtractNewPage({ idList, name }))
                dispatch(getPageSets())
                setSelectedDocs([])

            }

            var clsElements = document.querySelectorAll(".cs-check-btn input");
            clsElements.forEach(function (node) {
                const ele = node as HTMLInputElement;

                ele.checked = false;
            });
        }

    }
    
    return (
        <>
            <Accordion alwaysOpen>

                {props.allData && props.allData.map((item: any, index: any) => {
                    let name = Object.keys(item)[0]
                    return (

                        <Accordion.Item eventKey={`${index}`} key={index} className="mb-2">
                            <Accordion.Header>{name}
                                <div className="action-button-outer">
                                    <span className="custom-action-btn me-2" onClick={(e: any) => {
                                        props.editFunction(e, props.TypeName)
                                        props.setDocumentName(name)
                                        props.setDocName(name)

                                    }}>{editICon}</span>
                                    <span className="custom-action-btn" onClick={(e: any) => {
                                        props.setDocumentName(name)
                                        props.setDocName(name)
                                        props.deleteFunction(e, props.TypeName)
                                    }}>{deleteIcon}</span>
                                </div>
                            </Accordion.Header>

                            <Accordion.Body>
                                {selectedDocs.length && index === selectedId ?
                                    <div className="alert zr-doc-alert py-1 px-3 d-flex justify-content-between align-items-baseline" role="alert">
                                        <p className="m-0">Are your sure you Wants to delete the selected items?</p>
                                        <button className=" btn btn-primary btn-sm" onClick={() => deleteDoc(name)}>delete</button>
                                    </div > : ""}
                                <div className="d-flex flex-wrap flex-row gourav">
                                    {item[name][props.TypeName].map((i: any, index1: any) => {
                                        return (
                                            <div className="m-2 card-outer-ext" key={index1}>
                                                <div className="d-flex flex-wrap flex-row border">
                                                    <Card className="shadow-none image-card text-center m-2" key={index1}>
                                                        <Form.Check
                                                            onChange={(e) => handleDocChange(e, {
                                                                "document_name": i.document_name,
                                                                "index": "10k",
                                                                "num_pages": i.num_pages,
                                                                "id": i.id,
                                                                "thumbnail_png": i[props.image]
                                                                // [format]: singleItem[format]
                                                            }, index)}
                                                            id={index}
                                                            className="cs-check-btn input"


                                                        />
                                                        <div className="card-image-outer">
                                                            <CardImg onClick={(e: any) => props.getDocResult(e, props.table_type, i.id)} width="100%" src={`data:image/png;base64,${i[props.image]}`} alt="Table Thumbnail" />
                                                        </div>
                                                        <Card.Body>

                                                            {i.document_name}
                                                            <br />
                                                            <span className="text-black-50">Page Number:</span> {i.num_pages}
                                                            <br />
                                                            <span className="text-black-50">Date:</span> {moment(item[name].date_created).format("YYYY-MM-DD")}
                                                            <br />
                                                            <span className="text-black-50">Owner:</span> {item[name].owner}
                                                            {props.TypeName === "tables" ?
                                                                <div className="flex justify-content-between ">
                                                                    <Button onClick={(e: any) => props.getDocResult(e, "table_html", i.id)} variant="link">html</Button>
                                                                    <Button onClick={(e: any) => props.getDocResult(e, "table_xml", i.id)} variant="link">xml</Button>
                                                                    <Button onClick={(e: any) => props.getDocResult(e, "table_xls", i.id)} variant="link">xls</Button>
                                                                </div> : props.TypeName === "images" ? <div className="flex justify-content-between ">
                                                                    <Button onClick={(e: any) => props.getDocResult(e, "image_png", i.id)} variant="link">png</Button>
                                                                    <Button onClick={(e: any) => props.getDocResult("save", "image_png", i.id)} variant="link">save</Button>
                                                                </div> : props.TypeName === "pages" ? <div className="flex justify-content-between ">
                                                                    <Button onClick={(e: any) => props.getDocResult(e, "page_pdf", i.id)} variant="link">pdf</Button>
                                                                    <Button onClick={(e: any) => props.getDocResult(e, "page_png", i.id)} variant="link">png</Button>

                                                                </div> : ""}
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            </div>
                                        )

                                    })}

                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
            </Accordion>

        </>
    )
}


export default AccordianDisplay



