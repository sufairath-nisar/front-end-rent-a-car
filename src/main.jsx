import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from './pages/clients/SignupPage';
import SigninPage from './pages/clients/SigninPage';
import { HomePage } from './pages/clients/HomePage';
import HomeLayout from './layouts/HomeLayout';
// import Sedan from './components/cars/carTypes/Sedan';
// import path from 'path';
// import SedanPage from './pages/cars/types/SedanPage';
import NissanPage from './pages/cars/brands/NissanPage';
import InfinitiPage from './pages/cars/brands/InfinitiPage';
import KiaPage from './pages/cars/brands/KiaPage';
import MistubishiPage from './pages/cars/brands/MistubishiPage';
import ChevroletPage from './pages/cars/brands/ChevroletPage';
import RenaultPage from './pages/cars/brands/RenaultPage';
import HyundaiPage from './pages/cars/brands/HyundaiPage';
import MgPage from './pages/cars/brands/MgPage';
import ToyotaPage from './pages/cars/brands/ToyotaPage';
import RentaldealsPage from './pages/clients/RentaldealsPage';
import WhychooseusPage from './pages/clients/WhychooseusPage';
import OurlocationsPage from './pages/clients/OurlocationsPage';
import ContactusPage from './pages/clients/ContactusPage';
import SafetyPage from './pages/clients/SafetyPage';
import CarList from './components/cars/CarList';


const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/rental-deals",
        element: <RentaldealsPage />
      },
      {
        path: "/our-locations",
        element: <OurlocationsPage />
      },
      {
        path: "/contact-us",
        element: <ContactusPage />
      },
      {
        path: "/why-choose-us",
        element: <WhychooseusPage />
      },
      {
        path: "/clients/signup",
        element: <SignupPage />,
      },
      {
        path: "/clients/signin",
        element: <SigninPage />,
      },
      {
        path: "/clients/safety",
        element: <SafetyPage />
      },
      {
        path: "/cars/types/:value",
        element: <CarList />,
      },
  {
    path: "/cars/brands/nissan",
    element: <NissanPage />
  },
  {
    path: "/cars/brands/infiniti",
    element: <InfinitiPage />
  },
  {
    path: "/cars/brands/kia",
    element: <KiaPage />
  },
  {
    path: "/cars/brands/mistubishi",
    element: <MistubishiPage />
  },
  {
    path: "/cars/brands/chevrolet",
    element: <ChevroletPage />
  },
  {
    path: "/cars/brands/renault",
    element: <RenaultPage  />
  },
  {
    path: "/cars/brands/hyundai",
    element: <HyundaiPage />
  },
  {
    path: "/cars/brands/mg",
    element: <MgPage />
  },
  {
    path: "/cars/brands/toyota",
    element: <ToyotaPage />
  },
    ],
  },
 

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
