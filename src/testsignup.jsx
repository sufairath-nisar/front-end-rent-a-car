import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

const schema = yup.object().shape({
  email: yup.string().email().required().min(3).max(30),
  password: yup.string().required().min(6),
  role: yup.string().oneOf(["personal", "corporate"]).required(),
  firstName: yup.string().required('First name is a required field').max(50),
  lastName: yup.string().required('Last name is a required field').max(50),
  nationality: yup.string().required().max(50),
  license: yup.string().required().max(50),
  ph: yup.string()
    .required('Phone number is a required field')
    .max(20)
    .matches(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  address: yup.string().required().max(50),
  companyName: yup.string()
    .when('role', {
      is: 'corporate',
      then: (schema) => schema.required('Company name is required for corporate role').max(50),
    }),
  position: yup.string()
    .when('role', {
      is: 'corporate',
      then: (schema) => schema.required('Position is required for corporate role').max(50),
    }),
  trn: yup.string()
    .when('role', {
      is: 'corporate',
      then: (schema) => schema.required('TRN is required for corporate role').max(50),
    }),
});

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [role, setRole] = useState("personal");
  const navigate = useNavigate(); // Use navigate for redirection

  const onSubmit = async (data) => {
    console.log("Form data submitted:", data);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/clients/signup",
        data,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      alert("Successfully registered!"); // Show alert
      navigate("/clients"); // Redirect to the home page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="place-content-center pb-20 pt-28 md:pt-36 bg-gradient-to-r from-red-500 to-white">
      <div className="justify-center pb-5 grid grid-rows-1">
        <h2 className="font-semibold">
          Create an <span className="text-red-700">Account</span>
        </h2>
      </div>

      <div className="flex place-content-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2 bg-white shadow-grey-100 shadow-2xl rounded-md  px-4 py-4  md:py-12 md:px-8 w-11/12 md:w-3/5"
        >
          <div className="flex justify-center items-center">
            <input
              type="radio"
              id="personal"
              value="personal"
              {...register("role")}
              checked={role === "personal"}
              onChange={() => setRole("personal")}
              className="appearance-none w-3 h-3 border border-gray-500 rounded-full cursor-pointer  focus:ring-2 focus:ring-offset-2  focus:ring-red-400 focus:outline-none checked:bg-red-700 checked:ring-2 checked:ring-offset-2 checked:ring-red-700 checked:border-red-700 mr-2"
            />
            <label htmlFor="personal" className="mr-4">Personal</label>
            <input
              type="radio"
              id="corporate"
              value="corporate"
              {...register("role")}
              checked={role === "corporate"}
              onChange={() => setRole("corporate")}
              className="appearance-none w-3 h-3 border border-gray-500 rounded-full cursor-pointer  focus:ring-2 focus:ring-offset-2  focus:ring-red-400 focus:outline-none checked:bg-red-700 checked:ring-2 checked:ring-offset-2 checked:ring-red-700 checked:border-red-700 mr-2"
            />
            <label htmlFor="corporate">Corporate</label>
          </div>
          {errors.role && <p className="text-red-700">{capitalizeFirstLetter(errors.role.message)}</p>}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div className="mt-2">
                <input
                  {...register("email")}
                  placeholder="Email"
                  className="block w-full  border  bg-red-50 px-2 py-1.5 text-sm text-gray-900   border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                />
                {errors.email && <p className="text-red-700">{capitalizeFirstLetter(errors.email.message)}</p>}
              </div>
            </div>

            <div className="md:col-span-6">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="mt-2">
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className="block w-full  border  bg-red-50 px-2 py-1.5 text-sm text-gray-900   border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                />
                {errors.password && <p className="text-red-700">{capitalizeFirstLetter(errors.password.message)}</p>}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
            <div className="md:col-span-6">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
              <div className="mt-2">
                <input
                  {...register("firstName")}
                  placeholder="First Name"
                  className="block w-full  border  bg-red-50 px-2 py-1.5 text-sm text-gray-900   border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                />
                {errors.firstName && <p className="text-red-700">{capitalizeFirstLetter(errors.firstName.message)}</p>}
              </div>
            </div>

            <div className="md:col-span-6">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
              <div className="mt-2">
                <input
                  {...register("lastName")}
                  placeholder="Last Name"
                  className="block w-full  border  bg-red-50 px-2 py-1.5 text-sm text-gray-900   border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                />
                {errors.lastName && <p className="text-red-700">{capitalizeFirstLetter(errors.lastName.message)}</p>}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
            <div className="md:col-span-6">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
              <div className="mt-2">
                <input
                  {...register("address")}
                  placeholder="Address"
                  className="block w-full  border  bg-red-50 px-2 py-1.5 text-sm text-gray-900   border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                />
                {errors.address && <p className="text-red-700">{capitalizeFirstLetter(errors.address.message)}</p>}
              </div>
            </div>

            <div className="md:col-span-6">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Nationality</label>
              <div className="mt-2">
                <input
                  {...register("nationality")}
                  placeholder="Nationality"
                  className="block w-full  border  bg-red-50 px-2 py-1.5 text-sm text-gray-900   border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                />
                {errors.nationality && <p className="text-red-700">{capitalizeFirstLetter(errors.nationality.message)}</p>}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
            <div className="md:col-span-6">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
              <div className="mt-2">
                <input
                  {...register("ph")}
                  placeholder="Phone"
                  className="block w-full  border  bg-red-50 px-2 py-1.5 text-sm text-gray-900   border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                />
                {errors.ph && <p className="text-red-700">{capitalizeFirstLetter(errors.ph.message)}</p>}
              </div>
            </div>

            <div className="md:col-span-6">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">License number</label>
              <div className="mt-2">
                <input
                  {...register("license")}
                  placeholder="License"
                  className="block w-full  border  bg-red-50 px-2 py-1.5 text-sm text-gray-900   border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                />
                {errors.license && <p className="text-red-700">{capitalizeFirstLetter(errors.license.message)}</p>}
              </div>
            </div>
          </div>

          {role === "corporate" && (
            <>
              <div className="mt-4 grid grid-cols-12 gap-x-6 gap-y-8">
                <div className="md:col-span-6">
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Position</label>
                  <div className="mt-2">
                    <input
                      {...register("position")}
                      placeholder="Position"
                      className="block w-full  border  bg-red-50 px-2 py-1.5 text-sm text-gray-900   border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                    />
                    {errors.position && <p className="text-red-700">{capitalizeFirstLetter(errors.position.message)}</p>}
                  </div>
                </div>

                <div className="md:col-span-6">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">TRN</label>
                  <div className="mt-2">
                    <input
                      {...register("trn")}
                      placeholder="TRN"
                      className="block w-full  border  bg-grey-50 px-2 py-1.5 text-sm text-gray-900   border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                    />
                    {errors.trn && <p className="text-red-700">{capitalizeFirstLetter(errors.trn.message)}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-x-6">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Company name</label>
                <div className="mt-2">
                  <input
                    {...register("companyName")}
                    placeholder="Company Name"
                    className="block w-full  border  bg-red-50 px-2 py-1.5 text-sm text-gray-900   border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                  />
                  {errors.companyName && <p className="text-red-700">{capitalizeFirstLetter(errors.companyName.message)}</p>}
                </div>
              </div>
            </>
          )}

          <div className="mt-10  gap-x-6 gap-y-8 ">
            <div className="grid md:grid-cols-3">
              <div className="grid md:col-start-2">
                <Button text="Create Account" className="font-semibold" />
              </div>
            </div>

            <div className="justify-center pt-3">
              <p className="justify-center text-center text-sm font-medium leading-6 text-gray-900">
                Already have an account?{"  "}
                <Link to="/clients/signin" className=" btn-link link-hover text-sm font-medium text-red-700">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
