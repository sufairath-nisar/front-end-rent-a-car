import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardCar from './CardCar'; 
import Pagination from './Pagination';


const AllCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6; // Number of cars to display per page

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/clients/get-all-cars');
        console.log('Fetched cars:', response.data);

       
        if (Array.isArray(response.data)) {
          setCars(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('Error fetching cars');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className='flex justify-center md:h-64 items-center text-red-700'>Loading cars...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (cars.length === 0) {
    return <div className='flex justify-center md:h-64 items-center'>
      <h3 className='justify-center items-center text-red-700'>No cars available</h3>
      </div>;
  }

  return (
    <div>
      <h2 className='text-red-700 justify-center text-center pt-32 md:pt-36 font-semibold'>All Cars</h2>
      <div className='grid md:grid-cols-3 grid-cols-1 gap-x-2 md:gap-x-7 gap-y-12 p-5 md:px-16 pt-8 pb-16'>
        {currentCars.map((car) => (
          <CardCar key={car._id} car={car} />
        ))}
      </div>
      <div className='grid grid-rows-1 pb-16 justify-center'>
         <Pagination totalPages={totalPages} currentPage={currentPage} onPageClick={handlePageClick} />
      </div>
    </div>
  );
};

export default AllCars;
