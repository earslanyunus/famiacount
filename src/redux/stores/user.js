import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isLogin: false,
  }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state,action)=>{
            state.isLogin = action.payload
        },
        setUser: (state,action)=>{
            state.user = action.payload
        }
        
    }
})

export const { setLogin,setUser } = userSlice.actions
export default userSlice.reducer