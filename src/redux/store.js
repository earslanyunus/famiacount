import { configureStore } from '@reduxjs/toolkit'
import userReducer from './stores/user'

 const store = configureStore({
  reducer: {user: userReducer},
})

export default store