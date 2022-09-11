// import { useSelector } from "react-redux"
// import { RootState } from 'store/reducers/index'
import Logo from "assets/loader.gif";

 const Loader=()=>{
    // const { isLoadingdDownload } = useSelector((state: RootState) => state.downloadDoc)
    // const { isSavingDoc } = useSelector((state:RootState)=>state.Extract)
    // const { isLoadingTable } = useSelector((state:RootState)=>state.tableSets)
    // const { isSavingPage } = useSelector((state:RootState) => state.ExtractPage)
    // const { isLoading }= useSelector((state:RootState)=>state.documentSet)
    // const { isLoadingDoc } = useSelector((state:RootState)=>state.documents)
    // const { isSearchLoading } = useSelector((state:RootState)=>state.searchData)
    // const { isLoadingFetch } = useSelector((state:RootState)=>state.fetchExtentionData)
    // const state = useSelector((state:RootState)=>state)
   
    // const displayLoader = isSearchLoading || isLoadingDoc || isLoading  || isSavingDoc ||isLoadingdDownload  || isSavingPage ||isLoadingTable|| false
    return (
        <>
         {/* {(displayLoader)?  
        <div className='zr-main-loadeer'>
            <img
                alt="loader"
                src={Logo}  
            />
        </div>
        :
        ''}  */}

  
        <div className='zr-main-loadeer'>
            <img
                alt="loader"
                src={Logo}  
            />
        </div>
     
        </>
    )
}
export default Loader