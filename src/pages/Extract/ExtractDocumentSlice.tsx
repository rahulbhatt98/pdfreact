import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from 'lib/api'

export const getDocumentSets = createAsyncThunk(
    'post/getDocumentSets',
    async() =>{
      
            try{
                const response :any = await api.post(`/backend/get_document_sets`, {
                    "user_id": localStorage.getItem("userId")},{
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



 const docSetSlice = createSlice({
  name: "post/getDocumentSets",
  initialState: {
    isLoading: false,
    data:{} as any,
    isErrored:false
  },
  reducers: {
    // Reducer comes here
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getDocumentSets.fulfilled, (state, action) => {
        // Add user to the state array
        state.isLoading = false;
        // state.isErrored = action.payload.status==400?true:false
        state.data = action.payload.status===200?action.payload.data:[]
    });
    builder.addCase(getDocumentSets.pending, (state) => {
        state.isErrored = false;
        state.isLoading = true;
    });
    builder.addCase(getDocumentSets.rejected,(state)=>{
        state.isLoading = false
        state.isErrored = true
    });

}
})

export { docSetSlice }


export const downloadDocuments = createAsyncThunk(
    'post/downloadDocuments',
    async( 
         {elastic_indx,select_fields,type,documents_set,group_by, form_type,page}:{elastic_indx:any,select_fields:any,type:any,documents_set:any,group_by:any,form_type:any,page:any},thunkAPI
         ) =>{
            try{
                let requestObject = {};
                if(form_type === "pdf"){
                    requestObject = {
                        elastic_indx,
                        select_fields,
                        type,
                        PDF: documents_set,
                        group_by
                }
            }
                else if(form_type === "search"){
                    requestObject =  {
                    elastic_indx,
                    select_fields,
                    type,
                    PDF: documents_set,
                    page
                    } 
                }
                 else {
                    requestObject = {
                        elastic_indx,
                        select_fields,
                        type,
                        documents_set,
                        group_by
                };
                }
                const response :any = await api.post(`/backend/sql_query`, requestObject,{
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

const downloadDocSlice = createSlice({
    name: "post/downloadDocuments",
    initialState: {
      isLoadingdDownload: false,
      downloadData:{} as any,
      isErrored:false
    },
    reducers: {
      // Reducer comes here
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(downloadDocuments.fulfilled, (state, action) => {
        
          // Add user to the state array
          state.isLoadingdDownload = false;
          // state.isErrored = action.payload.status==400?true:false
          state.downloadData = action.payload.status===200?action.payload.data:[]
      });
      builder.addCase(downloadDocuments.pending, (state) => {
        
          state.isErrored = false
          state.isLoadingdDownload = true
      });
      builder.addCase(downloadDocuments.rejected,(state)=>{
          state.isLoadingdDownload = false
          state.isErrored = true
      });
  
  }
  })
  export { downloadDocSlice }

/* Download single Extention */
  export const fetchExtention = createAsyncThunk(
    'post/fetchExtention',
    async( 
         {elastic_indx,select_fields,type,id}:{elastic_indx:any,select_fields:any,type:any,id:any},thunkAPI
         ) =>{
            try{
                    let requestObject = {
                        elastic_indx,
                        select_fields,
                        type,
                        id
                    };
                const response :any = await api.post(`/backend/sql_query`, requestObject,{
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

const fetchExtentionSlice = createSlice({
    name: "post/fetchExtention",
    initialState: {
      isLoadingFetch: false,
      fetchExtentionData:{} as any,
      isErrored:false
    },
    reducers: {
      // Reducer comes here
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchExtention.fulfilled, (state, action) => {
        
          // Add user to the state array
          state.isLoadingFetch = false;
          // state.isErrored = action.payload.status==400?true:false
          state.fetchExtentionData = action.payload.status===200?action.payload.data:[]
      });
      builder.addCase(fetchExtention.pending, (state) => {
        state.isLoadingFetch = true;
          state.isErrored = false
      });
      builder.addCase(fetchExtention.rejected,(state)=>{
          state.isLoadingFetch = false
          state.isErrored = true
      });
  
  }
  })
  
  export { fetchExtentionSlice }