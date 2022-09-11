import { createSlice } from "@reduxjs/toolkit"
import { getPageSets } from "store/actions/getPageSets";
 const GetPageSetSlice = createSlice({
  name: "posts/GetPageSetSlice",
  initialState: {
    isLoadingPage: true,
    dataPage:{} as any,
    isErroredPage:false
  },
  reducers: {
    // Reducer comes here
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getPageSets.fulfilled, (state, action) => {
      
        // Add user to the state array
        state.isLoadingPage = false;
        // state.isErrored = action.payload.status==400?true:false
        state.dataPage = action.payload.status===200?action.payload.data:[]
    });
    builder.addCase(getPageSets.pending, (state) => {
      
        state.isErroredPage = false;
        // state.isErroredDoc = true;;
        state.isLoadingPage = true;
    });
    builder.addCase(getPageSets.rejected,(state)=>{
        state.isLoadingPage = false
        state.isErroredPage = true
    });

}
})

export { GetPageSetSlice }