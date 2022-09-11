
import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";
import { Navigate } from "react-router-dom";
import Sidebar from "components/Sidebar/Sidebar"
import Header from "components/Header/Header"
import  {useSelector } from "react-redux"
import {RootState} from 'store/reducers/index'
// import Loader from "components/atoms/Loader"
type Props = { component: FunctionComponent } & RouteComponentProps;

const ProtectedRoute: FunctionComponent<Props> = ({ component: Component, ...rest })=>
 {
 // const isAuthenticated:any = Auth.isAuthenticated
 const {isLoggedIn} = useSelector( (state: RootState)=>state.user);
 localStorage.getItem("key")
 
  return (
    isLoggedIn?
    <>
       
         <Sidebar/>
          <main className="content-wrapper">
          {/* <Loader/> */}
            <Header/>
            <Component {...rest} />
        </main>
    </>
   
    : <Navigate  to="/login" />
  );
}

export default ProtectedRoute;