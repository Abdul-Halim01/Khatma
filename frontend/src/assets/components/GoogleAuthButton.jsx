// components/GoogleAuthButton.jsx
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

const GoogleAuthButton = ({ onSuccess, onError, className = "", children }) => {
  const { handleGoogleAuth, isLoading } = useGoogleAuth();

  const handleGoogleLogin = async () => {
    try {
      // Load Google API if not already loaded
      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        console.log("Client ID Google: ",import.meta.env.VITE_GOOGLE_CLIENT_ID);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Initialize Google Sign-In
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Add this to your .env file
        callback: async (response) => {
          try {
            const result = await handleGoogleAuth(response.credential);
            onSuccess(result);
          } catch (error) {
            onError(error.message);
          }
        }
      });

      // Show the Google sign-in popup
      window.google.accounts.id.prompt();
    } catch (error) {
      onError('فشل في تحميل Google Sign-In');
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      <FcGoogle size={20} style={{ marginInlineEnd: 8 }} />
      {isLoading ? 'جاري التحميل...' : children}
    </button>
  );
};

export default GoogleAuthButton;