import React from 'react';
import Button from '../clients/Button';


const CardCar = () => {
  return (
    <>
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
                className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">Shoes!</h2>
                <div className="flex items-center mb-2">
                  <IoLocationSharp className="h-5 w-5 mr-2 text-gray-500" /> 
                  <p className="address-text">{location.address}</p> 
                </div>
                <div className="card-actions">
                <Button textHeading="BOOK NOW"/>
                </div>
            </div>
        </div>
    </>
  )
}

export default CardCar