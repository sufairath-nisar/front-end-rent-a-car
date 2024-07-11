import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './Button';

// Yup schema for form validation
const schema = Yup.object().shape({
  pickupDate: Yup.date().required('Pickup date is required'),
  dropoffDate: Yup.date().required('Dropoff date is required'),
  pickupTime: Yup.string().required('Pickup time is required'),
  dropoffTime: Yup.string().required('Dropoff time is required'),
  drivenMethod: Yup.string().required('Please select driven method'),
  pickupLocation: Yup.string().required('Pickup location is required'),
  dropoffLocation: Yup.string().required('Dropoff location is required'),
});

// Function to format the date as YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const ChooseLocation = ({ onComplete }) => {
  const [car, setCar] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      drivenMethod: 'self',
    },
  });

  const drivenMethod = watch('drivenMethod');

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
      } catch (error) {
        console.error('Error parsing car details from Local Storage:', error);
      }
    }
  }, [setValue, initialLoad]);

  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);

//   const removeTimeFromDate = (dateString) => {
//   return dateString.split('T')[0];
// };

  const handlePickupDateChange = (date) => {
    setPickupDate(date);
    // setValue('pickupDate', removeTimeFromDate(date.toISOString()));
    setValue('pickupDate', date); // Set value for form validation
    if (!dropoffDate || date > dropoffDate) {
      setDropoffDate(new Date(date.getTime()));
      setValue('dropoffDate', new Date(date.getTime())); // Set value for form validation
    }
  };

  const handleDropoffDateChange = (date) => {
    setDropoffDate(date);
    setValue('dropoffDate', date); // Set value for form validation
  };

  const onSubmit = async (formData) => {
    try {
      const clientId = localStorage.getItem('clientId');
      if (!clientId) {
        console.error('Client ID is missing');
        return;
      }

      const dataToSend = {
        ...formData,
        client: clientId,
        car: car._id,
        pickupDate: formatDate(formData.pickupDate),
        dropoffDate: formatDate(formData.dropoffDate),
      };
      console.log('dataToSend', dataToSend);

      const response = await axios.post('http://localhost:3000/api/v1/clients/create-order', dataToSend, {
        withCredentials: true,
      });
      console.log('Order created:', response.data);
      onComplete();
      // If you have a navigate function to go to the next page, you should call it here
      // navigate('/booking/payment');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleDrivenMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setValue('drivenMethod', selectedMethod);

    if (selectedMethod === 'self' && car && car.branch) {
      const pickupLocation = `${car.branch.name}, ${car.branch.address}`;
      setValue('pickupLocation', pickupLocation);
      const dropoffLocation = `${car.branch.name}, ${car.branch.address}`;
      setValue('dropoffLocation', dropoffLocation);
    }
  };

  const isFutureDate = (date) => {
    return date > new Date();
  };

  const filterDropoffDates = (date) => {
    return date > pickupDate;
  };

  const handleSaveAndContinue = () => {
    handleSubmit(onSubmit)();
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
                selected={pickupDate}
                onChange={handlePickupDateChange}
                placeholderText="Pickup Date"
                className="block py-2 w-64 border bg-red-50 px-2 p text-sm text-gray-900 border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                dateFormat="dd-MM-yyyy"
                minDate={new Date()}
                filterDate={isFutureDate}
              />
              {errors.pickupDate && <p className="text-red-500">{errors.pickupDate.message}</p>}
            </div>
            <div>
              <label htmlFor="dropOffDate" className="block text-sm font-medium text-gray-900 mb-3">Dropoff Date</label>
              <DatePicker
                id="dropOffDate"
                selected={dropoffDate}
                onChange={handleDropoffDateChange}
                placeholderText="Dropoff Date"
                className="block w-64 py-2 border bg-red-50 px-2 p text-sm text-gray-900 border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                dateFormat="dd-MM-yyyy"
                minDate={pickupDate}
                filterDate={filterDropoffDates}
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
                placeholder="Enter pickup time"
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
                placeholder="Enter dropoff time"
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
