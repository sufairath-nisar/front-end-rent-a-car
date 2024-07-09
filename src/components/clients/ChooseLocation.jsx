import React, { useState } from 'react';
import axios from 'axios';

const ChooseLocation = ({ onComplete }) => {
  const [pickupDate, setPickupDate] = useState('');
  const [dropOffDate, setDropOffDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');
  const [drivenMethod, setDrivenMethod] = useState('self'); // Default to 'self'
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [orderStatus, setOrderStatus] = useState('pending'); // Default status
  const [car, setCar] = useState('');
  const [client, setClient] = useState('');

  const handleLocationSelect = () => {
    // Simulate choosing a location for now
    setPickupLocation('Your chosen pickup address');
    setDropoffLocation('Your chosen dropoff address');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        pickupDate,
        dropOffDate,
        pickupTime,
        dropoffTime,
        drivenMethod,
        pickupLocation,
        dropoffLocation,
        orderStatus,
        car,
        client
      };

      const response = await axios.post('http://localhost:3000/api/create-order', orderData);
      console.log('Order created:', response.data);
      onComplete(); // Notify parent component or perform any other action upon completion
    } catch (error) {
      console.error('Error creating order:', error);
      // Handle error states as per your application's requirements
    }
  };

  return (
    <div className=''>
        <div className="max-w-2xl mx-auto mt-10 p-6 shadow-xl shadow-red-700 rounded-lg ">
        <h2 className="text-white text-2xl mb-4">Choose your location</h2>
        <button
            className="bg-white text-red-700 px-4 py-2 rounded-md mb-4"
            onClick={handleLocationSelect}
        >
            Choose Location
        </button>
        {pickupLocation && (
            <p className="text-white mb-2">Pickup Location: {pickupLocation}</p>
        )}
        {dropoffLocation && (
            <p className="text-white mb-4">Dropoff Location: {dropoffLocation}</p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Pickup Date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="block w-full px-4 py-2 rounded-md bg-white text-gray-800"
            />
            <input
            type="text"
            placeholder="Dropoff Date"
            value={dropOffDate}
            onChange={(e) => setDropOffDate(e.target.value)}
            className="block w-full px-4 py-2 rounded-md bg-white text-gray-800"
            />
            <input
            type="text"
            placeholder="Pickup Time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="block w-full px-4 py-2 rounded-md bg-white text-gray-800"
            />
            <input
            type="text"
            placeholder="Dropoff Time"
            value={dropoffTime}
            onChange={(e) => setDropoffTime(e.target.value)}
            className="block w-full px-4 py-2 rounded-md bg-white text-gray-800"
            />
            <select
            value={drivenMethod}
            onChange={(e) => setDrivenMethod(e.target.value)}
            className="block w-full px-4 py-2 rounded-md bg-white text-gray-800"
            >
            <option value="self">Self</option>
            <option value="driver">Driver</option>
            </select>
            <textarea
            placeholder="Pickup Location Address"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="block w-full px-4 py-2 rounded-md bg-white text-gray-800"
            rows="4"
            />
            <textarea
            placeholder="Dropoff Location Address"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            className="block w-full px-4 py-2 rounded-md bg-white text-gray-800"
            rows="4"
            />
        
        
            <button
            type="submit"
            className="bg-white text-red-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
            >
            Create Order
            </button>
        </form>
        </div>
    </div>
  
  );
};

export default ChooseLocation;
