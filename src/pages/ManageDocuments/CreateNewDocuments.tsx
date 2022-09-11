import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Grid, GridColumn, GridFilterChangeEvent, GridSortChangeEvent, GridHeaderSelectionChangeEvent, GridSelectionChangeEvent, getSelectedState } from "@progress/kendo-react-grid";
import { arrowIcon } from "utils/icons";
import { getDocuments, SaveNewDocuments } from 'store/actions/documents'
import { useSelector, useDispatch } from "react-redux"
import { RootState } from 'store/reducers/index'
import moment from 'moment';
import {
    filterBy,
    CompositeFilterDescriptor,
} from "@progress/kendo-data-query";
import { orderBy, SortDescriptor } from "@progress/kendo-data-query";
import { getter } from '@progress/kendo-react-common';
import { getDocumentSets } from "pages/Extract/ExtractDocumentSlice";
import { useLocation } from "react-router-dom";
import EditModal from "Modals/EditModal";
import { extractCleanDocument } from "store/reducers/ExtractDocumentSlice";
import { createDocument } from "utils/icons";

const initialFilter: CompositeFilterDescriptor = {
    logic: "and",
    filters: []
};

const initialFilter2: CompositeFilterDescriptor = {
    logic: "and",
    filters: []
};
const initialSort: Array<SortDescriptor> = [
    { field: 'date_time', dir: 'desc' },
];
const CreateNewDocuments = (props: any) => {
    const location = useLocation();
    const dispatch = useDispatch()
    const [isBlocked, setIsBlocked] = useState(false)
    const [isSavedInfo, setisSavedInfo] = useState<any | null>(false);
    const { dataDoc, isLoadingDoc } = useSelector((state: RootState) => state.documents)
    const { data, isLoading } = useSelector((state: RootState) => state.documentSet)
    const [products, setProducts] = useState<any[]>([])
    const [saved, setSaved] = useState<any[]>([])
    const [StoredName, setStoredName] = useState<any[]>([])
    const [AllData, setAllData] = useState<any[]>([])
    const [modalshow, setModalshow] = useState(false)
    const [docName, setDocName] = useState<string | null>('');
    const [NameError, setNameError] = useState<string | null>('');
    const [filter, setFilter] = React.useState(initialFilter);
    const [filter2, setFilter2] = React.useState(initialFilter2);
    const [sort, setSort] = React.useState(initialSort);
    // const [condition, setCondition] = useState<boolean | null>();
    const [selectedState, setSelectedState] = React.useState<{
        [id: string]: boolean | number[];
    }>({});
    const DATA_ITEM_KEY: string = 'id';
    const SELECTED_FIELD: string = 'selected';
    const idGetter = getter(DATA_ITEM_KEY);
    const SELECTED_FIELD2: string = 'selectedSecond';
    const DATA_ITEM_KEY2: string = 'id';
    const { isSavingDocument } = useSelector((state: RootState) => state.ExtractDocument)
    const idGetter2 = getter(DATA_ITEM_KEY2);

    useEffect(() => {
        dispatch(getDocuments())
        dispatch(getDocumentSets())
    }, [])

    useEffect(() => {

        if (isSavingDocument) {

            setIsBlocked(true)
            setisSavedInfo(true)

            const timer = setTimeout(() => {
                setIsBlocked(false)

                dispatch(extractCleanDocument())
                setisSavedInfo(false)
                setModalshow(false)
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isSavingDocument])

    useEffect(() => {

        let loc: any = location.state
        let locations: any = loc?.[Object.keys(loc)[0]]?.documents

        if (dataDoc && ('10k' in dataDoc)) {

            if (locations && locations.length) {

                setProducts(dataDoc['10k'].filter((dataItem: any) => {
                    return (locations && locations.length &&
                        !locations.find((element: any) => {
                            return element.id === dataItem.id;
                        }))
                }
                ))
                setSaved(dataDoc['10k'].filter((dataItem: any) => {
                    return (locations && locations.length &&
                        locations.find((element: any) => {
                            return element.id === dataItem.id;
                        }))
                }
                ))
            } else {

                setProducts(dataDoc['10k'].filter((dataItem: any) => {
                    return (locations && locations.length && locations.some((lp: any) => {

                        return (lp.id === dataItem.id)
                    })) ? Object.assign({ selected: true, selectedSecond: false }, dataItem) :

                        Object.assign({ selected: false, selectedSecond: false }, dataItem)
                }
                ))
            }

        }
        if (data && ('myDocumentSets' in data)) {
            if (data["myDocumentSets"]) {
                setAllData(data["myDocumentSets"])

                let key: any = [];
                data["myDocumentSets"].forEach((e: any) => {
                    key.push(Object.keys(e)[0]);
                });
                setStoredName(key)
            }
        }

    }, [isLoadingDoc, isLoading, dataDoc, data])

    const updateLists = (list: any) => {

        setSaved([...saved, ...list])

    }
    const filterByReference = (arr1: any, arr2: any) => {
        let res = [];
        res = arr1.filter((el: any) => {
            return !arr2.find((element: any) => {
                return element.id === el.id;
            });
        });
        return res;
    }

    const handleClose = () => setModalshow(false);
    const handleShow = () => setModalshow(true);
    const saveNewDoc = async (event: any) => {
        let data = saved;
        let name: any = docName;
        let idList: any = [];
        let condition2: any = false;
        let document_name: any = null;
        let index: any = "10k";
        let num_pages: any = null;
        let id: any = null;

        data.forEach(element => {
            document_name = element.PDF;
            num_pages = element.num_pages;
            id = element.id;
            idList.push({ document_name, index, num_pages, id })
        });
        if (name === '') {
            return setNameError('Enter Document Name')
        }
        if (idList && Array.isArray(idList) && name && name !== '') {


            if (condition2) {
                return setNameError('Enter New Name, Name Already Exists')
            }

            else {
                if (StoredName.includes(docName)) {
                    AllData.forEach((element: any) => {

                        if (element[name]) {
                            // selected = [...element[name]["documents"], ...selected]
                            let arr: any = []
                            arr = element[name]["documents"].filter((e: any) => {
                                return !idList.find((i: any) => {
                                    return i.document_name === e.document_name
                                })
                            })
                            idList = [...idList, ...arr]

                        }
                    });

                }
                await dispatch(SaveNewDocuments({ idList, name }));
                dispatch(getDocumentSets())
                dispatch(getDocuments())
                setNameError('')
                setSaved([])
                setProducts([...products, ...saved.map((element: any) => ({ ...element, selected: false, selectedSecond: false }))])
                setDocName('')
            }
        }
    }

    const onSelectionChange = React.useCallback(
        (event: GridSelectionChangeEvent) => {
            let newSelectedState: any = []
            let dataArr: any = products
            let selectedData: any = []
            let result: any = []
            let state: any = null;
            newSelectedState = getSelectedState({
                event,
                selectedState: selectedState,
                dataItemKey: DATA_ITEM_KEY,
            });

            setSelectedState(newSelectedState);
            dataArr = products.map(item => ({ ...item, [SELECTED_FIELD]: newSelectedState[idGetter(item)] }))
            setProducts(dataArr)
            newSelectedState = []

            dataArr.forEach((item: any) => {
                if (item.selected === true) {
                    selectedData.push(item)
                }
            })

            if (selectedData.length) {
                updateLists(selectedData.map((element: any) => ({ ...element, selected: false, selectedSecond: false })))
                result = filterByReference(dataArr, selectedData)            
                for (let key in selectedState) {
                    state = { ...state, [key]: false }
                }
                setProducts(result)

            }
            setSelectedState(state)


        },
        [selectedState, products]
    );

    const onHeaderSelectionChange = React.useCallback(
        (event: GridHeaderSelectionChangeEvent) => {
            let dataArr: any = products
            let selectedData: any = []
            let result: any = []
            let state: any = null;
            const checkboxElement: any = event.syntheticEvent.target;
            const checked = checkboxElement.checked;
            const newSelectedState: any = {};
            event.dataItems.forEach((item) => {
                newSelectedState[idGetter(item)] = checked;
            });
            setSelectedState(newSelectedState);
            dataArr = products.map(item => ({ ...item, [SELECTED_FIELD]: newSelectedState[idGetter(item)] = checked }))
            setProducts(dataArr)
            // shareData(dataArr)
            dataArr.forEach((item: any) => {
                if (item.selected === true) {
                    selectedData.push(item)
                }
            })

            if (selectedData.length) {
                updateLists(selectedData.map((element: any) => ({ ...element, selected: false, selectedSecond: false })))
                result = filterByReference(dataArr, selectedData)

                for (let key in selectedState) {
                    state = { ...state, [key]: false }
                }


                // (setTimeout(() => {

                setProducts(result)

                // }, 1000))
                setSelectedState(state)

            }
        },
        [products]
    );

    const onSelectionChangeSecond = React.useCallback(
        (event: GridSelectionChangeEvent) => {

            let newSelectedState: any = []         
            let dataArr: any = saved
            newSelectedState = getSelectedState({
                event,
                selectedState: selectedState,
                dataItemKey: DATA_ITEM_KEY2,
            });

            setSelectedState(newSelectedState);
            dataArr = saved.map(item => ({ ...item, [SELECTED_FIELD2]: newSelectedState[idGetter2(item)] }))
            dataArr.forEach((item: any) => {

            });

            setSaved(dataArr)
            shareData(dataArr)

        },
        [selectedState, saved]
    );

    const onHeaderSelectionChangeSecond = React.useCallback(
        (event: GridHeaderSelectionChangeEvent) => {
            let dataArr: any = saved           
            const checkboxElement: any = event.syntheticEvent.target;
            const checked = checkboxElement.checked;
            const newSelectedState: any = {};
            event.dataItems.forEach((item) => {
                newSelectedState[idGetter2(item)] = checked;
            });
            setSelectedState(newSelectedState);
            dataArr = saved?.map(item => ({ ...item, [SELECTED_FIELD2]: newSelectedState[idGetter2(item)] = checked }))
            setSaved(dataArr)
            shareData(dataArr)
        },
        [saved]
    );

    const shareData = (data: any) => {

        let dataArr: any = data
        let selectedData: any = []
        let result: any = []
        let state: any = null;
        dataArr.forEach((item: any) => {
            if (item.selectedSecond === true) {
                selectedData.push(item)
            }
        })
        result = filterByReference(dataArr, selectedData?.map((element: any) => ({ ...element, selected: false, selectedSecond: false })))
        setSaved(result)
        setProducts([...products, ...selectedData?.map((element: any) => ({ ...element, selected: false, selectedSecond: false }))])
        setSelectedState({})
        for (let key in selectedState) {
            state = { ...state, [key]: false }
        }
        setSelectedState(state)
    }

    return (
        <>
            <section className="main-content p-4">
                <div className="main-content-top align-items-center d-flex justify-content-between mb-2">
                    <h3>Create/Edit Document Sets</h3>
                </div>
                <Row>
                    <Col>
                        <div className="grid-outer">
                            <Grid style={{ height: "400px" }}
                                data={filterBy(orderBy(products, sort), filter)}

                                sortable={true}
                                filterable={true}
                                reorderable={true}
                                filter={filter}
                                onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
                                sort={sort}
                                onSortChange={(e: GridSortChangeEvent) => {
                                    setSort(e.sort);
                                }}
                                dataItemKey={DATA_ITEM_KEY}
                                selectedField={SELECTED_FIELD}
                                selectable={{
                                    enabled: false,
                                    drag: false,
                                    cell: false,
                                    mode: 'multiple',
                                }}
                                onSelectionChange={onSelectionChange}
                                onHeaderSelectionChange={onHeaderSelectionChange}
                            >
                                <GridColumn field={SELECTED_FIELD} title="Select"
                                    filterable={false}
                                    headerSelectionValue={
                                        products?.findIndex((item) => !selectedState?.[idGetter(item)]) === -1
                                    }

                                />
                                <GridColumn field="PDF" title="Document Name" />
                                <GridColumn sortable={true} filterable={false} format="{DD/MM/YYYY}" field={`date_time`} cell={(props: any) => {

                                    const { dataItem } = props

                                    return (<td onClick={props.onClick}>
                                        {moment(dataItem.date_time).format("DD/MM/YYYY")}
                                    </td>)
                                }} title="Date Processed" />

                                <GridColumn filterable={false} field={`num_pages`} title="Pages" />
                            </Grid>
                        </div>
                    </Col>
                    <Col>
                        <div className="grid-outer mb-3">
                            <Grid style={{ height: "400px" }}
                                data={filterBy(orderBy(saved, sort), filter2)}
                                sortable={true}
                                filterable={true}
                                reorderable={true}
                                filter={filter2}
                                onFilterChange={(e: GridFilterChangeEvent) => setFilter2(e.filter)}
                                sort={sort}
                                onSortChange={(e: GridSortChangeEvent) => {
                                    setSort(e.sort);
                                }}
                                dataItemKey={DATA_ITEM_KEY2}
                                selectedField={SELECTED_FIELD2}
                                selectable={{
                                    enabled: false,
                                    drag: false,
                                    cell: false,
                                    mode: 'multiple',
                                }}
                                onSelectionChange={onSelectionChangeSecond}
                                onHeaderSelectionChange={onHeaderSelectionChangeSecond}
                            >
                                <GridColumn field={SELECTED_FIELD2} title="Select"
                                    filterable={false}
                                    headerSelectionValue={
                                        saved.findIndex((item) => !selectedState?.[idGetter2(item)]) === -1
                                    }
                                />
                                <GridColumn field="PDF" title="Description" />
                            </Grid>
                        </div>
                        <Button disabled={saved.length > 0 ? false : true} variant="secondary" onClick={handleShow}> Save Document Set</Button>&nbsp;
                        {props.showCreatePage && <Button variant="dark" onClick={() => props.setShowCreatePage(false)}> Close</Button>}
                    </Col>
                </Row>
            </section>

            {modalshow ? <EditModal modalshow={modalshow} handleClose={handleClose} docName={docName} setDocName={setDocName} continueSvingDoc={saveNewDoc} NameError={NameError} isSaved={isSavedInfo} isBlocked={isBlocked} setNameError={setNameError} name={StoredName} typeN={"document"} /> : ""}
        </>
    )
}

export default CreateNewDocuments;