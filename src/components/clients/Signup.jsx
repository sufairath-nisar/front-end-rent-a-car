import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


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
      then: (schema) => schema.required('position is required for corporate role').max(50),
    }),

    trn: yup.string()
    .when('role', {
      is: 'corporate',
      then: (schema) => schema.required('trn is required for corporate role').max(50),
    }),

});

//for validation 
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
  
    const onSubmit = async (data) => {
      console.log("Form data submitted:", data); 
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
      <div className="place-content-center  flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 rounded-md border p-6 w-3/5"
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
        {errors.role && <p className="text-red-700">{capitalizeFirstLetter(errors.role.message)}</p>}

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
            <div class="sm:col-span-6">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
               <div class="mt-2">
                  <input
                  {...register("email")}
                  placeholder="Email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.email && <p className="text-red-700">{capitalizeFirstLetter(errors.email.message)}</p>}         
                </div>
            </div>

          <div class="sm:col-span-6">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
                <input
                {...register("password")}
                type="password"
                placeholder="password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.password && <p className="text-red-700">{capitalizeFirstLetter(errors.password.message)}</p>}         
            </div>
          </div>
        </div>
        

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
            <div class="sm:col-span-6">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>

              <div class="mt-2">
                <input
                  {...register("firstName")}
                  placeholder="First Name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.firstName && <p className="text-red-700">{capitalizeFirstLetter(errors.firstName.message)}</p>}
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
              <div class="mt-2">
                  <input
                    {...register("lastName")}
                    placeholder="Last Name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.lastName && <p className="text-red-700">{capitalizeFirstLetter(errors.lastName.message)}</p>}
              </div>
            </div>
        </div>


        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
        <div class="sm:col-span-6">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
              <div class="mt-2">
                    <input
                    {...register("address")}
                    placeholder="Address"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.address && <p className="text-red-700">{capitalizeFirstLetter(errors.address.message)}</p>}
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Nationality</label>

              <div class="mt-2">
                  <input
                  {...register("nationality")}
                  placeholder="nationality"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.nationality && <p className="text-red-700">{capitalizeFirstLetter(errors.nationality.message)}</p>}

              </div>
            </div>             
        </div>
        

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
        <div class="sm:col-span-6">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
              <div class="mt-2">
                  <input
                  {...register("ph")} 
                  placeholder="Phone"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.ph && <p className="text-red-700">{capitalizeFirstLetter(errors.ph.message)}</p>}    
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">License number</label>

              <div class="mt-2">
                  <input
                  {...register("license")}
                  placeholder="License"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                /> 
                {errors.license && <p className="text-red-700">{capitalizeFirstLetter(errors.license.message)}</p>}

              </div>
            </div>             
        </div>
       
        
        {role === "corporate" && (
           <>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                  <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Company name</label>
                  <div class="mt-2">
                    <input
                    {...register("companyName")}
                    placeholder="Company Name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.companyName && <p className="text-red-700">{capitalizeFirstLetter(errors.companyName.message)}</p>} 
                  </div>
            </div>
         
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
              <div class="sm:col-span-6">
                  <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Position</label>
                  <div class="mt-2">
                  <input
                     {...register("position")}
                      placeholder="position"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.position && <p className="text-red-700">{capitalizeFirstLetter(errors.position.message)}</p>}  
                  </div>
              </div>

                <div class="sm:col-span-6">
                  <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">TRN</label>

                  <div class="mt-2">
                  <input
                      {...register("trn")}
                      placeholder="TRN"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      />
                      {errors.trn && <p className="text-red-700">{capitalizeFirstLetter(errors.trn.message)}</p>} 
                  </div>
                </div>             
            </div>
           
                 
            <input
              {...register("trn")}
              placeholder="TRN"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.trn && <p className="text-red-700">{capitalizeFirstLetter(errors.trn.message)}</p>}
            
           
          </>
        )}
        
        <input type="submit" className="rounded-md bg-blue-500 py-1 text-white" />
        <p>
          Already have an account?{" "}
          <Link to="clients/signin" className="text-blue-500 underline">
            Sign in
          </Link>
        </p>
      </form>
      </div>
    );
  }