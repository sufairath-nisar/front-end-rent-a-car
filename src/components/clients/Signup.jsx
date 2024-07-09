import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";
import Alertsuccess from "./Alertsuccess";
import AlertFail from "./AlertFail";

const schema = yup.object().shape({
  email: yup.string().email().required().min(3).max(30),
  password: yup.string().required().min(6),
  role: yup.string().oneOf(["personal", "corporate"]).required(),
  firstName: yup.string().required('First name is a required field').max(50),
  lastName: yup.string().required('Last name is a required field').max(50),
  nationality: yup.string().required('Nationality is a required field').max(50),
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

const countries = [
  { label: "Afghanistan", value: "Afghanistan" },
  { label: "Albania", value: "Albania" },
  { label: "Algeria", value: "Algeria" },
  { label: "Andorra", value: "Andorra" },
  { label: "Angola", value: "Angola" },
  { label: "Antigua and Barbuda", value: "Antigua and Barbuda" },
  { label: "Argentina", value: "Argentina" },
  { label: "Armenia", value: "Armenia" },
  { label: "Australia", value: "Australia" },
  { label: "Austria", value: "Austria" },
  { label: "Azerbaijan", value: "Azerbaijan" },
  { label: "Bahamas", value: "Bahamas" },
  { label: "Bahrain", value: "Bahrain" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "Barbados", value: "Barbados" },
  { label: "Belarus", value: "Belarus" },
  { label: "Belgium", value: "Belgium" },
  { label: "Belize", value: "Belize" },
  { label: "Benin", value: "Benin" },
  { label: "Bhutan", value: "Bhutan" },
  { label: "Bolivia", value: "Bolivia" },
  { label: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina" },
  { label: "Botswana", value: "Botswana" },
  { label: "Brazil", value: "Brazil" },
  { label: "Brunei", value: "Brunei" },
  { label: "Bulgaria", value: "Bulgaria" },
  { label: "Burkina Faso", value: "Burkina Faso" },
  { label: "Burundi", value: "Burundi" },
  { label: "Cabo Verde", value: "Cabo Verde" },
  { label: "Cambodia", value: "Cambodia" },
  { label: "Cameroon", value: "Cameroon" },
  { label: "Canada", value: "Canada" },
  { label: "Central African Republic", value: "Central African Republic" },
  { label: "Chad", value: "Chad" },
  { label: "Chile", value: "Chile" },
  { label: "China", value: "China" },
  { label: "Colombia", value: "Colombia" },
  { label: "Comoros", value: "Comoros" },
  { label: "Congo, Democratic Republic of the", value: "Congo, Democratic Republic of the" },
  { label: "Congo, Republic of the", value: "Congo, Republic of the" },
  { label: "Costa Rica", value: "Costa Rica" },
  { label: "Croatia", value: "Croatia" },
  { label: "Cuba", value: "Cuba" },
  { label: "Cyprus", value: "Cyprus" },
  { label: "Czech Republic", value: "Czech Republic" },
  { label: "Denmark", value: "Denmark" },
  { label: "Djibouti", value: "Djibouti" },
  { label: "Dominica", value: "Dominica" },
  { label: "Dominican Republic", value: "Dominican Republic" },
  { label: "Ecuador", value: "Ecuador" },
  { label: "Egypt", value: "Egypt" },
  { label: "El Salvador", value: "El Salvador" },
  { label: "Equatorial Guinea", value: "Equatorial Guinea" },
  { label: "Eritrea", value: "Eritrea" },
  { label: "Estonia", value: "Estonia" },
  { label: "Eswatini", value: "Eswatini" },
  { label: "Ethiopia", value: "Ethiopia" },
  { label: "Fiji", value: "Fiji" },
  { label: "Finland", value: "Finland" },
  { label: "France", value: "France" },
  { label: "Gabon", value: "Gabon" },
  { label: "Gambia", value: "Gambia" },
  { label: "Georgia", value: "Georgia" },
  { label: "Germany", value: "Germany" },
  { label: "Ghana", value: "Ghana" },
  { label: "Greece", value: "Greece" },
  { label: "Grenada", value: "Grenada" },
  { label: "Guatemala", value: "Guatemala" },
  { label: "Guinea", value: "Guinea" },
  { label: "Guinea-Bissau", value: "Guinea-Bissau" },
  { label: "Guyana", value: "Guyana" },
  { label: "Haiti", value: "Haiti" },
  { label: "Honduras", value: "Honduras" },
  { label: "Hungary", value: "Hungary" },
  { label: "Iceland", value: "Iceland" },
  { label: "India", value: "India" },
  { label: "Indonesia", value: "Indonesia" },
  { label: "Iran", value: "Iran" },
  { label: "Iraq", value: "Iraq" },
  { label: "Ireland", value: "Ireland" },
  { label: "Israel", value: "Israel" },
  { label: "Italy", value: "Italy" },
  { label: "Jamaica", value: "Jamaica" },
  { label: "Japan", value: "Japan" },
  { label: "Jordan", value: "Jordan" },
  { label: "Kazakhstan", value: "Kazakhstan" },
  { label: "Kenya", value: "Kenya" },
  { label: "Kiribati", value: "Kiribati" },
  { label: "Kuwait", value: "Kuwait" },
  { label: "Kyrgyzstan", value: "Kyrgyzstan" },
  { label: "Laos", value: "Laos" },
  { label: "Latvia", value: "Latvia" },
  { label: "Lebanon", value: "Lebanon" },
  { label: "Lesotho", value: "Lesotho" },
  { label: "Liberia", value: "Liberia" },
  { label: "Libya", value: "Libya" },
  { label: "Liechtenstein", value: "Liechtenstein" },
  { label: "Lithuania", value: "Lithuania" },
  { label: "Luxembourg", value: "Luxembourg" },
  { label: "Madagascar", value: "Madagascar" },
  { label: "Malawi", value: "Malawi" },
  { label: "Malaysia", value: "Malaysia" },
  { label: "Maldives", value: "Maldives" },
  { label: "Mali", value: "Mali" },
  { label: "Malta", value: "Malta" },
  { label: "Marshall Islands", value: "Marshall Islands" },
  { label: "Mauritania", value: "Mauritania" },
  { label: "Mauritius", value: "Mauritius" },
  { label: "Mexico", value: "Mexico" },
  { label: "Micronesia", value: "Micronesia" },
  { label: "Moldova", value: "Moldova" },
  { label: "Monaco", value: "Monaco" },
  { label: "Mongolia", value: "Mongolia" },
  { label: "Montenegro", value: "Montenegro" },
  { label: "Morocco", value: "Morocco" },
  { label: "Mozambique", value: "Mozambique" },
  { label: "Myanmar", value: "Myanmar" },
  { label: "Namibia", value: "Namibia" },
  { label: "Nauru", value: "Nauru" },
  { label: "Nepal", value: "Nepal" },
  { label: "Netherlands", value: "Netherlands" },
  { label: "New Zealand", value: "New Zealand" },
  { label: "Nicaragua", value: "Nicaragua" },
  { label: "Niger", value: "Niger" },
  { label: "Nigeria", value: "Nigeria" },
  { label: "North Korea", value: "North Korea" },
  { label: "North Macedonia", value: "North Macedonia" },
  { label: "Norway", value: "Norway" },
  { label: "Oman", value: "Oman" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "Palau", value: "Palau" },
  { label: "Palestine", value: "Palestine" },
  { label: "Panama", value: "Panama" },
  { label: "Papua New Guinea", value: "Papua New Guinea" },
  { label: "Paraguay", value: "Paraguay" },
  { label: "Peru", value: "Peru" },
  { label: "Philippines", value: "Philippines" },
  { label: "Poland", value: "Poland" },
  { label: "Portugal", value: "Portugal" },
  { label: "Qatar", value: "Qatar" },
  { label: "Romania", value: "Romania" },
  { label: "Russia", value: "Russia" },
  { label: "Rwanda", value: "Rwanda" },
  { label: "Saint Kitts and Nevis", value: "Saint Kitts and Nevis" },
  { label: "Saint Lucia", value: "Saint Lucia" },
  { label: "Saint Vincent and the Grenadines", value: "Saint Vincent and the Grenadines" },
  { label: "Samoa", value: "Samoa" },
  { label: "San Marino", value: "San Marino" },
  { label: "Sao Tome and Principe", value: "Sao Tome and Principe" },
  { label: "Saudi Arabia", value: "Saudi Arabia" },
  { label: "Senegal", value: "Senegal" },
  { label: "Serbia", value: "Serbia" },
  { label: "Seychelles", value: "Seychelles" },
  { label: "Sierra Leone", value: "Sierra Leone" },
  { label: "Singapore", value: "Singapore" },
  { label: "Slovakia", value: "Slovakia" },
  { label: "Slovenia", value: "Slovenia" },
  { label: "Solomon Islands", value: "Solomon Islands" },
  { label: "Somalia", value: "Somalia" },
  { label: "South Africa", value: "South Africa" },
  { label: "South Korea", value: "South Korea" },
  { label: "South Sudan", value: "South Sudan" },
  { label: "Spain", value: "Spain" },
  { label: "Sri Lanka", value: "Sri Lanka" },
  { label: "Sudan", value: "Sudan" },
  { label: "Suriname", value: "Suriname" },
  { label: "Sweden", value: "Sweden" },
  { label: "Switzerland", value: "Switzerland" },
  { label: "Syria", value: "Syria" },
  { label: "Taiwan", value: "Taiwan" },
  { label: "Tajikistan", value: "Tajikistan" },
  { label: "Tanzania", value: "Tanzania" },
  { label: "Thailand", value: "Thailand" },
  { label: "Timor-Leste", value: "Timor-Leste" },
  { label: "Togo", value: "Togo" },
  { label: "Tonga", value: "Tonga" },
  { label: "Trinidad and Tobago", value: "Trinidad and Tobago" },
  { label: "Tunisia", value: "Tunisia" },
  { label: "Turkey", value: "Turkey" },
  { label: "Turkmenistan", value: "Turkmenistan" },
  { label: "Tuvalu", value: "Tuvalu" },
  { label: "Uganda", value: "Uganda" },
  { label: "Ukraine", value: "Ukraine" },
  { label: "United Arab Emirates", value: "United Arab Emirates" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "United States", value: "United States" },
  { label: "Uruguay", value: "Uruguay" },
  { label: "Uzbekistan", value: "Uzbekistan" },
  { label: "Vanuatu", value: "Vanuatu" },
  { label: "Vatican City", value: "Vatican City" },
  { label: "Venezuela", value: "Venezuela" },
  { label: "Vietnam", value: "Vietnam" },
  { label: "Yemen", value: "Yemen" },
  { label: "Zambia", value: "Zambia" },
  { label: "Zimbabwe", value: "Zimbabwe" }
];


//to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



export default function Signup({ onSuccess }) {
  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
  const [role, setRole] = useState("personal");
  const [showAlert, setShowAlert] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fromBooking = location.state?.fromBooking;

  const onSubmit = async (data) => {
    console.log("testing data", data);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/clients/get-a-client?email=${data.email}`,
        { withCredentials: true }
      );
      console.log("response=", response);
      if (response.data) {
        setEmailExists(true);
        console.error("Client already exists with the provided email:", data.email);
        return;
      }
    } catch (error) {
      console.error("Error during signup:", error);
      console.error("Response data:", error.response?.data);
    }

    const res = await axios.post("http://localhost:3000/api/v1/clients/signup", data, { withCredentials: true });
    console.log(res.data);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      if (fromBooking) {
        navigate('/booking/choose-location');
      } else {
        navigate('/client');
      }
    }, 2000);
  };

  const handleEmailChange = () => {
    if (emailExists) {
      setEmailExists(false);
    }
  };

  return (
    <div className="place-content-center pb-20 pt-28 md:pt-36 bg-signup relative" >
      <div className="justify-center pb-5 grid grid-rows-1">
        <h2 className="font-semibold">
          Create an <span className="text-red-700">Account</span>
        </h2>
      </div>

      <div className="flex place-content-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:gap-y-2 bg-white shadow-grey-100 shadow-2xl rounded-md px-4 py-6 md:py-12 md:px-8 w-11/12 md:w-3/5"           
        >

          {emailExists && (
            <AlertFail text="Email already exists! Please use a different email address." />
          )}

          <div
            className={`${
              showAlert ? "block" : "hidden"
            } bg-opacity-80  backdrop-filter backdrop-blur-md absolute top-0 left-0 h-full w-full flex justify-center items-center z-10`}
            
          >
            <Alertsuccess text="Your account is now active! Book your adventure now!" />
          </div>


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
          {errors.role && <p className="text-red-700 text-sm font-medium">{capitalizeFirstLetter(errors.role.message)}</p>}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div className="mt-2">
                <input
                  {...register("email")}
                  placeholder="Email"
                  className="block w-full  border  bg-red-50 px-2 py-1.5 text-sm text-gray-900   border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                  onChange={handleEmailChange} 
                />
                {errors.email && <p className="text-red-700 text-sm font-medium">{capitalizeFirstLetter(errors.email.message)}</p>}
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
                {errors.password && <p className="text-red-700 text-sm font-medium">{capitalizeFirstLetter(errors.password.message)}</p>}
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
                {errors.firstName && <p className="text-red-700 text-sm font-medium">{capitalizeFirstLetter(errors.firstName.message)}</p>}
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
                {errors.lastName && <p className="text-red-700 text-sm font-medium">{capitalizeFirstLetter(errors.lastName.message)}</p>}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
            <div className="md:col-span-6">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
              <div className="mt-2">
                <textarea
                  {...register("address")}
                  placeholder="Address"
                  className="block w-full  border  bg-red-50 px-2 py-1.5 text-sm text-gray-900   border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                />
                {errors.address && <p className="text-red-700 text-sm font-medium">{capitalizeFirstLetter(errors.address.message)}</p>}
              </div>
            </div>

            <div className="md:col-span-6">
               <label htmlFor="nationality" className="block text-sm font-medium leading-6 text-gray-900">Nationality</label>
              <div className="mt-2">
                <select
                  {...register("nationality")}
                  className="block w-full border bg-red-50 px-2 py-1.5 text-sm text-gray-900 border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                >
                  <option value="">Select Nationality</option>
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>{country.label}</option>
                  ))}
                </select>
                {errors.nationality && <p className="text-red-700 text-sm font-medium">{capitalizeFirstLetter(errors.nationality.message)}</p>}
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
                {errors.ph && <p className="text-red-700 text-sm font-medium">{capitalizeFirstLetter(errors.ph.message)}</p>}
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
                {errors.license && <p className="text-red-700 text-sm font-medium">{capitalizeFirstLetter(errors.license.message)}</p>}
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
                    {errors.position && <p className="text-red-700 text-sm font-medium">{capitalizeFirstLetter(errors.position.message)}</p>}
                  </div>
                </div>

                <div className="md:col-span-6">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">TRN</label>
                  <div className="mt-2">
                    <input
                      {...register("trn")}
                      placeholder="TRN"
                      className="block w-full  border  bg-red-50 px-2 py-1.5 text-sm text-gray-900   border-red-300 shadow-sm focus:ring-red-700 focus:border-red-700 focus:outline-none focus:ring-1"
                    />
                    {errors.trn && <p className="text-red-700 text-sm font-medium">{capitalizeFirstLetter(errors.trn.message)}</p>}
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
                  {errors.companyName && <p className="text-red-700 text-sm font-medium">{capitalizeFirstLetter(errors.companyName.message)}</p>}
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
