// HandleSession.jsx
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { AuthContext } from './AuthContext';

const useSessionManagement = () => {
  const { login, logout } = useContext(AuthContext);

  const isTokenExpired = () => {
    const expiryTime = Cookies.get('expiry');
    if (!expiryTime) {
      return true;
    }
    return new Date().getTime() > expiryTime;
  }

  const getToken = () => {
    if (isTokenExpired()) {
      return null;
    }
    return Cookies.get('token');
  };

  const loginUser = (token, username) => {
    Cookies.set('token', token);
    Cookies.set('expiry', new Date().getTime() + 3600 * 1000);
    login(token, username);
  }

  const logoutUser = () => {
    Cookies.remove('token');
    Cookies.remove('expiry');
    logout();
  };

  return { getToken, logoutUser, loginUser };
};

export default useSessionManagement;