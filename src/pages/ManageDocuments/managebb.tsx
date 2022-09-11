import React, { useState, useEffect, useCallback } from "react";
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
import AccordianDisplay from "components/atoms/AccordianDisplay"
import AccordianDisplayDocument from "components/atoms/AccordianDisplayDocument";
import { createDocument } from "utils/icons";
import { getSavedSearch } from "pages/search/SearchSlice";
import AccordianDisplaySearch from "components/atoms/AccordianDisplaySearch";
import { fetchExtention } from "pages/Extract/ExtractDocumentSlice";
import ZoomModal from "Modals/ZoomModal";
import Loader from "components/atoms/Loader";

const ManageDocuments = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { data, } = useSelector((state: any) => state.documentSet)
    const { dataTable } = useSelector((state: any) => state.tableSets)
    // const [DocumentList, setDocumentList] = useState<any | []>([]);
    const [show, setShow] = useState(false);
    const [showPop, setShowPop] = useState(false);
    const [showPop2, setShowPop2] = useState(false);
    const [condition, setCondition] = useState<boolean | null>();
    // const [show2, setShow2] = useState(false);
    // const [dataItemSelcted, setDataItemSelected] = useState<any>({})
    const [docName, setDocName] = useState<string | null>('');
    const [documentName, setDocumentName] = useState<string | null>('');
    const [typeName, settypeName] = useState<string | null>('');
    const [NameError, setNameError] = useState<string | null>('');
    const [StoredName, setStoredName] = useState<any[]>([])
    const [StoredName2, setStoredName2] = useState<any[]>([])
    const [StoredNamePage, setStoredNamePage] = useState<any[]>([])
    const [StoredNameImage, setStoredNameImage] = useState<any[]>([])
    const [allData, setAllData] = useState<any[]>([])
    const [allDataTable, setAllDataTable] = useState<any[]>([])
    const [allDataPage, setAllDataPage] = useState<any[]>([])
    const [allDataImage, setAllDataImage] = useState<any[]>([])
    const { dataPage } = useSelector((state: any) => state.GetPageSets)
    const { dataImage } = useSelector((state: any) => state.GetImageSets)
    const [savedSearchData, setSavedSearchData] = useState<any | null>(false);
    const [imageName, setimageName] = useState<any>("")
    const { fetchExtentionData, isLoadingFetch } = useSelector((state: any) => state.fetchExtentionData)
    const [show3, setShow3] = useState<any | null>(false);
    const [displayType, setDisplayType] = useState<any>()


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
        //Document Set
        if (data && ('myDocumentSets' in data)) {
            let dataArray: any = [];
            let name: any = [];
            data["myDocumentSets"].forEach((e: any) => {
                setAllData(data["myDocumentSets"])
                let key = null;
                key = Object.keys(e);
                name.push(Object.keys(e)[0])
                dataArray.push(e[key[0]])
            });
            // setDocumentList(dataArray)
            setStoredName(name)
        }

        if (dataTable && ("myTableSets") in dataTable) {
            let dataArray: any = [];
            let name: any = [];
            setAllDataTable(dataTable["myTableSets"])
            dataTable["myTableSets"].forEach((e: any) => {
                let key = null;
                key = Object.keys(e);
                name.push(Object.keys(e)[0])
                dataArray.push(e[key[0]])
            });
            setStoredName2(name)
        }

        if (dataPage && ("myPageSets") in dataPage) {
            let dataArray: any = [];
            let name: any = [];
            setAllDataPage(dataPage["myPageSets"])
            dataPage["myPageSets"].forEach((e: any) => {
                let key = null;
                key = Object.keys(e);
                name.push(Object.keys(e)[0])
                dataArray.push(e[key[0]])
            });
            setStoredNamePage(name)
        }

        if (dataImage && ("myImageSets") in dataImage) {

            let dataArray: any = [];
            let name: any = [];
            setAllDataImage(dataImage["myImageSets"])
            dataImage["myImageSets"].forEach((e: any) => {
                let key = null;
                key = Object.keys(e);
                name.push(Object.keys(e)[0])
                dataArray.push(e[key[0]])
            });
            setStoredNameImage(name)
        }


    }, [data, dataTable, dataPage, dataImage])



    const saveNewDoc = async (event: any) => {

        let condition2: any = null
        let array: any[] = [];
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
            let source_filename: any = documentName;
            let save_to_filename: any = docName;
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
        let name: any = documentName

        if (typeName === "documents") {
            await dispatch(deleteUser(name))
            dispatch(getDocumentSets())
            setShowPop(false)
            setShowPop2(false);

        }
        else if (typeName === "tables") {
            await dispatch(deleteTable(name))
            dispatch(getTableSets())
            setShowPop(false)
            setShowPop2(false);
        }
        else if (typeName === "pages") {
            await dispatch(deletePage(name))
            dispatch(getPageSets())
            setShowPop(false)
            setShowPop2(false);
        }
        else if (typeName === "images") {
            await dispatch(deleteImage(name))
            dispatch(getImageSets())
            setShowPop(false)
            setShowPop2(false);
        }
        else if (typeName === "searches") {
            await dispatch(deleteSearch(name))
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

    const delteFunction = (e: any, type: any) => {

        e.stopPropagation();
        settypeName(type)
        setShowPop(true)
    }

    const editFunction = (e: any, type: any) => {

        e.stopPropagation();
        settypeName(type)
        setShowPop2(true)
    }
    const createFunction = (data: any) => {

        navigate("/create-new-documents", { state: data })
    }

    const getDocResult = async (e: any, table_type: any, id: any) => {
        e.preventDefault()
        setDisplayType(table_type)
        let type: any = table_type

        // let tableType: any = table_type
        { table_type == "table_xml" || table_type == "table_html" || table_type == "table_xls" ? type = "table" : type = [type.replace("_png", "")] }



        let elastic_indx: any = "10k";
        // let max_results: any = "100";
        let select_fields = ['id', 'PDF', 'page', table_type]
        await dispatch(fetchExtention({ elastic_indx, select_fields, type, id }))
        //setShow(true)
        showImage();

    }

    const showImage  = useCallback(async() => {
            let display: any = displayType;
            // setimageName(`data:image/jpeg;base64,${fetchExtentionData?.[0][display]}`)
            if (display === "table_html" || display === "table_xml") {
                let html_data: any = fetchExtentionData?.[0]?.[display]
                // navigate('/html', { state: atob(html_data) });
                setimageName(atob(html_data))
                setShow3(true)
            }
            else if (display === "table_xls") {
                var a = document.createElement("a"); //Create <a>
                a.href = `data:application/vnd.ms-excel;base64,${fetchExtentionData[0][display]}`; //Image Base64 Goes here
                a.download = `data`; //File name Here
                a.click(); //Downloaded file
                // fileDownload(`data:application/vnd.ms-excel;base64,${fetchExtentionData[0][display]}`, 'exl')
            }
            else {
            alert("-------")

                    await setimageName(`data:image/png;base64,${fetchExtentionData?.[0][display]}`)
                    // navigate('/img', {
                    //     state: `data:image/jpeg;base64,${fetchExtentionData?.[0][display]
                    //         }`
                    // })
                    setShow3(true)
                
            }
            setShow(false)
    }, [fetchExtentionData])
    return (
        <>
            {isLoadingFetch ? <Loader /> : ""}            <section className="main-content p-4 doc-tb-set">
                <Tabs defaultActiveKey="Document Set" id="tb-sets" className="mb-3" variant="pills">
                    <Tab eventKey="Document Set" title="My Documents">
                        <div className="action-buttons d-flex justify-content-end mb-3">
                            <Button className="ml-auto" variant="secondary" onClick={() => navigate("/create-new-documents")}><span className="icon">{createDocument}</span> Create New Document Set</Button>
                        </div>

                        {allData && allData.length ? <AccordianDisplayDocument allData={allData} createFunction={(data: any) => createFunction(data)} editFunction={editFunction} setDocumentName={setDocumentName} setDocName={setDocName} TypeName={"documents"} image={""} deleteFunction={delteFunction} /> : ""}

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

            <Modal show={showPop} onHide={handleClose}>
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
            </Modal>

        </>
    )
}

export default ManageDocuments