import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button'; // Assuming Button component is defined
import { IoLocationSharp, IoCallSharp } from 'react-icons/io5'; // Import Ionicons from react-icons

const OurLocations = () => {
  const [locations, setLocations] = useState([]); // All locations (initially empty)
  const [filteredLocations, setFilteredLocations] = useState([]); // Locations for current filter
  const [selectedCity, setSelectedCity] = useState('DUBAI'); // Default selected city
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cityOptions = ['DUBAI', 'ABUDHABI', 'SHARJAH', 'AJMAN', 'UMM AL QUWAIN', 'RAS AL KHAIMAH']; // City buttons

  useEffect(() => {
    const fetchAllBranches = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3000/api/v1/clients/branches'); // Assuming this endpoint returns all branches
        console.log('All branches fetched:', response.data);

        // Ensure response.data is an array of objects with name and address properties
        if (!Array.isArray(response.data)) {
          console.error('API response is not an array of objects.');
          setError(new Error('Invalid data format from API'));
          return; // Exit if data format is invalid
        }

        setLocations(response.data);
        // Set default filtered locations to Dubai branches
        const defaultFiltered = response.data.filter(
          (location) => location.address && location.address.toUpperCase().includes('DUBAI')
        );
        setFilteredLocations(defaultFiltered);
      } catch (error) {
        console.error('Error fetching all branches:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllBranches();
  }, []);

  const handleCityButtonClick = (cityName) => {
    setSelectedCity(cityName); // Set the selected city
    const filtered = locations.filter(
      (location) => location.address && location.address.toUpperCase().includes(cityName.toUpperCase())
    ); // Filter by city (case-insensitive)
    setFilteredLocations(filtered);
  };

  return (
    <div className="our-locations text-center pt-32 pb-16 px-16">
      <h2 className="font-semibold  mb-12">Our <span className='text-red-700'>Locations</span></h2>
      <div className="city-buttons grid grid-cols-1 md:grid-cols-6 gap-4">
        {cityOptions.map((city) => (
          <Button
            key={city}
            text={city}
            onClick={() => handleCityButtonClick(city)}
            className={`w-full md:w-auto mr-2 mb-2 ${selectedCity === city ? 'bg-opacity-75' : ''}`} 
          />
        ))}
      </div>
      {isLoading ? (
        <p className='text-red-700'>Loading locations...</p>
      ) : error ? (
        <p>Error: {error.message || 'An error occurred while fetching locations.'}</p>
      ) : (
        <>
          {filteredLocations.length === 0 ? (
            <p className='pt-8 text-red-700'>No branches available!</p>
          ) : (
            <div className="location-details grid grid-cols-1 md:grid-cols-4 gap-4 text-left pt-14">
         
            {filteredLocations.map((location) => (
              <div key={location._id} className="location-item flex flex-col"> 
                <p className='text-red-700  mb-2'>{location.name.toUpperCase()}</p>
                <div className="flex items-center mb-2">
                  <IoLocationSharp className="h-5 w-5 mr-2 text-gray-500" /> 
                  <p className="address-text">{location.address}</p> 
                </div>
                <div className="flex items-center"> 
                  <IoCallSharp className="h-5 w-5 mr-2 text-gray-500" /> 
                  <p>{location.ph}</p> 
                </div>
              </div>
            ))}
          </div>
          
          )}
        </>
      )}
    </div>
  );
};

export default OurLocations;
