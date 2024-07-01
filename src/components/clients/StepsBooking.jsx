import React from 'react';

const StepsBooking = () => {
  return (
    <>
      <ul className="steps">
        <li className="step step-primary bg-red-700 text-white">Create Account</li>
        <li className="step step-primary bg-red-700 text-white">Select Car & Location</li>
        <li className="step">Payment Details</li>
        <li className="step">Confirm Booking</li>
      </ul>
    </>
  );
}

export default StepsBooking;
