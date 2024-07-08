import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if there's a user stored in localStorage on mount
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email, password, captchaToken) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/clients/signin",
        { email, password, captchaToken },
        { withCredentials: true } // Ensure credentials are included (cookies)
      );

      if (res.status === 200) {
        const userData = { email }; // Assuming you only need email for user info
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
        return { success: true };
      } else {
        return { success: false, message: "An error occurred. Please try again." };
      }
    } catch (error) {
      let message = "An error occurred. Please try again.";
      if (error.response) {
        if (error.response.status === 404) {
          message = "You are not registered.";
        } else if (error.response.status === 401) {
          message = "Incorrect password! Please enter the correct password.";
        }
      }
      return { success: false, message };
    }
  };



  const updateUserPassword = async (newPassword) => {
    try {
      const response = await axios.put(
        'http://localhost:3000/api/v1/clients/change-password',
        {
          email: user.email,
          newPassword,
        },
        { withCredentials: true } // Ensure credentials are included (cookies)
      );

      console.log(response.data); // Log the response for verification

      // Update user object locally
      setUser({ ...user, password: newPassword }); // Update user object with new password

      return { success: true, message: "Password changed successfully" };
    } catch (error) {
      console.error('Error changing password:', error);
      let message = 'Failed to change password. Please try again later!';
      if (error.response && error.response.data) {
        message = error.response.data.message || message;
      }
      return { success: false, message };
    }
  };
  
  
  const logout = () => {
    localStorage.removeItem('user'); // Remove user from localStorage
    setUser(null); // Set user state to null
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
