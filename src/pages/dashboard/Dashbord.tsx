import React, { useEffect } from "react";
import { Row, Col, Card, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import classes from "./dashboard.module.scss";
import { documentIcon, searchIcon, viewDocIcon, extractIcon, extractDataIcon, fillTableIcon, graphIcon, compareDoc, } from "utils/icons";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetail } from "store/actions/user";
const Dashboard = (props: any) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state: any) => state.userInfo)


    useEffect(() => {
        dispatch(getUserDetail())
    }, [])

    return (
        <>
            <section className="main-content p-4">
                <div className="main-content-heading">
                    <h2><span>Hello, </span>{userInfo && userInfo["first_name"] ? `${userInfo["first_name"]}  ${userInfo["last_name"]}` : ``}</h2>
                   
                </div>

                <section className="services">
                    <Row>
                        <Col xl="3" lg="4" sm="6" md="6">
                            <Card className="h-100" onClick={() => { navigate("/add-documents") }}>
                                {/* <Card onClick={()=> props.history.push({
                                    pathname:"/create-new-documents",state:DocumentList
                                })}> */}
                                <Card.Body>
                                    <div className="card-icon green">{documentIcon}</div>
                                    <Card.Title>Upload New Documents</Card.Title>

                                    <Card.Text>
                                        Upload your documents into the Zanran Search Engine. Then use our tools to unlock the full potential of your data.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xl="3" lg="4" sm="6" md="6">
                            <Card className="h-100" onClick={() => { navigate("/manage-documents") }}>
                                <Card.Body>
                                    <div className="card-icon">{fillTableIcon}</div>
                                    <Card.Title>My Store</Card.Title>

                                    <Card.Text>
                                       Create, organise and manage document sets,extracted tables,previous searches..
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                       

                        <Col xl="3" lg="4" sm="6" md="6">
                            <Card className="h-100" onClick={() => { navigate("/search") }}>
                                <Card.Body>
                                    <div className="card-icon green">{searchIcon}</div>
                                    <Card.Title>Search</Card.Title>

                                    <Card.Text>
                                       And find text, tiles, row or column headers in table documents..
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xl="3" lg="4" sm="6" md="6">
                            <Card onClick={() => { navigate("/extract"); }} className="h-100">
                                <Card.Body>
                                    <div className="card-icon">{viewDocIcon}</div>
                                    <Card.Title>View Documents</Card.Title>

                                    <Card.Text>
                                        Download tables, text, Images, Pages in Multiple formats incl. excel, xml, json, png, interact, inspect navigate within single document
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        

                        <Col xl="3" lg="4" sm="6" md="6">
                            <Card className="h-100" onClick={() => { navigate("/datapoints"); }}>
                                <Card.Body>
                                    <div className="card-icon">{extractDataIcon}</div>
                                    <Card.Title>Extract Tables Cells</Card.Title>

                                    <Card.Text>
                                       
                                        Automatically find and extract data from multiple labels. Build new tables from extracted data.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>


                        <Col xl="3" lg="4" sm="6" md="6">
                            <Card className="h-100">
                                <Card.Body>
                                    <div className="card-icon green">{compareDoc}</div>
                                    <Card.Title>Compare Document</Card.Title>

                                    <Card.Text>
                                        Compare and visualise all changes between two documents including changes between paragraphs, tables...
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl="3" lg="4" sm="6" md="6">
                            <Card className="h-100">
                                <Card.Body>
                                    <div className="card-icon">{graphIcon}</div>
                                    <Card.Title>Visualize Data</Card.Title>

                                    <Card.Text>
                                        Create charts or graphs from extracted data
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>


                       

                    </Row>
                </section>

            </section>

        </>
    )
}
export default Dashboard;
