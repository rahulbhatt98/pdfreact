import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux"
import { getDocumentSets } from "pages/Extract/ExtractDocumentSlice";
import { getTableSets } from "pages/ManageDocuments/getTableSetsSlice";
const AllData = (props: any) => {
    const dispatch = useDispatch()
    const { data, } = useSelector((state: any) => state.documentSet)
    const { dataTable } = useSelector((state: any) => state.tableSets)
    const [getData, setGetData] = useState<any[]>([
        {label: "All Documents",value:"All Documents",name:"All Documents"},
        {label: "My Documents",options:[]},
        {label: "My Tables", options: []},
        {label: "My Search", options: []}
    ]);
    useEffect(() => {
        dispatch(getDocumentSets())
        dispatch(getTableSets())
    }, [])
    useEffect(() => {
        if (data && ('myDocumentSets' in data)) {
            let dataArray: any = [];
            data["myDocumentSets"].forEach((e: any) => {
                let key:any = null;
                key = Object.keys(e);
                if(e[key[0]].documents && e[key[0]].documents.length){
                    dataArray.push({label:key,value:key,name:"document"})
                    getData[1].options=dataArray
                }
            });
            setGetData(getData)
        }
    }, [data])
    useEffect(()=>{
       
        if (dataTable && ("myTableSets") in dataTable) {
            let dataArray: any = [];
            dataTable["myTableSets"].forEach((e: any) => {
                let key:any= null;
                key = Object.keys(e);
                if(e[key[0]].tables && e[key[0]].tables.length){
                    let elem = e[key[0]].tables
                    let ids:any=  elem.map((ind:any)=>{                     
                        return ind.id
                    })
                    dataArray.push({label:key,value:key,name:"table",id:ids})
                       getData[2].options=dataArray
                }
            });
            setGetData(getData)

        }
    },[dataTable])

    return (
        <Form.Group
        className="mb-3"
        controlId="formBasicEmail"
        >
        <Form.Label  className="dp-sub-heading">Where to get the data from</Form.Label>
        <Select options={getData} placeholder="Search" onChange={(e)=>{
        
            props.setShowTab2(e)}} />
        </Form.Group>
    )
}
export default AllData

