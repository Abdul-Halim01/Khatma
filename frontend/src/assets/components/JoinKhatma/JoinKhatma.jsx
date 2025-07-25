import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginButton = () => {
  const handleLogin = async (response) => {
    const { credential } = response;
    try {
      const res = await axios.post("http://localhost:8087/api/google-auth/", {
        id_token: credential,
      });

      const { token, user } = res.data;

      // Save token locally
      localStorage.setItem("authToken", token);
      localStorage.setItem("userEmail", user.email);

      alert(`Welcome, ${user.name}`);
      // Redirect to dashboard or homepage
      window.location.href = "/UserDashboard";
    } catch (err) {
      console.error("Login failed:", err.response.data);
      alert("Google login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId="636083696108-lb89bp6fbehibprukmb0rue1th19f7d9.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => alert("Google Login Failed")}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
