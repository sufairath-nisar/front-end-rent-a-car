import React from 'react'

export const Home = () => {
  return (
    <div class="grid grid-cols-3 gap-4  place-items-center">
         <div className='pl-14 ml-5'>
            <h1 className='font-bold leading-8'>Find, book and  rent a car <span className='text-red-700'>Easily</span></h1>
            <p className='pt-5'>Discover the convenience of renting a car with us. Whether for business or leisure, enjoy a seamless experience with our wide selection of vehicles, competitive prices, and exceptional customer service.</p>
         </div>
  
        <div className="flex justify-center items-center pt-9  w-full h-full col-span-2">
            <img className="object-full w-10/12" src="../../../public/images/banner-image.jpg" alt="image" />
        </div>
        {/* <div className='banner relative h-screen bg-cover bg-center bg-no-repeat'>09</div> */}
    </div>
  )
}
