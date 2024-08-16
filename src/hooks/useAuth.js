import { useState, useEffect } from 'react';
import { localStorageService } from '../utils/localStorageService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorageService.getItem('token');
    if (token) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, []);

  return isAuthenticated;
};
