import { createSlice } from "@reduxjs/toolkit"
import { getDocuments } from 'store/actions/documents'

 const docSlice = createSlice({
  name: "posts/getDocuments",
  initialState: {
    isLoadingDoc: false,
    dataDoc:{} as any,
    isErroredDoc:false
  },
  reducers: {
    // Reducer comes here
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getDocuments.fulfilled, (state, action) => {
      
        // Add user to the state array
        state.isLoadingDoc = false;
        // state.isErrored = action.payload.status==400?true:false
        state.dataDoc = action.payload.status===200?action.payload.data:[]
    });
    builder.addCase(getDocuments.pending, (state) => {
        state.isErroredDoc = false;
        // state.isErroredDoc = true;;
        state.isLoadingDoc = true;
    });
    builder.addCase(getDocuments.rejected,(state)=>{
        state.isLoadingDoc = false
        state.isErroredDoc = true
    });




}
})

export { docSlice }