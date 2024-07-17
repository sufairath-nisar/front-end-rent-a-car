import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './Button'; // Assuming Button component is defined elsewhere
import { format,differenceInDays, formatISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
  pickupDate: Yup.date().required('Pickup date is required'),
  dropoffDate: Yup.date()
    .required('Dropoff date is required')
    .min(Yup.ref('pickupDate'), 'Dropoff date must be after pickup date'),
  // pickupTime: Yup.string().required('Pickup time is required'),
  // dropoffTime: Yup.string().required('Dropoff time is required'),
  pickupTime: Yup.string()
    .required('Pickup time is required')
    .matches(
      /^(9|10|11):[0-5][0-9]\sAM$|^(12|[1-5]):[0-5][0-9]\sPM$|^6:00\sPM$/i,
      'Pickup time must be between 9:00 AM and 6:00 PM'
    ),
  dropoffTime: Yup.string()
    .required('Dropoff time is required')
    .matches(
      /^(9|10|11):[0-5][0-9]\sAM$|^(12|[1-5]):[0-5][0-9]\sPM$|^6:00\sPM$/i,
      'Dropoff time must be between 9:00 AM and 6:00 PM'
    ),
  
  drivenMethod: Yup.string().required('Please select driven method'),
  pickupLocation: Yup.string().required('Pickup location is required'),
  dropoffLocation: Yup.string().required('Dropoff location is required'),
});

const ChooseLocation = ({ onComplete }) => {
  const [car, setCar] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [bookedDates, setBookedDates] = useState([]);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      drivenMethod: 'self',
    },
  });

  const drivenMethod = watch('drivenMethod');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCar = localStorage.getItem('selectedCar');
    if (storedCar) {
      try {
        const carDetails = JSON.parse(storedCar);
        setCar(carDetails);
        if (carDetails.branch) {
          const pickupLocation = `${carDetails.branch.name}, ${carDetails.branch.address}`;
          const dropoffLocation = `${carDetails.branch.name}, ${carDetails.branch.address}`;
          if (initialLoad) {
            setValue('pickupLocation', pickupLocation);
            setValue('dropoffLocation', dropoffLocation);
            setInitialLoad(false);
          }
        }
        fetchBookedDates(carDetails._id); // Fetch booked dates for the car
      } catch (error) {
        console.error('Error parsing car details from Local Storage:', error);
      }
    }
  }, [setValue, initialLoad]);

  const fetchBookedDates = async (carId) => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/clients/get-all-orders');
      const orders = response.data;
  
      // console.log('API Response:', JSON.stringify(orders, null, 2)); // Log the entire response for debugging
      // console.log('Car ID:', carId); // Log the car ID being used for filtering
  
      const filteredOrders = orders.filter(order => {
        if (Array.isArray(order.car)) {
          const isCarMatch = order.car.some(car => car._id === carId);
          // console.log('Checking order:', order._id, 'Car Match:', isCarMatch);
          return isCarMatch;
        }
        return false;
      });
  
      // console.log('Filtered Orders for car ID', carId, ':', JSON.stringify(filteredOrders, null, 2)); // Log the filtered orders
  
      const dates = filteredOrders.map(order => ({
        pickupDate: new Date(order.pickupDate),
        dropoffDate: new Date(order.dropoffDate),
      }));

      // Loop through the dates array and store each date separately
      dates.forEach((date, index) => {
        localStorage.setItem(`pickupDate_${index}`, date.pickupDate.toISOString());
        localStorage.setItem(`dropoffDate_${index}`, date.dropoffDate.toISOString());
      });
  
      // console.log('Booked dates:', JSON.stringify(dates, null, 2)); // Log booked dates for debugging
      setBookedDates(dates);
    } catch (error) {
      console.error('Error fetching booked dates:', error);
    }
  };
  
  

  const onSubmit = async (formData) => {
    try {
      const clientId = localStorage.getItem('clientId');
      if (!clientId) {
        console.error('Client ID is missing');
        return;
      }

    
      const pickupDate = new Date(formData.pickupDate);
      const dropoffDate = new Date(formData.dropoffDate);

      const pricePerMonth = parseFloat(car.pricePerMonth);
      const pricePerWeek = parseFloat(car.pricePerWeek);
      const pricePerDay = parseFloat(car.pricePerDay);
      // Calculate the total payment
      const totalPayment = calculatePayment(pickupDate, dropoffDate, car.pricepermonth, car.priceperweek, car.priceperday);
    

    // Ensure the time zone offset is handled correctly
    const dataToSend = {
      ...formData,
      client: clientId,
      car: car._id,
      pickupDate: formatISO(pickupDate),
      dropoffDate: formatISO(dropoffDate),
      totalPayment,
    };

    console.log('totalPayment', totalPayment)
    localStorage.setItem('totalPayment', JSON.stringify(totalPayment));

   
      // console.log('dataToSend', dataToSend);

      const response = await axios.post('http://localhost:3000/api/v1/clients/create-order', dataToSend, {
        withCredentials: true,
      });

      console.log('Order created:', response.data);
      if (onComplete && typeof onComplete === 'function') {
        onComplete();
      }

      if (response && response.status === 200) {
        localStorage.setItem('orderId', response.data._id);
        navigate('/booking/payment'); // Navigate to payment page on success
      } else {
        console.log('Booking failed:', response);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const calculatePayment = (pickupDate, dropoffDate, pricePerMonth, pricePerWeek, pricePerDay) => {
    // Ensure dates are valid Date objects
    pickupDate = new Date(pickupDate);
    dropoffDate = new Date(dropoffDate);

    console.log('pickupDate',pickupDate);
    console.log('dropoffDate',dropoffDate);
    console.log('pricePerDay',pricePerDay);
    console.log('pricePerWeek',pricePerWeek);
    console.log('pricePerMonth',pricePerMonth);

    const totalDays = Math.ceil((dropoffDate - pickupDate) / (1000 * 60 * 60 * 24)); // More accurate calculation using milliseconds

    const months = Math.floor(totalDays / 30);
    const weeks = Math.floor((totalDays % 30) / 7);
    const days = totalDays % 7;

    const totalPayment = (months * pricePerMonth) + (weeks * pricePerWeek) + (days * pricePerDay);
    return totalPayment;
};

  const handleDrivenMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setValue('drivenMethod', selectedMethod);

    if (selectedMethod === 'self' && car && car.branch) {
      const pickupLocation = `${car.branch.name}, ${car.branch.address}`;
      setValue('pickupLocation', pickupLocation);
      setValue('dropoffLocation', pickupLocation);
    }
  };

  const isFutureDate = (date) => {
    return date > new Date();
  };

  const filterDropoffDates = (date) => {
    return date > watch('pickupDate');
  };

  const handleSaveAndContinue = () => {
    handleSubmit(onSubmit)();
  };

  // Function to flatten booked dates into an array of individual dates
  const getBookedDatesArray = () => {
    const allBookedDates = bookedDates.flatMap(bookedDate => {
      const dates = [];
      for (let d = new Date(bookedDate.pickupDate); d <= bookedDate.dropoffDate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d)); // Create a new Date object for each iteration
      }
      // console.log('Processing date:', dates); // Log each date being processed
      return dates;
    });
    // console.log('All booked dates as individual dates:', allBookedDates);
    return allBookedDates;
  };
  


  return (
    <div className="pb-16 pt-36">
      <h2 className="font-semibold mb-4 text-center">Choose your <span className="text-red-700">Date and Time</span></h2>
      <div className="max-w-2xl mx-auto mt-10 p-12 shadow-xl shadow-red-700 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-3">
          <div className="flex mb-10 justify-center items-center">
            <input
              type="radio"
              id="self"
              name="drivenMethod"
              value="self"
              {...register('drivenMethod')}
              className="appearance-none w-3 h-3 border border-gray-500 rounded-full cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-red-400 focus:outline-none checked:bg-red-700 checked:ring-2 checked:ring-offset-2 checked:ring-red-700 checked:border-red-700 mr-2"
              onChange={handleDrivenMethodChange}
            />
            <label htmlFor="self" className="block text-sm font-medium text-gray-900 mr-6">
              Self drive
            </label>
            <input
              type="radio"
              id="driver"
              name="drivenMethod"
              value="driver"
              {...register('drivenMethod')}
              className="appearance-none w-3 h-3 border border-gray-500 rounded-full cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-red-400 focus:outline-none checked:bg-red-700 checked:ring-2 checked:ring-offset-2 checked:ring-red-700 checked:border-red-700 mr-2"
              onChange={handleDrivenMethodChange}
            />
            <label htmlFor="driver" className="block text-sm font-medium text-gray-900">
              By driver
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 mb-10 gap-10">
            <div>
              <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-900 mb-3">Pickup Date</label>
              <DatePicker
                id="pickupDate"
                selected={watch('pickupDate')}
                onChange={date => setValue('pickupDate', date)}
                placeholderText="Pickup Date"
                className="block py-2 w-64 border bg-red-50 px-2 p text-sm text-gray-900 border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                dateFormat="dd-MM-yyyy"
                minDate={new Date()}
                filterDate={isFutureDate}
                excludeDates={getBookedDatesArray()}
              />
              {errors.pickupDate && <p className="text-red-500">{errors.pickupDate.message}</p>}
            </div>
            <div>
              <label htmlFor="dropoffDate" className="block text-sm font-medium text-gray-900 mb-3">Dropoff Date</label>
              <DatePicker
                id="dropoffDate"
                selected={watch('dropoffDate')}
                onChange={date => setValue('dropoffDate', date)}
                placeholderText="Dropoff Date"
                className="block py-2 w-64 border bg-red-50 px-2 p text-sm text-gray-900 border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                dateFormat="dd-MM-yyyy"
                minDate={watch('pickupDate')}
                filterDate={filterDropoffDates}
                excludeDates={getBookedDatesArray()}
              />
              {errors.dropoffDate && <p className="text-red-500">{errors.dropoffDate.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 mb-10 gap-10">
          <div>
    <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-900 mb-3">Pickup Time</label>
    <input
      type="text"
      id="pickupTime"
      placeholder="Enter pickup time (hh:mm AM/PM)"
      className="block w-full border bg-red-50 px-2 py-1.5 text-sm text-gray-900 border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
      {...register('pickupTime')}
    />
    {errors.pickupTime && <p className="text-red-500">{errors.pickupTime.message}</p>}
  </div>
  <div>
    <label htmlFor="dropoffTime" className="block text-sm font-medium text-gray-900 mb-3">Dropoff Time</label>
    <input
      type="text"
      id="dropoffTime"
      placeholder="Enter dropoff time (hh:mm AM/PM)"
      className="block w-full border bg-red-50 px-2 py-1.5 text-sm text-gray-900 border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
      {...register('dropoffTime')}
    />
    {errors.dropoffTime && <p className="text-red-500">{errors.dropoffTime.message}</p>}
  </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 mb-10 gap-10">
            <div>
              <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-900 mb-3">Pickup Location</label>
              <textarea
                id="pickupLocation"
                placeholder="Enter your pickup location address"
                className="block w-full border bg-red-50 px-2 py-1.5 text-sm text-gray-900 border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                {...register('pickupLocation')}
                readOnly={drivenMethod === 'self'}
              />
              {errors.pickupLocation && <p className="text-red-500">{errors.pickupLocation.message}</p>}
            </div>
            <div>
              <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-900 mb-3">Dropoff Location</label>
              <textarea
                id="dropoffLocation"
                placeholder="Enter your dropoff location address"
                className="block w-full border bg-red-50 px-2 py-1.5 text-sm text-gray-900 border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                {...register('dropoffLocation')}
                readOnly={drivenMethod === 'self'}
              />
              {errors.dropoffLocation && <p className="text-red-500">{errors.dropoffLocation.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-center pt-8">
            <Button text="Save & Continue" onClick={handleSaveAndContinue} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChooseLocation;
