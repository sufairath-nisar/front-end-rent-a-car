// ContactUs.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';


const ContactUs = () => {
  const [fromEmail, setFromEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!fromEmail || !subject || !text) {
      setAlert({ type: 'error', message: 'All fields are required!' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/clients/send-email', {
        fromEmail,
        subject,
        text,
      });

      setAlert({ type: 'success', message: response.data.message });

      // Clear input fields after successful submission
      setFromEmail('');
      setSubject('');
      setText('');
    } catch (error) {
      console.error('Error sending email:', error);
      setAlert({ type: 'error', message: 'Error sending email. Please try again later!' });
    }
  };

  return (
    <div className='pb-20 pt-32 px-4 '>
      <h2 className='text-center pb-8 font-semibold'>Contact <span className='text-red-700'>us</span></h2>
      <div className="p-8 px-2 gap-4 max-w-lg mx-auto shadow-2xl shadow-red-200 section-contact-us bg-contact">
            {alert.message && (
              <div
                className={`py-2 px-4 mb-4 ${
                  alert.type === 'success' ? 'bg-green-100 text-center text-green-900' : 'bg-red-100 text-center text-red-900'
                } border border-solid border-green-400 `}
              >
                {alert.message}
              </div>
            )}
            <form onSubmit={handleSubmit} className='px-5 '>
              <div className="mb-6">
                <label htmlFor="fromEmail" className="block text-sm font-medium text-gray-700">
                  Your Email:
                </label>
                <input
                  type="email"
                  id="fromEmail"
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                  className="placeholder:text-slate-400 mt-1 block w-full px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring-red-700 focus:border-red-700 sm:text-sm"
                  placeholder="Enter your email address" required
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
                  className="placeholder:text-slate-400 mt-1 block w-full px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring-red-700 focus:border-red-700 sm:text-sm"
                  placeholder="Type the subject" required
                />
              </div>
              <div className="mb-8">
                <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                  Message:
                </label>
                <textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="placeholder:text-slate-400 mt-1 block w-full px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring-red-700 focus:border-red-700 sm:text-sm"
                  placeholder="Type your message" required
                />
              </div>
              <Button text="SEND EMAIL" className="w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50" />
            </form>
      
      </div>
    </div>
  );
};

export default ContactUs;
