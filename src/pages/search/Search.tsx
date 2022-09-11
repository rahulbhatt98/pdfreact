import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Accordion, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux"
import Select from 'react-select';

import { getDocumentSets } from '../Extract/ExtractDocumentSlice'
import { getDocuments } from 'store/actions/documents'
import { RootState } from 'store/reducers/index'
import { searchTextApi, saveSearchApi, getSavedSearch, displayDocuments, searchTextCountApi, saveSearchPages } from './SearchSlice'

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import moment from "moment";
import { deleteSearch } from "store/actions/deleteSearch";
import { editSearch } from "store/actions/editSearch";
import { getPageSets } from "store/actions/getPageSets";

import SearchModals from "./SearchModals";

import ReactPaginate from 'react-paginate';
import { useLocation } from "react-router-dom";
import Pdftron from "Pdftron";

// import { Document, Page } from 'react-pdf';

const Search = (props: any) => {
    const { state } = useLocation();
    const [extractType, setExtractType] = useState<string | null>('');
    const [selectedDoc, setselectedDoc] = useState<string | any>('');
    let { data, isLoading } = useSelector((state: RootState) => state.documentSet)
    const [DocumentList, setDocumentList] = useState<any | []>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>("");
    const [selectedFileName, setSelectedFileName] = useState<string | null>("");
    const [FileName, setFileName] = useState<string | null>("");
    const [Myoptions, setoptions] = useState<any | null>(null);
    const { downloadData } = useSelector((state: RootState) => state.downloadDoc)
    const [extractDataResult, setExtractDataResult] = useState<any | []>([]);
    const [resultType, setResultType] = useState<any | null>("");
    const { dataDoc } = useSelector((state: RootState) => state.documents)
    const [products, setProducts] = useState<any[]>([])
    const [groupedOptions, setGroupedOptions] = useState<any[]>([])
    const [singleOpt, setsingleOpt] = useState<any | null>(null);
    const [withinSearchText, withinSearchTextDropDown] = useState<any | null>(null);
    //@ts-ignore
    const [matchSearchText, matchSearchTextDropDown] = useState<any | null>(null);

    const [SearchText, setSearchText] = useState<any | null>(null);
    const [SearchedTerm, setSearchedTerm] = useState<any | null>(null);
    const [SearchTextResponse, seacrhTextData] = useState<any | null>(null);
    const [showFrame, setShowFrame] = useState<any | null>(false);
    const [show2, setShow2] = useState<any | null>(false);
    const [showSavePageButton, setShowSavePageButton] = useState<any | null>(false);
    //@ts-ignore
    const [range, rangePercentage] = useState<any | null>(state ? state.minimum_should_match : 0);
    const [advanceFormState, setAdvanceFormState] = useState<any | null>(false);
    const [validated, setValidated] = useState(false);
    const [selectedId, setSelectedId] = useState<any | null>(false);
    const [savedSearchData, setSavedSearchData] = useState<any | null>(false);
    const [showPop, setShowPop] = useState(false);
    const [showPop2, setShowPop2] = useState(false);
    const [showPopSavePage, setShowPopSavePage] = useState(false);
    const [searchFileName, setSearchFileName] = useState<any | null>("")
    const [saveSearchFileName, setSaveSearchFileName] = useState<any | null>("")
    const [savePageFileName, setSavePageFileName] = useState<any | null>("")
    const [NameError, setNameError] = useState<string | null>('');
    const [condition, setCondition] = useState<boolean | null>();
    const [typeName, setTypeName] = useState<string | null>('');
    const [selectedDocs, setSelectedDocs] = useState<any[]>([])
    const [startingNumber, setStartingNumber] = useState(0);
    const [pagesCount, setPagesCount] = useState(0);
    //@ts-ignore
    const [textToSearch, setTextToSearch] = useState<any | null>(state ? state.text[0] : null);
    const [searchFile, setSearchFile] = useState<string | null>(null);
    const [searchRange, setSearchRange] = useState<any | null>(null);
    //@ts-ignore
    const [searchType, setSearchType] = useState<any | null>(state ? state.type[0] : null);
    const [radioType, setRadioType] = useState<any>("")
    const [showSaveSearchModal, setShowSaveSearchModal] = useState<any | null>(false);
    const [numberOfRecords, setNumberOfRecords] = useState<any | null>(8);
    const [isSaved, setIsSaved] = useState<any | null>(false);
    const [selectedOptionModal, setSelectedOptionModal] = useState<string | null>("");
    const [selectedPdfIndex, setSelectedPdfIndex] = useState<any | null>();
    const [searchedFromSavedSearch, setsearchedFromSavedSearch] = useState<any | null>(false);
    //@ts-ignore
    const [arr, setArr] = useState(state ? { value: state.fileSearched, label: state.fileSearched } : { value: 'Select', label: 'Select' })
    const { dataPage } = useSelector((state: any) => state.GetPageSets)
    const dispatch = useDispatch()

    const callSearchDataGetApi = async () => {
        let savedSearchResponse: any = await dispatch(getSavedSearch());
        setSavedSearchData(savedSearchResponse.payload.data)
    }

    useEffect(() => {
        callSearchDataGetApi()
        dispatch(getDocumentSets())
        dispatch(getDocuments());
    }, [dispatch])

    useEffect(() => {
        if (data && ('myDocumentSets' in data)) {
            setDocumentList(data["myDocumentSets"])
            getOptions();
        }
        if (dataDoc && ('10k' in dataDoc)) {
            setProducts(dataDoc['10k'])
        }
        if (downloadData) {
            setExtractDataResult(downloadData)
            setResultType(extractType)
        }

    }, [data, downloadData, dataDoc])

    useEffect(() => {
        test()
    }, [])

    const test = () => {
        if (state) {
            return new Promise(async (resolve, reject) => {
                try {
                    if (textToSearch && searchType && range && arr)
                        //search_text_paginate(1)
                        //@ts-expect-error
                        search_text()
                } catch (err) {
                    return (err);
                }
            })
        }
    }

    const getOptions = () => {

        let options: any = [];
        let selectOptions: any = [];
        let singleOptions: any = [];
        let allDocuments: any = [{ value: "All Documents", label: ["All Documents"] }];


        if (DocumentList && DocumentList.length) {
            for (let el in DocumentList) {
                options.push({ value: Object.keys(DocumentList[el]), label: Object.keys(DocumentList[el]) })

            }
            setoptions(options);
        }
        if (products && products.length) {
            products.forEach((el) => {
                singleOptions.push({ value: el.id, label: el.PDF })
            })
            setsingleOpt(singleOptions);
        }
        if (products) {
            selectOptions = [
                {
                    label: "All Documents",
                    options: allDocuments
                },
                {
                    label: "Batches of Documents",
                    options: Myoptions || []
                },
                {
                    label: "Single Document",
                    options: singleOpt || []
                }
            ]
            setGroupedOptions(selectOptions)
        }

    }

    const documentType = [
        { label: "Table", value: "Table" },
        { label: "Images", value: "Images" },
        { label: "Pages", value: "Pages" },
        { label: "All", value: "All" }
    ];

    const documents = [
        { label: "Table", value: "Table" },
        { label: "Images", value: "Images" },
        { label: "Pages", value: "Pages" }
    ];

    const SearchInside = [
        { label: "Table", value: "Table" },
        { label: "Images", value: "Images" },
        { label: "Pages", value: "Pages" }
    ];


    const handleChange = (e: any) => {
        let documents_set: any = Object.values(e)[1]
        setSelectedOption(e)
        setsearchedFromSavedSearch(false)
        setSearchFile(e.label)
        if (e.label[0]) {
            if (e.label[0] === "All Documents" || e.label[0] === "doc3" || e.label[0] === "doc2" || e.label[0] === "doc12") {
                setSelectedFileName(e.label[0])
            } else {
                setSelectedFileName(e.label)
            }
        }
        onSelectValue(e);
    }

    const handleChanges = (e: any) => {
        rangePercentage(e)
        setSearchRange(e)
        setsearchedFromSavedSearch(false)
    }

    const handleChangess = (e: any) => {
        setsearchedFromSavedSearch(false)
        setSearchType(e.target.value)
    }

    const handleInputChange = (e: any) => {
        setRadioType(e.target.value)
    }

    const handleClossPDF = () => {
        setShowFrame(false);
        setSelectedId(false);
    }

    const search_text = async (e: any) => {
        if (!state) e.preventDefault();
        setShowFrame(false);
        let documentCondition: any = "";
        setPagesCount(0)
        let request: any = await {
            "elastic_indx": "10k",
            "text": [
                textToSearch
            ],
            "select_fields": ["page_thumbnail_png"],
            "min_score": 5,
            "from": 0,
            "size": numberOfRecords,
            "text_bool": "OR",
            "highlight": "yes",
            "hide_source": "no",
            "match_type": "match",
            "minimum_should_match": searchRange
        }

        searchType == 'both' ?
            request.type = ["text", "cell"]
            :
            request.type = searchType
        if (searchFile && searchFile != 'All Documents') {

            documentCondition = searchFile.toString().split('.');
            documentCondition.length > 1 && searchFile != 'All Documents' ?
                request.PDF = searchFile.toString()

                :
                request.documents_set = searchFile.toString()
        }

        console.log(request);
        setSearchText(textToSearch)
        withinSearchTextDropDown(searchRange)
        matchSearchTextDropDown(searchType)
        setFileName(searchFile)
        let search_text_count: any = await dispatch(searchTextCountApi({ request: request }));

        let totalPages = (search_text_count.payload.data.total_results / 10)
        setPagesCount(totalPages);
        let searchApi: any = await dispatch(searchTextApi({ request: request }));
        if (searchApi) {

            seacrhTextData(searchApi.payload.data)
        }

    }

    const searchTextFromSaved = async (e: any, item: any) => {

        e.preventDefault();
        // setSearchText(item["search"].text[0])
        // matchSearchTextDropDown(item["search"].type[0])
        // onSelectValue({value: item["search"].fileSearched, label:item["search"].fileSearched})
        // rangePercentage(item["search"].minimum_should_match)
        // let setStatesPromise : any = await new Promise(async (resolve, reject)=>{
        //     try{
        //         await setTextToSearch(item["search"].text[0])
        //         await setSearchType(item["search"].type[0])
        //         await setSearchFile(item["search"].fileSearched)
        //         await setSearchRange(item["search"].minimum_should_match)
        //         console.log("Heyy")
        //         //resolve(1)
        //         console.log(item["search"].text[0] +' '+item["search"].type[0]+' '+ item["search"].fileSearched +' '+item["search"].minimum_should_match)
        //     }catch(err : any){
        //         console.log(err);
        //     }
        // })         
        setPagesCount(0)
        let myPromise: any = await new Promise(async (resolve, reject) => {
            try {
                setsearchedFromSavedSearch(true);
                setShowFrame(false);
                let documentCondition: any = "";

                await setTextToSearch(item["search"].text[0])
                await setSearchType(item["search"].type[0])
                await setSearchFile(item["search"].fileSearched)
                await setSearchRange(item["search"].minimum_should_match)

                await setSearchText(item["search"].text[0])
                await matchSearchTextDropDown(item["search"].type[0])
                await onSelectValue({ value: item["search"].fileSearched, label: item["search"].fileSearched })
                await rangePercentage(item["search"].minimum_should_match)

                setSearchText(item["search"].text[0])
                withinSearchTextDropDown(item["search"].minimum_should_match)
                matchSearchTextDropDown(item["search"].type[0])
                setFileName(item["search"].fileSearched)
                let request: any = {
                    "elastic_indx": "10k",
                    "text": [
                        item["search"].text[0]
                    ],
                    "select_fields": ["page_thumbnail_png"],
                    "min_score": 5,
                    "from": 0,
                    "size": numberOfRecords,
                    "text_bool": "OR",
                    "highlight": "yes",
                    "hide_source": "no",
                    "match_type": "match",
                    "minimum_should_match": item["search"].minimum_should_match
                }

                item["search"].type[0] == 'both' ?
                    request.type = ["text", "cell"]
                    :
                    request.type = [item["search"].type[0]]

                if (item["search"].fileSearched && item["search"].fileSearched != 'All Documents') {

                    documentCondition = item["search"].fileSearched.toString().split('.');
                    documentCondition.length > 1 && item["search"].fileSearched != 'All Documents' ?
                        request.PDF = item["search"].fileSearched.toString()
                        :
                        request.documents_set = item["search"].fileSearched.toString()
                }
                resolve(request);
            } catch (err: any) {
                return (err);
            }
        });
        let search_text_count: any = await dispatch(searchTextCountApi({ request: myPromise }));

        let totalPages = Math.ceil(search_text_count.payload.data.total_results / 10)

        setPagesCount(totalPages);
        let searchApi: any = await dispatch(searchTextApi({ request: myPromise }));
        if (searchApi) {
            seacrhTextData(searchApi.payload.data)
        }

    }

    const search_text_paginate = async (pageNumber: any) => {

        setShowFrame(false);
        let documentCondition: any = "";

        let request: any = {
            "elastic_indx": "10k",
            "text": [
                SearchText
            ],
            "select_fields": ["page_thumbnail_png"],
            "min_score": 5,
            "from": pageNumber,
            "size": numberOfRecords,
            "text_bool": "OR",
            "highlight": "yes",
            "hide_source": "no",
            "match_type": "match",
            "minimum_should_match": withinSearchText
        }

        matchSearchText == 'both' ?
            request.type = ["text", "cell"]
            :
            request.type = [matchSearchText]
        if (FileName && FileName != 'All Documents') {

            documentCondition = FileName.toString().split('.');
            documentCondition.length > 1 && FileName != 'All Documents' ?
                request.PDF = FileName.toString()
                :
                request.documents_set = FileName.toString()
        }
        let search_text_count: any = await dispatch(searchTextCountApi({ request: request }));

        let totalPages = Math.ceil(search_text_count.payload.data.total_results / 10)
        setPagesCount(totalPages);

        let searchApi: any = await dispatch(searchTextApi({ request: request }));
        if (searchApi) {
            seacrhTextData(searchApi.payload.data)
        }

    }


    const handleClose = () => {
        setShowPop(false);
        setShowPop2(false);
        setCondition(false);
        setShowPopSavePage(false);
        setShowSaveSearchModal(false)
        setNameError("");
        setRadioType("");
    }

    const deleteFunction = (e: any, searchFileName: any) => {
        e.stopPropagation();
        setSearchedTerm(searchFileName)
        setShowPop(true)
    }

    const deleteSearchdata = async () => {
        await dispatch(deleteSearch(SearchedTerm))
        setShowPop(false)
        callSearchDataGetApi()
    }

    const editFunction = (e: any, typeName: any) => {
        e.stopPropagation()
        setTypeName(typeName)
        setSearchFileName(typeName)
        setShowPop2(true)
    }

    const saveNewSearchedterm = async () => {
        if (searchFileName.trim() === '') {
            return setNameError('Enter Document Name')
        }
        else if (searchFileName.trim() === typeName) {
            setCondition(true)
            return setNameError('Name Already Exists, Enter New Name')
        }
        else {
            let source_filename: any = typeName;
            let save_to_filename: any = searchFileName.trim();
            setNameError('')
            setShowPop2(false)

            if (typeName) {
                await dispatch(editSearch({ source_filename, save_to_filename }))
            }
        }
        callSearchDataGetApi();
    }

    const savePageSearched = async () => {
        let selected: any = selectedDocs;
        let selected2: any = selected;
        let extractType: any = resultType
        let naam: any = savePageFileName
        dataPage["myPageSets"].forEach((element: any) => {
            if (element[naam.value]) {
                if (element[naam.value]) {
                    let arr: any = []
                    arr = element[naam.value]["pages"].filter((e: any) => {
                        return !selected.find((i: any) => {
                            return i.document_name == e.document_name
                        })
                    })
                    selected2 = [...arr, ...selected]
                }
            }
        });
        let request = {
            "filename": savePageFileName?.value ? savePageFileName.value : savePageFileName,
            "pages": selected2
        }

        setNameError('')
        setIsSaved(true)
        var clsElements = document.querySelectorAll(".cs-check-btn-sp  input");

        clsElements.forEach(function (node) {
            const ele = node as HTMLInputElement;
            ele.checked = false;
        });
        setSelectedDocs([])
        setShowPopSavePage(false)
        let savePages: any = await dispatch(saveSearchPages({ request: request }));
        dispatch(getPageSets())
        setselectedDoc('')
        setRadioType("");
    }

    const save_search = async (e: any) => {
        try {
            e.preventDefault();
            if (saveSearchFileName.trim() === '') {
                return setNameError('Enter Document Name')
            }

            else if (saveSearchFileName) {
                let myPromise: any = await new Promise(async (resolve, reject) => {
                    try {
                        let request: any = await {
                            "filename": saveSearchFileName.toString(),
                            "search": {
                                "elastic_indx": "10k",
                                "text": [
                                    SearchText
                                ],
                                "fileSearched": FileName?.toString(),

                                "min_score": 5,
                                "text_bool": "OR",
                                "highlight": "yes",
                                "hide_source": "no",
                                "type": [
                                    matchSearchText
                                ],
                                "match_type": "match",
                                "minimum_should_match": withinSearchText
                            }
                        }

                        resolve(request)
                    } catch (err: any) {
                        return (err);
                    }
                });
                let saveSearch: any = await dispatch(saveSearchApi({ request: myPromise }));
            }
            callSearchDataGetApi()
            setShowSaveSearchModal(false);
            setCondition(false);
        } catch (err) {
            return (err);
        }
    }

    const showSaveSearchPopUp = async (e: any) => {
        setShowSaveSearchModal(true)
        setSaveSearchFileName(selectedFileName);
    }

    const save_pages = async (e: any) => {
        setShowPopSavePage(true)
    }

    const savePageHandlers = (e: any, data: any, index1: any) => {
        e.stopPropagation();

        setShowSavePageButton(true);

        if (e.target.checked) {
            setSelectedDocs([...selectedDocs, data])
        } else {
            setSelectedDocs(selectedDocs.filter((item: any) => {
                return item.id !== data.id
            }))
        }
    }


    const displayIframe = async (item: any, e: any, index: any) => {
        //e.stopPropagation();
        setSelectedPdfIndex(index)

        setSelectedId(item.id)
        let attributes: any = ["id", "PDF", "page", "page_pdf"]
        let request: any = {
            "select_fields": attributes,
            "elastic_indx": "10k",
            "PDF": item['PDF'],
            "page": item['page'],
            "type": ["page"],
        }
        let pdfLink: any = await dispatch(displayDocuments({ request: request }))
        console.log(pdfLink.payload.data.data[0].page_pdf, "pdfLink.payload.data.data[0].page_pdfpdfLink.payload.data.data[0].page_pdfpdfLink.payload.data.data[0].page_pdf");

        setselectedDoc(pdfLink.payload.data.data[0].page_pdf);
        setShow2(true)
        setShowFrame(true)
    }

    if (show2) {
        setShow2(false)
    }

    let showAdvanceSearhcFrom = () => {
        return (
            <div>

                <Row className="mt-4">
                    <Col xl="4">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Document Type</Form.Label>
                            <Select options={documentType} />
                        </Form.Group>
                    </Col>
                    <Col xl="4">

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Documents</Form.Label>
                            <Select options={documents} />
                        </Form.Group>

                    </Col>
                    <Col xl="4">

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Search Inside</Form.Label>
                            <Select options={SearchInside} />
                        </Form.Group>

                    </Col>
                </Row>

                <Row>
                    <Col xl="12">
                        <Form.Label>Keyword Search</Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Col xl="6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Search" />
                        </Form.Group>
                    </Col>
                    <Col xl="6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Search" />
                        </Form.Group>
                    </Col>
                    <Col xl="6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Search" />
                        </Form.Group>
                    </Col>
                    <Col xl="6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Search" />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex zr-search-form-leftbutton">
                    <Button variant="primary" type="submit" className="zr-srachsave me-3">
                        Advanced Search
                    </Button>

                    <Button variant="primary" type="submit" onClick={() => openCloseAdvanceSearchForm} className="zr-srachsave clear">
                        Clear
                    </Button>
                </div>
            </div>
        )
    }

    const openCloseAdvanceSearchForm = (e: any) => {
        e.preventDefault();
        advanceFormState ? setAdvanceFormState(false) : setAdvanceFormState(true)
        showAdvanceSearhcFrom = advanceFormState
    }


    const paginationFunction = async (data: any) => {
        let pageNumber: any = data.selected
        let startingRange = 10 * pageNumber
        search_text_paginate(startingRange);
    }

    const onSelectValue = (e: any) => {
        const stringValue = typeof e?.value === 'string' ? e?.value : e?.value.toString();
        const stringLabel = typeof e?.label === 'string' ? e?.label : e?.label.toString();
        const finalValue = { value: stringValue, label: stringLabel }
        setArr(finalValue)
    }

    return (<>
        <section className="main-content p-4 pt-0">

            <Row>
                <Col xl="8" lg="8" className="mt-4">
                    <div className="main-content-top align-items-center d-flex justify-content-between mb-4">
                        <h3>Search Documents</h3>
                    </div>
                    <Card className="zr-searchform">
                        <Form validated={validated} >
                            <Row>
                                <Col xl="4">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Search</Form.Label>
                                        <Form.Control required type="text" placeholder="Search"
                                            onChange={(e) => {
                                                setsearchedFromSavedSearch(false)
                                                setTextToSearch(e.target.value)
                                            }}
                                            value={searchedFromSavedSearch ? SearchText : textToSearch}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xl="4">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Within</Form.Label>
                                        {/* <Select /> */}
                                        <Form.Select aria-label="Default select example" onChange={(e) => handleChangess(e)}
                                            value={searchedFromSavedSearch ? matchSearchText : searchType}>
                                            <option>Select</option>
                                            <option value="text">Text</option>
                                            <option value="cell">Table</option>
                                            <option value="both">Both</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col xl="4">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Of</Form.Label>
                                        <Select value={arr} onChange={(e: any) => handleChange(e)} options={groupedOptions || []}
                                        // closeMenuOnSelect={false}
                                        />
                                    </Form.Group>

                                </Col>
                                <Col xl="8">

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Match Type</Form.Label>
                                        <div className="d-flex align-items-baseline">
                                            <span className="text-muted">Loose</span>

                                            <Slider min={0} value={range} max={100} step={1} onChange={handleChanges}
                                                trackStyle={{
                                                    backgroundColor: "#A5CD3A",
                                                    height: "10px",
                                                }}
                                                railStyle={{
                                                    backgroundColor: "#ECECEC",
                                                    height: "10px"
                                                }}
                                                handleStyle={{
                                                    backgroundColor: "#98BF2E",
                                                    border: "solid 2px #98BF2E",
                                                    boxShadow: "0px 4px 20px rgba(165, 205, 58, 0.5)",
                                                    top: "25%",
                                                    width: "24px",
                                                    height: "24px",
                                                    opacity: "1"
                                                }}
                                            //   defaultValue = {searchedFromSavedSearch ? 36 : 0}
                                            //   defaultValue = {36}

                                            />
                                            <output className="bubble">{range}%</output>
                                            <span className="text-muted">Strict</span>
                                        </div>

                                    </Form.Group>

                                </Col>
                                <Col xl="4" className="d-flex justify-content-end p-4 pe-2">

                                    <Button variant="primary" type="submit" className="zr-srachsave" onClick={search_text}>
                                        Search
                                    </Button>
                                </Col>
                            </Row>
                            <div className="zr-advancedhead d-flex justify-content-between">
                                <div>
                                    Advanced Search
                                </div>
                                <div onClick={openCloseAdvanceSearchForm} className="zr-advancePointer">
                                    {advanceFormState ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                            <circle cx="11.5" cy="11.5" r="11" transform="rotate(-180 11.5 11.5)" fill="#A5CD3A" stroke="#A5CD3A" />
                                            <path d="M6.88433 14.0861L6.88432 14.0861C6.756 14.1944 6.58979 14.2498 6.42356 14.2498C6.25733 14.2498 6.09112 14.1944 5.96281 14.0861C5.83322 13.9768 5.75 13.8184 5.75 13.6423C5.75 13.4662 5.83322 13.3078 5.96281 13.1985L11.0389 8.91405L6.88433 14.0861ZM6.88433 14.0861L11.4999 10.1897M6.88433 14.0861L11.4999 9.86256M17.037 14.0861C16.9731 14.1401 16.8994 14.1812 16.821 14.2087C16.7425 14.2362 16.6594 14.25 16.5762 14.25C16.4931 14.25 16.41 14.2362 16.3314 14.2087C16.2529 14.1812 16.1792 14.14 16.1152 14.0859M17.037 14.0861L16.2767 13.8951M17.037 14.0861C17.101 14.0322 17.1545 13.9658 17.192 13.8895C17.2297 13.8128 17.25 13.7287 17.25 13.6423C17.25 13.556 17.2297 13.4718 17.192 13.3952C17.1545 13.3188 17.101 13.2524 17.037 13.1985L17.037 14.0861ZM16.1152 14.0859L16.2767 13.8951M16.1152 14.0859L16.1154 14.0861L16.2767 13.8951M16.1152 14.0859L11.4999 10.1897M16.2767 13.8951L11.4999 9.86256M11.4999 10.1897L11.6612 10.0536L11.4999 9.86256M11.4999 10.1897L11.3386 10.0536L11.4999 9.86256M17.0367 13.1983L11.9609 8.91405C11.9608 8.91402 11.9608 8.91398 11.9608 8.91394L11.9606 8.91385L17.0367 13.1983Z" fill="white" stroke="white" strokeWidth="0.5" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                            <circle cx="11.5" cy="11.5" r="11" fill="#A5CD3A" stroke="#A5CD3A" />
                                            <path d="M16.1157 8.91387L16.1157 8.91385C16.244 8.80555 16.4102 8.75019 16.5764 8.75019C16.7427 8.75019 16.9089 8.80555 17.0372 8.91385C17.1668 9.02322 17.25 9.18157 17.25 9.35769C17.25 9.53381 17.1668 9.69215 17.0372 9.80153L11.9611 14.0859L16.1157 8.91387ZM16.1157 8.91387L11.5001 12.8103M16.1157 8.91387L11.5001 13.1374M5.96303 8.91385C6.0269 8.85986 6.10058 8.81879 6.17901 8.79132C6.25755 8.76381 6.34062 8.75 6.42378 8.75C6.50694 8.75 6.59002 8.76381 6.66855 8.79132C6.74708 8.81882 6.82084 8.85996 6.88477 8.91405M5.96303 8.91385L6.72329 9.1049M5.96303 8.91385C5.89901 8.9678 5.84549 9.03418 5.80795 9.11055C5.77026 9.18721 5.75 9.27134 5.75 9.35769C5.75 9.44404 5.77026 9.52817 5.80795 9.60483C5.84549 9.6812 5.89901 9.74757 5.96303 9.80153L5.96303 8.91385ZM6.88477 8.91405L6.72329 9.1049M6.88477 8.91405L6.88455 8.91387L6.72329 9.1049M6.88477 8.91405L11.5001 12.8103M6.72329 9.1049L11.5001 13.1374M11.5001 12.8103L11.3388 12.9464L11.5001 13.1374M11.5001 12.8103L11.6614 12.9464L11.5001 13.1374M5.96327 9.80173L11.0391 14.0859C11.0392 14.086 11.0392 14.086 11.0392 14.0861L11.0394 14.0861L5.96327 9.80173Z" fill="white" stroke="white" strokeWidth="0.5" />
                                        </svg>
                                    }
                                </div>
                            </div>
                            {advanceFormState ?
                                <div className={`zr-AdSearchDiv ${advanceFormState ? "zr-fadeIn" : "zr-fadeOut"}`}>
                                    <div className="zr-advanceSearch">
                                        {showAdvanceSearhcFrom()}
                                    </div>
                                </div>
                                : ""}
                        </Form>
                    </Card>
                </Col>
                <Col className="zr-savedSearchColumn mt-4" xl="4">
                    <div className="main-content-top align-items-center d-flex justify-content-between mb-4 text-uppercase">
                        <h3>Saved Searches</h3>
                    </div>
                    <div className="zr-savedSearchs">
                        {savedSearchData && (savedSearchData?.data?.mySearches).map((item: any, index: any) => {
                            const newDate = new Date();
                            let month: any = newDate.getMonth() + 1
                            let day: any = newDate.getDate()

                            if (month < 10) {
                                month = "0" + month;
                            }
                            if (day < 10) {
                                day = "0" + day;
                            }

                            const todaysDate = `${newDate.getFullYear()}-${month}-${day}`;


                            let keyName = (Object.keys(item))[0];
                            let searchedDate = moment(item[keyName]["date_created"]).format('YYYY-MM-DD');

                            return (
                                <Card key={index} style={{ cursor: "pointer" }} onClick={(e: any) => { searchTextFromSaved(e, item[keyName]) }} className="p-0 mb-3">
                                    <div className="d-flex justify-content-between p-2 zr-saved-serach-head">
                                        <div >
                                            <p className="mb-0">Description</p>
                                            <h4 className="mb-0">{item[keyName]["description"]}</h4>
                                            <p className="mb-0">File Name </p>
                                            <h4 className="mb-0">{item[keyName]["search"].fileSearched}</h4>
                                        </div>
                                        <div className="action-button-outer align-self-baseline mt-1">
                                            <button className="custom-action-btn" onClick={(e: any) => { editFunction(e, item[keyName]["description"]) }}>
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.243 19.0001H21V21.0001H3V16.7571L12.9 6.85708L17.142 11.1011L9.242 19.0001H9.243ZM14.313 5.44408L16.435 3.32208C16.6225 3.13461 16.8768 3.0293 17.142 3.0293C17.4072 3.0293 17.6615 3.13461 17.849 3.32208L20.678 6.15108C20.8655 6.33861 20.9708 6.59292 20.9708 6.85808C20.9708 7.12325 20.8655 7.37756 20.678 7.56508L18.556 9.68608L14.314 5.44408H14.313Z" fill="#767676"></path>
                                                </svg>
                                            </button>
                                            <button className="custom-action-btn" onClick={(e: any) => { deleteFunction(e, item[keyName]["description"]) }}>
                                                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V7C3 6.73478 3.10536 6.48043 3.29289 6.29289C3.48043 6.10536 3.73478 6 4 6H14C14.2652 6 14.5196 6.10536 14.7071 6.29289C14.8946 6.48043 15 6.73478 15 7V16C15 16.5304 14.7893 17.0391 14.4142 17.4142C14.0391 17.7893 13.5304 18 13 18ZM16 3C16 3.26522 15.8946 3.51957 15.7071 3.70711C15.5196 3.89464 15.2652 4 15 4H3C2.73478 4 2.48043 3.89464 2.29289 3.70711C2.10536 3.51957 2 3.26522 2 3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H6V1C6 0.734784 6.10536 0.48043 6.29289 0.292893C6.48043 0.105357 6.73478 0 7 0L11 0C11.2652 0 11.5196 0.105357 11.7071 0.292893C11.8946 0.48043 12 0.734784 12 1V2H15C15.2652 2 15.5196 2.10536 15.7071 2.29289C15.8946 2.48043 16 2.73478 16 3Z" fill="#767676"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-2 zr-saved-search-bottom">
                                        <Row>
                                            <Col md="4">
                                                <label className="mb-2">Type</label>
                                                <p className="m-0">{item[keyName]["search"].type}</p>
                                            </Col>
                                            <Col md="4">
                                                <label className="mb-2">Data Searched</label>
                                                <p className="m-0">{todaysDate === searchedDate ? "Today" : searchedDate}</p>
                                            </Col>
                                            <Col md={{ span: 3, offset: 1 }}>
                                                <label className="mb-2">Result</label>
                                                <p className="m-0">N/A</p>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </Col>
            </Row>

        </section>
        {SearchTextResponse && <section className="main-content p-4">
            <div className="main-content-top align-items-center d-flex justify-content-between mb-2 text-uppercase">
                <h3>Search Results</h3>
                <div className="d-flex">
                    {selectedDocs.length ?
                        <div className="mb-4 mb-lg-0 me-2">
                            <Button className="zr-srachsave" onClick={save_pages}>Save Page</Button>
                        </div> : ''
                    }
                    {SearchTextResponse ?
                        <div className="mb-4 mb-lg-0">
                            <Button className="zr-srachsave" onClick={showSaveSearchPopUp}>Save Search</Button>
                        </div> : ""
                    }
                </div>
            </div>

            <Row className="mt-4">
                {/* <Col xl={showFrame ? "5" : "12"} > */}
                <Col xl="12">
                    <Row className="">
                        {SearchTextResponse && (SearchTextResponse.data).length ?
                            (SearchTextResponse.data).map((item: any, index: any) => {
                                let isActive = item.id === selectedId ? "active" : ""
                                return (
                                    <>
                                        {/* <Col lg={showFrame ? "6" : "3"} key={index}> */}
                                        {/* <Col lg={showFrame && item.id===selectedId ? "12" : "3"} key={index} > */}
                                        <Col lg={"6"} key={index} >

                                            <div style={{ height: "auto" }} className={`zr-srbox bg-white w-100 p-3 mb-4 ${isActive}`} onClick={(e: any) => displayIframe(item, e, index)}>
                                                <div className={`d-flex align-items-start  ${showFrame ? "mb-2" : "mb-3"} `}>
                                                    <div className="zr-srboximage d-flex justify-content-center align-items-center">
                                                        <img src={`data:image/jpeg;base64,${item.page_thumbnail_png}`} className="img-fluid" alt="Search" />
                                                    </div>
                                                    <div className="ms-2 zr-srboxleft">
                                                        <p className="mb-0">Page {item.page}</p>
                                                        <h4 className="mb-0 ">{item.PDF} <br />Report</h4>
                                                    </div>
                                                    <Form.Check
                                                        onClick={(e: any) => savePageHandlers(e, {
                                                            "index": "10K",
                                                            "document_name": item.PDF,
                                                            "num_pages": item.page,
                                                            "page_thumbnail_png": item.page_thumbnail_png,
                                                            "id": item.id,

                                                        }, index)}
                                                        id={index}
                                                        className={`cs-check-btn-sp input ms-auto`}
                                                    />
                                                </div>
                                                <div className="zr-srboxText">
                                                    <p className="zr-srboxTextPara" dangerouslySetInnerHTML={{
                                                        __html: item.text
                                                    }} />
                                                </div>
                                            </div>
                                        </Col>

                                        {

                                            // index == 1 && selectedPdfIndex <= 1 ?
                                            showFrame &&
                                            <Col lg="12">

                                                <div className="bg-white mb-4 p-4 d-flex justify-content-center zr-pdfFrame">
                                                        
                                                    <div className="zr-clossPdf" onClick={handleClossPDF}>
                                                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="#5B5B5B" viewBox="0 0 30 30" width="22px" height="22px">\
                                                            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
                                                        </svg> */}
                                                    </div>
                                                </div>
                                            </Col>}

                                    </>
                                )
                            })
                            :
                            "No Data"
                        }
                    </Row>
                </Col>
            </Row>

            {(SearchTextResponse.data).length > 0 ?
                <ReactPaginate
                    nextLabel="next >"
                    previousLabel="< previous"
                    pageCount={pagesCount}
                    marginPagesDisplayed={4}
                    onPageChange={paginationFunction}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    nextClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}

                /> : ""
            }


        </section>}

        <SearchModals
            showPopSavePage={showPopSavePage}
            showPop={showPop}
            showPop2={showPop2}
            condition={condition}
            NameError={NameError}
            savePageFileName={savePageFileName}
            searchFileName={searchFileName}
            radioType={radioType}
            showSaveSearchModal={showSaveSearchModal}
            saveSearchFileName={saveSearchFileName}
            showFrame={showFrame}
            selectedDoc={selectedDoc}
            handleClose={handleClose}
            handleClossPDF={handleClossPDF}
            deleteSearchdata={deleteSearchdata}
            savePageSearched={savePageSearched}
            saveNewSearchedterm={saveNewSearchedterm}
            handleInputChange={handleInputChange}
            save_search={save_search}
            setSearchFileName={setSearchFileName}
            setSavePageFileName={setSavePageFileName}
            setSaveSearchFileName={setSaveSearchFileName}
            setSelectedOptionModal={setSelectedOptionModal}
        />

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
                {/* <PdftronTableCells document={props.document} highlightText={props.highlightText} />
                 */}
                 {/* <Pdftron s */}
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    </>

    )

}

export default Search;
