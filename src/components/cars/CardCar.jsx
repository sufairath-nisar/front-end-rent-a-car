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
                    <figure className="px-2 pt-3 hover:scale-110 hover:rotate-3 ease-in-out duration-700">
                        
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

                        <div className='grid grid-cols-4 mb-10 gap-x-4 gap-y-4'>
                        
                            <FeatureItem icon='/images/icons/feature-icon.png' value={features.bluetooth} className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-seat.png' value={features.seats} className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-leather.png' value={features.leatherSeats} className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-navigation.png' value={features.navigation} className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-alloywheel.png' value={features.alloyWheel} className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-apple.png' value={features.applePlay} className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-rear-camera.png' value={features.rearCamera} className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-remote.png' value={features.keylessEntry} className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-door.png' value={features.doors} className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-aux.png' value={features.AUX} className='w-6'/>
                            <FeatureItem icon='/images/icons/icon-parkingSensor.png' value={features.parkingSensors} className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-airbag.png' value={features.airBags} className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-foglamp.png' value={features.fogLamps} className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-cruise-control.png' value={features.cruiseControl} className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-mp3.png' value={features. MP3Player} className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-usb.png' value={features.USB} className='w-6'/>
                            <FeatureItem icon='/images/icons/feature-icon-passengers.png' value={features.passengersCapacity} className='w-6'/>

                        
                        </div>

                        <div className="card-actions">
                            <Link to="/booking"> <Button text="BOOK NOW" onClick={handleBookNow}/></Link>
                        </div>
                    </div>
            </div>
        </>
    
    );
};


const FeatureItem = ({ icon, value }) => {
    // console.log(`Rendering FeatureItem with value: ${value}`);
    let displayValue;

   
    if (typeof value === 'boolean') {
        displayValue = value ? 'YES' : 'NO';
    } else {
        displayValue = value !== undefined ? value.toString() : 'N/A';
    }

    return (
        <div className='flex '>
            <img src={icon} className='w-6' alt="Feature icon" />
            <p className='pl-2 text-left'>{displayValue}</p>
        </div>
    );
};

export default CardCar;
