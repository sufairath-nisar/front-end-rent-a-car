import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLogged, setIsLogged] = useState(() => {
    const storedIsLogged = localStorage.getItem('isLogged');
    return storedIsLogged ? JSON.parse(storedIsLogged) : false;
  });

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    console.log('AuthContext - isLogged:', isLogged);
  }, [isLogged]);

  const login = async (email, password, captchaToken, returnTo) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/clients/signin",
        { email, password, captchaToken},
        { withCredentials: true }
      );

      if (res.status === 200) {
        const { clientId, email } = res.data;
        const userData = { clientId, email };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('clientId', clientId);
        localStorage.setItem('clientEmail', email);
        localStorage.setItem('isLogged', JSON.stringify(true));
        setIsLogged(true);

        return { success: true, path: returnTo };
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

  const signup = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/clients/signup",
        data ,
        { withCredentials: true }
      );

      if (res.status === 201) {
        const { clientId, email } = res.data;
        const userData = { clientId, email };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('clientId', clientId);
        localStorage.setItem('clientEmail', email);
        localStorage.setItem('isLogged', JSON.stringify(true));
        setIsLogged(true);

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
    setIsLogged(false);
   
  };

  return (
    <AuthContext.Provider value={{ user, isLogged, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
