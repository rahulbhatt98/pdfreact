import { useLocation } from "react-router-dom";

const HtmlPage = (props:any) => {
 
   const location = useLocation();
  
  const state:any = location.state;
  return (
    <>
    <div dangerouslySetInnerHTML={{ __html:state}}></div>
    </>
  )
}

export default HtmlPage