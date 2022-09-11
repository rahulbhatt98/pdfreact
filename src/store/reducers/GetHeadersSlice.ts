import { createSlice } from "@reduxjs/toolkit"
import { getHeaders } from "store/actions/getHeaders";
 const GetHeadersSlice = createSlice({
  name: "GetHeaders",
  initialState: {
    isLoadingHeaders: true,
    dataHeaders:{} as any,
    isErroredHeaders:false
  },
  reducers: {
    // Reducer comes here
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getHeaders.fulfilled, (state, action) => {
      
        // Add user to the state array
        state.isLoadingHeaders = false;
        // state.isErrored = action.payload.status==400?true:false
        state.dataHeaders = action.payload.status===200?action.payload.data:[]
    });
    builder.addCase(getHeaders.pending, (state) => {
      
        state.isErroredHeaders = false;
        // state.isErroredDoc = true;;
        state.isLoadingHeaders = true;
    });
    builder.addCase(getHeaders.rejected,(state)=>{
        state.isLoadingHeaders = false
        state.isErroredHeaders = true
    });

}
})

export { GetHeadersSlice }


