import React, { useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import AlertFail from "./AlertFail";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
}).required();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Signin() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const recaptcha = useRef(null); 

  // const handleCaptchaChange = (token) => {
  //   setCaptchaToken(token);
  // };

  const onSubmit = async (data) => {
    
    if(!recaptcha.current.getValue()){
      toast.error('Please Submit Captcha')
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/clients/signin",
        { ...data, captchaToken },
        { withCredentials: true }
      );

      console.log(res.data);

      if (res.status === 200) {
        navigate("/client");
      } else {
        setAlertMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        if (error.response.status === 404) {
          setAlertMessage("You are not registered.");
        } else if (error.response.status === 401) {
          setAlertMessage("Incorrect password! Please enter the correct password.");
        } else {
          setAlertMessage("An error occurred. Please try again.");
        }
      } else {
        setAlertMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          {alertMessage && <AlertFail text={alertMessage} />}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            type="email"
            required
            className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
          {errors.email && (
            <p className="text-sm text-red-600">Email is required and must be a valid email address.</p>
          )}
          <input
            {...register("password")}
            type="password"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm mt-3"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-sm text-red-600">Password is required and must be at least 6 characters.</p>
          )}
         <ReCAPTCHA sitekey={import.meta.env.VITE_SITE_KEY} ref={recaptcha}/>
          <div>
            <Button type="submit" text="Sign in" className="w-full py-2 mt-4" />
          </div>
        </form>
        <div className="text-sm text-center mt-4">
          <p>
            New user?{" "}
            <Link to="/signup" className="font-medium text-red-600 hover:text-red-500">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
