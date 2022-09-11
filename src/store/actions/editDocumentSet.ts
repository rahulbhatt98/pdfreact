import { createAsyncThunk } from '@reduxjs/toolkit'
import api from "../../lib/api"

export const editUser = createAsyncThunk(
    'posts/rename_document_sets',
    async({source_filename,save_to_filename}:{source_filename:string|null,save_to_filename:string|null}) =>{
            try{
               
                const response :any = await api.post(`/backend/rename_document_sets`, {
                     source_filename,
                     save_to_filename
          },{
                    headers: {
                        'Authorization': `Token ${localStorage.getItem("user")}` 
                      }
                }).then((data:any)=>{
                   
                   let response = data.data;
                   if(response){
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
