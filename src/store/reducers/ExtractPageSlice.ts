import { createSlice } from "@reduxjs/toolkit"
import {  ExtractNewPage } from 'store/actions/documents'

 const ExtractPageSlice = createSlice({
  name: "extractPage",
  initialState: {
    isSavingPage: false,
    saveDataPage: [] ,
    isSavingErroredPage:false,
    isSavedPage:false
  },
  reducers: {
    // Reducer comes here
    extractCleanPage:(state)=>{
      state.isSavingPage = false;
      state.isSavedPage = false;
      state.isSavingErroredPage=false
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(ExtractNewPage.fulfilled, (state, action) => {
    //     // Add user to the state array
        state.isSavingPage = false;
        state.isSavedPage =  action.payload.status===200 ? true :false
        // state.isErrored = action.payload.status==400?true:false
        state.saveDataPage = action.payload.status===200?action.payload.data:[]
    });
    builder.addCase(ExtractNewPage.pending, (state) => {
     
      state.isSavedPage  = false
      state.isSavingPage = true;
        // state.isErroredDoc = true;
        // state.isLoadingDoc = true;
    });
    builder.addCase(ExtractNewPage.rejected,(state)=>{
      state.isSavingPage = false;
        state.isSavedPage  =false
       state.isSavingErroredPage = true
    });
}
})



export const { extractCleanPage } = ExtractPageSlice.actions
export default ExtractPageSlice.reducer 