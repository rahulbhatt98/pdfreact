import { createSlice, createAsyncThunk,PayloadAction } from "@reduxjs/toolkit"
import api from 'lib/api'
import apiScaffolder from "lib/apiScaffolder";
import { DocStatusClientside, DocStatusesRequest } from "pages/AddDocuments/DocStatus";
//import DocDataStatusManager from "pages/AddDocuments/DocStatusDataManager";
//import { AddOrUpdateById } from "store/reducers/AddDocumentsSlice";
import { useSelector, useDispatch } from "react-redux"
import uploadRequestData from "pages/AddDocuments/UploadReqestData";
import apiTemp from "lib/apiTemp";

export interface uploadParams{
    // TODO 
    fileToUpload: File; 
    startPage: number | null;
    endPage: number | null; 
    newDocProc: DocStatusClientside
    // docStatusMan: DocDataStatusManager
}

export interface uploadReturn{
    newDocProc: DocStatusClientside;
    statusCode: number | null;
    statusMessage: string;
}

export const uploadDocuments = createAsyncThunk<uploadReturn, uploadParams>(
    'post/uploadDocuments',
    async(data:uploadParams) =>{
      
        const returnVal = 
        {
            newDocProc: data.newDocProc,
            statusCode: null
        } as uploadReturn;

            try{

                var formData = new FormData();

                const userId : string = localStorage.getItem("userId") ?? "";
                //const userId :string = "n1@dom.com";

                formData.append('user_id', userId); // myFile is the input type="file" control
                formData.append('file', data.fileToUpload); // myFile is the input type="file" control

                formData.append('startPage', data.startPage == null ? "" : data.startPage.toString()); // myFile is the input type="file" control
                formData.append('endPage', data.endPage == null ? "" : data.endPage.toString()); // myFile is the input type="file" control
                        
                // TODO form data here

                // formData.append('file', fileToUpload); // filesUploadIP is the input type="file" control
                // formData.append('user_id', <string>localStorage.getItem("userId")); // filesUploadIP is the input type="file" control
            
                // formData.append('startPage', startPage); // filesUploadIP is the input type="file" control
                // formData.append('endPage', endPage); // filesUploadIP is the input type="file" control

                // TODO Config?
                // const config = {
 
                //     onUplonUploadProgress: (progEvent : ProgressEvent<XMLHttpRequestEventTarget>) => 
                //     {
                //         const percent : number = (progEvent.loaded / progEvent.total) * 100;
                //         data.newDocProc.PercProcessed = percent;
                //         data.newDocProc.ProgressMessage = "Uploaded " + progEvent.loaded.toLocaleString() + " bytes of " + progEvent.total.toLocaleString();
                        
                //         var procs : DocStatusClientside[] = [data.newDocProc];

                //         const dispatch = useDispatch();
                //         dispatch(AddOrUpdateById([data.newDocProc]));
                //     }
                // }
                // `api/Upload/UploadFile_ing`
                //const response :any = await apiTemp.post(`api/Upload/UploadFile_ing`, formData
                //const response :any = await scaffolderApi.post(`api/Upload/UploadFile_ing`, formData
                const response :any = await api.post(`/backend/upload_save`, formData
                , {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem("user")}` 
                      }
                    }
                    ).then((data:any)=>{

                // Response = uploaded file detail
                let response = data.data;
                if(response){
                    returnVal.statusCode = 200;
                }
                else
                {
                    returnVal.statusCode = 404;
                    returnVal.statusMessage = "No data available";
                }
            } ).catch((err:any)=>{
                    //status:400,data:err.response.data?.non_field_errors[0]
                    returnVal.statusCode = 400;
                    returnVal.statusMessage = err.response.data?.non_field_errors[0];
            })
            }catch(err:any){
                returnVal.statusCode = 400;
                returnVal.statusMessage = err.message;
            }
            return returnVal;
        }
)


export const getDocumentStatuses = createAsyncThunk<any, uploadRequestData[]>(
    'post/getDocumentStatuses',
    async(req: uploadRequestData[]) =>{
      
            try{
                const userId : string = localStorage.getItem("userId") ?? "";
                //const userId :string = "n1@dom.com";

                const dsr: DocStatusesRequest = { 
					user_id: userId,
					DocStatusRequests: req };
        
                var statusReqJson = JSON.stringify(dsr);
                
                //const response :any = await apiTemp.post(`/api/DocSearch/GetStatuses_ing`, 
                //const response :any = await scaffolderApi.post(`/api/DocSearch/GetStatuses_ing`, 
                const response: any = await api.post(`/backend/get_statuses`, 
                dsr
                ,{
                    headers: {
                        'Authorization': `Token ${localStorage.getItem("user")}` 
                      }
                }
            // ,
                // {
                //     headers: {
                //         'Content-Type': 'application/json'
                //       }
                //     }
                //{
                    // TODO Add the upload stuff
                    // "user_id": localStorage.getItem("userId")                },{
                    // headers: {
                    //     'Authorization': `Token ${localStorage.getItem("user")}` 
                    //   }
                //}
                ).then((data:any)=>{
                   let response = data.data;
                   if(response){
                    return { status:200,data:response?response:null}
                   }
                   
                    else
                    return {status:404,data:"No data available"}
                } ).catch((err:any)=>{
                    return {status:400,data:err?.response?.data?.non_field_errors[0]}
                })
                    return response
               }catch(err:any){
                     return ({ status:400,error: err.message });
               }
         }
)
