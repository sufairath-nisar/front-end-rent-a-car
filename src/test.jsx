import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';

const OurLocations = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/clients/') // Adjust URL as per your backend setup
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  const handleSearch = () => {
    axios.get(`http://localhost:3000/api/v1/clients/search/byAddress?address=${searchQuery}`)
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error searching locations:', error);
      });
  };

  const handleButtonClick = (locationName) => {
    const location = locations.find(loc => loc.name === locationName);
    setSelectedLocation(location);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Our Locations</h2>
      <div className="mb-4">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Search by address" 
          className="border p-2 rounded mr-2"
        />
        <Button text="Search" onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded" />
      </div>
      <div className="button-group grid grid-cols-1 md:grid-cols-6 gap-2 mb-4">
        {locations.map((location, index) => (
          <Button 
            key={index} 
            text={location.name} 
            onClick={() => handleButtonClick(location.name)}
            className="w-full md:w-auto"
          />
        ))}
      </div>
      {selectedLocation && (
        <div className="location-details p-4 border border-gray-200 rounded shadow-sm">
          <h3 className="text-xl font-semibold mb-2">{selectedLocation.name}</h3>
          <p className="mb-1"><strong>Address:</strong> {selectedLocation.address}</p>
          <p><strong>Phone:</strong> {selectedLocation.ph}</p>
        </div>
      )}
    </div>
  );
};

export default OurLocations;
