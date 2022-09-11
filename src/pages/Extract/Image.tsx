import React from 'react'
import { useLocation } from "react-router-dom";


const Image = (props:any) => {
 
   const location = useLocation();
  
  
  const state:any = location.state;
  return (
    <>
    <img src={state} alt="img"/>
    </>
  )
}

export default Image