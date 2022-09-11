import { createSlice } from "@reduxjs/toolkit"
import { getUserDetail } from "store/actions/user";
 const getUserDetailSlice = createSlice({
  name: "extractDocuments",
  initialState: {
    // isSavingDoc: false,
    userInfo: [] ,
    isSavingErrored:false,
    isSaved:false
  },
  reducers: {
    // Reducer comes here
    // extractClean:(state)=>{
    //   state.isSavingDoc = false;
    //   state.isSaved = false;
    //   state.isSavingErrored=false
    // }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getUserDetail.fulfilled, (state, action) => {
    
    //     // Add user to the state array
        // state.isSavingDoc = false;
        state.isSaved =  action.payload.status===200 ? true :false
        state.isSavingErrored = action.payload.status===400?true:false
        state.userInfo = action.payload.status===200?action.payload.data:[]
    });
    builder.addCase(getUserDetail.pending, (state) => {
     
      state.isSaved  = false
    //   state.isSavingDoc = true;
        state.isSavingErrored = true;
        // state.isLoadingDoc = true;
    });
    builder.addCase(getUserDetail.rejected,(state)=>{
        state.isSaved  = false
        // state.isSavingDoc = false;
       state.isSavingErrored = true
    });
}
})



// export const { extractClean } = getUserDetailSlice.actions
export default getUserDetailSlice.reducer 