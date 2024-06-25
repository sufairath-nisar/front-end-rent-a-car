import React from 'react'
import Button from './Button';

import Sedan from '../cars/carTypes/Sedan';
import { Link } from 'react-router-dom';

const Search = () => {
  return (
   <>
    <div className=' mx-14 mb-14 shadow-red-100 shadow-2xl grid grid-rows-1 bg-white'>
        <div className="p-10 shadow-slate-100 shadow-lg ">
          <h3 className='font-semibold pb-3'>What are you looking for?</h3>
          <div className='flex'>
            <label className="relative block w-full md:w-10/12">
              <input className="placeholder:text-slate-600 block bg-white w-full pl-5 border border-red-200 py-2 pr-3 shadow-sm focus:outline-none focus:border-red-700 focus:ring-red-700 focus:ring-1 sm:text-sm" placeholder="Tap a brand or model..." type="text" name="search" />
              <span className="absolute inset-y-0 right-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </span>
            </label>
            <span className="md:w-2/12 w-full">
              <Button className="w-10/12 ml-5" text="Search" colorClass="text-red-500" onClick={() => console.log('Button clicked')} />
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-6 mt-3 gap-1 place-items-center">

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

          <div className='grid-cols-1 w-full'>
            <div className='flex flex-col items-center'>
              <img src='/images/icons/home-icon-commercial.png' alt="Commercial cars" />
              <p>Commercial cars</p>
            </div>
          </div>

        </div>
      </div>
   </>
  )
}

export default Search