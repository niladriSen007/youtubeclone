import React from 'react'
// import { BrowserRouter,Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import Watch from './pages/Watch'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import LeftBar from './components/LeftBar'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Login from './pages/Login'
import { Children } from 'react'


const App = () => {

  const Layout = () =>(
    <div>
          <Navbar />
           <div style={{flex:"4"}}>
                <Outlet />
          </div>
    </div>
  )

  // const ProtectedRoute = ({ children }) => {
  //   return children;
  // };



  const router = createBrowserRouter([
    {
      path: "/",
      element:(
           <Layout />
      ),
      children:[
        {
          path:"/",
          element:<Home  type="random"/>, 
        },
        {
          path:"/trending",
          element:<Home type="trending" />, 
        },
        {
          path:"/subscribed",
          element:<Home type="subscribed" />, 
        },

        {
          path:"/watch/:id",
          element:<Watch />
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ]
    },
  ]);
  

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App