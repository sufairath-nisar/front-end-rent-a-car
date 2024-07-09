import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Alertsuccess from './Alertsuccess';
import AlertFail from './AlertFail';
import Button from './Button';

const countries = [
  { label: "Afghanistan", value: "Afghanistan" },
  { label: "Albania", value: "Albania" },
  // Add more countries as needed
  { label: "Zimbabwe", value: "Zimbabwe" }
];

const EditProfile = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [address, setAddress] = useState('');
  const [license, setLicense] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [trn, setTRN] = useState('');
  const [ph, setPh] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchProfileDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/clients/view-profile/${user.email}`, {
        withCredentials: true,
      });
      const { data } = response;
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setNationality(data.nationality || ''); // Ensure nationality is handled
      setAddress(data.address);
      setLicense(data.license);
      if (user.role === 'corporate') {
        setCompanyName(data.companyName);
        setPosition(data.position);
        setTRN(data.trn);
      }
      setPh(data.ph);
    } catch (error) {
      console.error('Error fetching profile details:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to fetch profile details');
    }
  };

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/clients/edit-profile/${user.email}`,
        {
          firstName,
          lastName,
          nationality,
          address,
          license,
          companyName,
          position,
          trn,
          ph,
        },
        { withCredentials: true }
      );

      setSuccessMessage('Profile updated successfully');
      setError(null); // Reset error state
      console.log('Updated profile:', response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
      setSuccessMessage(''); // Reset successMessage state
      console.error('Error updating profile:', error.response?.data || error.message);
    }
  };

  return (
    <div className="pt-32 pb-12">
      <div className="max-w-lg mx-auto my-8 px-6 py-12 bg-white rounded-lg shadow-2xl shadow-red-300">
        <h3 className="font-semibold text-red-700 text-center mb-8">Edit Profile</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <AlertFail text={error} />}
          {successMessage && <Alertsuccess text={successMessage} />}
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-5">
              <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-red-50 border-red-700 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-5">
              <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-red-50 text-gray-700 border border-red-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Nationality
              </label>
              <select
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              >
                <option value="">Select Nationality</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-5">
              <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input
                className="appearance-none block w-full bg-red-50 border-red-700 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-5">
              <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                License
              </label>
              <input
                className="appearance-none block w-full bg-red-50 border-red-700 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="License"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
              />
            </div>
            {user.role === 'corporate' && (
              <>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-5">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Company Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-red-50 border-red-700 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-5">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Position
                  </label>
                  <input
                    className="appearance-none block w-full bg-red-50 border-red-700 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-5">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    TRN
                  </label>
                  <input
                    className="appearance-none block w-full bg-red-50 border-red-700 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="TRN"
                    value={trn}
                    onChange={(e) => setTRN(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-5">
              <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                className="appearance-none block w-full bg-red-50 border-red-700 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Phone Number"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
              />
            </div>
          </div>
          <div className='flex justify-center text-center'>
           <Button text="SAVE CHANGES"/>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
