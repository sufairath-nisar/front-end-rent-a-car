import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardCar from './CardCar';


const capitalizeFirstLetter = (str) => {
    // Remove hyphens and replace with spaces
    const formattedStr = str.replace(/-/g, ' ');
    // Capitalize first letter
    return formattedStr.charAt(0).toUpperCase() + formattedStr.slice(1);
};

const CarList = () => {
    const { value } = useParams();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/clients/get-cars/types/${value}`);
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
    }, [value]); // Ensure the effect runs whenever 'value' changes

    if (loading) {
        return <div className='text-red-700 p-5'>Loading cars...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // if (cars.length === 0) {
    //     return <div>No cars available.</div>;
    // }

    return (
        
        <div className='section-carList text-center py-16'>
            <h2 className='text-red-700 font-semibold'>{capitalizeFirstLetter(value)} Cars</h2>
            {cars.length === 0 ? (
                    <div className='flex justify-center md:h-60 items-center'>
                        <h3 className='text-red-700 font-medium '>No cars available</h3>
                    </div>
                ) : (
                    <div className='grid grid-cols-3 gap-x-7 gap-y-12 p-16'>
                        {cars.map((car) => (
                            <CardCar key={car._id} car={car} />
                        ))}
                    </div>
                )}
        </div>
        
       
    );
};

export default CarList;
