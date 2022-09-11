import { createSlice } from "@reduxjs/toolkit"
import { getLogin } from 'store/actions/user'
const user: any = localStorage.getItem("user");
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isLoggedIn: user ? true : false,
    user: {} as any,
    isErrored: false,
  },
  reducers: {
    setInfo: (state) => {

      localStorage.removeItem("user");
      localStorage.removeItem("persist:persist-store");
      // storage.removeItem('persist:persist-store')

      state.isLoggedIn = false

    },
    // Reducer comes here
  },
  extraReducers: (builder) => {

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getLogin.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.isErrored = action.payload.status === 400 ? true : false
      state.isLoggedIn = action.payload.status === 400 ? false : true;
      state.user = action.payload
      // console.log( state.user,"state.user");

    });
    builder.addCase(getLogin.pending, (state) => {
      state.isLoading = true;
      state.isErrored = false
      state.isLoggedIn = false;
    });
    builder.addCase(getLogin.rejected, (state) => {
      state.isLoggedIn = false;
      state.isLoading = false
      state.isErrored = true
    });
   
  }
})
export const { setInfo } = userSlice.actions


export { userSlice }
