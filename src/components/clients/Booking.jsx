// import React, { useState,  } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Signin from './Signin';
// import Signup from './Signup';
// import ChooseLocation from './ChooseLocation';

// const Booking = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   const handleSigninSuccess = () => {
//     setIsLoggedIn(true);
//   };

//   const handleSignupSuccess = () => {
//     setIsLoggedIn(true);
//     // Navigate to Booking after successful signup
//     navigate('/booking');
//   };

//   return (
//     <div>
//     {!isLoggedIn && (
//         <>
//             <Signin
//                 onSuccess={handleSigninSuccess}
//                 onReturnToBooking={() => navigate('/booking')} // Pass callback to navigate to Booking
//                 fromBooking={true} // Pass the origin prop
//             />
           
//         </>
       
//       )}
//       {isLoggedIn && <ChooseLocation />}
//     </div>
//   );
// };

// export default Booking;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Signin from './Signin';
import ChooseLocation from './ChooseLocation';
import Payment from './Payment';

const Booking = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLocationChosen, setIsLocationChosen] = useState(false);
  const navigate = useNavigate();

  const handleSigninSuccess = () => {
    setIsLoggedIn(true);
    navigate('/booking/choose-location');
  };

  const handleChooseLocationComplete = () => {
    setIsLocationChosen(true);
    navigate('/booking/payment');
  };

  return (
    <div>
      {!isLoggedIn && (
        <Signin
            onSuccess={handleSigninSuccess}
            onReturnToBooking={() => navigate('/booking/choose-location')} // Pass callback to navigate to Booking
            fromBooking={true} // Pass the origin prop
        />
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

