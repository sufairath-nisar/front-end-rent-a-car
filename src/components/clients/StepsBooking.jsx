import React from 'react';

const StepsBooking = () => {
  return (
    <>
      <ul className="steps">
        <li className="step step-primary text-white">Create Account</li>
        <li className="step step-primary text-white">Choose Date & Location</li>
        <li className="step">Payment Method</li>
        <li className="step">Payment Details</li>
      </ul>
    </>
  );
}

export default StepsBooking;
