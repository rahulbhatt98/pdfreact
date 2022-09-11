import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Accordion, Button, Card, Col, Form, Row, Modal } from "react-bootstrap";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable'
import AllData from "components/atoms/AllData"
import { getDatapointsWithHeader } from "store/actions/dataPoint"
import DetailComponent from 'components/atoms/DetailComponent'
import { getHeaders } from "store/actions/getHeaders";
import Loader from "components/atoms/Loader";
import KendoTableModal from "Modals/KendoTableModal";
import TableHeaders from "components/atoms/TableHeaders";
import { manageDocICon } from "utils/icons";
import { displayDocuments } from "pages/search/SearchSlice";
import PdftronModal from "Modals/PdftronModal";
import { displayCoordinate } from "pages/search/SearchSlice";
const DataPoints = () => {
  const [imageName, setimageName] = useState<any>("")
  const { datapoints, isLoadingDatapoint } = useSelector((state: any) => state.datapoints)
  const { dataHeaders } = useSelector((state: any) => state.GetHeaders)
  const [selectedOption, setSelectedOption] = useState({ label: "Data with selected row & column Headers", value: "Data with selected row & column Headers" });
  const [formatedDatapoints, setFormatedDatapoints] = useState([])
  const [newData, setNewData] = useState([])
  const [newDataValid, setNewDataValid] = useState([])
  const [rowName, setRowName] = useState({})
  const [rowIndex2, setRowIndex2] = useState<any>([])
  const [headers, setHeaders] = useState([])
  const [rowHeader, setrowHeader] = useState([])
  const [colHeaders, setcolHeaders] = useState([])
  const [show3, setShow3] = useState<any | null>(false);
  const [headers1, setHeaders1] = useState<any[]>([])
  const [ColHeaders1, setColHeaders1] = useState<any[]>([])
  const [KendoTableData, setKendoTableData] = useState<any[]>([])
  const [ShowKendoModal, setShowKendoModal] = useState(false)
  const [HighlightWord, setHighlightWord] = useState<any>([])
  const [HighlightWordMag, setHighlightWordMag] = useState<any>()
  const [coordinatePts, setCoordinatePts] = useState<any>();


  const dispatch = useDispatch()
  useEffect(() => {
    if (datapoints && datapoints?.datapoints?.length) {
      let formattedData = datapoints?.datapoints?.map((item: any, index: number) => {
        return ({
          data: item, index: index, Datapoints: `Datapoint ${index}`
        })
      })
      setFormatedDatapoints(formattedData)
    } else {
      setFormatedDatapoints([])
    }
  }, [datapoints])

  useEffect(() => {
    dispatch(getHeaders())
  }, [])

  useEffect(() => {
    let obj: any = {}
    if (dataHeaders && "myTableHeaders" in dataHeaders) {
      let all: any = []
      dataHeaders["myTableHeaders"].forEach((element: any) => {
        let [first] = Object.keys(element)
        all = [...all, { label: first, value: first }]
        element?.[first]?.["headers"].forEach((e: any, i: number) => {
          obj = { ...obj, [first]: obj[first] ? [...obj[first], e] : [] }
          setRowName(obj)
        });
      })
      setHeaders(all)
    }
  }, [dataHeaders])


  const [selectedData, setSelectedData] = useState<any>(
    {
      "row_header": [],
      "row_header_match": 'match',
      "row_header_min_score": 10,
      "col_header": [],
      "col_header_match": 'exact_match',
      "col_header_min_score": -1,
      "deduplicate": "yes",
      "elastic_indx": "10k",
    })
  const tableExtraction = [
    { label: "All data in tables", value: "All data in tables" },
    { label: "Data with selected column headers", value: "Data with selected column headers" },
    { label: "Data with selected row Headers", value: "Data with selected row Headers" },
    { label: "Data with selected row & column Headers", value: "Data with selected row & column Headers" }
  ];

  const rowHeaders = [
    ...headers
  ];

  const myDocuments = [
    { label: `FAANG dataset (premade)`, value: "FAANG dataset (premade)" },
    { label: "Top 100 Green Energy dataset (premade)", value: "Top 100 Green Energy dataset (premade)" },
    { label: "FTSE dataset (premade)", value: "FTSE dataset (premade)" },
    { label: "NYSE dataset (premade)", value: "NYSE dataset (premade)" },
    { label: "Custom dataset 1", value: "Custom dataset 1" },
    { label: "Custom dataset 1", value: "Custom dataset 1" }
  ];

  const myTables = [
    { label: "Green energy investments", value: "Green energy investments" },
    { label: "Red energy investments", value: "Red energy investments" },
    { label: "Car sales in china", value: "Car sales in china" },
  ]

  const mySearch = [
    { label: "Funds of funds", value: "Funds of funds" },
    { label: "Blue hydrogen investments", value: "Blue hydrogen investments" },
    { label: "Car sales in china", value: "Car sales in china" },
  ]

  const getDataFrom = [
    { label: "All Documents" },
    { label: "My Documennts", options: myDocuments },
    { label: "My Tables", options: myTables },
    { label: "My Search", options: mySearch }
  ];

  const moreHeaders = [
    { label: "Select All", value: "Select All" },
    // { label: "Research and development expenses", value: "Research and development expenses" },
    // { label: "Gross profit", value: "Gross profit" },
    ...headers1
  ]

  const PAndLColumns = [
    ...headers
  ];

  const columnsHeaders = [
    ...PAndLColumns
  ];

  const years = [
    { label: "Select All", value: "Select All" },
    ...ColHeaders1
  ]

  const [showTab2, setShowTab2] = useState(false);
  const [showTab4, setShowTab4] = useState(false);
  const [showTab5, setShowTab5] = useState(false);
  const [showTab6, setShowTab6] = useState(false);
  const [displayButton, setDisplayButton] = useState(false);
  const [showResultTable, setShowResultTable] = useState(false);

  const handleQuery = () => {
    dispatch(getDatapointsWithHeader(selectedData))
    setShowResultTable(true)
    setFormatedDatapoints([])
    setNewData([])
    setNewDataValid([])
    setRowIndex2([])
  }
  const handleClose = () => {
    setShowKendoModal(false)
    setShow3(false)
  }

  const handleAllData = (e: any) => {
    let obj: any = selectedData

    if (e.name === "All Documents") {
      delete obj.documents_set
      delete obj.ids
      setSelectedData(obj)
    }
    else if (e.name === "table") {
      delete obj.documents_set
      setSelectedData({ ...selectedData, "id_table": e.id })
    } else {
      delete obj.id_table
      setSelectedData({ ...selectedData, "documents_set": e.label[0] })
    }
    setShowTab2(true)
  }

  const handleChange = (newValue: any, actionMeta: any) => {
    let selectName: any[] = []
    let arrSelected: any = []
    let arrTyped: any = []
    let naam: any = rowName
    let arrheader: any = []
    if (newValue.length) {
      newValue.forEach((element: any) => {
        headers && headers.forEach((e: any) => {
          if (element.value === e.value) {
            arrheader.push(element)
            arrSelected.push(element.value)
            naam[e.value].forEach((head: any) => {
              selectName.push({ label: head, value: head })
            });
          }
          else {
            arrTyped.indexOf(element.value) === -1 ? arrTyped.push(element.value) : console.log();
          }
        });
        setHeaders1([...selectName])
      });

      if (arrheader.length) {
        setShowTab4(true)
        // setSelectedData({ ...selectedData, "row_header": arrSelected })
      }
      else {
        setSelectedData({ ...selectedData, "row_header": arrTyped })
        // setDisplayButton(false)
        setShowTab5(true)
      }
    }
    else {
      setShowTab4(false)
      setShowTab5(false)
      setShowTab6(false)
      setDisplayButton(false)
      setFormatedDatapoints([])
      setShowResultTable(false)
      setSelectedData({ ...selectedData, "row_header": [] })
      setSelectedData({ ...selectedData, "col_header": [] })
      setrowHeader([])
      setcolHeaders([])
      setHeaders1([])
    }
  };

  const handleHeaders = (e: any) => {
    let arr = [] as any
    let arr2 = [] as any
    if (e.length) {
      if (e.find((option: any) => option.value === "Select All")) {
        let arr1: any = moreHeaders.slice(1)
        arr = moreHeaders.slice(1)
        setrowHeader(arr1)
      }
      else {
        setrowHeader(e)
        arr = e
      }
      arr.forEach((element: any) => {
        arr2.push(element.value)
      });
      setSelectedData({ ...selectedData, "row_header": arr2 })
      setShowTab5(true)
    }
    else {
      setShowTab5(false)
      setShowTab6(false)
      setSelectedData({ ...selectedData, "row_header": [] })
      setrowHeader([])
      setcolHeaders([])
    }
  }
  let all1: any = []
  const columnsHeadersFunc = (newValue: any) => {
    // setcolHeaders(newValue)
    let selectName: any = []
    // let arrSelected: any = []
    let arrTyped: any = []
    let naam: any = rowName
    let arrheader: any = []
    setColHeaders1([])
    if (newValue.length) {
      newValue.forEach((element: any) => {
        headers && headers.forEach((e: any) => {
          if (element.value === e.value) {
            // arrSelected.push(element.value)
            arrheader.push(element)
            naam[e.value].forEach((head: any) => {
              selectName.push({ label: head, value: head })
            });
          }
          else {
            arrTyped.indexOf(element.value) === -1 ? arrTyped.push(element.value) : console.log();
            // setcolHeaders([]) 
          }
        });
        setColHeaders1([...selectName])

      });

      if (arrheader.length) {
        setShowTab6(true)
        //  setSelectedData({ ...selectedData, "col_header": [] })

      }
      else {
        setDisplayButton(true)
        setSelectedData({ ...selectedData, "col_header": arrTyped })
      }
    }
    else {
      setShowTab6(false)
      setcolHeaders([])
      setSelectedData({ ...selectedData, "col_header": [] })
    }
  }

  const handleHeadersCol = (e: any) => {
    let arr = [] as any
    let arr2 = [] as any
    if (e.length) {
      if (e.find((option: any) => option.value === "Select All")) {
        let arr1: any = years.slice(1)
        arr = years.slice(1)
        setcolHeaders(arr1)
        // setcolHeaders
      }
      else {
        setcolHeaders(e)
        arr = e
      }

      arr.forEach((element: any) => {
        arr2.push(element.value)
      });
      setSelectedData({ ...selectedData, "col_header": arr2 })
      setShowTab5(true)
      setDisplayButton(true)
    }
    else {
      // setShowTab5(false)
      // setShowTab6(false)
      setSelectedData({ ...selectedData, "col_header": [] })
      setcolHeaders([])
      setDisplayButton(false)

    }
  }

  const getInd = (ind: any, rowData: any) => {
    let i: any = []
    let values: any = { index: ind, val: rowData }
    i = [...newDataValid, values]
    setRowIndex2([...rowIndex2, ind.toString()])
    setNewDataValid(i)
  }

  const showPdf = async (dataArr: any) => {
    
    let coordArr = [dataArr?._data_point_ltrb,...dataArr?._col_header_cell_ltrbs, ...dataArr?._row_header_cell_ltrbs]
    console.log(dataArr,"222222222222222222222");

    let request={
      "PDF": dataArr?.PDF,
      "elastic_indx": "10k",
      "page": dataArr?.page,
      "select_fields": ["id", "PDF", "page", "page_pdf", "image_png"],
      type: ["page"],
    }
    setHighlightWord(coordArr)
    let highlightMagantaText: any = dataArr?._data_point_ltrb;
    setHighlightWordMag(highlightMagantaText)
    let pdfLink: any = await dispatch(displayDocuments({ request }))

    let request1 = {
      elastic_indx: "10k",
      PDF: [dataArr?.PDF],
      page: [dataArr?.page],
     
    };
    let pdfCoordinate:any =await dispatch(displayCoordinate({ request: request1 }));
    // let pdfCoordinate:any = await new Promise(async (resolve, reject) => {
    //   try {
    //     let pdf = await dispatch(displayCoordinate({ request: request1 }));
    //     resolve(pdf);
    //   } catch (err) {
    //     reject(err);
    //   }
    // });
    setCoordinatePts(pdfCoordinate?.payload?.data?.data?.table);
    setimageName(`data:application/pdf;base64,${pdfLink?.payload?.data?.data?.[0]?.page_pdf}`)
    setShow3(true)
  }
  const displayKendoTable = (data: any) => {
    let arr: any = []
    all1.forEach((e: any) => {
      e.forEach((element: any) => {
        arr = [...arr, ...element]
      });
    });
    setKendoTableData(arr)
    setShowKendoModal(true)
  }

  const myReturn = (e: any) => {
    all1 = [...all1, e]
  }

  return (
    <>
      {isLoadingDatapoint ? <Loader /> : ""}
      <section className="main-content p-4">
        <div className="main-content-top align-items-center d-flex justify-content-between mb-2">
          <h3>Data Points Extraction from Tables</h3>

        </div>
        <div className="mb-3">
          <Row>
            <Col xl="12" lg="12" sm="12" md="12">
              <Card >
                <Form>
                  <Row>
                    <Col xl="4">
                      <AllData getDataFrom={getDataFrom} setShowTab2={(e: string) => handleAllData(e)} />
                    </Col>
                    {showTab2 && <Col xl="4">
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Label className="dp-sub-heading">
                          What data to extract from these tables
                        </Form.Label>
                        <Select options={tableExtraction} defaultValue={selectedOption} onChange={(e: any) => {
                          // setShowTab3(true)
                          setSelectedOption(e.value)
                        }} />
                      </Form.Group>
                    </Col>}
                    {showTab2 && <Col xl="4">
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicEmail"
                      >

                        <Form.Label className="dp-sub-heading">Type in or Select rows headers</Form.Label>

                        <CreatableSelect isMulti isClearable options={rowHeaders} onChange={
                          handleChange
                        } />
                      </Form.Group>
                    </Col>}
                  </Row>
                  <Row>
                    {showTab4 && <Col xl="4">
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Label className="dp-sub-heading">Select one or more headers</Form.Label>
                        <Select options={moreHeaders} value={rowHeader} isMulti placeholder="" onChange={(e: any) => handleHeaders(e)} />
                      </Form.Group>
                    </Col>}
                    {showTab5 && <Col xl="4">
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicEmail"
                      >
                        {/* menuIsOpen={false} */}
                        <Form.Label className="dp-sub-heading">Type in or  Select columns headers</Form.Label>
                        <CreatableSelect isClearable isMulti options={columnsHeaders} placeholder="" onChange={(e: any) => {
                          columnsHeadersFunc(e)
                        }} />
                      </Form.Group>
                    </Col>}
                    {showTab6 && <Col xl="4">
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Label className="dp-sub-heading">Select one or more headers</Form.Label>
                        <Select options={years} isMulti placeholder="" value={colHeaders} onChange={(e: any) => {
                          handleHeadersCol(e)
                        }} />
                      </Form.Group>
                    </Col>}
                  </Row>
                  <Row>
                    <Col>
                      {displayButton && <Button onClick={() => handleQuery()}>Run</Button>}
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
        {showTab5 ? <TableHeaders data={selectedData} rowHeader={rowHeader} colHeaders={colHeaders} /> : ""}
        {/* {showResultTable &&  && <div> */}
        {showResultTable && formatedDatapoints.length ?
          <div>
            <div className="d-flex justify-content-end">
              <Button onClick={() => { displayKendoTable(newData) }} variant="outline-primary">View as Table</Button>
            </div>
            <Accordion defaultActiveKey="0" alwaysOpen>
              {formatedDatapoints && formatedDatapoints.map((dataItem: any, aindex: number) => {
                return (
                  <Accordion.Item style={{ borderTop: "1px solid rgba(0, 0, 0, 0.125)" }} className="my-2" eventKey={`"${aindex}"`} key={aindex}>
                    <Accordion.Header className={dataItem.data.length === 1 || (newDataValid.length > 0 && rowIndex2.find((element: any) => element.toString() === aindex.toString())) ? "zr-dataPointHeaderGreen" : "zr-dataPointHeaderRed"}>

                      {dataItem?.["data"]?.[0]?.[0]?.["PDF"]}
                      {dataItem.data.length === 1 ? <React.Fragment key={aindex}> <div className="ms-4 zr-graycard">{dataItem?.data?.[0]?.[0]?.["row_header_input"]}</div>
                        <div className="ms-4 zr-graycard">{dataItem?.data?.[0]?.[0]?.["col_header_input"]}</div>
                        <div className="ms-4 zr-graycard">{dataItem?.data?.[0]?.[0]?.["data_point_text"]}</div>
                        <div style={{ right: "60px" }} className="zr-checkboxSpan" onClick={(e) => {
                          e.stopPropagation()
                          showPdf(dataItem?.data?.[0]?.[0])
                        }
                        }
                        >{manageDocICon}</div>
                      </React.Fragment> : newDataValid && newDataValid.length > 0 && rowIndex2.find((element: any) => {
                        return (element.toString() === aindex.toString())
                      }) ? newDataValid.map((e: any, ind: number) => {
                        if (e.index.toString() === aindex.toString()) {

                          return (<React.Fragment key={ind}> <div className="ms-4 zr-graycard">{e.val?.[0]?.[0]?.["row_header_input"]}</div>
                            <div className="ms-4 zr-graycard">{e.val?.[0]?.[0]?.["col_header_input"]}</div>

                            <div className="ms-4 zr-graycard">{e.val?.[0]?.[0]?.["data_point_text"]}</div>
                            <div style={{ right: "60px" }} className="zr-checkboxSpan" onClick={(e) => {
                              e.stopPropagation()
                              showPdf(dataItem?.data?.[0]?.[0])
                            }
                            }
                            >{manageDocICon}</div>
                          </React.Fragment>)
                        }
                      }) : <React.Fragment > <div className="ms-4 zr-graycard">{dataItem?.data?.[0]?.[0]?.["row_header_input"]}</div>
                        <div className="ms-4 zr-graycard">{dataItem?.data?.[0]?.[0]?.["col_header_input"]}</div>
                        <div className="ms-4 zr-graycard-conflict">conflict</div>
                      </React.Fragment>}
                    </Accordion.Header>
                    <Accordion.Body><DetailComponent dataItem={dataItem} newData={newData} setNewData={setNewData} getInd={getInd} myData={myReturn} /></Accordion.Body>
                  </Accordion.Item>)
              })}
            </Accordion>
          </div> : showResultTable ? "no data" : ""
        }
      </section>
      {ShowKendoModal ? <KendoTableModal showKenod={ShowKendoModal} handleClose={handleClose} data={KendoTableData} /> : ""}
      <PdftronModal show={show3} rectCords={coordinatePts} handleClose={handleClose} document={imageName} highlightTextMag={HighlightWordMag} highlightText={HighlightWord}/>
    </>
  );
};

export default DataPoints;