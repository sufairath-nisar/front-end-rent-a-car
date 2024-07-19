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
        { email, password, captchaToken},
        { withCredentials: true }
      );

      if (res.status === 200) {
        const { clientId, email } = res.data; // Assuming response contains clientId and email
        console.log("clientId", clientId);
        const userData = { clientId, email };
        setUser(userData);
        console.log("userData",userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('clientId', clientId); // Store client ID separately if needed
        localStorage.setItem('clientEmail', email);

        localStorage.setItem('isLogged', JSON.stringify(true)); // Set isLogged to true


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

  const signup = async (email, password, captchaToken) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/clients/signup",
        { email, password, captchaToken },
        { withCredentials: true }
      );

      if (res.status === 201) {
        const { clientId, email } = res.data; // Assuming response contains clientId and email
        const userData = { clientId, email };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('clientId', clientId); // Store client ID separately if needed
        localStorage.setItem('clientEmail', email);

        localStorage.setItem('isLogged', JSON.stringify(true)); // Set isLogged to true


        return { success: true };
      } else {
        return { success: false, message: "An error occurred. Please try again." };
      }
    } catch (error) {
      let message = "An error occurred. Please try again.";
      if (error.response) {
        if (error.response.status === 400) {
          message = "Bad request. Please check your input.";
        }
      }
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('clientId');
    localStorage.removeItem('clientEmail');
    localStorage.removeItem('isLogged');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
