import React from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';




const OnlinePayment = () => {

  const location = useLocation();
  const { carId, cars } = location.state;
 
  const paymentHandler = async (event) => {
    event.preventDefault();
    const selectedCar = cars.find((car) => car.id === carId);
    if (!selectedCar) {
      console.error("Car not found");
      return;
    }
    const response = await axios.post(
      "http://localhost:3000/api/v1/payment/order",
      { amount: selectedCar.price },
    );
  
    const order = await response.data.data;
    console.log(order);
    const option = {
      key: import.meta.env.VITE_SOME_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "Anu Codder",
      description: "Test Transaction",
      image: "https://i.ibb.co/5Y3m33n/test.png",
      order_id: order.id,
      handler: async function (response) {
        const body = { ...response };
  
        const validateResponse = await axios.post(
          "http://localhost:3000/api/v1/payment/verify",
          body,
        );
  
        const jsonResponse = await validateResponse;
  
        console.log("jsonResponse", jsonResponse);
      },
      prefill: {
        name: "Anu Coder",
        email: "anucoder@example.com",
        contact: "00000000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    const rzp1 = new window.Razorpay(option);
  
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
    });
  
    rzp1.open();
    event.preventDefault();
  };
  return (
    <div>
      <h2>Online Payment</h2>
      <button onClick={paymentHandler}>Pay Now</button>
    </div>
  )
}

export default OnlinePayment
