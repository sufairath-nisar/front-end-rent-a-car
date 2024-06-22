import React from 'react';
import Button from './Button';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import Search from './Search';

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
            <h3 className='text-red-700 text-medium pb-6'>Rent a car across the UAE</h3>
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
     
    <div className='grid grid-rows-1 section-safety relative  w-full '>
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

    <div className='grid grid-rows-1 grid-cols-4 section-how-it-works p-16'>
      <div className='text-center'>
        <Profile textHeading="Choose your Ride" text="Book your car rental online with three easy steps with option to pay online." path={"/images/how-it-works1.png"}/>
      </div>

      <div>
        <Profile />
      </div>

      <div>
        <Profile />
      </div>

      <div>
        <Profile />
      </div>
      
    </div>
    
  </>
  );
};