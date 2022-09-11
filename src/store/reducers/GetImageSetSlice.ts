import { createSlice } from "@reduxjs/toolkit"
import { getImageSets } from "store/actions/getImageSets";
 const GetImageSetSlice = createSlice({
  name: "posts/getImages",
  initialState: {
    isLoadingImage: true,
    dataImage:{} as any,
    isErroredImage:false
  },
  reducers: {
    // Reducer comes here
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getImageSets.fulfilled, (state, action) => {
      
        // Add user to the state array
        state.isLoadingImage = false;
        // state.isErrored = action.payload.status==400?true:false
        state.dataImage = action.payload.status===200?action.payload.data:[]
    });
    builder.addCase(getImageSets.pending, (state) => {
      
        state.isErroredImage = false;
        // state.isErroredDoc = true;;
        state.isLoadingImage = true;
    });
    builder.addCase(getImageSets.rejected,(state)=>{
        state.isLoadingImage = false
        state.isErroredImage = true
    });

}
})

export { GetImageSetSlice }


