import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const login = async ({ username, password }) => {
    try {
      // Fetch user data from the backend using the provided username
      const response = await axios.get(`http://localhost:5000/user/${username}`);
      const user = response.data;

      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordMatch = (password === user.password);
      if (!isPasswordMatch) {
        throw new Error('Invalid password');
      }

      // Set the loggedInUser state upon successful login
      setLoggedInUser(user);

      // Return user data if login is successful
      return user;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  };

  const logout = () => {
    setLoggedInUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
