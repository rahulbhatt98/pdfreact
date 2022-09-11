
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { Accordion, } from "react-bootstrap";
import { deleteIcon, manageDocICon } from "utils/icons";
import { displayDocuments } from "../../pages/search/SearchSlice"
import PdftronModal from "Modals/PdftronModal";
import { displayCoordinate } from "../../pages/search/SearchSlice";
const DetailComponent = (props: any) => {
  const dispatch = useDispatch()
  const dataItems = props.dataItem.data;
  const { index } = props.dataItem;
  const [rows, setRows] = useState(dataItems ? dataItems : [])
  const [checkrows, setCheckrows] = useState(dataItems ? dataItems : [])
  const [checkArr, setcheckArr] = useState<any>([])
  const [show3, setShow3] = useState<any | null>(false);
  const [imageName, setimageName] = useState<any>("")
  const [expandAccordian, setExpandAccordian] = useState<any | null>(false);
  const [activeArr, setactiveArr] = useState<any>([]);
  const [HighlightWord, setHighlightWord] = useState<any>([])
  const [HighlightWordMag, setHighlightWordMag] = useState<any>()
  const [coordinatePts, setCoordinatePts] = useState<any>();

  const onRemove = (index: number, sub: number, inner: number, datalength: number) => {
    const mdata: any = Array.from(rows);
    let arr: any = []
    if (datalength <= 1) {
      arr = mdata.filter((item: any, mindex: number) => mindex !== index)
      setRows(arr)

    } else {
      mdata[sub] = mdata[sub].filter((item: any, mindex: number) => mindex !== inner)
      setRows(mdata)
    }
  }

  const removeRow = (e: any, index: number) => {
    e.stopPropagation();
    const mdata: any = Array.from(rows)
    let arr: any = []
    arr = mdata.filter((item: any, mindex: number) => mindex !== index)
    setRows(arr)
    props.setNewData([...props.newData, arr])
    if (arr && arr.length === 1) {
      props.getInd(props.dataItem.index, arr)
    }
  }

  const deleteData = () => {
    if (checkArr.length) {
      let arr: any = [];
      arr = rows.filter((item: any, index: any) => {
        return checkArr.find((i: any) => {
          return index.toString() === i.toString()
        })
      })
      setRows(arr)
      props.setNewData([...props.newData, arr])
      if (arr && arr.length === 1) {
        props.getInd(props.dataItem.index, arr)
      }
      setcheckArr([])
    }
  }

  const handleValidateChange = (e: any, firstindex: number) => {
    e.stopPropagation();
    const cdata: any = Array.from(checkrows)
    let num: any = firstindex.toString();
    if (e.target.checked) {
      setcheckArr([...checkArr, num])
      setCheckrows(cdata)
    }
    else {
      const cdata: any = Array.from(checkrows)
      cdata[firstindex] = cdata[firstindex].map((item: any, mindex: number) => {
        return { ...item, isChecked: false }
      })
      let arr: any = checkArr.filter((item: any) => {
        return (num !== item.toString())
      })
      setcheckArr(arr)
      setCheckrows(cdata)
    }
  }
  const showPdf = async (body: object,dataArr:any) => {
    let coordArr = [dataArr?._data_point_ltrb,...dataArr?._col_header_cell_ltrbs, ...dataArr?._row_header_cell_ltrbs]    
    setHighlightWord(coordArr)
    let highlightMagantaText: any = dataArr?._data_point_ltrb;
    setHighlightWordMag(highlightMagantaText)
    let pdfLink: any = await dispatch(displayDocuments({ request: body }))
   
    let request1 = {
      elastic_indx: "10k",
      PDF: [dataArr?.PDF],
      page: [dataArr?.page],
     
    };
    let pdfCoordinate:any =await dispatch(displayCoordinate({ request: request1 }));
    setCoordinatePts(pdfCoordinate?.payload?.data?.data?.table);

    setimageName(`data:application/pdf;base64,${pdfLink.payload.data.data[0].page_pdf}`)
    setShow3(true)
  }
  const handleClose = () => {
    setShow3(false)
  };
  let compareArr: any = [];
  rows.forEach((element: any) => {
    compareArr.push(element[0]["data_point_text"].replace(/[$," "()\[\]',]+/g, ''))
  });
  useEffect(() => {
    props.myData(rows)
  })

  return (
    <>
      <Accordion className="mb-2" activeKey={activeArr} alwaysOpen>
        <div className="d-flex justify-content-between align-items-center">
          {checkArr.length ? <div className="w-100 alert zr-doc-alert py-1 px-3 d-flex justify-content-between align-items-baseline" role="alert">
            <p className="m-0">Are your sure you Wants to delete the unselected items?</p>
            <button className=" btn btn-primary btn-sm" onClick={() => deleteData()}>delete</button>
          </div > : ""}
          <div onClick={() => {
            setExpandAccordian(!expandAccordian)

          }} className="ms-auto mb-1">
            {expandAccordian ? <div onClick={() => {
              setactiveArr([])
            }} className="zr-advancePointer"> <span>Collapse All</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                <circle cx="11.5" cy="11.5" r="11" transform="rotate(-180 11.5 11.5)" fill="#A5CD3A" stroke="#A5CD3A" />
                <path d="M6.88433 14.0861L6.88432 14.0861C6.756 14.1944 6.58979 14.2498 6.42356 14.2498C6.25733 14.2498 6.09112 14.1944 5.96281 14.0861C5.83322 13.9768 5.75 13.8184 5.75 13.6423C5.75 13.4662 5.83322 13.3078 5.96281 13.1985L11.0389 8.91405L6.88433 14.0861ZM6.88433 14.0861L11.4999 10.1897M6.88433 14.0861L11.4999 9.86256M17.037 14.0861C16.9731 14.1401 16.8994 14.1812 16.821 14.2087C16.7425 14.2362 16.6594 14.25 16.5762 14.25C16.4931 14.25 16.41 14.2362 16.3314 14.2087C16.2529 14.1812 16.1792 14.14 16.1152 14.0859M17.037 14.0861L16.2767 13.8951M17.037 14.0861C17.101 14.0322 17.1545 13.9658 17.192 13.8895C17.2297 13.8128 17.25 13.7287 17.25 13.6423C17.25 13.556 17.2297 13.4718 17.192 13.3952C17.1545 13.3188 17.101 13.2524 17.037 13.1985L17.037 14.0861ZM16.1152 14.0859L16.2767 13.8951M16.1152 14.0859L16.1154 14.0861L16.2767 13.8951M16.1152 14.0859L11.4999 10.1897M16.2767 13.8951L11.4999 9.86256M11.4999 10.1897L11.6612 10.0536L11.4999 9.86256M11.4999 10.1897L11.3386 10.0536L11.4999 9.86256M17.0367 13.1983L11.9609 8.91405C11.9608 8.91402 11.9608 8.91398 11.9608 8.91394L11.9606 8.91385L17.0367 13.1983Z" fill="white" stroke="white" strokeWidth="0.5" />
              </svg> </div>
              : <div onClick={() => {
                let arr: any = []
                rows.map((e: any, i: number) => {
                  let index = i.toString()
                  arr.push(index)
                })
                setactiveArr(arr)

              }} className="zr-advancePointer"><span>Expand All</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                  <circle cx="11.5" cy="11.5" r="11" fill="#A5CD3A" stroke="#A5CD3A" />
                  <path d="M16.1157 8.91387L16.1157 8.91385C16.244 8.80555 16.4102 8.75019 16.5764 8.75019C16.7427 8.75019 16.9089 8.80555 17.0372 8.91385C17.1668 9.02322 17.25 9.18157 17.25 9.35769C17.25 9.53381 17.1668 9.69215 17.0372 9.80153L11.9611 14.0859L16.1157 8.91387ZM16.1157 8.91387L11.5001 12.8103M16.1157 8.91387L11.5001 13.1374M5.96303 8.91385C6.0269 8.85986 6.10058 8.81879 6.17901 8.79132C6.25755 8.76381 6.34062 8.75 6.42378 8.75C6.50694 8.75 6.59002 8.76381 6.66855 8.79132C6.74708 8.81882 6.82084 8.85996 6.88477 8.91405M5.96303 8.91385L6.72329 9.1049M5.96303 8.91385C5.89901 8.9678 5.84549 9.03418 5.80795 9.11055C5.77026 9.18721 5.75 9.27134 5.75 9.35769C5.75 9.44404 5.77026 9.52817 5.80795 9.60483C5.84549 9.6812 5.89901 9.74757 5.96303 9.80153L5.96303 8.91385ZM6.88477 8.91405L6.72329 9.1049M6.88477 8.91405L6.88455 8.91387L6.72329 9.1049M6.88477 8.91405L11.5001 12.8103M6.72329 9.1049L11.5001 13.1374M11.5001 12.8103L11.3388 12.9464L11.5001 13.1374M11.5001 12.8103L11.6614 12.9464L11.5001 13.1374M5.96327 9.80173L11.0391 14.0859C11.0392 14.086 11.0392 14.086 11.0392 14.0861L11.0394 14.0861L5.96327 9.80173Z" fill="white" stroke="white" strokeWidth="0.5" />
                </svg> </div>
            }
          </div>
        </div>
        {rows && rows.length !== 1 ? rows.map((dataItem: any, aindex: number) => {
          const datalength: number = dataItem.length
          return (
            <Accordion.Item className="mb-2" style={{ borderTop: "1px solid rgba(0, 0, 0, 0.125)", borderRadius: "3px" }} eventKey={`${aindex}`} key={aindex}>
              <Accordion.Header onClick={() => {
                let arr: any = []
                if (activeArr.includes(aindex.toString())) {
                  arr = activeArr.filter((e: any) => {
                    return e !== aindex.toString()
                  })
                  setactiveArr(arr)
                }
                else {
                  setactiveArr([...activeArr, aindex.toString()])
                }
              }}>{dataItem[0].PDF}
                <div className="ms-4 zr-graycard">{dataItem?.[0]?.["row_header_input"]}</div>
                <div className="ms-4 zr-graycard">{dataItem?.[0]?.["col_header_input"]}</div>
                <div className="ms-4 zr-graycard">{dataItem[0]?.["data_point_text"]}</div>
                <div style={{right: "175px"}} className="zr-checkboxSpan" onClick={(e:any) => {
                     e.stopPropagation()
                        showPdf({
                          "PDF": dataItem?.[0]?.PDF,
                          "elastic_indx": "10k",
                          "page": dataItem?.[0]?.page,
                          "select_fields": ["id", "PDF", "page", "page_pdf", "image_png"],
                          type: ["page"],
                        },dataItem?.[0])
                   
                        }}                       
                       >{manageDocICon}</div>
                <span className="zr-checkboxSpan">
                  {
                    checkArr.find((i: any) => {
                      return i.toString() === aindex.toString()
                    }) ? <>
                      <label style={{ color: '#ffffff', backgroundColor: '#A5CD3A' }} className="container" onClick={(e: any) => handleValidateChange(e, aindex)}>Validate
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </> : <>
                      <label style={{ color: '#343434' }} className="container" onClick={(e: any) => handleValidateChange(e, aindex)}>Validate
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </>
                  }
                </span>
                <span style={{ position: "absolute", right: "50px" }} onClick={(e: any) => removeRow(e, aindex)} className="ml-auto">{deleteIcon}</span>
              </Accordion.Header>
              <Accordion.Body>
                <table className="zr-searchReasultTable">
                  <thead>
                    <tr>
                      <th>PDF</th>
                      <th>Page</th>
                      <th>Row Header</th>
                      <th>Col Header</th>
                      <th>Data Point</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataItem.map((e: any, inindex: number) => {
                      return (
                        <tr key={inindex}>
                          <td>{e?.PDF}</td>
                          <td>{e?.page}</td>
                          <td>{e?.row_header_texts?.map((e:any,index:number)=>{return <React.Fragment key={index}>{e}&nbsp;</React.Fragment>})} </td>
                          <td>{e?.col_header_texts?.map((e:any,index:number)=>{return <React.Fragment key={index}>{e}&nbsp;</React.Fragment>})} </td>
                          {/* <td>{col_header_texts.replace(/[\[\]',]+/g, '')}</td> */}
                          <td>{e?.data_point_text}</td>
                          <td>
                            <span onClick={() => showPdf({
                              "PDF": e?.PDF,
                              "elastic_indx": "10k",
                              "page": e?.page,
                              "select_fields": ["id", "PDF", "page", "page_pdf", "image_png"],
                              type: ["page"],
                            },e)} className="me-2" style={{ cursor: 'pointer' }}
                            >{manageDocICon}</span>
                            <span style={{ cursor: 'pointer' }}
                              onClick={() =>
                                onRemove(index, aindex, inindex, datalength)}
                            >{deleteIcon}</span></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </Accordion.Body>
            </Accordion.Item>
          )
        }) : rows.map((dataItem: any, aindex: number) => {
          
          const datalength: number = dataItem.length
          return (
            <React.Fragment key={aindex}>
              <Accordion.Item className="mb-2" style={{ borderTop: "1px solid rgba(0, 0, 0, 0.125)", borderRadius: "3px" }} eventKey={`${aindex}`} >
                <table className="zr-searchReasultTable">
                  <thead>
                    <tr>
                      <th>PDF</th>
                      <th>Page</th>
                      <th>Row Header</th>
                      <th>Col Header</th>
                      <th>Data Point</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataItem.map((e: any, inindex: number) => {
                      return (
                        <tr key={e?.inindex}>
                          <td>{e?.PDF}</td>
                          <td>{e?.page}</td>
                          <td>{e?.row_header_texts?.map((e:any,index:number)=>{return <React.Fragment key={index}>{e}&nbsp;</React.Fragment>})} </td>
                          <td>{e?.col_header_texts?.map((e:any,index:number)=>{return <React.Fragment key={index}>{e}&nbsp;</React.Fragment>})} </td>
                          <td>{e?.data_point_text}</td>
                          <td>
                            <span onClick={() => showPdf({
                              "PDF": e?.PDF,
                              "elastic_indx": "10k",
                              "page": e?.page,
                              "select_fields": ["id", "PDF", "page", "page_pdf", "image_png"],
                              type: ["page"],                           
                            },e)} className="me-2" style={{ cursor: 'pointer' }}
                            >{manageDocICon}</span>
                            <span style={{ cursor: 'pointer' }}
                              onClick={() =>
                                onRemove(index, aindex, inindex, datalength)}
                            >{deleteIcon}</span></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </Accordion.Item>
            </React.Fragment>)
        })}
      </Accordion>
      <PdftronModal show={show3} highlightTextMag={HighlightWordMag} handleClose={handleClose} document={imageName} highlightText={HighlightWord} rectCords={coordinatePts}/>
    </>
  );
};
export default DetailComponent