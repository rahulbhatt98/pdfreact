import React, { useState } from "react";
import { Navbar,Nav,Container,ProgressBar,Dropdown } from "react-bootstrap";
import user from "assets/user.png";
import {  questionIcon, settingICon, historyIcon } from "utils/icons";
import  {useDispatch } from "react-redux"
import { setInfo } from "store/reducers/userSlice";

const Header = () => {
    // const userInfo= useSelector((state: any) => state.user)
    // const [toggle,setToggle]= useState(false);
    // const menuToggle = ()=>{
    //     setToggle(!toggle)
    // }
    const dispatch = useDispatch();

    return (
       <>
          <Navbar expand="lg" className="top-nav">
                    <Container fluid>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <div className="prog">
                               <span>Processing Dataset</span> <ProgressBar now={60} />
                            </div>
                            <Nav className="ms-auto">
                                <Nav.Link href="#home">{settingICon} Setting</Nav.Link>
                                <Nav.Link href="#link">{historyIcon} History</Nav.Link>
                                <Nav.Link href="#link">{questionIcon}</Nav.Link>
                                <Dropdown className="d-inline mx-2" align="end">
                                    <Dropdown.Toggle id="dropdown-autoclose-true" className="drop-btn" variant="light">
                                       <span className="user-image">
                                           <img src={user} alt="user" />
                                       </span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {/* <Dropdown.Item  >Menu Item</Dropdown.Item>
                                        <Dropdown.Item >Menu Item</Dropdown.Item> */}
                                        <Dropdown.Item onClick={(e:any)=>dispatch(setInfo())}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
       </>
    )
}
export default Header;