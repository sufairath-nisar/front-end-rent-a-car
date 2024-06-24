import React from 'react';
import Button from './Button';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import Search from './Search';
import CarouselTestimonial from './CarouselTestimonial';

export const Home = () => {

  return (
    <>

    <div className="home-banner pb-5 min-h-screen">
      <div className="grid grid-cols-3 gap-4 place-items-center">
        <div className='pl-14 ml-5'>
          <h1 className='font-bold leading-8'>
            Find, book and rent a car <span className='text-red-700'>Easily</span>
          </h1>
          <p className='pt-5'>
            Discover the convenience of renting a car with us. Whether for business or leisure, enjoy a seamless experience with our wide selection of vehicles, competitive prices, and exceptional customer service.
          </p>
        </div>
        <div className="flex justify-center items-center pt-5 w-full h-full col-span-2">
          <img className="object-full w-10/12" src="/images/banner-h-img.jpg" alt="image" />
        </div>
      </div> 
      <Search />
    </div>

    <div class="grid grid-cols-2 section-outline py-16">
        <div className='flex pl-16 pb-16 flex-col justify-center h-full'>
            <h3 className='text-red-700  pb-6 font-medium'>Rent a car across the UAE</h3>
            <p>With a comprehensive fleet of new and highly maintained vehicles, Shift Car Rental offers the best car hire deals in Dubai, Abu Dhabi and norther Emirates. And with award-winning services, you can always expect the highest quality standards.</p>
        </div>

        <div className='text-center'>
            <h2 className='font-medium'>CHOOSE YOUR <span className='text-red-700'>RIDE</span></h2>
            <div class="grid grid-cols-3 pt-5 gap-4">
              <Link to="/cars/all-cars" className="flex flex-col items-center cursor-pointer">
                  <div  className='place-items-center cursor-pointer text-center'>   
                      <img src='/images/icons/icon-red-outline-all.png' alt="Car"/>
                      <p>All Cars</p>
                  </div>
              </Link>
              
              <Link to="/cars/small-cars" className="flex flex-col items-center cursor-pointer">
                  <div  className='place-items-center cursor-pointer text-center'>   
                      <img src='/images/icons/icon-red-outline-small.png' alt="Car"/>
                      <p>Small</p>
                  </div>
              </Link>

              <Link to="/cars/medium-cars" className="flex flex-col items-center cursor-pointer">
                  <div  className='place-items-center cursor-pointer text-center'>   
                      <img src='/images/icons/icon-red-outline-medium.png' alt="Car"/>
                      <p>Medium</p>
                  </div>
              </Link>

              <Link to="/cars/crossover" className="flex flex-col items-center cursor-pointer">
                  <div className='place-items-center cursor-pointer text-center'>   
                      <img src='/images/icons/icon-red-outline-crossover.png' alt="Car" />
                      <p>Crossover</p>
                  </div>
              </Link>

              <Link to="/cars/suv" className="flex flex-col items-center cursor-pointer">
                  <div className='place-items-center cursor-pointer text-center'> 
                      <img src='/images/icons/icon-red-outline-suv.png' alt="Car"/>
                      <p>SUV</p>
                  </div>
              </Link>     
                
              <Link to="/cars/luxury" className="flex flex-col items-center cursor-pointer">
                    <div  className='place-items-center cursor-pointer text-center'>                      
                      <img src='/images/icons/icon-red-outline-luxury.png' alt="Car"/>
                      <p>Luxury</p>                 
                    </div>
              </Link>
                
            </div>
        </div>

    </div>
     
    <div className='grid grid-rows-1 section-safety relative pb-8 w-full '>
          <div className='grid grid-cols-2'>

            <div className='flex  absolute  -top-1/5 transform -translate-y-1/2'>
                <img src='/images/nisan-car.png' className='w-4/12 top-0'/>
            </div>

            <div className="px-14 pt-14 col-span-2 text-white relative z-10">
            <h2 className="font-medium pb-5 text-center">We are responsible for your safety</h2>
              <p>Each vehicle in our inventory is meticulously checked and maintained to ascertain the safety of its passengers. We can also customize your vehicle and make it perfect for any occasion with features such as child booster seats, GPS, and even provisions such as additional drivers on the rental cars.</p>
              <div className='flex justify-center  pt-8'>
              <Button text="FIND MORE DETAILS" onClick={() => console.log('Button clicked')} />
              </div>
            </div>
          
          </div>
    </div>

    <div className='section-how-it-works p-14'>
      <div className='text-center grid-grid-rows-1 pb-8'>
        <h2 className='font-medium'>
          How it <span className='text-red-700'>Works</span>
        </h2>
      </div>

      <div className='grid grid-cols-4 gap-6'>
        <div className='text-center'>
          <Profile textHeading="Choose your Ride" text="Book your car rental online with three easy steps with option to pay online." path={"/images/how-it-works1.png"} />
        </div>

        <div className='text-center'>
          <Profile textHeading="Start your Journey" text="Get your car delivered to your doorstep or any other location of your choice." path="/images/how-it-works2.png" />
        </div>

        <div className='text-center'>
          <Profile textHeading="Enjoy the Drive" text="Enjoy the freedom of driving your car rental anywhere in Dubai and across UAE." path="/images/how-it-works3.png" />
        </div>

        <div className='text-center'>
          <Profile textHeading="End your Ride" text="Get your car collected at your doorstep or any Shift rental location. See You Again!" path="/images/how-it-works4.png" />
        </div>
      </div>
    </div>

    <div className='section-testimonials '>
      <div className="grid grid-cols-1 md:grid-cols-4 relative flex items-center">
        <div className="md:col-start-1 md:pl-16 col-span-1 md:col-span-2 md:pr-5 ">
          <div className=' shadow-red-100 shadow-2xl py-4 px-8 '>
              <CarouselTestimonial />
          </div>
        </div>
        <div className="col-span-1 md:block hidden absolute w-2/4 right-0">
          <img src='/images/car1.png' className='w-full h-auto' alt="Car"/>
        </div>
      </div>
    </div>

      
  </>
  );
};



////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from './pages/clients/SignupPage';
import SigninPage from './pages/clients/SigninPage';
import { HomePage } from './pages/clients/HomePage';
import HomeLayout from './layouts/HomeLayout';
import Sedan from './components/cars/carTypes/Sedan';
import path from 'path';
import SedanPage from './pages/cars/types/SedanPage';
import NissanPage from './pages/cars/brands/NissanPage';
import InfinitiPage from './pages/cars/brands/InfinitiPage';
import KiaPage from './pages/cars/brands/KiaPage';
import MistubishiPage from './pages/cars/brands/MistubishiPage';
import ChevroletPage from './pages/cars/brands/ChevroletPage';
import RenaultPage from './pages/cars/brands/RenaultPage';
import HyundaiPage from './pages/cars/brands/HyundaiPage';
import MgPage from './pages/cars/brands/MgPage';
import ToyotaPage from './pages/cars/brands/ToyotaPage';


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
  {
        element: <SedanPage />,
        path: "/cars/types/sedan"
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
    element: <RenaultPage />
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

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
