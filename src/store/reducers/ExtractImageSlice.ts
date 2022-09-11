import { createSlice } from "@reduxjs/toolkit"
import {  ExtractNewImage } from 'store/actions/documents'

 const ExtractImageSlice = createSlice({
  name: "extractImage",
  initialState: {
    isSavingImage: false,
    saveDataImage: [] ,
    isSavingErroredImage:false,
    isSavedImage:false
  },
  reducers: {
    // Reducer comes here
    extractCleanImage:(state)=>{
      state.isSavingImage = false;
      state.isSavedImage = false;
      state.isSavingErroredImage=false
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(ExtractNewImage.fulfilled, (state, action) => {
    //     // Add user to the state array
        state.isSavingImage = false;
        state.isSavedImage =  action.payload.status===200 ? true :false
        // state.isErrored = action.payload.status==400?true:false
        state.saveDataImage = action.payload.status===200?action.payload.data:[]
    });
    builder.addCase(ExtractNewImage.pending, (state) => {
      state.isSavedImage  = false
      state.isSavingImage = false;
        // state.isErroredDoc = true;
        // state.isLoadingDoc = true;
    });
    builder.addCase(ExtractNewImage.rejected,(state)=>{
        state.isSavedImage  =false
       state.isSavingErroredImage = true
    });
}
})



export const { extractCleanImage } = ExtractImageSlice.actions
export default ExtractImageSlice.reducer 