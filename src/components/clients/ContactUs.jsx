import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';
import { useAuth } from '../../context/AuthContext';

const ContactUs = () => {
  const { user } = useAuth(); // Access user from AuthContext
  const [email, setEmail] = useState(''); // Initialize with an empty string
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });

  // Set email state when user changes
  useEffect(() => {
    if (user) {
      setEmail(user.email || ''); // Set email to user's email if available
    } else {
      setEmail(''); // If no user, reset email field
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !subject || !message) {
      setAlert({ type: 'error', message: 'All fields are required!' });
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/clients/send-message',
        {
          email,
          subject,
          message,
        },
        {
          withCredentials: true, // Ensure credentials (cookies) are included
        }
      );

      setAlert({ type: 'success', message: response.data.message });

      // Clear input fields after successful submission
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle specific error messages based on error response (optional)
      setAlert({ type: 'error', message: 'Error sending message. Please try again later!' });
    }
  };

  return (
    <div className="pb-20 pt-32 px-4">
      <h2 className="text-center pb-8 font-semibold">Contact <span className="text-red-700">us</span></h2>
      <div className="p-8 px-2 gap-4 max-w-lg mx-auto shadow-2xl shadow-red-200 section-contact-us bg-contact">
        {alert.message && (
          <div
            className={`py-2 px-4 mb-4 ${
              alert.type === 'success' ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'
            } border border-solid ${alert.type === 'success' ? 'border-green-400' : 'border-red-400'} text-center`}
          >
            {alert.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="px-5">
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Your Email:
            </label>
            <input
              type="email"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Allow user to change email if not logged in
              className="placeholder:text-slate-400 mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-red-700 focus:border-red-700 sm:text-sm"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="placeholder:text-slate-400 mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-red-700 focus:border-red-700 sm:text-sm"
              placeholder="Type the subject"
              required
            />
          </div>
          <div className="mb-8">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="placeholder:text-slate-400 mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-red-700 focus:border-red-700 sm:text-sm"
              placeholder="Type your message"
              required
            />
          </div>
          <Button text="SEND MESSAGE" className="w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50" />
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
