import { createSlice } from "@reduxjs/toolkit"
import { getDatapointsWithHeader } from 'store/actions/dataPoint'

 const datapointSlice = createSlice({
  name: "collectDatapoints",
  initialState: {
    isLoadingDatapoint: false,
    datapoints:{} as any,
    isErroredDatapoint:false
  },
  reducers: {
    // Reducer comes here
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getDatapointsWithHeader.fulfilled, (state, action) => {
      
        // Add user to the state array
        state.isLoadingDatapoint = false;
        // state.isErrored = action.payload.status==400?true:false
        state.datapoints = action.payload.status===200?action.payload.data:[]
    });
    builder.addCase(getDatapointsWithHeader.pending, (state) => {
       
        state.isErroredDatapoint = false;
        // state.isErroredDoc = true;;
        state.isLoadingDatapoint = true;
    });
    builder.addCase(getDatapointsWithHeader.rejected,(state)=>{
        state.isLoadingDatapoint = false
        state.isErroredDatapoint = true
    });

}
})

export { datapointSlice }