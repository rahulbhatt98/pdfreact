import React, { useState, useEffect, MouseEvent } from "react";
import { Row, Col, Card, Form, Button, Accordion } from "react-bootstrap";
import Select from 'react-select';
import { useSelector, useDispatch } from "react-redux"
import { getDocumentSets, downloadDocuments, fetchExtention } from './ExtractDocumentSlice'
import { extractClean } from "store/reducers/ExtractSlice"
import { RootState } from 'store/reducers/index'
import { getDocuments } from 'store/actions/documents'
import { ExtractNewDocuments } from 'store/actions/documents'
import EditModal from "Modals/EditModal";
import ZoomModal from "Modals/ZoomModal";
import { ExtractNewImage } from "store/actions/documents";
import { ExtractNewPage } from "store/actions/documents";
import { getPageSets } from "store/actions/getPageSets";
import { getImageSets } from "store/actions/getImageSets";
import { getTableSets } from "pages/ManageDocuments/getTableSetsSlice";
import { extractCleanPage } from "store/reducers/ExtractPageSlice";
import { extractCleanImage } from "store/reducers/ExtractImageSlice";
import Loader from "components/atoms/Loader";
var atob = require('atob');
const ExtractDocument = () => {
    const dispatch = useDispatch()
    const { isLoadingFetch } = useSelector((state: any) => state.fetchExtentionData)
    const { dataTable } = useSelector((state: any) => state.tableSets)
    const { dataPage } = useSelector((state: RootState) => state.GetPageSets)
    const { dataImage } = useSelector((state: RootState) => state.GetImageSets)
    const { data } = useSelector((state: RootState) => state.documentSet)
    const [extractType, setExtractType] = useState<string | []>([]);
    const [DocumentList, setDocumentList] = useState<object[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>("");
    const [Myoptions, setoptions] = useState<any[]>([]);
    const { downloadData, isLoadingdDownload } = useSelector((state: RootState) => state.downloadDoc)
    const [resultType, setResultType] = useState<any | null>("");
    const { dataDoc } = useSelector((state: RootState) => state.documents)
    const [products, setProducts] = useState<any[]>([])
    const [groupedOptions, setGroupedOptions] = useState<any[]>([])
    const [singleOpt, setsingleOpt] = useState<any | null>(null);
    const [mappedIDWithPageData, setmappedIDWithPageData] = useState<any[]>([])
    const { isSaved } = useSelector((state: RootState) => state.Extract)
    const { isSavedPage } = useSelector((state: RootState) => state.ExtractPage)
    const { isSavedImage } = useSelector((state: RootState) => state.ExtractImage)
    const [displayType, setDisplayType] = useState<any>()
    const [show, setShow] = useState<boolean | null>(false);
    const [show4, setShow4] = useState<boolean | null>(false);

    const [isSavedInfo, setisSavedInfo] = useState<any | null>(false);
    const [show3, setShow3] = useState<boolean | null>(false);
    const [show2, setShow2] = useState<boolean | null>(false);
    const [format, setFormat] = useState<any | null>(false);
    const [selectedDocs, setSelectedDocs] = useState<any[]>([])
    const [isBlocked, setIsBlocked] = useState(false)
    const [docName, setDocName] = useState<string | null>('');
    const [validation, setvalidation] = useState<boolean | null>(false);

    const [NameError, setNameError] = useState<string | null>('');
    const [condition, setCondition] = useState<boolean | null>();
    const [imageName, setimageName] = useState<string | null>("")
    const [StoredName2, setStoredName2] = useState<any[]>([])
    const [StoredNamePage, setStoredNamePage] = useState<any[]>([])
    const [StoredNameImage, setStoredNameImage] = useState<any[]>([])
    const [selectAll, setselectAll] = useState<any>(false)
    let all: any = [

    ]
    const colData = [
        // { label: "Select", value: "Select" },
        { label: "Tables", value: "table" },
        { label: "Images", value: "image" },
        { label: "Pages", value: "page" },

    ];

    const [modalshow, setModalshow] = useState(false)
    const handleClose = () => {
        setModalshow(false)
        setShow3(false)
        setDocName('')
        setNameError('')
    };

    useEffect(() => {

        if (isSaved || isSavedPage || isSavedImage) {
            var clsElements = document.querySelectorAll(".cs-check-btn input");

            clsElements.forEach(function (node) {
                const ele = node as HTMLInputElement;
                ele.checked = false;
            });
            setSelectedDocs([])
            setselectAll(false)
            setIsBlocked(true)
            setisSavedInfo(true)

            const timer = setTimeout(() => {
                setIsBlocked(false)
                dispatch(extractClean())
                dispatch(extractCleanPage())
                dispatch(extractCleanImage())
                setisSavedInfo(false)
                setModalshow(false)
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isSaved, isSavedImage, isSavedPage, dispatch])

    useEffect(() => {
        dispatch(getDocumentSets())
        dispatch(getDocuments())
        dispatch(getTableSets())
        dispatch(getPageSets())
        dispatch(getImageSets())
    }, [dispatch])

    useEffect(() => {

        if (data && ('myDocumentSets' in data)) {
            let dataArray: any = [];
            let name: Array<string> = [];
            data?.["myDocumentSets"].forEach((e: any) => {
                let key = null;
                key = Object.keys(e);
                name.push(Object.keys(e)[0])
                dataArray.push(e[key[0]])
            });

            setDocumentList(data["myDocumentSets"] ? data["myDocumentSets"] : [])
            getOptions();
        }
        if (dataDoc && ('10k' in dataDoc)) {
            setProducts(dataDoc['10k'])
        }
        if (downloadData) {
            setResultType(extractType)
        }
        if (dataImage && ("myImageSets") in dataImage) {
            let dataArray: Array<any> = [];
            let name: Array<string> = [];
            dataImage["myImageSets"].forEach((e: any) => {
                let key = null;
                key = Object.keys(e);
                name.push(Object.keys(e)[0])
                dataArray.push(e[key[0]])
            });
            setStoredNameImage(name)
        }
        if (dataPage && ("myPageSets") in dataPage) {
            let dataArray: Array<any> = [];
            let name: Array<string> = [];
            dataPage["myPageSets"].forEach((e: any) => {
                let key = null;
                key = Object.keys(e);
                name.push(Object.keys(e)[0])
                dataArray.push(e[key[0]])
            });
            setStoredNamePage(name)
        }
        if (dataTable && ("myTableSets") in dataTable) {
            let dataArray: Array<any> = [];
            let name: Array<string> = [];
            // setAllDataTable(dataTable["myTableSets"])
            dataTable["myTableSets"].forEach((e: any) => {
                let key = null;
                key = Object.keys(e);
                name.push(Object.keys(e)[0])
                dataArray.push(e[key[0]])
            });
            setStoredName2(name)
        }
    }, [data, downloadData, dataDoc, dataTable, dataPage, dataImage, dispatch])

useEffect(() => {
 if(selectedOption && extractType.length){
     setvalidation(false)
 }else if(show4&&!selectedOption && !extractType.length){
     setvalidation(true)
 }
}, [selectedOption,extractType,show4])


    const getOptions = () => {
        let options: Array<object> = [];
        let selectOptions: Array<object> = [];
        let singleOptions: Array<object> = [];
        if (DocumentList && DocumentList.length) {
            for (let el in DocumentList) {
                options.push({ value: Object.keys(DocumentList[el]), label: Object.keys(DocumentList[el]) })
            }            
            const sortedArray: Array<object> = options.sort(function (a: any, b: any) {
                const nameA = a.value;
                const nameB = b.value;
                if (nameA < nameB) { return -1; }
                if (nameA > nameB) { return 1; }
                return 0;
            });
            setoptions(sortedArray);
        }
        if (products && products.length) {
            products.forEach((el) => {
                singleOptions.push({ value: el.id, label: el.PDF })
            })
            setsingleOpt(singleOptions)
        }
        if (products) {
            selectOptions = [{
                label: "Batches of Documents",
                options: Myoptions || []
            },
            {
                label: "Single Document",
                options: singleOpt || singleOptions
            }
            ]
            singleOptions.sort(function (a: any, b: any) {
                const nameA = a.label;
                const nameB = b.label;
                if (nameA < nameB) { return -1; }
                if (nameA > nameB) { return 1; }
                return 0;
            });
            setGroupedOptions(selectOptions)
        }
    }
    const handleChange = (e: any) => {
        setSelectedOption(e)
    }

    const extractData = async (e: MouseEvent, text: string) => {
        e.preventDefault()
                    setShow(true)

        let type: Array<any> = [extractType];
        let select_fields: Array<any> = [];
        let elastic_indx: string = "10k";
        let documents_set: any = null;
        let group_by: Array<string> = ["PDF"];
        let form_type: string = "";

        if (selectedOption && extractType.length) {
            documents_set = Object.values(selectedOption)[0]
            documents_set = documents_set[0]
            if (selectedOption && Object.values(selectedOption)[0]) {
                documents_set = Object.values(selectedOption)[1];
                if (documents_set.includes(".pdf")) {
                    documents_set = Object.values(selectedOption)[1]
                    form_type = "pdf";
                } else {
                    documents_set = Object.values(selectedOption)[0]
                    documents_set = documents_set[0]
                    form_type = "other";
                }
            }
            let page: string = ""
            if (extractType === "table") {
                select_fields = ['id', 'PDF', 'page', 'table_thumbnail_png']
                await dispatch(downloadDocuments({ elastic_indx, select_fields, type, documents_set, group_by, form_type, page }))
                setFormat('table_thumbnail_png')
            }
            else if ((extractType === "page")) {
                select_fields = ["id", "PDF", "page", 'page_thumbnail_png']
                await dispatch(downloadDocuments({ elastic_indx, select_fields, type, documents_set, group_by, form_type, page }))
                setFormat('page_thumbnail_png')
            }
            else if ((extractType === "image")) {
                select_fields = ["id", "PDF", "page", 'image_thumbnail_png']
                await dispatch(downloadDocuments({ elastic_indx, select_fields, type, documents_set, group_by, form_type, page }))
                setFormat('image_thumbnail_png')
            }
            setShow2(true)
            setSelectedDocs([])
            setselectAll(false)
            // setvalidation(false)

        }else{
            // setvalidation(true)
            setShow(false)

        }
        setShow4(true)
    }

    if (show2) {
        setShow2(false)
        updateArrayForSimilarItems(downloadData)
    }

    function updateArrayForSimilarItems(items: any) {
        const ItemsKeys = Object.keys(items);
        let mappedIDWithPageDataRaw: any = [];
        if (ItemsKeys.length === 1 && !ItemsKeys[0].includes(".pdf")) {
            let singleToMultipleItemsFormation = [];
            singleToMultipleItemsFormation[items[0]["PDF"]] = items;
            items = singleToMultipleItemsFormation;
        }

        if (items && ItemsKeys.length) {
            for (const item in items) {
                if (!mappedIDWithPageDataRaw[item]) {
                    mappedIDWithPageDataRaw[item] = [];
                }
                for (const pagedetail in items[item]) {
                    if (!mappedIDWithPageDataRaw[item][items[item][pagedetail]['page']]) {
                        mappedIDWithPageDataRaw[item][items[item][pagedetail]['page']] = [];
                    }
                    let newList = { ...items[item][pagedetail], isChecked: false }
                    mappedIDWithPageDataRaw[item][items[item][pagedetail]['page']].push(newList);
                }
            }
            setmappedIDWithPageData(mappedIDWithPageDataRaw)
        }
        else {
            setmappedIDWithPageData([])
        }
    }

    const getDocResult = async (e: any, table_type: string, id: string) => {
        setDisplayType(table_type)
        let type: string | string[] = resultType === "table" ? "table" : [resultType];
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
                await setimageName(atob(html_data))
                setShow3(true)
            }
            else if (table_type === "table_xls") {
                let name = `${pdfLink.payload.data[0]["PDF"].replace(".pdf", "")}_${(pdfLink.payload.data[0]["page"].toString()).padStart(3, '0')}_0${pdfLink.payload.data[0]["id"].slice(pdfLink.payload.data[0]["id"].length - 1)}`
                let a = document.createElement("a"); //Create <a>
                a.href = `data:application/vnd.ms-excel;base64,${pdfLink.payload.data[0][table_type]}`;
                a.download = `${name}.xls`; //File name Here
                a.click(); //Downloaded file
            }
            else if (table_type === "page_pdf") {
                let name = `${pdfLink.payload.data[0]["PDF"].replace(".pdf", "")}_${(pdfLink.payload.data[0]["page"].toString()).padStart(3, '0')}`
                let a = document.createElement("a"); //Create <a>
                a.href = `data:application/vnd.ms-excel;base64,${pdfLink.payload.data[0][table_type]}`; //Image Base64 Goes here
                a.download = `${name}.pdf`; //File name Here
                a.click(); //Downloaded file
            }
            else if (table_type === "image_png" && e === "save") {
                let name = `${pdfLink.payload.data[0]["PDF"].replace(".pdf", "")}_${(pdfLink.payload.data[0]["page"].toString()).padStart(3, '0')}`
                let a = document.createElement("a"); //Create <a>
                a.href = `data:image/jpeg;base64,${pdfLink.payload.data?.[0][table_type]}`; //Image Base64 Goes here

                a.download = `${name}.png`; //File name Here
                a.click(); //Downloaded file
            }
            else {
                setimageName(`data:image/png;base64,${pdfLink.payload.data?.[0][table_type]}`)
                setShow3(true)
            }

        }

    }



    const handleDocChange = (e: any, data: any) => {
        if (e.target.checked) {
            setSelectedDocs([...selectedDocs, data])
        } else {
            setSelectedDocs(selectedDocs.filter((item: any) => {
                return item.id !== data.id
            }))
        }
    }

    const saveSelectedDoc = () => {
        setModalshow(true)
        setCondition(false)

    }
    const continueSvingDoc = async () => {
        let selected: Array<any> = selectedDocs;
        let selected2: Array<any> = selectedDocs;
        let extractType: any = resultType
        let naam: any = docName
        if (docName === '') {
            return setNameError('Enter Document Name')
        }       
        if (selectedDocs && selectedDocs.length) {
            if (extractType === "table") {
                if (StoredName2.includes(docName)) {
                    dataTable["myTableSets"].forEach((element: any) => {
                        
                        if (element[naam]) {
                            let arr: any = []
                            arr = element[naam]["tables"].filter((e: any) => {
                                return !selectedDocs.find((i: any) => {
                                    
                                    return i.id === e.id
                                })
                            })                            
                            selected2 = [...arr, ...selected]
                        }
                    });
                }
                await dispatch(ExtractNewDocuments({ idList: selected2, name: docName }))
                dispatch(getTableSets())
            }
            if (extractType === "image") {
                if (StoredNameImage.includes(docName)) {
                    dataImage["myImageSets"].forEach((element: any) => {
                        if (element[naam]) {
                            if (element[naam]) {
                                let arr: any = []
                                arr = element[naam]["images"].filter((e: any) => {
                                    return !selected.find((i: any) => {
                                        return i.id === e.id
                                    })
                                })
                                selected2 = [...arr, ...selected]
                            }
                        }
                    });
                }
                await dispatch(ExtractNewImage({ idList: selected2, name: docName }))
                dispatch(getImageSets())
            }
            if (extractType === "page") {
                if (StoredNamePage.includes(docName)) {
                    dataPage["myPageSets"].forEach((element: any) => {
                        if (element[naam]) {
                            if (element[naam]) {
                                let arr: Array<object> = []
                                arr = element[naam]["pages"].filter((e: any) => {
                                    return !selected.find((i: any) => {
                                        return i.id === e.id
                                    })
                                })
                                selected2 = [...arr, ...selected]
                            }
                        }
                    });
                }
                await dispatch(ExtractNewPage({ idList: selected2, name: docName }))
                dispatch(getPageSets())
            }
        }
        else if (selectedDocs && selectedDocs.length) {
            setCondition(true)
            return setNameError('No doc selected')
        } else {
            setCondition(true)
            return setNameError('Name Already exists')
        }
    }
    const functionSelectAll = () => {
        var clsElements = document.querySelectorAll(".cs-check-btn input");
        selectAll ?
            clsElements.forEach(function (node) {
                const ele = node as HTMLInputElement;
                ele.checked = false;
            })
            : clsElements.forEach(function (node) {
                const ele = node as HTMLInputElement;
                ele.checked = true;
            })
        selectAll ?
            setSelectedDocs([]) :
            setSelectedDocs(all)
    }
    return (
        <>
            {isLoadingdDownload || isLoadingFetch ? <Loader /> : ""}
            <section className="main-content p-4">
                <div className="main-content-top align-items-center d-flex justify-content-between mb-2">
                    <h3>View TABLES, IMAGES OR PAGES</h3>
                </div>
                <Row>
                    <Col xl="12" lg="12" sm="12" md="12">
                        <Card>
                            <Form>
                                <Row>
                                    <Col xl="4">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>From</Form.Label>
                                            <Select
                                                value={selectedOption}
                                                onChange={(e: any) => handleChange(e)}
                                                options={groupedOptions || []}
                                            />

                                        </Form.Group>
                                    </Col>
                                    <Col xl="4">

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>View</Form.Label>

                                            <Select options={colData} onChange={(e: any) => setExtractType(e.value)} />
                                        </Form.Group>

                                    </Col>
                                    <Col xl="4">

                                        <Button variant="primary" type="submit" className="mt-4" onClick={(e: MouseEvent) => extractData(e, "group")}>
                                            View
                                        </Button>

                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                    {Object.keys(mappedIDWithPageData).length && !isLoadingdDownload ?
                        <Col xl="12" lg="12" sm="12" md="12" className="mt-5">
                            <div className="main-content-top align-items-center d-flex justify-content-between mb-2">
                                <h3>{resultType?.toUpperCase()}</h3>
                                {resultType ?

                                    <Button disabled={selectedDocs.length > 0 ? false : true} variant="primary" className="mt-4" onClick={(e: any) => saveSelectedDoc()}> save {resultType}</Button>
                                    : ""}
                            </div>
                            <Accordion defaultActiveKey="0">
                                {Object.keys(mappedIDWithPageData).map((element: any, index: number) => {
                                    return (

                                        <Accordion.Item eventKey={`"${index}"`} key={index}>
                                            <Accordion.Header>{element}</Accordion.Header>
                                            <Accordion.Body>
                                                <Button onClick={() => {
                                                    functionSelectAll()
                                                    setselectAll(!selectAll)
                                                }}>{selectAll ? <>unselect all</> : <>select All</>}</Button>
                                                <div className="d-flex flex-wrap flex-row">
                                                    {mappedIDWithPageData[element].map((item: any, index: number) => {
                                                        return (

                                                            <div key={index} className="m-2 card-outer-ext">
                                                                Page - {item ? item[0].page : ""}
                                                                <div className="d-flex flex-wrap flex-row border">
                                                                    {item.map((singleItem: any, index: any) => {
                                                                        all = [...all, {
                                                                            "document_name": element,
                                                                            "index": "10k",
                                                                            "num_pages": singleItem.page,
                                                                            "id": singleItem.id,
                                                                            [format]: singleItem[format]
                                                                        }]
                                                                        return (
                                                                            <Card className="image-card text-center m-2" key={singleItem.id}>

                                                                                <div className="card-image-outer">
                                                                                    {format === "table_thumbnail_png" ?
                                                                                        <Card.Img variant="top" src={`data:image/jpeg;base64,${singleItem[format]}`} width="400" onClick={(e: MouseEvent) => getDocResult(e, "table_png", singleItem.id)} /> : format === "page_thumbnail_png" ? <Card.Img variant="top" src={`data:image/jpeg;base64,${singleItem[format]}`} width="400" onClick={(e: MouseEvent) => getDocResult(e, "page_png", singleItem.id)} /> : format === "image_thumbnail_png" ? <Card.Img variant="top" src={`data:image/jpeg;base64,${singleItem[format]}`} width="400" onClick={(e: MouseEvent) => getDocResult(e, "image_png", singleItem.id)} /> : ""
                                                                                    }
                                                                                </div>
                                                                                <Form.Check
                                                                                    onChange={(e: any) => handleDocChange(e, {
                                                                                        "document_name": element,
                                                                                        "index": "10k",
                                                                                        "num_pages": singleItem.page,
                                                                                        "id": singleItem.id,
                                                                                        [format]: singleItem[format]
                                                                                    })}
                                                                                    id={index}
                                                                                    className="cs-check-btn checkbox"
                                                                                    type='checkbox'
                                                                                />

                                                                                {format === "table_thumbnail_png" ?
                                                                                    <div className="flex justify-content-between ">
                                                                                        <Button onClick={(e: any) => getDocResult(e, "table_html", singleItem.id)} variant="link">html</Button>
                                                                                        <Button onClick={(e: any) => getDocResult(e, "table_xml", singleItem.id)} variant="link">xml</Button>
                                                                                        <Button onClick={(e: any) => getDocResult(e, "table_xls", singleItem.id)} variant="link">xls</Button>
                                                                                    </div> :
                                                                                    format === "page_thumbnail_png" ?
                                                                                        <div className="flex justify-content-between ">
                                                                                            <Button onClick={(e: any) => getDocResult(e, "page_pdf", singleItem.id)} variant="link">pdf</Button>
                                                                                            <Button onClick={(e: any) => getDocResult(e, "page_png", singleItem.id)} variant="link">png</Button>

                                                                                        </div> :
                                                                                        format === "image_thumbnail_png" ?
                                                                                            <div className="flex justify-content-between ">
                                                                                                <Button onClick={(e: any) => getDocResult(e, "image_png", singleItem.id)} variant="link">png</Button>
                                                                                                <Button onClick={(e: any) => getDocResult("save", "image_png", singleItem.id)} variant="link">save</Button>
                                                                                            </div> : ""}
                                                                            </Card>
                                                                        )

                                                                    })}
                                                                </div>
                                                            </div>
                                                        )
                                                        //     
                                                    }
                                                    )}
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )
                                })}
                            </Accordion>
                        </Col> : show ? "no data" :validation?"select input":""
}
                </Row>
            </section>
            {show3 ? <ZoomModal show3={show3} displayType={displayType} handleClose={handleClose} imageName={imageName} /> : ""}
            {modalshow ? <EditModal modalshow={modalshow} handleClose={handleClose} docName={docName} setDocName={setDocName} continueSvingDoc={continueSvingDoc} condition={condition} NameError={NameError} isSaved={isSavedInfo} isBlocked={isBlocked} setNameError={setNameError} name={resultType === "table" ? StoredName2 : resultType === "image" ? StoredNameImage : resultType === "page" ? StoredNamePage : []} typeN={resultType} /> : ""}
        </>
    )
}

export default ExtractDocument;