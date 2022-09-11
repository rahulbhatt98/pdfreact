import { createSlice } from "@reduxjs/toolkit"
// import {  ExtractNewPage } from 'store/actions/documents'
import { SaveNewDocuments } from "store/actions/documents";

 const ExtractDocumentSlice = createSlice({
  name: "extractdocument",
  initialState: {
    isSavingDocument: false,
    saveDataDocument: [] ,
    isSavingErroredDocument:false,
    isSavedDocument:false
  },
  reducers: {
    // Reducer comes here
    extractCleanDocument:(state)=>{
      state.isSavingDocument = false;
      state.isSavingErroredDocument=false;
      state.isSavedDocument=false;
      
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(SaveNewDocuments.fulfilled, (state, action) => {
    //     // Add user to the state array
        // state.isSavingDocument = false;
        state.isSavingDocument =  action.payload.status===200 ? true :false
        // state.isErrored = action.payload.status==400?true:false
        state.isSavedDocument = action.payload.status===200?action.payload.data:[]
    });
    builder.addCase(SaveNewDocuments.pending, (state) => {
      state.isSavingDocument = true;
      state.isSavedDocument  =true;

        // state.isErroredDoc = true;
        // state.isLoadingDoc = true;
    });
    builder.addCase(SaveNewDocuments.rejected,(state)=>{
      state.isSavingDocument = false;
        state.isSavedDocument  =false
       state.isSavingErroredDocument = true
    });
}
})



export const { extractCleanDocument } = ExtractDocumentSlice.actions
export default ExtractDocumentSlice.reducer 