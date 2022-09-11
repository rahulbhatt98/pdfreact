import { createAsyncThunk } from '@reduxjs/toolkit'
import api from "../../lib/api"
 var headersName :any=[]

export const getHeaders = createAsyncThunk(
    'posts/getHeaders',
    async() =>{
            try{
                const response :any = await api.post(`/backend/get_headers`, {
          },{
                    headers: {
                        'Authorization': `Token ${localStorage.getItem("user")}` 
                      }
                }).then((data:any)=>{
                   let response = data.data;
                   if(response){
                    headersName=response
                    return { status:200,data:response.data?response.data:''}
                   }
                    else
                    return {status:404,data:"No data available"}
                } ).catch((err:any)=>{
                    return {status:400,data:err.response.data?.non_field_errors[0]}
                })
                    return response
               }catch(err:any){
                     return ({ status:400,error: err.message });
               }
         }
)
export {headersName};