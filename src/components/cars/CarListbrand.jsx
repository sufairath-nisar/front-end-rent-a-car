import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardCar from './CardCar';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpShortWide, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';
import Button from '../clients/Button';



const CarListbrand = () => {
    const { value } = useParams();
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]); // For filtered cars
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 6; // Number of cars to display per page

    const [dropdownOpen, setDropdownOpen] = useState(false); 
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false); 
    const [sortOption, setSortOption] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const [filters, setFilters] = useState({
        priceMin: '',
        priceMax: '',
        kmMin: '',
        kmMax: '',
        pricePerWeekMin: '',
        pricePerWeekMax: '',
        pricePerMonthMin: '',
        pricePerMonthMax: '',
        carName: ''
    });

     // Capitalize function remains the same
     const capitalizeFirstLetter = (str) => {
        const formattedStr = str.replace(/-/g, ' ');
        return formattedStr.charAt(0).toUpperCase() + formattedStr.slice(1);
    };

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/clients/get-cars/brand/${value}`);
                
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

      const applyFilters = () => {
        console.log('Applying filters:', filters);
    
        let filtered = cars.filter(car => {
         
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
        applyFilters(); 
      }, [filters]);
    
      useEffect(() => {
        sortCars(filteredCars);
      }, [sortOption, sortOrder]);

    

    const sortCars = (carsToSort) => {
        let sortedCars = [...carsToSort];
        const orderMultiplier = sortOrder === 'asc' ? 1 : -1;
    
        switch (sortOption) {
            case 'carName':
                sortedCars.sort((a, b) => orderMultiplier * a.carName.localeCompare(b.carName));
                break;
            case 'price':
                sortedCars.sort((a, b) => orderMultiplier * (parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay)));
                break;
            case 'km':
                sortedCars.sort((a, b) => orderMultiplier * (parseFloat(a.km) - parseFloat(b.km)));
                break;
            case 'pricePerWeek':
                sortedCars.sort((a, b) => orderMultiplier * (parseFloat(a.pricePerWeek) - parseFloat(b.pricePerWeek)));
                break;
            case 'pricePerMonth':
                sortedCars.sort((a, b) => orderMultiplier * (parseFloat(a.pricePerMonth) - parseFloat(b.pricePerMonth)));
                break;
            default:
                break;
        }
    
        setFilteredCars(sortedCars);
    };


    useEffect(() => {
        applyFilters();
    }, [filters]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
      };
    
      const toggleSortDropdown = () => {
        setSortDropdownOpen(!sortDropdownOpen);
      };
    
     
    
      const handleSortChange = (option) => {
        if (option === sortOption) {
          setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
        } else {
          setSortOption(option);
          setSortOrder('asc'); // Default to ascending order when changing sort option
        }
        setSortDropdownOpen(false);
      };
      
      
      const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
      };
    
    
      const closeDropdown = () => {
        setDropdownOpen(false);
      };
    
      const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
          ...prevFilters,
          [name]: value.trim() // Correct usage: Return the updated state correctly
        }));
      };
      

    if (loading) {
        return <div className='flex justify-center md:h-96 h-64 items-center italic text-red-700'>Loading cars...</div>;
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
        
        <div className='section-carList text-center pt-32 pb-16'>
        <h2 className='text-red-700 font-semibold pt-2'>{capitalizeFirstLetter(value)} Cars</h2>
        <div className=" flex justify-center pt-4  md:justify-end md:mr-16 section-filter">

            <div className="flex w-1/2 justify-center  md:ml-16 pt-2 md:pt-0 md:justify-start ">
                <Link to="/cars/all-cars" className="cursor-pointer">
                    <Button text="View All Cars >>" className="mb-0 mt-2"/>
                </Link>
            </div>
                   

            <div className="flex items-center  w-1/2 md:justify-end ">
                <div tabIndex={0} role="button" className="dropdown md:dropdown-left bg-transparent border-none shadow-none btn m-1 hover:bg-transparent hover:text-red-400 pr-0 font-semibold text-base relative pt-4 md:pt-6">
                <div>
                <Link className="cursor-pointer text-red-700 btn-link px-3 gap-2 font-semibold text-md" onClick={toggleDropdown}>
                    Filter
                </Link>
                </div>
                    {dropdownOpen && (
                    <ul className="dropdown-content menu bg-base-100 rounded-box z-10 w-72 md:w-96 md:p-8 p-6 shadow-xl shadow-red-100 absolute md:static top-10 md:top-auto left-0 md:left-auto right-0 md:right-auto">
                        <div>
                    
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


                <div tabIndex={0} role="button" className="dropdown md:dropdown-left bg-transparent border-none shadow-none btn pr-0 hover:bg-transparent hover:text-red-400  font-semibold text-base relative pt-4 md:pt-6">
                    <div>
                    <Link className="cursor-pointer text-red-700 btn-link px-3 gap-2 font-semibold text-md" onClick={toggleSortDropdown}>
                        Sort by
                    </Link>
                    </div>
                    {sortDropdownOpen && (
                    <div className="dropdown-content menu bg-base-100 rounded-box w-52 px-6 pt-4 pb-4 shadow-xl shadow-red-200 z-10 absolute">
                        
                        <ul className='text-start'>
                            <li className={`menu-item py-2 ${sortOption === 'carName' ? 'text-red-700' : 'text-slate-600 hover:text-red-700'}`} onClick={() => handleSortChange('carName')}>Car Model </li>  
                            <li className={`menu-item py-2 ${sortOption === 'km' ? 'text-red-700' : 'text-slate-600 hover:text-red-700'}`} onClick={() => handleSortChange('km')}>Kilometers</li>
                            <li className={`menu-item py-2 ${sortOption === 'price' ? 'text-red-700' : 'text-slate-600 hover:text-red-700'}`} onClick={() => handleSortChange('price')}>Price Per Day</li>
                            <li className={`menu-item py-2 ${sortOption === 'pricePerWeek' ? 'text-red-700' : 'text-slate-600 hover:text-red-700'}`} onClick={() => handleSortChange('pricePerWeek')}>Price Per Week</li>
                            <li className={`menu-item py-2 ${sortOption === 'pricePerMonth' ? 'text-red-700' : 'text-slate-600 hover:text-red-700'}`} onClick={() => handleSortChange('pricePerMonth')}>Price Per Month</li>
                        </ul>

                        <div className="flex justify-end cursor-pointer" onClick={toggleSortOrder}>
                        {sortOrder === 'asc' ? (
                            <FontAwesomeIcon icon={faArrowUpShortWide} className="text-red-700 text-xl" />
                        ) : (
                            <FontAwesomeIcon icon={faArrowDownWideShort} className="text-red-700 text-xl" />
                        )}
                        </div>
                    </div>
                    )}
                    
                </div>

            </div>
    
                {/* <div className='md:pt-0 pb-6'>
                    <Link to="/cars/all-cars" className="cursor-pointer text-red-700 btn-link px-3 gap-2  font-semibold text-base">
                            View All Cars
                    </Link>
                </div> */}

          
            
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

export default CarListbrand;
