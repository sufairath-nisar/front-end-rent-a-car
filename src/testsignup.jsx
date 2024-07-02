import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import AlertFail from "./AlertFail";
import ReCAPTCHA from "react-google-recaptcha";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  })
  .required();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const recaptchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState("");

  const onCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const onSubmit = async (data) => {
    if (!captchaToken) {
      setAlertMessage("Please complete the reCAPTCHA.");
      return;
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
    <div className="min-h-96 place-content-center pb-20 pt-28 md:pt-36 bg-gradient-to-r from-red-500 to-white relative">
    <div className="justify-center pb-5 grid grid-rows-1">
      <h2 className="text-center pb-8 font-semibold">
        Welcome Back! Please <span className="text-red-700">Log In</span>
      </h2>
    </div>
    <div className="flex place-content-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bottom-36 w-72 md:w-96 gap-y-2 mb-0 bg-white shadow-grey-100 shadow-2xl rounded-md px-4 py-4 md:py-12 md:px-8"
      >
        {alertMessage && <AlertFail text={alertMessage} />}
        <div className="mt-2">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <input
            {...register("email")}
            placeholder="email"
            className="block w-full border bg-red-50 px-2 py-1.5 text-sm text-gray-900 border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
            id='email'
          />
          {errors.email && <p className="text-sm font-medium text-red-700">{capitalizeFirstLetter(errors.email.message)}</p>}
        </div>

        <div className="mt-2">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="password"
            className="block w-full border bg-red-50 px-2 py-1.5 text-sm text-gray-900 border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
            id='password'
          />
          {errors.password && <p  className="text-sm font-medium text-red-700">{capitalizeFirstLetter(errors.password.message)}</p>}
        </div>
          <ReCAPTCHA
            ref={recaptchaRef}
            size="normal" 
            sitekey={import.meta.env.VITE_SITE_KEY}
            onChange={onCaptchaChange} 
          />
          <div>
            <Button type="submit" text="Sign in" className="w-full py-2 mt-4" />
          </div>

          <div className="text-sm text-center mt-4">
          <p className="justify-center text-center pt-2 text-sm font-medium leading-6 text-gray-900">
            Not registered yet?{" "}
            <Link to="/clients/signup" className="btn-link link-hover text-sm font-medium text-red-700">
              Signup
            </Link>
          </p>
        </div>
        </form>
       
      </div>
    </div>
  );
}
