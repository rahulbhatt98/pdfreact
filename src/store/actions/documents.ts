import { createAsyncThunk } from '@reduxjs/toolkit'
import api from 'lib/api'

export const getDocuments = createAsyncThunk(
    'posts/getDocuments',
    async() =>{
            try{
                const response :any = await api.post(`/backend/get_index_documents`, {
                    elastic_indx:['all']
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

export const SaveNewDocuments = createAsyncThunk(
    'saveNewDocuments',
    async({idList,name}:
        {idList:any|null,name:string|null},thunkAPI) =>{
        try{
            const response :any = await api.post(`backend/save_document_sets`, {
                "documents":idList,
                "filename":name
            },
            {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("user")}` 
                  }
            }
            ).then((data:any)=>{
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

export const ExtractNewDocuments = createAsyncThunk(
    'extractDocuments',
    async( { idList,name }:
        {idList:any|null,name:string|null},thunkAPI) =>{
        try{
            const response :any = await api.post(`backend/save_table_sets`, {
                "tables":idList,
                "filename":name
            },
            {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("user")}` 
                  }
            }
            ).then((data:any)=>{
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

export const ExtractNewPage = createAsyncThunk(
    'extractPage',
    async( { idList,name }:
        {idList:any|null,name:string|null},thunkAPI) =>{
        try{
            const response :any = await api.post(`backend/save_page_sets`, {
                "pages":idList,
                "filename":name
            },
            {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("user")}` 
                  }
            }
            ).then((data:any)=>{
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


export const ExtractNewImage = createAsyncThunk(
    'extractPage',
    async( { idList,name }:
        {idList:any|null,name:string|null},thunkAPI) =>{
        try{
            const response :any = await api.post(`backend/save_image_sets`, {
                "images":idList,
                "filename":name
            },
            {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("user")}` 
                  }
            }
            ).then((data:any)=>{
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