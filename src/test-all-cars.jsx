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

  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false); // State to manage sort dropdown visibility
  const [sortOption, setSortOption] = useState(false);

  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    kmMin: '',
    kmMax: '',
    pricePerWeekMin: '',
    pricePerWeekMax: '',
    pricePerMonthMin: '',
    pricePerMonthMax: '',
    brand: '',
    carName: ''
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

  const applyFilters = () => {
    console.log('Applying filters:', filters);

    let filtered = cars.filter(car => {
      // Filter by price, km, price per week, price per month
      if (filters.priceMin && parseFloat(car.priceperday) < parseFloat(filters.priceMin)) {
        return false;
      }
      if (filters.priceMax && parseFloat(car.priceperday) > parseFloat(filters.priceMax)) {
        return false;
      }
      if (filters.kmMin && parseFloat(car.km) < parseFloat(filters.kmMin)) {
        return false;
      }
      if (filters.kmMax && parseFloat(car.km) > parseFloat(filters.kmMax)) {
        return false;
      }
      if (filters.pricePerWeekMin && parseFloat(car.priceperweek) < parseFloat(filters.pricePerWeekMin)) {
        return false;
      }
      if (filters.pricePerWeekMax && parseFloat(car.priceperweek) > parseFloat(filters.pricePerWeekMax)) {
        return false;
      }
      if (filters.pricePerMonthMin && parseFloat(car.pricepermonth) < parseFloat(filters.pricePerMonthMin)) {
        return false;
      }
      if (filters.pricePerMonthMax && parseFloat(car.pricepermonth) > parseFloat(filters.pricePerMonthMax)) {
        return false;
      }

      // Filter by brand (case insensitive and partial match)
      if (filters.brand) {
        const lowercaseBrandFilter = filters.brand.trim().toLowerCase().replace(/\s+/g, '');
        console.log(lowercaseBrandFilter);
        const lowercaseCarBrand = typeof car.brand === 'string' ? car.brand.trim().toLowerCase().replace(/\s+/g, '') : '';
        console.log(lowercaseCarBrand);
        if (lowercaseBrandFilter && !lowercaseCarBrand.includes(lowercaseBrandFilter)) {
          return false;
        }
      }
      
      // Filter by carName (case insensitive and exact match without spaces)
      const trimmedCarNameFilter = filters.carName.trim().toLowerCase().replace(/\s+/g, '');
      const trimmedCar = car.carName.trim().toLowerCase().replace(/\s+/g, '');
      
      if (trimmedCarNameFilter && trimmedCarNameFilter !== trimmedCar) {
        return false;
      }

      return true;
    });

    setFilteredCars(filtered);
    setCurrentPage(1); // Reset to first page after applying filters
    sortCars(filtered); // Sort cars after filtering

    console.log('Filtered cars:', filtered);
  };

  useEffect(() => {
    applyFilters(); // Apply filters whenever the filter state changes
  }, [filters]);

  useEffect(() => {
    sortCars(filteredCars); // Sort cars whenever the sort option changes
  }, [sortOption]);

  // const sortCars = (carsToSort) => {
  //   let sortedCars = [...carsToSort];
  //   switch (sortOption) {
  //     case 'carNameAsc':
  //       sortedCars.sort((a, b) => a.carName.localeCompare(b.carName));
  //       break;
  //     case 'carNameDesc':
  //       sortedCars.sort((a, b) => b.carName.localeCompare(a.carName));
  //       break;
  //     default:
  //       break;
  //   }
  //   setFilteredCars(sortedCars);
  // };


  const sortCars = (carsToSort) => {
    let sortedCars = [...carsToSort];
    switch (sortOption) {
      case 'carNameAsc':
        sortedCars.sort((a, b) => a.carName.localeCompare(b.carName));
        break;
      case 'carNameDesc':
        sortedCars.sort((a, b) => b.carName.localeCompare(a.carName));
        break;
      case 'priceAsc':
        sortedCars.sort((a, b) => parseFloat(a.priceperday) - parseFloat(b.priceperday));
        break;
      case 'priceDesc':
        sortedCars.sort((a, b) => parseFloat(b.priceperday) - parseFloat(a.priceperday));
        break;
      case 'kmAsc':
        sortedCars.sort((a, b) => parseFloat(a.km) - parseFloat(b.km));
        break;
      case 'kmDesc':
        sortedCars.sort((a, b) => parseFloat(b.km) - parseFloat(a.km));
        break;
      case 'pricePerWeekAsc':
        sortedCars.sort((a, b) => parseFloat(a.priceperweek) - parseFloat(b.priceperweek));
        break;
      case 'pricePerWeekDesc':
        sortedCars.sort((a, b) => parseFloat(b.priceperweek) - parseFloat(a.priceperweek));
        break;
      case 'pricePerMonthAsc':
        sortedCars.sort((a, b) => parseFloat(a.pricepermonth) - parseFloat(b.pricepermonth));
        break;
      case 'pricePerMonthDesc':
        sortedCars.sort((a, b) => parseFloat(b.pricepermonth) - parseFloat(a.pricepermonth));
        break;
      default:
        break;
    }
    setFilteredCars(sortedCars);
  };
  

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSortDropdown = () => {
    setSortDropdownOpen(!sortDropdownOpen);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setSortDropdownOpen(false);
  };

  // const handleSortChange = (option) => {
  //   setSortOption(option);
  //   setSortDropdownOpen(false);
  //   sortCars(filteredCars); // Sort cars when sort option changes
  // };

  // const handleSortChange = (option) => {
  //   setSortOption(option);
  //   sortCars(filteredCars); // Call sortCars directly here
  // };

  // const handleSortChange = (option) => {
  //   setSortOption(option);
  // };
  

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value.trim() // Trim whitespace
    }));
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
              <Link className="cursor-pointer text-red-700 btn-link px-3 gap-2 font-semibold text-md" onClick={toggleDropdown}>
                Filter
              </Link>
            </div>
            {dropdownOpen && (
              <ul className="dropdown-content menu bg-base-100 rounded-box z-10 w-72 md:w-96 p-6 shadow-xl shadow-red-100 absolute md:static top-10 md:top-auto left-0 md:left-auto right-0 md:right-auto">
                <div>
                  <div className="mb-5">
                    <h4 className="font-semibold mb-1 text-red-700">Brand</h4>
                    <input
                      type="text"
                      name="brand"
                      value={filters.brand}
                      onChange={handleFilterChange}
                      placeholder="Brand"
                      className="input input-bordered text-slate-700 rounded-none h-10 w-full focus:outline-none focus:border-red-700 focus:ring-red-700 focus:ring-1"
                    />
                  </div>
                  <div className="mb-5">
                    <h4 className="font-semibold mb-1 text-red-700">Car Model</h4>
                    <input
                      type="text"
                      name="carName"
                      value={filters.carName}
                      onChange={handleFilterChange}
                      placeholder="Car Name"
                      className="input input-bordered text-slate-700 rounded-none h-10 w-full focus:outline-none focus:border-red-700 focus:ring-red-700 focus:ring-1"
                    />
                  </div>

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
                <Button onClick={closeDropdown} text="Apply Filters" className="text-base font-medium" />
                {/* <Button onClick={closeDropdown} text="Close" /> */}
              </ul>
            )}
          </div>


          <div tabIndex={0} role="button" className="dropdown md:dropdown-left bg-transparent border-none shadow-none btn m-1 hover:bg-transparent hover:text-red-400 px-3 gap-2 font-semibold text-base relative md:pt-0 pt-4">
            <div>
              <Link className="cursor-pointer text-red-700 btn-link px-3 gap-2 font-semibold text-md" onClick={toggleSortDropdown}>
                Sort
              </Link>
            </div>
            {sortDropdownOpen && (
              <ul className="dropdown-content menu bg-base-100 rounded-box z-10 w-72 md:w-96 p-6 shadow-xl shadow-red-100 absolute md:static top-10 md:top-auto left-0 md:left-auto right-0 md:right-auto">
                <li className="mb-2">
                  <button onClick={() => handleSortChange('carNameAsc')}>Sort by Car Name Ascending</button>
                </li>
                <li className="mb-2">
                  <button onClick={() => handleSortChange('carNameDesc')}>Sort by Car Name Descending</button>
                </li>
                <li className="mb-2">
                  <button onClick={() => handleSortChange('kmAsc')}>Sort by km Ascending</button>
                </li>
                <li className="mb-2">
                  <button onClick={() => handleSortChange('kmDesc')}>Sort by km Descending</button>
                </li>
                <li className="mb-2">
                  <button onClick={() => handleSortChange('priceAsc')}>Sort by Price per day Ascending</button>
                </li>
                <li className="mb-2">
                  <button onClick={() => handleSortChange('priceDesc')}>Sort by Price per day Descending</button>
                </li>
                <li className="mb-2">
                  <button onClick={() => handleSortChange('pricePerWeekAsc')}>Sort by Price per week Ascending</button>
                </li>
                <li className="mb-2">
                  <button onClick={() => handleSortChange('pricePerWeekDesc')}>Sort by Price per week  Descending</button>
                </li>
                <li className="mb-2">
                  <button onClick={() => handleSortChange('pricePerMonthAsc')}>Sort by Price per month  Ascending</button>
                </li>
                <li className="mb-2">
                  <button onClick={() => handleSortChange('pricePerMonthDesc')}>Sort by Price per month Descending</button>
                </li>
                
              </ul>
            )}
          </div>
        

          
          {/* <div className='pb-6'>
              <Link className="cursor-pointer text-red-700 btn-link px-3 gap-2 font-semibold text-md md:pt-0 pt-4">
                 Sort
              </Link>
          </div> */}
          
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
