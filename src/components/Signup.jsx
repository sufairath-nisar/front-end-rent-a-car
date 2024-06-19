import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


const schema = yup.object({
    email: yup.string().email().required().min(3).max(30),

    hashPassword: yup.string().required().min(6),

    role: yup.string().oneOf(["personal", "corporate"]).required(),

    firstName: yup.string().required().max(50),

    lastName: yup.string().required().max(50),

    nationality: yup.string().required().max(50),

    ph: yup.string()
      .required()
      .max(20)
      .matches(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),

    address: yup.string().required().max(50),

   license: yup.string().required().max(50),

   companyName: yup.string().required().max(50),
   position: yup.string().required().max(50),
   trn: yup.string().required().max(50),


      // address: yup.string().when('role', {
      //   is: 'personal',
      //   then: yup.string().required().max(50),
      //   otherwise: yup.string().nullable()
      // }),
      
    // license: yup.string()
    // .max(50)
    // .when('role', {
    //   is: 'corporate',
    //   then: yup.string().required('Company license number is required for corporate role'),
    //   otherwise: yup.string().required('License number is required for personal role')
    // }),

    // companyName: yup.string()
    //   .when('role', {
    //     is: 'corporate',
    //     then: yup.string().required('Company name is required for corporate role').max(50),
    //     otherwise: yup.string().nullable()
    //   }),

    // position: yup.string()
    //   .max(50)
    //   .when('role', {
    //     is: 'corporate',
    //     then: yup.string().required('Position is required for corporate role'),
    //     otherwise: yup.string().nullable()
    //   }),

    // trn: yup.string()
    //   .max(50)
    //   .when('role', {
    //     is: 'corporate',
    //     then: yup.string().required('TRN is required for corporate role'),
    //     otherwise: yup.string().nullable()
    //   })
}).required();

export default function Signup() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });
  
    const [role, setRole] = useState("personal");
  
    const onSubmit = async (data) => {
      onsole.log("Form data submitted:", data); 
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/clients/signup",
          data,
          {
            withCredentials: true,
          },
        );
        console.log(res.data);
      } 
      catch (error) {
        console.log(error);
      }
    };
  
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 rounded-md border p-6"
      >
        <div className="flex items-center">
          <input
            type="radio"
            id="personal"
            value="personal"
            {...register("role")}
            checked={role === "personal"}
            onChange={() => setRole("personal")}
            className="mr-2"
          />
          <label htmlFor="personal" className="mr-4">Personal</label>
          <input
            type="radio"
            id="corporate"
            value="corporate"
            {...register("role")}
            checked={role === "corporate"}
            onChange={() => setRole("corporate")}
            className="mr-2"
          />
          <label htmlFor="corporate">Corporate</label>
        </div>
        {errors.role && <p>{errors.role.message}</p>}
        
        <input
          {...register("email")}
          placeholder="Email"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && <p>{errors.email.message}</p>}
        
        <input
          {...register("hashPassword")}
          type="password"
          placeholder="Password"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.hashPassword && <p>{errors.hashPassword.message}</p>}
        
        <input
              {...register("firstName")}
              placeholder="First Name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}

            <input
              {...register("lastName")}
              placeholder="Last Name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
            
            <input
              {...register("nationality")}
              placeholder="nationality"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.nationality && <p>{errors.nationality.message}</p>}


            <input
              {...register("ph")} 
              placeholder="Phone"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.ph && <p>{errors.ph.message}</p>}
            
           
            
            <input
              {...register("license")}
              placeholder="License"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            /> 
            {errors.license && <p>{errors.license.message}</p>}
        
        {/* {role === "personal" && (
          <>
            
             <input
              {...register("address")}
              placeholder="Address"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.address && <p>{errors.address.message}</p>}
            
            
          </>
        )} */}
        
        {role === "corporate" && (
          <>
            {/* <input
              {...register("companyName")}
              placeholder="Company Name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.companyName && <p>{errors.companyName.message}</p>}
            
            <input
              {...register("firstName")}
              placeholder="First Name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            
            <input
              {...register("lastName")}
              placeholder="Last Name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
            
            <input
              {...register("ph")}
              placeholder="Phone"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.ph && <p>{errors.ph.message}</p>} */}
            
            <input
              {...register("trn")}
              placeholder="TRN"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {/* {errors.trn && <p>{errors.trn.message}</p>} */}
            
            {/* <input
              {...register("license")}
              placeholder="License"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.license && <p>{errors.license.message}</p>} */}
          </>
        )}
        
        <input type="submit" className="rounded-md bg-blue-500 py-1 text-white" />
        <p>
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 underline">
            Sign in
          </Link>
        </p>
      </form>
    );
  }