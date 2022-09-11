import { createAsyncThunk } from '@reduxjs/toolkit'
import api from 'lib/api'
export const getLogin = createAsyncThunk(
  'posts/getLogin',
   async(
     {email,password}:
     {email:string|null,password:string|null},
      thunkAPI) => {
       try{
        const response :any = await api.post(`/login`, {
          username: email,
          password: password
        }).then((data:any)=>{
      
        if(data && data.data?.token) {
          localStorage.setItem("user", data.data.token);
          localStorage.setItem("userId", data.data.id);
        }
          return {status:200,data:data.data}
        }).catch((err:any)=>{
          return {status:400,data:err.response.data?.non_field_errors[0]}
        })
        
      return response
       }catch(err:any){
       return thunkAPI.rejectWithValue({ status:400,error: err.message });
       }
   }
)

export const logout = () => {
  localStorage.removeItem("user");
};



export const getUserDetail = createAsyncThunk(
  'getUserDetails',
   async() => {
    try{
      const response :any = await api.post(`/backend/get_user_details`, {
        
      },{
          headers: {
              'Authorization': `Token ${localStorage.getItem("user")}` 
            }
      }).then((data:any)=>{
          
         let response = data.data;
         if(response){
          return { status:200,data:response.data?response.data:''}
         }
         
          else
          return {status:404,data:"No data available"}
      } ).catch((err:any)=>{
          return {status:400,data:err.response.data?.non_field_errors[0]}
      })
          return response
     }catch(err:any){
           return ({ status:400,error: err.message });
     }
}
)

