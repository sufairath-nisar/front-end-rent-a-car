import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardCar from './CardCar';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import Button from '../clients/Button';



const CarListSearch = () => {
  const { searchTerm } = useParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6; // Number of cars to display per page

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/clients/search-cars/${searchTerm}`);
        console.log('Fetched cars:', response.data);

        // Check if the response data is an array
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
  }, [searchTerm]);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };


  if (loading) {
    return <div className='flex justify-center h-64 items-center italic text-red-700'>Loading cars...</div>;
  }

  if (error) {
    return <div className='flex justify-center md:h-64 items-center'>
    <h3 className='justify-center items-center text-red-700'>No cars available</h3>
    </div>;;
  }

  if (cars.length === 0) {
    return <div className='flex justify-center md:h-64 items-center'>
    <h3 className='justify-center items-center text-red-700'>No cars available</h3>
    </div>;;
  }

  return (
      <div className='pt-32 '>
        <div className=" md:pb-5 pb-2 flex justify-center pt-2 md:pt-0 md:justify-end md:mr-16">
                <Link to="/cars/all-cars" className="cursor-pointer">
                    <Button text="View All Cars >>" />
                </Link>
         </div>
   
                {cars.length === 0 ? (
                    <div className='flex justify-center md:h-64 items-center'>
                        <h3 className='justify-center items-center text-red-700'>No cars available</h3>
                    </div>
                ) : (
                    <div className='grid md:grid-cols-3 grid-cols-1 md:gap-x-7 md:gap-y-12 gap-y-6 pt-6 px-6 md:pt-2 md:pb-16 md:px-16 pb-10'>
                        {currentCars.map((car) => (
                            <CardCar key={car._id} car={car} />
                        ))}
                    </div>
                )}

                <div className='grid grid-rows-1 pb-16 justify-center'>
                     <Pagination totalPages={totalPages} currentPage={currentPage} onPageClick={handlePageClick} />
                </div>
     
      </div>
  );
};

export default CarListSearch;
