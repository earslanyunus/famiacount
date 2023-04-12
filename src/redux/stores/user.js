import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
  }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state,action)=>{
            state.isLogin = action.payload
        }
    }
})

export const { setLogin } = userSlice.actions
export default userSlice.reducer