import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from './pages/clients/SignupPage';
import SigninPage from './pages/clients/SigninPage';
import { HomePage } from './pages/clients/HomePage';
import HomeLayout from './layouts/HomeLayout';


const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/clients/signup",
        element: <SignupPage />,
      },
      {
        path: "/clients/signin",
        element: <SigninPage />,
      },
    ],
  },
 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
