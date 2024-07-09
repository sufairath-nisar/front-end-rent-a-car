// AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email, password, captchaToken, returnTo) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/clients/signin",
        { email, password, captchaToken },
        { withCredentials: true }
      );

      if (res.status === 200) {
        const userData = { email }; // Assuming you only need email for user info
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, path: returnTo }; // Return path to navigate to
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

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
