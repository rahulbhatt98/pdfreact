import React, { useState, useEffect, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getDocumentSets } from "pages/Extract/ExtractDocumentSlice";
import { deleteUser } from "store/actions/deleteDocumentSet";
import { getTableSets, editTable, deleteTable } from "pages/ManageDocuments/getTableSetsSlice";
import { getImageSets, editImage, deleteImage } from "store/actions/getImageSets";
import { getPageSets, editPage, deletePage } from "store/actions/getPageSets";
import { useNavigate } from "react-router-dom";
import { editUser } from "store/actions/editDocumentSet";
import { editSearch } from "store/actions/editSearch";
import { deleteSearch } from "store/actions/deleteSearch";
import { Tab, Tabs, Button, Modal, Form } from "react-bootstrap";
import AccordianDisplay from "components/atoms/AccordianDisplay";
import AccordianDisplayDocument from "components/atoms/AccordianDisplayDocument";
import { createDocument } from "utils/icons";
import { getSavedSearch } from "pages/search/SearchSlice";
import AccordianDisplaySearch from "components/atoms/AccordianDisplaySearch";
import { fetchExtention } from "pages/Extract/ExtractDocumentSlice";
import ZoomModal from "Modals/ZoomModal";
import Loader from "components/atoms/Loader";
import { RootState } from 'store/reducers/index'
import CreateNewDocuments from "./CreateNewDocuments";
import DeleteModal from "Modals/DeleteModal";
import RenameModal from "Modals/RenameModal";
const ManageDocuments = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { data, } = useSelector((state: RootState) => state.documentSet)
    const { dataTable } = useSelector((state: RootState) => state.tableSets)
    const [showPop, setShowPop] = useState<boolean>(false);
    const [showCreatePage, setShowCreatePage] = useState<boolean>(true);
    const [showPop2, setShowPop2] = useState<boolean>(false);
    const [condition, setCondition] = useState<boolean | null>();
    const [docName, setDocName] = useState<string | null>('');
    const [documentName, setDocumentName] = useState<string | null>('');
    const [typeName, settypeName] = useState<string | null>('');
    const [NameError, setNameError] = useState<string | null>('');
    const [StoredName, setStoredName] = useState<string[]>([])
    const [StoredName2, setStoredName2] = useState<string[]>([])
    const [StoredNamePage, setStoredNamePage] = useState<string[]>([])
    const [StoredNameImage, setStoredNameImage] = useState<string[]>([])
    const [allData, setAllData] = useState<any[]>([])
    const [allDataTable, setAllDataTable] = useState<object[]>([])
    const [allDataPage, setAllDataPage] = useState<object[]>([])
    const [allDataImage, setAllDataImage] = useState<object[]>([])
    const { dataPage } = useSelector((state: RootState) => state.GetPageSets)
    const { dataImage } = useSelector((state: RootState) => state.GetImageSets)
    const [savedSearchData, setSavedSearchData] = useState<any | null>(false);
    const [imageName, setimageName] = useState<string | null>()
    const { isLoadingFetch } = useSelector((state: RootState) => state.fetchExtentionData)
    const [show3, setShow3] = useState<boolean | null>(false);
    const [displayType, setDisplayType] = useState<string>()


    const callSearchDataGetApi = async () => {
        let savedSearchResponse: any = await dispatch(getSavedSearch());
        setSavedSearchData(savedSearchResponse.payload.data)
    }

    useEffect(() => {
        dispatch(getDocumentSets())
        dispatch(getTableSets())
        dispatch(getPageSets())
        dispatch(getImageSets())
        callSearchDataGetApi()
    }, [])

    useEffect(() => {
        if (data && ('myDocumentSets' in data)) {

            let name: Array<string> = [];                     
            setAllData(data?.["myDocumentSets"])

            data["myDocumentSets"].forEach((e: any) => {
                let key = null;
                key = Object.keys(e);
                name.push(Object.keys(e)[0])
            });
            setStoredName(name)
        }

        if (dataTable && ("myTableSets") in dataTable) {
            let name: Array<string> = [];
            setAllDataTable(dataTable["myTableSets"])
            dataTable["myTableSets"].forEach((e: any) => {
                let key = null;
                key = Object.keys(e);
                name.push(Object.keys(e)[0])
            });
            setStoredName2(name)
        }
        if (dataPage && ("myPageSets") in dataPage) {
            let name: Array<string> = [];
            setAllDataPage(dataPage["myPageSets"])
            dataPage["myPageSets"].forEach((e: any) => {
                let key = null;
                key = Object.keys(e);
                name.push(Object.keys(e)[0])
            });
            setStoredNamePage(name)
        }
        if (dataImage && ("myImageSets") in dataImage) {
            let name: Array<string> = [];
            setAllDataImage(dataImage["myImageSets"])
            dataImage["myImageSets"].forEach((e: any) => {
                let key = null;
                key = Object.keys(e);
                name.push(Object.keys(e)[0])
            });
            setStoredNameImage(name)
        }


    }, [data, dataTable, dataPage, dataImage])


    const saveNewDoc = async (event: MouseEvent) => {
        let condition2: Boolean = false
        let array: Array<string> = [];
        typeName === "documents" ? array = StoredName : typeName === "tables" ? array = StoredName2 : typeName === "pages" ? array = StoredNamePage : typeName === "images" ? array = StoredNameImage : array = []
        array.forEach(element => {
            if (element === docName) {
                setCondition(true)
                condition2 = true
            }
        });
        if (docName === '') {
            return setNameError('Enter Document Name')
        }
        else if (condition2) {
            return setNameError('Name Already Exists, Enter New Name')
        }
        else {
            let source_filename: string | null = documentName;
            let save_to_filename: string | null = docName;
            setNameError('')
            setShowPop2(false)
            if (typeName === "documents") {
                await dispatch(editUser({ source_filename, save_to_filename }))
                dispatch(getDocumentSets())

            } else if (typeName === "tables") {
                await dispatch(editTable({ source_filename, save_to_filename }))
                dispatch(getTableSets())

            } else if (typeName === "pages") {
                await dispatch(editPage({ source_filename, save_to_filename }))
                dispatch(getPageSets())
            }
            else if (typeName === "images") {
                await dispatch(editImage({ source_filename, save_to_filename }))
                dispatch(getImageSets())

            } else if (typeName === "searches") {
                await dispatch(editSearch({ source_filename, save_to_filename }))
                callSearchDataGetApi();
            }
        }
    }

    const deleteData = async () => {
        let source_filename: string | any = documentName
        if (typeName === "documents") {
            await dispatch(deleteUser(source_filename))
            dispatch(getDocumentSets())
            setShowPop(false)
            setShowPop2(false);
        }
        else if (typeName === "tables") {
            await dispatch(deleteTable(source_filename))
            dispatch(getTableSets())
            setShowPop(false)
            setShowPop2(false);
        }
        else if (typeName === "pages") {
            await dispatch(deletePage(source_filename))
            dispatch(getPageSets())
            setShowPop(false)
            setShowPop2(false);
        }
        else if (typeName === "images") {
            await dispatch(deleteImage(source_filename))
            dispatch(getImageSets())
            setShowPop(false)
            setShowPop2(false);
        }
        else if (typeName === "searches") {
            await dispatch(deleteSearch(source_filename))
            callSearchDataGetApi();
            setShowPop(false)
            setShowPop2(false);
        }
    }

    const handleClose = () => {
        setShowPop(false);
        setShowPop2(false);
        setShow3(false);
    }

    const delteFunction = (e: MouseEvent, type: string) => {

        e.stopPropagation();
        settypeName(type)
        setShowPop(true)
    }

    const editFunction = (e: MouseEvent, type: string) => {
        e.stopPropagation();
        settypeName(type)
        setShowPop2(true)
    }
    const createFunction = (data: object | null) => {
        navigate("/create-new-documents", { state: data })
    }

    const getDocResult = async (e: any, table_type: string, id: string) => {
        // e.preventDefault()
        setDisplayType(table_type)
        let type: any = table_type
        table_type === "table_xml" || table_type === "table_html" || table_type === "table_png" || table_type === "table_xls" ? type = "table" : type === 'image_png' ? type = ["image"] : type = ["page"]
        let elastic_indx: string = "10k";
        let select_fields = ['id', 'PDF', 'page', table_type]
        let pdfLink: any = await new Promise(async (resolve, reject) => {
            try {
                let request: any = await dispatch(fetchExtention({ elastic_indx, select_fields, type, id }))
                resolve(request)
            } catch (err: any) {
                return (err);
            }
        });

        if (pdfLink.payload.data) {
            if (table_type === "table_html" || table_type === "table_xml" || table_type === "page_xml") {
                let html_data: string = pdfLink.payload.data?.[0]?.[table_type]
                // navigate('/html', { state: atob(html_data) });
                setimageName(atob(html_data))
                setShow3(true)
            }
            else if (table_type === "table_xls") {
                let name = `${pdfLink.payload.data[0]["PDF"].replace(".pdf", "")}_${(pdfLink.payload.data[0]["page"].toString()).padStart(3, '0')}_0${pdfLink.payload.data[0]["id"].slice(pdfLink.payload.data[0]["id"].length - 1)}`

                let a = document.createElement("a"); //Create <a>
                a.href = `data:application/vnd.ms-excel;base64,${pdfLink.payload.data[0][table_type]}`; //Image Base64 Goes here
                a.download = `${name}.xls`; //File name Here
                a.click(); //Downloaded file
                // fileDownload(`data:application/vnd.ms-excel;base64,${fetchExtentionData[0][table_type]}`, 'exl')
            }
            else if (table_type === "page_pdf") {
                let name = `${pdfLink.payload.data[0]["PDF"].replace(".pdf", "")}_${(pdfLink.payload.data[0]["page"].toString()).padStart(3, '0')}`

                let a = document.createElement("a"); //Create <a>
                a.href = `data:application/vnd.ms-excel;base64,${pdfLink.payload.data[0][table_type]}`; //Image Base64 Goes here
                a.download = `${name}.pdf`; //File name Here
                a.click(); //Downloaded file
                // fileDownload(`data:application/vnd.ms-excel;base64,${fetchExtentionData[0][table_type]}`, 'exl')
            }
            else if (table_type === "image_png" && e === "save") {
                let name = `${pdfLink.payload.data[0]["PDF"].replace(".pdf", "")}_${(pdfLink.payload.data[0]["page"].toString()).padStart(3, '0')}`

                let a = document.createElement("a"); //Create <a>
                a.href = `data:image/jpeg;base64,${pdfLink.payload.data?.[0][table_type]}`; //Image Base64 Goes here

                a.download = `${name}.png`; //File name Here
                a.click(); //Downloaded file
                // fileDownload(`data:application/pdf;base64,${pdfLink.payload.data[0][table_type]}`, 'pdf')

            }
            else {
                setimageName(`data:image/png;base64,${pdfLink.payload.data?.[0][table_type]}`)
                setShow3(true)
            }
        }

    }

    return (
        <>
            {isLoadingFetch ? <Loader /> : ""}
            <section className="main-content p-4 doc-tb-set">
                <Tabs defaultActiveKey="Document Set" id="tb-sets" className="mb-3" variant="pills">
                    <Tab eventKey="Document Set" title="My Documents">
                        <div className="action-buttons d-flex justify-content-end mb-3">
                            <Button className="ml-auto" variant="secondary" disabled={showCreatePage} onClick={() => setShowCreatePage(true)}
                            ><span className="icon">{createDocument}</span> Create New Document Set</Button>&nbsp;
                        
                        </div>                                               
                        {showCreatePage ? <div className="create-doc-outer"><CreateNewDocuments showCreatePage={showCreatePage} setShowCreatePage={setShowCreatePage} /> </div>: ""}
                        

                        {allData && allData.length ? <AccordianDisplayDocument allData={allData} createFunction={(data: object | null) => createFunction(data)} editFunction={editFunction} setDocumentName={setDocumentName} setDocName={setDocName} TypeName={"documents"} deleteFunction={delteFunction} /> : ""}
                    </Tab>

                    <Tab eventKey="Table Sets" title="My Tables">
                        {allDataTable && allDataTable.length ? <AccordianDisplay allData={allDataTable} editFunction={editFunction} setDocumentName={setDocumentName} setDocName={setDocName} TypeName={"tables"} image={"table_thumbnail_png"} deleteFunction={delteFunction} table_type={"table_png"} getDocResult={getDocResult} /> : ""}
                    </Tab>

                    <Tab eventKey="Page Sets" title="My Pages">
                        <AccordianDisplay allData={allDataPage} editFunction={editFunction} deleteFunction={delteFunction} setDocumentName={setDocumentName} setDocName={setDocName} TypeName={"pages"} image={"page_thumbnail_png"} table_type={"page_png"} getDocResult={getDocResult} />
                    </Tab>

                    <Tab eventKey="Image Sets" title="My Images">
                        {allDataImage && allDataImage.length ? <AccordianDisplay allData={allDataImage} editFunction={editFunction} setDocumentName={setDocumentName} setDocName={setDocName} TypeName={"images"} image={"image_thumbnail_png"} deleteFunction={delteFunction} table_type={"image_png"} getDocResult={getDocResult} /> : ""}
                    </Tab>

                    <Tab eventKey="Searches" title="My Searches">
                        <AccordianDisplaySearch allData={savedSearchData} editFunction={editFunction} deleteFunction={delteFunction} setDocumentName={setDocumentName} setDocName={setDocName} TypeName={"searches"} image={""} createFunction={(data: any) => createFunction(data)} />
                    </Tab>
                </Tabs>

            </section>
            {show3 ? <ZoomModal show3={show3} displayType={displayType} handleClose={handleClose} imageName={imageName} /> : ""}

            {/* <Modal show={showPop} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>DELETE {typeName?.toUpperCase()}  SET</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="px-5">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Are you sure you want to delete this</Form.Label>

                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteData}>
                        Yes
                    </Button>
                    <Button variant="light" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
<DeleteModal sh/>
            <Modal show={showPop2} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>SAVE NEW {typeName?.toUpperCase()}  SET</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="px-5">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Save New {typeName?.toUpperCase()}  as</Form.Label>
                            <Form.Control type="text" value={`${docName}`} onChange={(e: any) => setDocName(e.target.value)} />
                        </Form.Group>
                        <span className="text-danger">{docName === '' || condition ? NameError : ""}</span>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={saveNewDoc}>
                        Save
                    </Button>
                    <Button variant="light" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal> */}
            <DeleteModal show={showPop} handleClose={handleClose} typeName={typeName} deleteData={deleteData} />
            <RenameModal show={showPop2} handleClose={handleClose} typeName={typeName} setDocName={setDocName} NameError={NameError} condition={condition} saveNewDoc={saveNewDoc} docName={docName} />
        </>
    )
}

export default ManageDocuments