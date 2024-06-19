import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from './pages/clients/SignupPage';
import SigninPage from './pages/clients/SigninPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/clients/signup",
    element: <SignupPage />,
  },
  {
    path: "/clients/signin",
    element: <SigninPage />,
  },
 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
