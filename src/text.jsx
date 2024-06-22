import React from 'react';
import Button from './Button';

import Sedan from '../cars/carTypes/Sedan';
import { Link } from 'react-router-dom';

export const Home = () => {

  return (
    <>
    <div className="relative home-banner pb-5 min-h-screen">
      <div className="grid grid-cols-3 gap-4 place-items-center">
        <div className='pl-14 ml-5'>
          <h1 className='font-bold leading-8'>
            Find, book and rent a car <span className='text-red-700'>Easily</span>
          </h1>
          <p className='pt-5'>
            Discover the convenience of renting a car with us. Whether for business or leisure, enjoy a seamless experience with our wide selection of vehicles, competitive prices, and exceptional customer service.
          </p>
        </div>
        <div className="flex justify-center items-center pt-9 w-full h-full col-span-2">
          <img className="object-full w-10/12" src="/images/banner-image.jpg" alt="image" />
        </div>
      </div>

      <div className='absolute w-4/5 left-1/2 transform mb-5 -translate-x-1/2 -translate-y-1/2 shadow-red-100 mt-10 shadow-2xl grid grid-rows-1 bg-white'>
        <div className="p-12 shadow-slate-100 shadow-lg">
          <h3 className='font-semibold pb-3'>What are you looking for?</h3>
          <div className='flex'>
            <label className="relative block w-10/12">
              <input className="placeholder:text-slate-600 block bg-white w-full pl-5 border border-slate-300 py-2 pr-3 shadow-sm focus:outline-none focus:border-red-700 focus:ring-red-700 focus:ring-1 sm:text-sm" placeholder="Tap a brand or model..." type="text" name="search" />
              <span className="absolute inset-y-0 right-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </span>
            </label>
            <span className="w-2/12">
              <Button className="w-10/12 ml-5" text="Search" colorClass="text-red-500" onClick={() => console.log('Button clicked')} />
            </span>
          </div>
        </div>
        <div className="grid grid-cols-6 mt-3 gap-1 place-items-center">

          <div className='grid-cols-1 border-r border-gray-300 w-full'>
            <Link to="/cars/types/sedan" className="flex flex-col items-center cursor-pointer">
              <img src='/images/icons/home-icon-sedan.png' alt="Sedan" />
              <p>Sedan</p>
            </Link>
          </div>

          <div className='grid-cols-1 border-r border-gray-300 w-full'>
            <div className='flex flex-col items-center'>
              <img src='/images/icons/home-icon-suv.png' alt="SUV" />
              <p>SUV</p>
            </div>
          </div>

          <div className='grid-cols-1 border-r border-gray-300 w-full'>
            <div className='flex flex-col items-center'>
              <img src='/images/icons/home-icon-hatchback.png' alt="Hatchback" />
              <p>Hatchpack</p>
            </div>
          </div>

          <div className='grid-cols-1 border-r border-gray-300 w-full'>
            <div className='flex flex-col items-center'>
              <img src='/images/icons/home-icon-lsuv.png' alt="Large SUV" />
              <p>Large SUV</p>
            </div>
          </div>

          <div className='grid-cols-1 border-r border-gray-300 w-full'>
            <div className='flex flex-col items-center'>
              <img src='/images/icons/home-icon-luxury.png' alt="Luxury cars" />
              <p>Luxury cars</p>
            </div>
          </div>

          <div className='grid-cols-1 border-r border-gray-300 w-full'>
            <div className='flex flex-col items-center'>
              <img src='/images/icons/home-icon-commercial.png' alt="Commercial cars" />
              <p>Commercial cars</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </>
  );
};