import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "assets/logo.svg";
import { homeIcon, menu, dashboardIcon, documentIcon, manageDocICon, searchIcon, viewDocIcon, extractIcon, extractDataIcon, fillTableIcon, graphIcon, compareDoc } from "utils/icons";
import Submenu from 'components/Submenu/Submenu';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'



const Sidebar = () => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const [submenu, setSubmenu] = useState(false)
    const [activeLink, setActiveLink] = useState<any>("home")
    const menuToggle = () => {
        setToggle(!toggle)
        setSubmenu(false)
    }

    const handleSubmenu = () => {
        setSubmenu(!submenu)
    }
    const location = useLocation();

    useEffect(() => {
        const HeaderView = () => {
            if (location) {
                if (location.pathname === '/') {
                    setActiveLink("home")
                }
                if(location.pathname === '/add-documents') {
                    setActiveLink("upload")
                }
                 if (location.pathname === '/manage-documents') {
                    setActiveLink("mystore")
                }
                if (location.pathname === '/extract') {
                    setActiveLink("extractTIP")
                }
                if (location.pathname === '/search') {
                    setActiveLink("search")
                }
                if (location.pathname === '/datapoints') {
                    setActiveLink("extractDP")
                }
                if (location.pathname === '/add-documents') {
                    setActiveLink("upload")
                }
            }
        }
        HeaderView();
    })

    return (
        <>
            <aside className={toggle ? "aside-flexible sidebar-wrapper" : "sidebar-wrapper"}>
                <Navbar.Brand onClick={() => navigate("/")}>
                    <img src={Logo} alt="zanran logo" />
                    <span className="menu-icon" onClick={menuToggle}>{menu}</span>
                </Navbar.Brand>
                <Navbar>
                    <Nav className="nav flex-column" defaultActiveKey="/home">
                        <Nav.Item key="home">
                            <Nav.Link href="#" className={`${activeLink === "home" ? "activeLink" : ""}`} onClick={(e: any) => { navigate("/"); }}>
                                <span className="icon">
                                    {homeIcon}
                                </span>
                                <span>Home</span>
                            </Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item>
                            <Nav.Link href="#"
                                onClick={
                                    (e) => {
                                        e.preventDefault()
                                        setSubmenu(!submenu)

                                    }
                                }
                                className={`${activeLink === "dashboard" ? "activeLink" : ""}`}>
                                <span className="icon">
                                    {dashboardIcon}
                                </span>
                                <span>
                                    Dashboard
                                </span>

                            </Nav.Link>
                        </Nav.Item> */}
                        <Nav.Item>
                            <Nav.Link href="#" className={`${activeLink === "upload" ? "activeLink" : ""}`} onClick={()=> {navigate("/add-documents"); }}>
                                 <span className="icon">
                                    {documentIcon}
                                </span>
                                <span>Upload New Documents</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#" className={`${activeLink === "mystore" ? "activeLink" : ""}`} onClick={() => { navigate("/manage-documents"); }}>
                                <span className="icon">
                                    {manageDocICon}
                                </span>
                                <span>My Store</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#" className={`${activeLink === "search" ? "activeLink" : ""}`} onClick={() => { navigate("/search"); }}>
                                <span className="icon">
                                    {searchIcon}
                                </span>
                                <span>Search</span>
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href="#" className={`${activeLink === "extractTIP" ? "activeLink" : ""}`} onClick={() => { navigate("/extract"); }}>
                                <span className="icon">
                                    {viewDocIcon}
                                </span>

                                <span>View Documents</span>
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href="#" className={`${activeLink === "extractDP" ? "activeLink" : ""}`} onClick={() => { navigate("/datapoints"); }}>
                                <span className="icon">
                                    {extractDataIcon}
                                </span>
                                <span>Extract Tables Cells</span>
                            </Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item>
                            <Nav.Link href="#" className={`${activeLink === "compDoc" ? "activeLink" : ""}`}>
                                <span className="icon">
                                    {compareDoc}
                                </span>
                                <span>Compare Doc</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#" className={`${activeLink === "visualData" ? "activeLink" : ""}`}>
                                <span className="icon">
                                    {graphIcon}
                                </span>
                                <span>Visualize Data</span>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                {submenu ?
                    <Submenu setSubmenu={handleSubmenu} />
                    : ""}
            </aside>

        </>
    )
}
export default Sidebar;