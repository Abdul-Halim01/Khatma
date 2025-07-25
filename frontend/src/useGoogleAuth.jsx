// hooks/useGoogleAuth.js
import { useState } from 'react';
import axios from 'axios';

const api_url = import.meta.env.VITE_API_URL;

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleAuth = async (googleToken) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${api_url}/api/google-auth/`, {
        token: googleToken
      });

      setIsLoading(false);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err.response?.data?.error || 'حدث خطأ أثناء المصادقة';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const handleGoogleSignup = async (userData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${api_url}/api/google-signup/`, userData);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err.response?.data?.error || 'حدث خطأ أثناء إنشاء الحساب';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    handleGoogleAuth,
    handleGoogleSignup,
    isLoading,
    error
  };
};