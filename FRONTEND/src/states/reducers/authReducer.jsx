import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    isloggedIn:false,
    user:{}
  },
}

export const authSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    login: (state) => {
      state.value.isloggedIn=true;
    },
    logout: (state) => {
        state.value.isloggedIn=false;
        state.value.user={};
    },
    setUser:(state,action)=>{
        state.value.user=action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { login,logout,setUser } = authSlice.actions;

export default authSlice.reducer;