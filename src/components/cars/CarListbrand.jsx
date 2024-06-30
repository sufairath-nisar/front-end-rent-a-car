import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardCar from './CardCar';
import Pagination from './Pagination';



const capitalizeFirstLetter = (str) => {
    // Remove hyphens and replace with spaces
    const formattedStr = str.replace(/-/g, ' ');
    // Capitalize first letter
    return formattedStr.charAt(0).toUpperCase() + formattedStr.slice(1);
};

const CarListbrand = () => {
    const { value } = useParams();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 6; // Number of cars to display per page

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/clients/get-cars/brand/${value}`);
                
                console.log('Fetched cars:', response.data);
                setCars(response.data);

                
            } catch (error) {
                console.error('Error fetching cars:', error);
                setError(error.response ? error.response.data : 'Error fetching cars');
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [value]); 

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

    // if (cars.length === 0) {
    //     return <div>No cars available.</div>;
    // }

    return (
        
        <div className='section-carList text-center pt-32 pb-16'>
            <h2 className='text-red-700 font-semibold'>{capitalizeFirstLetter(value)} Cars</h2>
            {cars.length === 0 ? (
                    <div className='flex justify-center md:h-64 items-center'>
                         <h3 className='justify-center items-center text-red-700'>No cars available</h3>
                    </div>
                ) : (
                    <div className='grid md:grid-cols-3 grid-cols-1 gap-x-2 md:gap-x-7 gap-y-12 pb-16 pt-12 px-5 md:px-16'>
                        {currentCars.map((car) => (
                            <CardCar key={car._id} car={car} />
                        ))}
                    </div>
                )}

            <div className='grid grid-rows-1  justify-center'>
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageClick={handlePageClick} />
            </div>
        </div>
         
    );
};

export default CarListbrand;
