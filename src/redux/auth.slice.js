import {createSlice} from "@reduxjs/toolkit";
import {fetchSinToken} from "../utils/fetch";
import { toast } from 'react-toastify';

const initialState = {};

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    login(state, action){
      return {
        uid:action.payload.uid,
        name: action.payload.name,
        token: action.payload.token
      }
    },
    logout(state,action){
      return {}
    }
  }
})

// External function
export const startLogin = (email, password) =>{
  return async (dispatch) =>{
    let resp,body;
    try {
      resp = await fetchSinToken('auth', {email, password},'POST');
      body = await resp.json();
      if(body.ok){
        localStorage.setItem('token',body.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch( login({
          uid: body.uid,
          name: body.name,
          token: body.token
        }));

      }else{
        toast.error('Algo salio mal', {
          position: "top-center",
        });
      }
    }catch (e) {
      toast.error(`Error: ${e}`, {
        position: "top-center",
      });
    }
  }
}

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;
