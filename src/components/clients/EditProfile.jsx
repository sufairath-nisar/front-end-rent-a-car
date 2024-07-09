import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Alertsuccess from './Alertsuccess';
import AlertFail from './AlertFail';
import Button from './Button';

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
      setNationality(data.nationality || '');
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
                className="appearance-none block w-full bg-red-50 border-red-700 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              >
                <option value="">{nationality}</option>
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
