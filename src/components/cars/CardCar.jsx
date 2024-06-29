import React from 'react';
import Button from '../clients/Button';

const CardCar = ({ car }) => {
    console.log('Rendering car:', car);

   
    if (!car || !car.features || car.features.length === 0) {
        return <div>No features available for this car</div>;
    }

 
    if (!car.carName) {
        return <div>No name available for this car</div>;
    }

  
    const features = car.features[0];
    
    return (
        <div className="card bg-base-100 -z-50 grid grid-rows-2 shadow-xl">

           
            <figure className="px-2 pt-3">
                <img
                    src={car.image} 
                    alt={car.carName} 
                    className="rounded-xl"
                />
            </figure>

            <div className="card-body justify-center pb-6 pt-2 flex text-center">
                <h2 className="card-title mb-5 text-center">{car.carName}</h2>

                <div className='grid grid-cols-4 mb-6 gap-2'>
                   
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
                    <FeatureItem icon='/images/icons/feature-icon-sensor.png' value={features.parkingSensors} className='w-6'/>
                    <FeatureItem icon='/images/icons/feature-icon-airbag.png' value={features.airBags} className='w-6'/>
                    <FeatureItem icon='/images/icons/feature-icon-foglamp.png' value={features.fogLamps} className='w-6'/>
                    <FeatureItem icon='/images/icons/feature-icon-cruise-control.png' value={features.cruiseControl} className='w-6'/>
                    <FeatureItem icon='/images/icons/feature-icon-mp3.png' value={features. MP3Player} className='w-6'/>
                    <FeatureItem icon='/images/icons/feature-icon-usb.png' value={features.USB} className='w-6'/>
                    <FeatureItem icon='/images/icons/feature-icon-passengers.png' value={features.passengersCapacity} className='w-6'/>

                   
                </div>

                <div className="card-actions">
                    <Button text="BOOK NOW" />
                </div>
            </div>
        </div>
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
        <div className='flex items-center justify-center'>
            <img src={icon} className='w-6' alt="Feature icon" />
            <p className='pl-1'>{displayValue}</p>
        </div>
    );
};

export default CardCar;
