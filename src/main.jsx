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
// import NissanPage from './pages/cars/brands/NissanPage';
// import InfinitiPage from './pages/cars/brands/InfinitiPage';
// import KiaPage from './pages/cars/brands/KiaPage';
// import MistubishiPage from './pages/cars/brands/MistubishiPage';
// import ChevroletPage from './pages/cars/brands/ChevroletPage';
// import RenaultPage from './pages/cars/brands/RenaultPage';
// import HyundaiPage from './pages/cars/brands/HyundaiPage';
// import MgPage from './pages/cars/brands/MgPage';
// import ToyotaPage from './pages/cars/brands/ToyotaPage';
import RentaldealsPage from './pages/clients/RentaldealsPage';
import WhychooseusPage from './pages/clients/WhychooseusPage';
import OurlocationsPage from './pages/clients/OurlocationsPage';
import ContactusPage from './pages/clients/ContactusPage';
import SafetyPage from './pages/clients/SafetyPage';
import CarList from './components/cars/CarList';
import CarListbrand from './components/cars/CarListbrand';
import CarListcategory from './components/cars/CarListcategory';
// import CarListsearchPage from './pages/cars/CarListsearchPage';
import CarListSearch from './components/cars/CarListSearch';
import AllCarsPage from './pages/cars/AllCarsPage';
import ClientLayout from './layouts/ClientLayout';
import SettingsPage from './pages/clients/SettingsPage';


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
        path: "/cars/brand/:value",
        element: <CarListbrand />
      },
      {
        path: "/cars/category/:value",
        element: <CarListcategory />
      },
      {
        path: "/cars/search-cars/:searchTerm",
        element: <CarListSearch />       
      },
      {
        path: "/cars/all-cars",
        element: <AllCarsPage />      
      },  
    ],
  },

  {
    element: <ClientLayout />,
    children: [
      {
        path: "/clients",
        element: <HomePage />,
      },
      {
        path: "/clients/rental-deals",
        element: <RentaldealsPage />
      },
      {
        path: "/clients/our-locations",
        element: <OurlocationsPage />
      },
      {
        path: "/clients/contact-us",
        element: <ContactusPage />
      },
      {
        path: "/clients/why-choose-us",
        element: <WhychooseusPage />
      },
      {
        path: "/clients/logout",
        element: <HomePage />,
      },
      {
        path: "/clients/account-settings",
        element: <SettingsPage />,
      },
      {
        path: "/clients/more-safety",
        element: <SafetyPage />
      },
      {
        path: "/clients/cars/types/:value",
        element: <CarList />,
      },
      {
        path: "/clients/cars/brand/:value",
        element: <CarListbrand />
      },
      {
        path: "/clients/cars/category/:value",
        element: <CarListcategory />
      },
      {
        path: "/clients/cars/search-cars/:searchTerm",
        element: <CarListSearch />       
      },
      {
        path: "/clients/cars/all-cars",
        element: <AllCarsPage />      
      },  
    ],
 
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
