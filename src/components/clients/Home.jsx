import React from 'react';
import Button from './Button';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import Search from './Search';
import CarouselTestimonial from './CarouselTestimonial';
import CardBrand from './CardBrand';
import CardDocuments from './CardDocuments';

export const Home = () => {
  const titleEmiratis = "Emiratis & UAE Residents";
  const itemsEmiratis = [
    "A valid UAE Driving License under hirer name",
    "Emirates ID front & back",
    "Passport & Visa page copy",
    
  ];

  const titleTourists = "Foreign Tourists";
  const itemsTourists = [
    "International & country Driving License under hirer name",
    "Copy of Visa and Entry Stamp",
    "Passport copy",
  ];

  return (
    <>

    <div className="home-banner md:pt-16 pt-28 pb-5 min-h-screen">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 place-items-center">
        <div className='md:pl-14  md:ml-5  max-[600px]:p-5'>
          <h1 className='font-bold leading-8'>
            Find, book and rent a car <span className='text-red-700'>Easily</span>
          </h1>
          <p className='pt-5'>
            Discover the convenience of renting a car with us. Whether for business or leisure, enjoy a seamless experience with our wide selection of vehicles, competitive prices, and exceptional customer service.
          </p>
        </div>
        <div className="flex justify-center items-center pt-5 w-full h-full md:col-span-2 grid-cols-1">
          <img className="object-full w-10/12" src="/images/banner-h-img.jpg" alt="image" />
        </div>
      </div> 
      <Search />
    </div>

    <div className='section-brands  pb-16 pt-12 bg-gradient-to-r from-red-700 to-white'>
        
        <div className='pb-10 grid grid-cols-1 text-center'>
          <h2 className='font-medium'>Explore <span className='text-red-700'>Brands</span></h2>
        </div>
            
        <div className="grid grid-cols-2 gap-4 md:px-10 px-16 md:grid-cols-9 justify-center">
          <div className='grid-cols-1 justify-center flex'>
            <Link to="/cars/brand/nissan">
              <CardBrand name="Nissan"  path="/images/nissan-logo.png"/>
            </Link>
          </div>

          <div className='grid-cols-1 justify-center flex'>
            <Link to="/cars/brand/chevrolet">
              <CardBrand name="Chevrolet"  path="/images/chevrolet-logo.png"/>
            </Link>
          </div>

          <div className='grid-cols-1 justify-center flex'>
            <Link to="/cars/brand/hyundai">
              <CardBrand name="Hyundai"  path="/images/hyundai-logo.png"/>
            </Link>
          </div>

          <div className='grid-cols-1 justify-center flex'>
            <Link to="/cars/brand/infiniti">
              <CardBrand name="Infiniti"  path="/images/infiniti-logo.png"/>
            </Link>
          </div>

          <div className='grid-cols-1 justify-center flex'>
            <Link to="/cars/brand/kia">
              <CardBrand name="Kia"  path="/images/kia-logo.png"/>
            </Link>
          </div>

          <div className='grid-cols-1 justify-center flex'>
              <Link to="/cars/brand/mg">
                <CardBrand name="MG"  path="/images/mg-logo.png"/>
              </Link>
          </div>

          <div className='grid-cols-1 justify-center flex'>
              <Link to="/cars/brand/mistubishi">
                  <CardBrand name="Mistubishi"  path="/images/mistubishi-logo.webp"/>
              </Link>
          </div>

          <div className='grid-cols-1 justify-center flex'>
              <Link to="/cars/brand/renault">
                <CardBrand name="Renault"  path="/images/renault-logo.png"/>
              </Link>
          </div>

          <div className='grid-cols-1 justify-center flex'>
              <Link to="/cars/brand/toyota">
                <CardBrand name="Toyota"  path="/images/toyota-logo.png"/>
              </Link>
          </div>

        </div>
 
    </div>

    <div className='section-documents-required  pb-14 pt-12'>      
        <div className='pb-10 grid grid-cols-1 text-center'>
          <h2 className='font-medium'>Mandatory <span className='text-red-700'>Documents</span></h2>
        </div>
            
        <div className="grid grid-cols-1 gap-10 px-16 md:grid-cols-2 ">
          <div>
            <CardDocuments title={titleEmiratis} items={itemsEmiratis} path={'/images/document-required-1new.png'}/>
          </div>
          <div>
            <CardDocuments title={titleTourists} items={itemsTourists} path={'/images/documents-required-visit.png'}/>
          </div>
        </div>        
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 section-outline pt-8 pb-16">
        <div className='flex pl-16 pr-9 md:pr-0 pb-16 flex-col justify-center h-full'>
            <h3 className='text-red-700  pb-6 font-medium'>Rent a car across the UAE</h3>
            <p>With a comprehensive fleet of new and highly maintained vehicles, Shift Car Rental offers the best car hire deals in Dubai, Abu Dhabi and norther Emirates. And with award-winning services, you can always expect the highest quality standards.</p>
        </div>

        <div className='text-center grid-cols-1'>
            <h2 className='font-medium'>CHOOSE YOUR <span className='text-red-700'>RIDE</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-3 pt-5  max-[600px]:px-16 gap-4">
              <Link to="/cars/all-cars" className="flex flex-col items-center cursor-pointer">
                  <div  className='place-items-center cursor-pointer text-center'>   
                      <img src='/images/icons/icon-red-outline-all.png' alt="Car"/>
                      <p>All Cars</p>
                  </div>
              </Link>
              
              <Link to="/cars/category/small" className="flex flex-col items-center cursor-pointer">
                  <div  className='place-items-center cursor-pointer text-center'>   
                      <img src='/images/icons/icon-red-outline-small.png' alt="Car"/>
                      <p>Small</p>
                  </div>
              </Link>

              <Link to="/cars/category/medium" className="flex flex-col items-center cursor-pointer">
                  <div  className='place-items-center cursor-pointer text-center'>   
                      <img src='/images/icons/icon-red-outline-medium.png' alt="Car"/>
                      <p>Medium</p>
                  </div>
              </Link>

              <Link to="/cars/category/crossover" className="flex flex-col items-center cursor-pointer">
                  <div className='place-items-center cursor-pointer text-center'>   
                      <img src='/images/icons/icon-red-outline-crossover.png' alt="Car" />
                      <p>Crossover</p>
                  </div>
              </Link>

              <Link to="/cars/category/suv" className="flex flex-col items-center cursor-pointer">
                  <div className='place-items-center cursor-pointer text-center'> 
                      <img src='/images/icons/icon-red-outline-suv.png' alt="Car"/>
                      <p>SUV</p>
                  </div>
              </Link>     
                
              <Link to="/cars/category/luxury" className="flex flex-col items-center cursor-pointer">
                    <div  className='place-items-center cursor-pointer text-center'>                      
                      <img src='/images/icons/icon-red-outline-luxury.png' alt="Car"/>
                      <p>Luxury</p>                 
                    </div>
              </Link>
                
            </div>
        </div>

    </div>
     
    <div className='grid grid-rows-1 section-safety relative pb-12 w-full '>
          <div className='grid grid-cols-2'>

            <div className='flex  absolute  -top-1/5 transform -translate-y-1/2'>
                <img src='/images/nisan-car.png' className='w-4/12 top-0'/>
            </div>

            <div className="px-14 pt-14 col-span-2 text-white relative z-10">
            <h2 className="font-medium pb-5 text-center">We are responsible for your safety</h2>
              <p>Each vehicle in our inventory is meticulously checked and maintained to ascertain the safety of its passengers. We can also customize your vehicle and make it perfect for any occasion with features such as child booster seats, GPS, and even provisions such as additional drivers on the rental cars.</p>
              <div className='flex justify-center  pt-8'>
              <Link to="/clients/safety">
                  <Button text="FIND MORE DETAILS" onClick={() => console.log('Button clicked')} />
              </Link>
              </div>
            </div>
          
          </div>
    </div>

    <div className='section-how-it-works px-14 pt-14 pb-8'>
      <div className='text-center grid grid-rows-1 pb-8'>
        <h2 className='font-medium'>
          How it <span className='text-red-700'>Works</span>
        </h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
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

    <div className='section-testimonials bg-no-repeat bg-cover pb-16 bg-center bg-[url("/images/redquotes7.jpg")]'>
        
              <div className='pb-10 grid grid-cols-1 text-center'>
                <h2 className='font-medium'>Our Delighted<span className='text-red-700'> Clients</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 ">
                <div className="md:col-start-2 md:pl-16 col-span-1 md:col-span-2 md:pr-5 ">
                  <div className='rounded-md shadow-red-300 bg-gradient-to-r from-red-700 to-white shadow-2xl py-4 px-8 '>
                      <CarouselTestimonial />
                  </div>
                </div>
              </div>
       
    </div>
      
  </>
  );
};