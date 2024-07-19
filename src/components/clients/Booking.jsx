import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Signin from './Signin';
import ChooseLocation from './ChooseLocation';
import Payment from './Payment';

const Booking = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLocationChosen, setIsLocationChosen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'));
    if (isLogged) {
      setIsLoggedIn(true);
      navigate('/booking/choose-location');
    }
  }, [navigate]);

  const handleSigninSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLogged', JSON.stringify(true));
    navigate('/booking/choose-location');
  };

  

  const handleChooseLocationComplete = () => {
    setIsLocationChosen(true);
    navigate('/booking/payment');
  };

  return (
    <div>
      {!isLoggedIn && (
        <div>
        <Signin
          onSuccess={handleSigninSuccess}
          onReturnToBooking={() => navigate('/booking/choose-location')} // Pass callback to navigate to Booking
          fromBooking={true} // Pass the origin prop
        />
        
        <div className='flex justify-center  pb-16 bg-gradient-to-r from-red-500 to-white'>
            <ul className="steps steps-horizontal">
              <li className="step step-error text-red-700 font-semibold">Create Account</li>
              <li className="step    font-semibold">Choose Date & Time</li>
              <li className="step    font-semibold">Payment Details</li>
            </ul>
        </div>
        </div>
      )}

      {isLoggedIn && !isLocationChosen && (
        <ChooseLocation onComplete={handleChooseLocationComplete} />
      )}

      {isLoggedIn && isLocationChosen && (
        <Payment />
      )}
    </div>
  );
};

export default Booking;
