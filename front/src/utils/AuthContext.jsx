// AuthContext.jsx
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
      const storedUsername = Cookies.get('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  const login = (token, username) => {
    Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'Strict' });
    Cookies.set('username', username, { expires: 1, secure: true, sameSite: 'Strict' });
    setIsLoggedIn(true);
    setUsername(username);
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};