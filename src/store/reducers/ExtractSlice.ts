import { createSlice } from "@reduxjs/toolkit"
import {  ExtractNewDocuments } from 'store/actions/documents'

 const ExtractSlice = createSlice({
  name: "extractDocuments",
  initialState: {
    isSavingDoc: false,
    dataDoc: [] ,
    isSavingErrored:false,
    isSaved:false
  },
  reducers: {
    // Reducer comes here
    extractClean:(state)=>{
      state.isSavingDoc = false;
      state.isSaved = false;
      state.isSavingErrored=false
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(ExtractNewDocuments.fulfilled, (state, action) => {
    
    //     // Add user to the state array
        state.isSavingDoc = false;
        state.isSaved =  action.payload.status===200 ? true :false
        // state.isErrored = action.payload.status==400?true:false
        state.dataDoc = action.payload.status===200?action.payload.data:[]
    });
    builder.addCase(ExtractNewDocuments.pending, (state) => {
     
      state.isSaved  = false
      state.isSavingDoc = true;
        // state.isErroredDoc = true;
        // state.isLoadingDoc = true;
    });
    builder.addCase(ExtractNewDocuments.rejected,(state)=>{
        state.isSaved  = false
        state.isSavingDoc = false;
       state.isSavingErrored = true
    });
}
})



export const { extractClean } = ExtractSlice.actions
export default ExtractSlice.reducer 