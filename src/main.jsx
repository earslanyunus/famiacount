import React from 'react'
import ReactDOM from 'react-dom/client'
import Homepage from './views/Homepage'
import Login from './views/Login'
import Signup from './views/Signup'
import FindPartner from './views/FindPartner'
import ProfileLayout from './views/ProfileLayout'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import  store  from './redux/store'
import { Provider } from 'react-redux'
import Notifications from './views/Notifications'
import MySubs from './views/MySubs'

const router = createBrowserRouter([
  { path: '/', element: <Homepage /> },
  {path:'/login', element: <Login/>},
  {path:'/signup', element: <Signup/>},
  {path:'/findpartners', element: <FindPartner/>},
  {path:'my', element: <ProfileLayout/>, children:[
    {path:'notifications', element: <Notifications/>},
    {path:'subs',element: <MySubs/>}
  ]},
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
