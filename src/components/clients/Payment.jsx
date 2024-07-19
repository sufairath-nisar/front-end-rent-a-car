import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import AlertFail from './AlertFail';
import Alertsuccess from './Alertsuccess';

const Payment = () => {
  const [files, setFiles] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length < 4) {
      setAlertMessage('Please upload all files!');
      setAlertType('fail');
      setShowAlert(true);
      return;
    }

    const orderId = localStorage.getItem('orderId');
    const clientEmail = localStorage.getItem('clientEmail');
    const totalPayment = JSON.parse(localStorage.getItem('totalPayment'));
    const carDetails = JSON.parse(localStorage.getItem('selectedCar'));
    const pickupDate = localStorage.getItem('pickupDate_0');
    const dropoffDate = localStorage.getItem('dropoffDate_0');

    if (!orderId) {
      setAlertMessage('Order ID is missing.');
      setAlertType('fail');
      setShowAlert(true);
      return;
    }

    const carName = carDetails?.carName;
    const branchName = carDetails?.branch?.name; // Assuming branch object has a name property

    const formData = new FormData();
    for (let file of files) {
      formData.append('files', file);
    }
    formData.append('paymentMethod', paymentMethod);
    formData.append('order', orderId);
    formData.append('clientEmail', clientEmail);

    try {
      const response = await axios.post("http://localhost:3000/api/v1/clients/add-payment", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (response.data.paymentMethod === 'cash') {
        setAlertMessage(`Your booking is confirmed! You have selected cash on delivery and will need to pay ${totalPayment} AED when you pick up the car. For more details check your email!`);
        setAlertType('success');
        setShowAlert(true);

        // Send confirmation email
        await sendEmail(clientEmail, orderId, carName, pickupDate, dropoffDate, branchName, totalPayment);

        setTimeout(() => {
          navigate('/client');
        }, 9000);
      } else {
        navigate('/booking/online-payment');
      }

    } catch (error) {
      console.error('Failed to submit payment', error.response || error.message || error);
      setAlertMessage(`Failed to submit payment: ${error.response?.data || error.message || 'Unknown error'}`);
      setAlertType('fail');
      setShowAlert(true);
    }
  };

  const sendEmail = async (clientEmail, orderId, carName, pickupDate, dropoffDate, branchName, totalPayment) => {
    const emailData = {
      clientEmail,
      subject: "Booking Confirmation",
      text: `Your booking with Order ID: ${orderId} has been confirmed!
             Car Name: ${carName}
             Pickup Date: ${new Date(pickupDate).toLocaleDateString()}
             Dropoff Date: ${new Date(dropoffDate).toLocaleDateString()}
             Branch Name: ${branchName}
             Total Payment: ${totalPayment} AED`
    };

    try {
      await axios.post("http://localhost:3000/api/v1/clients/send-email", emailData);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email', error.response || error.message || error);
      setAlertMessage(`Failed to send email: ${error.response?.data || error.message || 'Unknown error'}`);
      setAlertType('fail');
      setShowAlert(true);
    }
  };

  return (
    <div className=' pb-16 md:min-h-96 pt-36'>

        <div className='pb-16'>
        <h2 className="font-semibold mb-4 text-center">Payment<span className="text-red-700"> Details</span></h2>
              <div className=' flex justify-center shadow-xl shadow-red-700 rounded-lg max-w-lg mx-auto mt-10 p-7'>
                <form className="form-control w-full max-w-sm text-center pb-10" onSubmit={handleSubmit}>
                  <div className="pb-10">
                    <h4 className='text-red-700 font-semibold pb-2'>Upload</h4>
                    <ul className='list-disc list-inside'>
                      <li>Emirated ID/Visit visa copy</li>
                      <li>Passport front and back page</li>
                      <li>Driving license</li>
                    </ul>
                  </div>
                  <div className='pb-10'>
                    <input
                      type="file"
                      multiple
                      accept="image/*,application/pdf"
                      className="file:bg-red-700 file:border-red-900 file-input file-input-bordered border-red-700 bg-red-50 w-full max-w-sm"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="pt-5 pb-10">
                    <div className="flex justify-center space-x-12">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={paymentMethod === 'cash'}
                          onChange={handlePaymentMethodChange}
                          className="appearance-none w-3 h-3 border border-gray-500 rounded-full cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-red-400 focus:outline-none checked:bg-red-700 checked:ring-2 checked:ring-offset-2 checked:ring-red-700 checked:border-red-700"
                        />
                        <span>Cash on Delivery</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          checked={paymentMethod === 'online'}
                          onChange={handlePaymentMethodChange}
                          className="appearance-none w-3 h-3 border border-gray-500 rounded-full cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-red-400 focus:outline-none checked:bg-red-700 checked:ring-2 checked:ring-offset-2 checked:ring-red-700 checked:border-red-700"
                        />
                        <span>Online Transaction</span>
                      </label>
                    </div>
                  </div>
                  <Button text="CONFIRM" />
                </form>
              </div>

              {showAlert && alertType === 'success' && (
                <div className={`bg-opacity-80 backdrop-filter backdrop-blur-md absolute top-0 left-0 h-full w-full flex justify-center items-center z-10`}>
                  <Alertsuccess text={alertMessage} />
                </div>
              )}

              {showAlert && alertType === 'fail' && (
                <div className="mt-4">
                  <AlertFail text={alertMessage} />
                </div>
              )}
        </div>


        <div className='flex justify-center '>
                <ul className="steps steps-horizontal">
                  <li className="step step-error text-red-700 font-semibold">Create Account</li>
                  <li className="step  step-error text-red-700 font-semibold">Choose Date & Time</li>
                  <li className="step  step-error text-red-700 font-semibold">Payment Details</li>
                </ul>
        </div>
    </div>
   
  );
}

export default Payment;
