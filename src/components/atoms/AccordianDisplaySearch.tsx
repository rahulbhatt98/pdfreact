import {  Accordion, Card } from "react-bootstrap";
import moment from 'moment';
import { editICon, deleteIcon} from "utils/icons";
import {useNavigate } from "react-router-dom";

const AccordianDisplaySearch = (props: any) => {
    const navigate = useNavigate();

    return (
        <>
           <Accordion defaultActiveKey="0">
            {props.allData && props.allData?.data?.mySearches.map((item: any, index: any) => {
               
                let name = Object.keys(item)[0]
                const newDate = new Date();
                    let month:any = newDate.getMonth() + 1
                    let day:any = newDate.getDate()
                    if(month < 10 ){
                        month = "0" + month;
                    }
                    if(day < 10) {
                        day = "0" + day;
                    }
                    const todaysDate = `${newDate.getFullYear()}-${month}-${day}`;
                
                    let keyName = (Object.keys(item))[0];
                    let searchedDate = moment(item[keyName]["date_created"]).format('YYYY-MM-DD');
                return (
           
                        <Accordion.Item eventKey={index} key={index} className="mb-2 border-top">
                            <Accordion.Header>{name}
                                <div className="action-button-outer d-flex">
                                    <div className="custom-action-btn my-auto px-1" onClick = {() => {
                                        navigate('/search', {state: item[name]["search"]})}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M10.2786 0C6.01731 0 2.53664 3.46081 2.53664 7.72167C2.53664 9.42204 3.09684 10.9825 4.01707 12.2626C2.79668 13.5029 1.5765 14.7231 0.356117 15.9435C-0.744136 17.0438 0.956236 18.7441 2.05649 17.6439L5.73742 13.963C7.0177 14.9032 8.57813 15.4434 10.2783 15.4434C14.5392 15.4633 18 11.9826 18 7.72171C18 3.46085 14.5392 4.25401e-05 10.2783 4.25401e-05L10.2786 0ZM10.2786 13.0631C7.33789 13.0631 4.95748 10.6826 4.95748 7.74194C4.95748 4.80142 7.33797 2.40056 10.2786 2.40056C13.2191 2.40056 15.5997 4.8012 15.5997 7.72167C15.5997 10.6424 13.1992 13.0631 10.2786 13.0631Z" fill="#848484"/>
                                        </svg>
                                    </div>
                                    <span className="custom-action-btn" onClick={(e: any) => {
                                        props.editFunction(e, "searches")
                                        props.setDocumentName(name)
                                        props.setDocName(name)

                                    }}>{editICon}</span>
                                    <span className="custom-action-btn" onClick={(e: any) => {
                                        props.setDocumentName(name)
                                        props.setDocName(name)
                                        props.deleteFunction(e, "searches")
                                    }}>{deleteIcon}</span>
                                </div>
                            </Accordion.Header>

                            <Accordion.Body>
                                <div>
                                    <div className="doc-card">
                                       
                                                <Card key={index}>
                                                    
                                                    <Card.Body className="p-0">
                                                        <span>
                                                            {/* {manageDocICon} */}
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                <path d="M10.2786 0C6.01731 0 2.53664 3.46081 2.53664 7.72167C2.53664 9.42204 3.09684 10.9825 4.01707 12.2626C2.79668 13.5029 1.5765 14.7231 0.356117 15.9435C-0.744136 17.0438 0.956236 18.7441 2.05649 17.6439L5.73742 13.963C7.0177 14.9032 8.57813 15.4434 10.2783 15.4434C14.5392 15.4633 18 11.9826 18 7.72171C18 3.46085 14.5392 4.25401e-05 10.2783 4.25401e-05L10.2786 0ZM10.2786 13.0631C7.33789 13.0631 4.95748 10.6826 4.95748 7.74194C4.95748 4.80142 7.33797 2.40056 10.2786 2.40056C13.2191 2.40056 15.5997 4.8012 15.5997 7.72167C15.5997 10.6424 13.1992 13.0631 10.2786 13.0631Z" fill="#848484"/>
                                                            </svg>
                                                            <span className="ms-2">{item[name]["description"]}</span>
                                                        </span>

                                                        <div className="ps-4 d-flex flex-column mt-2">
                                                            <span><span className="text-black-50">File Name:</span> {item[name]["search"].fileSearched}</span>
                                                            <span><span className="text-black-50">Type:</span> {item[name]["search"].type}</span>
                                                            <span><span className="text-black-50">Date:</span> {todaysDate === searchedDate ? "Today" : searchedDate}</span>
                                                            <span><span className="text-black-50">Result:</span> N/A</span>
                                                        </div>

                                                    </Card.Body>
                                                </Card>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                   
                )
            })}
             </Accordion>
        </>
    )
}

export default AccordianDisplaySearch