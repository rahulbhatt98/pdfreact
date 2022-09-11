import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashbord";
import Login from "./pages/Login/Login";
import ManageDocument from "./pages/ManageDocuments/ManageDocument";
import CreateNewDocument from "./pages/ManageDocuments/CreateNewDocuments";
import ExtractDocument from "./pages/Extract/ExtractDocument";
import Search from "pages/search/Search";
import NoPageFound from "./pages/404";
import ProtectedRoute from "routes/PrivateRoutes"
import HtmlPage from "pages/Extract/HtmlPage";
import Image from "pages/Extract/Image";
import DataPoints from "pages/DataPoint/DataPoints";
import AddDocuments from "pages/AddDocuments/AddDocuments";
const RouteLinks = () => {
    return (
        <>
            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/"
                    element={<ProtectedRoute path="/"
                        component={Dashboard} />} />

                <Route path="/add-documents"
                    element={<ProtectedRoute path="/add-documents"
                        component={AddDocuments} />} />

                <Route path="/manage-documents"
                    element={<ProtectedRoute path="/manage-documents"
                        component={ManageDocument} />} />

                <Route path="/create-new-documents"
                    element={<ProtectedRoute path="/create-new-documents"
                        component={CreateNewDocument} />} />

                <Route path="/extract"
                    element={<ProtectedRoute path="/extract"
                        component={ExtractDocument} />} />

                <Route path="/search"
                    element={<ProtectedRoute path="/search"
                        component={Search} />} />

                <Route path="/datapoints"
                    element={<ProtectedRoute path="/datapoints"
                        component={DataPoints} />} />

                <Route path="/html" element={<HtmlPage />} />
                <Route path="/img" element={<Image />} />

                <Route path="/*" element={<NoPageFound />} />
            </Routes>

        </>
    );
}

export default RouteLinks;
