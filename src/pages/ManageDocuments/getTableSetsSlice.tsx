import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from 'lib/api'

export const getTableSets = createAsyncThunk(
    'getTableSets',
    async() =>{
            try{
                const response :any = await api.post(`/backend/get_table_sets`, {
                  
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

const getTableSetsSlice = createSlice({
    name: "getTableSets",
    initialState: {
      isLoadingTable: false,
      dataTable:{} as any,
      isErroredTable:false
    },
    reducers: {
      // Reducer comes here
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(getTableSets.fulfilled, (state, action) => {
        
          // Add user to the state array
          state.isLoadingTable = false;
          // state.isErrored = action.payload.status==400?true:false
          state.dataTable = action.payload.status===200?action.payload.data:[]
      });
      builder.addCase(getTableSets.pending, (state) => {
       
          state.isErroredTable = false;
          state.isLoadingTable = true;
      });
      builder.addCase(getTableSets.rejected,(state)=>{
          state.isLoadingTable = false
          state.isErroredTable = true
      });
  
  }
  })
  
  export { getTableSetsSlice }


  export const editTable = createAsyncThunk(
    'posts/renameTable',
    async({source_filename,save_to_filename}:{source_filename:string|null,save_to_filename:string|null}) =>{
            try{
               
                const response :any = await api.post(`/backend/rename_table_sets`, {
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


export const deleteTable = createAsyncThunk(
    'posts/deleteTable',
    async(source_filename:{source_filename:string|null}) =>{
            try{
               
                const response :any = await api.post(`/backend/delete_table_sets`, {
                     source_filename
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

