import React from 'react';
import Button from '../clients/Button';
import { Link } from 'react-router-dom';


const CardCar = ({ car}) => {
  
    console.log('Rendering car:', car);

   
    if (!car || !car.features || car.features.length === 0) {
        return <div>No features available for this car</div>;
    }

   
    if (!car.carName) {
        return <div>No name available for this car</div>;
    }

  
    const features = car.features[0];

    // const handleBookNow = () => {
    //     // Assuming you want to store the first branch
    //     const branch = car.branch.length > 0 ? car.branch[0] : null;
    
    //     // Store the car details in Local Storage
    //     localStorage.setItem('selectedCar', JSON.stringify({
    //       ...car,
    //       branch
    //     }));
    
    //     console.log('Car details stored in Local Storage:', car);
    //   };

    const handleBookNow = () => {
        const branch = car.branch.length > 0 ? car.branch[0] : null;

        const carDetails = {
            ...car,
            branch,
            carId: car.id // Assuming car.id is the car's unique identifier
        };

        // Store the car details in Local Storage
        localStorage.setItem('selectedCar', JSON.stringify(carDetails));

        console.log('Car details stored in Local Storage:', carDetails);
    };

    
    return (
        <>
            <div className="card  bg-base-100   shadow-2xl ">
                    <figure className="px-2 pt-3 h-full hover:scale-110 hover:rotate-3 ease-in-out duration-700">
                        
                        <img
                            src={car.image} 
                            alt={car.carName} 
                            className="rounded-xl"
                        />
                    
                       
                    </figure>

                    <div className="card-body justify-center pb-6 pt-2 flex text-center">
                        <div className='grid mb-2 grid-rows-1'>
                            <h2 className="card-title mb-1 justify-center text-center text-red-700">{car.carName}</h2>
                            <p className='font-semibold text-slate-500'>{car.km}<span className=' text-sm'> km</span></p>
                        </div>
                        <div className='grid gap-1 pb-5 grid-cols-3'>
                            <div className="inline-flex items-center rounded-md bg-pink-50 px-1 py-1  font-semibold text-red-700 text-sm ring-1 ring-inset ring-pink-700/10 "><p>AED <span>{car.priceperday}</span><br /><span className='text-xs text-slate-500'>Per Day</span></p></div>
                            <div className="inline-flex items-center rounded-md bg-pink-50 px-1 py-1  font-semibold text-red-700 text-sm ring-1 ring-inset ring-pink-700/10 "><p>AED <span>{car.priceperweek}</span><br /><span className='text-xs text-slate-500'>Per Week</span></p></div>
                            <div className="inline-flex items-center rounded-md bg-pink-50 px-1 py-1  font-semibold text-red-700 text-sm ring-1 ring-inset ring-pink-700/10 "><p>AED <span>{car.pricepermonth}</span><br /><span className='text-xs text-slate-500'>Per Month</span></p></div>
                        </div>

                        <div className='grid grid-cols-4 mb-5 gap-x-4 gap-y-4'>
                        
                            <FeatureItem icon='/images/icons/feature-icon.png' value={features.bluetooth} tooltip="Bluetooth" className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-seat.png' value={features.seats} tooltip="Number of Seats" className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-leather.png' value={features.leatherSeats} tooltip="Leather Seats" className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-navigation.png' value={features.navigation} tooltip="Navigation" className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-alloywheel.png' value={features.alloyWheel} tooltip="Alloy Wheel" className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-apple.png' value={features.applePlay} tooltip="Apple Play" className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-rear-camera.png' value={features.rearCamera} tooltip="Rear Camera" className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-remote.png' value={features.keylessEntry} tooltip="Keyless Entry" className='w-6'/> 
                            <FeatureItem icon='/images/icons/feature-icon-door.png' value={features.doors} tooltip="Number of Doors" className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-aux.png' value={features.AUX} tooltip="AUX" className='w-6'/>
                            <FeatureItem icon='/images/icons/icon-parkingSensor.png' value={features.parkingSensors} tooltip="Parking Sensors" className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-airbag.png' value={features.airBags} tooltip="Air Bags" className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-foglamp.png' value={features.fogLamps} tooltip="Fog Lamps" className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-cruise-control.png' value={features.cruiseControl} tooltip="Cruise Control"className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-mp3.png' value={features. MP3Player} tooltip="MP3 Player" className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-usb.png' value={features.USB} tooltip="USB" className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-passengers.png' value={features.passengersCapacity} tooltip="Passengers Capacity" className='w-6'/>

                        
                        </div>

                        <div className="card-actions">
                            <Link to="/booking"> <Button text="BOOK NOW" onClick={handleBookNow}/></Link>
                        </div>
                    </div>
            </div>
        </>
    
    );
};


// const FeatureItem = ({ icon, value }) => {
//     // console.log(`Rendering FeatureItem with value: ${value}`);
//     let displayValue;

   
//     if (typeof value === 'boolean') {
//         displayValue = value ? 'YES' : 'NO';
//     } else {
//         displayValue = value !== undefined ? value.toString() : 'N/A';
//     }

//     return (
//         <div className='flex '>
//             <img src={icon} className='w-6' alt="Feature icon" />
//             <p className='pl-2 text-left'>{displayValue}</p>
//         </div>
//     );
// };

const FeatureItem = ({ icon, value, tooltip }) => {
    let displayValue;

    if (typeof value === 'boolean') {
        displayValue = value ? 'YES' : 'NO';
    } else {
        displayValue = value !== undefined ? value.toString() : 'N/A';
    }

    return (
        <div className="relative group flex items-center">
            <img src={icon} className="w-6 cursor-pointer" alt="Feature icon" />
            <p className="pl-2 text-left">{displayValue}</p>

            {tooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-red-400 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-10">
                    {tooltip}
                </div>
            )}
        </div>
    );
};


export default CardCar;
