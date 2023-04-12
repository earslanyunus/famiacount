import React from 'react'
import ReactDOM from 'react-dom/client'
import Homepage from './views/Homepage'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { store } from './redux/store'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  { path: '/', element: <Homepage /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
