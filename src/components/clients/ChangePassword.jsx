import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const ChangePassword = () => {
  const { user, updateUserPassword } = useAuth();

  const schema = yup.object().shape({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup
      .string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [alert, setAlert] = useState({ type: '', message: '' });

  const onSubmit = async ({ currentPassword, newPassword }) => {
    try {
      const response = await axios.put('http://localhost:3000/api/v1/clients/change-password', {
        email: user.email,
        currentPassword,
        newPassword,
      });

      // Assuming updateUserPassword is to be used to update state only
      updateUserPassword(newPassword);

      setAlert({ type: 'success', message: 'Password changed successfully' });

      // Reset form if needed, you can clear form fields here
    } catch (error) {
      console.error('Error changing password:', error);
      setAlert({ type: 'error', message: 'Error changing password. Please try again later!' });
    }
  };

  return (
    <div className='pb-20 pt-32 px-4'>
      <h2 className='text-center pb-8 font-semibold'>
        Change <span className='text-red-700'>Password</span>
      </h2>
      <div className='p-8 px-2 gap-4 max-w-lg mx-auto shadow-2xl shadow-red-200 section-contact-us bg-contact'>
        {alert.message && (
          <div
            className={`py-2 px-4 mb-4 ${
              alert.type === 'success' ? 'bg-green-100 text-center text-green-900' : 'bg-red-100 text-center text-red-900'
            } border border-solid border-green-400 `}
          >
            {alert.message}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className='px-5'>
          <div className='mb-6'>
            <label htmlFor='currentPassword' className='block text-sm font-medium text-gray-700'>
              Current Password:
            </label>
            <input
              type='password'
              id='currentPassword'
              {...register('currentPassword')}
              className='placeholder:text-slate-400 mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-red-700 focus:border-red-700 sm:text-sm'
              placeholder='Enter your current password'
              required
            />
            {errors.currentPassword && (
              <p className='text-sm font-medium text-red-700'>{errors.currentPassword.message}</p>
            )}
          </div>
          <div className='mb-6'>
            <label htmlFor='newPassword' className='block text-sm font-medium text-gray-700'>
              New Password:
            </label>
            <input
              type='password'
              id='newPassword'
              {...register('newPassword')}
              className='placeholder:text-slate-400 mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-red-700 focus:border-red-700 sm:text-sm'
              placeholder='Enter your new password'
              required
            />
            {errors.newPassword && (
              <p className='text-sm font-medium text-red-700'>{errors.newPassword.message}</p>
            )}
          </div>
          <div className='mb-8'>
            <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
              Confirm Password:
            </label>
            <input
              type='password'
              id='confirmPassword'
              {...register('confirmPassword')}
              className='placeholder:text-slate-400 mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-red-700 focus:border-red-700 sm:text-sm'
              placeholder='Confirm your new password'
              required
            />
            {errors.confirmPassword && (
              <p className='text-sm font-medium text-red-700'>{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button
            text='Change Password'
            className='w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50'
          />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
