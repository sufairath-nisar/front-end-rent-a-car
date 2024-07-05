import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CardCar from './CardCar';
import Pagination from './Pagination';

const capitalizeFirstLetter = (str) => {
    const formattedStr = str.replace(/-/g, ' ');
    return formattedStr.charAt(0).toUpperCase() + formattedStr.slice(1);
};

const CarList = () => {
    const { value } = useParams();
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 6;

    const [filters, setFilters] = useState({
        priceMin: '',
        priceMax: '',
        kmMin: '',
        kmMax: '',
    });

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/clients/get-cars/types/${value}`);
                console.log('Fetched cars:', response.data);
                setCars(response.data);
                setFilteredCars(response.data); // Set initial filtered cars
            } catch (error) {
                console.error('Error fetching cars:', error);
                setError(error.response ? error.response.data : 'Error fetching cars');
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [value]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const applyFilters = () => {
        console.log('Applying filters:', filters);

        let filtered = cars;

        if (filters.priceMin) {
            filtered = filtered.filter(car => car.priceperday >= parseFloat(filters.priceMin));
            console.log(`Filtered by priceMin (${filters.priceMin}):`, filtered);
        }
        if (filters.priceMax) {
            filtered = filtered.filter(car => car.priceperday <= parseFloat(filters.priceMax));
            console.log(`Filtered by priceMax (${filters.priceMax}):`, filtered);
        }
        if (filters.kmMin) {
            filtered = filtered.filter(car => car.km >= parseFloat(filters.kmMin));
            console.log(`Filtered by kmMin (${filters.kmMin}):`, filtered);
        }
        if (filters.kmMax) {
            filtered = filtered.filter(car => car.km <= parseFloat(filters.kmMax));
            console.log(`Filtered by kmMax (${filters.kmMax}):`, filtered);
        }

        setFilteredCars(filtered);
        setCurrentPage(1); // Reset to first page after applying filters

        console.log('Filtered cars:', filtered);
    };

    if (loading) {
        return <div className='flex justify-center h-64 items-center italic text-red-700'>Loading cars...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    return (
        <div className='section-carList text-center pt-32 pb-16'>
            <h2 className='text-red-700 font-semibold pt-2'>{capitalizeFirstLetter(value)} Cars</h2>
            <div className="pb-5 flex justify-center pt-4 md:pt-0 md:justify-end md:mr-16">
                <div className="flex items-center">
                    <div tabIndex={0} role="button" className="dropdown dropdown-left btn m-1">
                        <div className="btn">Filter</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-96 p-4 shadow-lg">
                            <div>
                                <div className="mb-2">
                                    <h3 className="font-semibold mb-1">Price (per day)</h3>
                                    <div className="flex space-x-2">
                                        <input
                                            type="number"
                                            name="priceMin"
                                            value={filters.priceMin}
                                            onChange={handleFilterChange}
                                            placeholder="Min"
                                            className="input input-bordered w-full"
                                        />
                                        <input
                                            type="number"
                                            name="priceMax"
                                            value={filters.priceMax}
                                            onChange={handleFilterChange}
                                            placeholder="Max"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <h3 className="font-semibold mb-1">KM</h3>
                                    <div className="flex space-x-2">
                                        <input
                                            type="number"
                                            name="kmMin"
                                            value={filters.kmMin}
                                            onChange={handleFilterChange}
                                            placeholder="Min"
                                            className="input input-bordered w-full"
                                        />
                                        <input
                                            type="number"
                                            name="kmMax"
                                            value={filters.kmMax}
                                            onChange={handleFilterChange}
                                            placeholder="Max"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                </div>
                                {/* <div className="flex gap-x-2 mt-4">
                                    <div className="flex-1 mb-1">
                                        <input
                                            type="number"
                                            name="passengersCapacity"
                                            value={filters.passengersCapacity}
                                            onChange={handleFilterChange}
                                            placeholder="Passengers Capacity"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="flex-1 mb-1">
                                        <input
                                            type="number"
                                            name="doors"
                                            value={filters.doors}
                                            onChange={handleFilterChange}
                                            placeholder="Doors"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="flex-1 mb-1">
                                        <input
                                            type="number"
                                            name="seats"
                                            value={filters.seats}
                                            onChange={handleFilterChange}
                                            placeholder="Seats"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                </div> */}
                            </div>
                            <button onClick={applyFilters} className="btn btn-primary mt-2">Apply Filters</button>
                        </ul>
                    </div>
                    <Link to="/cars/all-cars" className="cursor-pointer text-red-700 btn-link px-3 gap-2 font-semibold text-base">
                        View All Cars
                    </Link>
                </div>
            </div>

            {filteredCars.length === 0 ? (
                <div className='flex justify-center md:h-64 items-center'>
                    <h3 className='justify-center items-center text-red-700'>No cars available</h3>
                </div>
            ) : (
                <div className='grid md:grid-cols-3 grid-cols-1 gap-x-2 md:gap-x-7 gap-y-12 pb-16 px-5 md:px-16'>
                    {currentCars.map((car) => (
                        <CardCar key={car._id} car={car} />
                    ))}
                </div>
            )}

            <div className='grid grid-rows-1 justify-center'>
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageClick={handlePageClick} />
            </div>
        </div>
    );
};

export default CarList;
