import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardCar from './CardCar';

const CarList = () => {
    const { filterType, filterValue } = useParams();
    const { value } = useParams();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
              
                const response = await axios.get(`http://localhost:3000/api/v1/clients/get-cars/types/${value}`)
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
    }, [filterType, filterValue]);

    if (loading) {
        return <div>Loading cars...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (cars.length === 0) {
        return <div>No cars available.</div>;
    }

    return (
        <div className='grid grid-cols-3 gap-x-7 gap-y-12 p-16'>
            {cars.map((car) => (
                <CardCar key={car._id} car={car} />
            ))}
        </div>
    );
};

export default CarList;
