import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardCar from './CardCar'; 
import Pagination from './Pagination';
import Button from '../clients/Button';
import { Link } from 'react-router-dom';

const AllCars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6; // Number of cars to display per page

  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    kmMin: '',
    kmMax: '',
    pricePerWeekMin: '',
    pricePerWeekMax: '',
    pricePerMonthMin: '',
    pricePerMonthMax: '',
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/clients/get-all-cars');
        console.log('Fetched cars:', response.data);

        if (Array.isArray(response.data)) {
          setCars(response.data);
          setFilteredCars(response.data); // Set initial filtered cars
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

    if (filters.priceMin && filters.priceMin !== '') {
      filtered = filtered.filter(car => car.priceperday >= parseFloat(filters.priceMin));
      console.log(`Filtered by priceMin (${filters.priceMin}):`, filtered);
    }
    if (filters.priceMax && filters.priceMax !== '') {
      filtered = filtered.filter(car => car.priceperday <= parseFloat(filters.priceMax));
      console.log(`Filtered by priceMax (${filters.priceMax}):`, filtered);
    }
    if (filters.kmMin && filters.kmMin !== '') {
      filtered = filtered.filter(car => car.km >= parseFloat(filters.kmMin));
      console.log(`Filtered by kmMin (${filters.kmMin}):`, filtered);
    }
    if (filters.kmMax && filters.kmMax !== '') {
      filtered = filtered.filter(car => car.km <= parseFloat(filters.kmMax));
      console.log(`Filtered by kmMax (${filters.kmMax}):`, filtered);
    }
    if (filters.pricePerWeekMin && filters.pricePerWeekMin !== '') {
      filtered = filtered.filter(car => car.priceperweek >= parseFloat(filters.pricePerWeekMin));
      console.log(`Filtered by pricePerWeekMin (${filters.pricePerWeekMin}):`, filtered);
    }
    if (filters.pricePerWeekMax && filters.pricePerWeekMax !== '') {
      filtered = filtered.filter(car => car.priceperweek <= parseFloat(filters.pricePerWeekMax));
      console.log(`Filtered by pricePerWeekMax (${filters.pricePerWeekMax}):`, filtered);
    }
    if (filters.pricePerMonthMin && filters.pricePerMonthMin !== '') {
      filtered = filtered.filter(car => car.pricepermonth >= parseFloat(filters.pricePerMonthMin));
      console.log(`Filtered by pricePerMonthMin (${filters.pricePerMonthMin}):`, filtered);
    }
    if (filters.pricePerMonthMax && filters.pricePerMonthMax !== '') {
      filtered = filtered.filter(car => car.pricepermonth <= parseFloat(filters.pricePerMonthMax));
      console.log(`Filtered by pricePerMonthMax (${filters.pricePerMonthMax}):`, filtered);
    }

    setFilteredCars(filtered);
    setCurrentPage(1); // Reset to first page after applying filters

    console.log('Filtered cars:', filtered);
  };

  if (loading) {
    return <div className='flex justify-center md:h-64 items-center text-red-700'>Loading cars...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalCars = filteredCars.length;
  const totalPages = Math.ceil(totalCars / carsPerPage);
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <div>
      <h2 className='text-red-700 justify-center text-center pt-32 md:pt-36 font-semibold'>All Cars</h2>

      <div className=" flex justify-center pt-4 md:pt-10 md:justify-end md:mr-16 section-filter">
        <div className="flex items-center h-2">
          <div tabIndex={0} role="button" className="dropdown md:dropdown-left bg-transparent border-none shadow-none btn m-1 hover:bg-transparent hover:text-red-400 px-3 gap-2 font-semibold text-base relative md:pt-0 pt-4">
            <div>
              <Link className="cursor-pointer text-red-700 btn-link px-3 gap-2 font-semibold text-md ">
                Filter
              </Link>
            </div>
            <ul className="dropdown-content menu bg-base-100 rounded-box z-10 w-72 md:w-96 p-6 shadow-xl shadow-red-100 absolute md:static top-10 md:top-auto left-00 md:left-auto right-50 md:right-auto">
              <div>
                <div className="mb-5">
                  <h4 className="font-semibold mb-1 text-red-700">Price per day</h4>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      name="priceMin"
                      value={filters.priceMin}
                      onChange={handleFilterChange}
                      placeholder="Min"
                      className="input input-bordered text-slate-700 rounded-none h-10 w-full focus:outline-none focus:border-red-700 focus:ring-red-700 focus:ring-1"
                    />
                    <input
                      type="number"
                      name="priceMax"
                      value={filters.priceMax}
                      onChange={handleFilterChange}
                      placeholder="Max"
                      className="input input-bordered text-slate-700 rounded-none h-10 w-full focus:outline-none focus:border-red-700 focus:ring-red-700 focus:ring-1"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <h4 className="font-semibold mb-1 text-red-700">Price per week</h4>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      name="pricePerWeekMin"
                      value={filters.pricePerWeekMin}
                      onChange={handleFilterChange}
                      placeholder="Min"
                      className="input input-bordered text-slate-700 rounded-none h-10 w-full focus:outline-none focus:border-red-700 focus:ring-red-700 focus:ring-1"
                    />
                    <input
                      type="number"
                      name="pricePerWeekMax"
                      value={filters.pricePerWeekMax}
                      onChange={handleFilterChange}
                      placeholder="Max"
                      className="input input-bordered text-slate-700 rounded-none h-10 w-full focus:outline-none focus:border-red-700 focus:ring-red-700 focus:ring-1"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <h4 className="font-semibold mb-1 text-red-700">Price per month</h4>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      name="pricePerMonthMin"
                      value={filters.pricePerMonthMin}
                      onChange={handleFilterChange}
                      placeholder="Min"
                      className="input input-bordered text-slate-700 rounded-none h-10 w-full focus:outline-none focus:border-red-700 focus:ring-red-700 focus:ring-1"
                    />
                    <input
                      type="number"
                      name="pricePerMonthMax"
                      value={filters.pricePerMonthMax}
                      onChange={handleFilterChange}
                      placeholder="Max"
                      className="input input-bordered text-slate-700 rounded-none h-10 w-full focus:outline-none focus:border-red-700 focus:ring-red-700 focus:ring-1"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <h4 className="font-semibold mb-1 text-red-700">Kilometers</h4>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      name="kmMin"
                      value={filters.kmMin}
                      onChange={handleFilterChange}
                      placeholder="Min"
                      className="input input-bordered text-slate-700 rounded-none h-10 w-full focus:outline-none focus:border-red-700 focus:ring-red-700 focus:ring-1"
                    />
                    <input
                      type="number"
                      name="kmMax"
                      value={filters.kmMax}
                      onChange={handleFilterChange}
                      placeholder="Max"
                      className="input input-bordered text-slate-700 rounded-none h-10 w-full focus:outline-none focus:border-red-700 focus:ring-red-700 focus:ring-1"
                    />
                  </div>
                </div>
              </div>
              <Button onClick={applyFilters} text="Apply Filters" className="text-base font-medium" />
            </ul>
          </div>
        </div>
      </div>

      {totalCars === 0 && (
        <div className='flex justify-center md:h-64 items-center'>
          <h3 className='justify-center items-center text-red-700'>No cars available</h3>
        </div>
      )}

      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-2 md:gap-x-7 gap-y-12 p-5 md:py-0 md:px-16 pb-16'>
        {currentCars.map((car) => (
          <CardCar key={car._id} car={car} />
        ))}
      </div>
      <div className='grid grid-rows-1 pt-5 md:pt-16 pb-16 justify-center'>
         <Pagination totalPages={totalPages} currentPage={currentPage} onPageClick={handlePageClick} />
      </div>
    </div>
  );
};

export default AllCars;
