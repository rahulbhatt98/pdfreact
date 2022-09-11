import React from "react";
import { Accordion } from "react-bootstrap";
import { documentIcon, manageDocICon, graphIcon, searchIcon, historyIcon, backIcon } from "utils/icons";
import {Link} from "react-router-dom";
const Submenu = (props: any) => {
    return (
        <div className="sidebar-wrapper-sec">
            <div className="flex-column" >
                <div className="default">
                    <h4 >Dashboard  </h4>
                    <span onClick={
                        () => {

                            props.setSubmenu()
                        }
                    }>
                        {backIcon}
                    </span>
                </div>
                <Accordion alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Recent Activity</Accordion.Header>
                        <Accordion.Body>
                            <Link className="inner-item" to="#">
                                <span className="icon">
                                    {historyIcon}
                                </span>
                                <span>Green Energy Investment</span>
                            </Link>
                            <Link className="inner-item" to="#">
                                <span className="icon">
                                    {documentIcon}
                                </span>
                                <span>10 Report 2021</span>
                                </Link>
                            <Link className="inner-item" to="#">
                                <span className="icon">
                                    {manageDocICon}
                                </span>
                                <span>Investment fund Report 2021</span>
                                </Link>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>My Documents Sets</Accordion.Header>
                        <Accordion.Body>
                            <Link className="inner-item" to="#">
                            <span className="icon">{documentIcon}</span>
                                <span>25-11-2021 Niels Dataset</span></Link>
                            <Link className="inner-item" to="#">
                            <span className="icon">{documentIcon}</span>
                                <span>17-11-2021 Niels Dataset</span>
                            </Link >
                            <Link className="inner-item" to="#">
                            <span className="icon">{manageDocICon}</span>
                                <span>Faang Dataset</span>
                            </Link>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>My Tables Templates</Accordion.Header>
                        <Accordion.Body>
                            <Link className="inner-item" to="#">
                            <span className="icon"> {documentIcon}</span>
                                <span>10k Report 2021</span></Link>
                            <Link className="inner-item" to="#">
                            <span className="icon">{manageDocICon}</span>
                                <span>Investment Fund Report 2021</span>
                                </Link>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>My Searches</Accordion.Header>
                        <Accordion.Body>
                            <Link className="inner-item" to="#">
                            <span className="icon">{searchIcon}</span>
                                <span>Green Energy Investment</span>
                                </Link>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>My Viewed Documents</Accordion.Header>
                        <Accordion.Body>
                            <Link className="inner-item" to="#">
                            <span className="icon">{manageDocICon}</span>
                                <span>Annual Report</span>
                                </Link>
                            <Link className="inner-item" to="#">
                            <span className="icon">{documentIcon}</span>
                                <span>IBM 10K 2011</span>
                                </Link>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>My Filled Tables</Accordion.Header>
                        <Accordion.Body>
                            <Link className="inner-item" to="#">
                            <span className="icon"> {documentIcon}</span>
                                <span>10k Report 2021</span></Link>
                            <Link className="inner-item" to="#">
                            <span className="icon">  {manageDocICon}</span>
                                <span>Investment Fund Report 2021</span>
                                </Link>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6">
                        <Accordion.Header>My Graphs</Accordion.Header>
                        <Accordion.Body>
                            <Link className="inner-item" to="#">
                            <span className="icon"> {graphIcon}</span>
                                <span>Profit vs Revenues</span>
                                </Link>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    )
}
export default Submenu;