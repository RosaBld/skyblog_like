// AuthContext.jsx
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [setPassword] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
      const storedUsername = Cookies.get('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }

    const checkCookieExpiration = async () => {
      const token = Cookies.get('token');
      if (!token) {
        setIsLoggedIn(false);
        setUsername('');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/check-token', {
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });
        
        if (response.status === 401) {
          logout();
        }
      } catch (error) {
        console.error('Error checking token validaty:', error)
      }
    };

    const intervalId = setInterval(checkCookieExpiration, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const login = (token, username) => {
    const expires = new Date(new Date().getTime() + 60 * 60 * 1000);
    Cookies.set('token', token, { expires, secure: true, sameSite: 'Strict' });
    Cookies.set('username', username, { expires, secure: true, sameSite: 'Strict' });
    setIsLoggedIn(true);
    setUsername(username);
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  const updateUsername = (newUsername) => {
    Cookies.set('username', newUsername, { expires: 1, secure: true, sameSite: 'Strict' });
    setUsername(newUsername);
  }

  const updatePassword = (newPassword) => {
    setPassword(newPassword);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, username, updateUsername, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};