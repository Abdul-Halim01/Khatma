import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';

const GoogleSignInModal = ({ onSuccess, onClose }) => {
  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize Google Sign-In
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: (response) => {
            onSuccess(response.credential);
          }
        });

        // Render the Google Sign-In button
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          {
            theme: 'outline',
            size: 'large',
            width: '300',
            text: 'signin_with',
            shape: 'rectangular',
            logo_alignment: 'left',
            locale: 'ar'
          }
        );
      }
    };

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [onSuccess]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>تسجيل الدخول عبر Google</h2>
          <button className="modal-close" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          <p>اختر حسابك في Google للمتابعة</p>
          <div id="google-signin-button" className="google-signin-container"></div>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignInModal;