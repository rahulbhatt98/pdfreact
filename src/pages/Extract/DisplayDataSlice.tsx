import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from 'lib/api'
export const DisplayData = createAsyncThunk(
    'post/displayDocuments',
    async(  {elastic_indx,select_fields,type,id,max_results}:{elastic_indx:any,select_fields:any,type:any,id:any,max_results:any},thunkAPI) =>{
            try{
                const response :any = await api.post(`/backend/sql_query`, {
                        elastic_indx,
                        select_fields,
                        type,                     
                        id,
                        max_results,
                        
                },{
                    headers: {
                        'Authorization': `Token ${localStorage.getItem("user")}` 
                      }
                }).then((data:any)=>{
                   let response = data;
                   if(response){
                    return { status:200,data:response.data ? response.data.data : ''}
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

const DisplayDataSlice = createSlice({
    name: "post/displayDocuments",
    initialState: {
      isLoadingDisplay: true,
      displayData:{} as any,
      isErroredDisplay:false
    },
    reducers: {
      // Reducer comes here
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(DisplayData.fulfilled, (state, action) => {
        
          // Add user to the state array
          state.isLoadingDisplay = false;
          // state.isErrored = action.payload.status==400?true:false
          state.displayData = action.payload.status===200?action.payload.data:[]
      });
      builder.addCase(DisplayData.pending, (state) => {
        
          state.isErroredDisplay = false
          state.isLoadingDisplay = true
      });
      builder.addCase(DisplayData.rejected,(state)=>{
          state.isLoadingDisplay = false
          state.isErroredDisplay = true
      });
  
  
  
  
  }
  })
  
  export { DisplayDataSlice }