import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdWarning, MdCheckCircle } from 'react-icons/md';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGoogleAuth } from '../../../useGoogleAuth';
import './styles/registration.css';

const GoogleSignUp = () => {
  const navigate = useNavigate();
  const { handleGoogleSignup, isLoading } = useGoogleAuth();
  const [googleData, setGoogleData] = useState(null);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    gender: '',
    phone: '',
    google_token: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Get Google data from localStorage
    const storedGoogleData = localStorage.getItem('google_signup_data');
    if (storedGoogleData) {
      const data = JSON.parse(storedGoogleData);
      setGoogleData(data);
      setFormData(prev => ({
        ...prev,
        fullname: data.name || '',
        email: data.email || '',
        google_token: data.google_token || ''
      }));
    } else {
      // If no Google data, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    setSuccessMessage('');
  };

  const validateField = (name, value) => {
    if (!value.trim()) {
      return `${name === 'fullname' ? 'الاسم الكامل' : 
               name === 'gender' ? 'الجنس' : 
               name === 'phone' ? 'رقم الهاتف' : 'هذا الحقل'} مطلوب`;
    }
    
    if (name === 'fullname' && value.length < 3) {
      return 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }
    
    if (name === 'phone' && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''))) {
      return 'يرجى إدخال رقم هاتف صحيح';
    }
    
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    ['fullname', 'gender', 'phone'].forEach(field => {
      newErrors[field] = validateField(field, formData[field]);
    });
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const result = await handleGoogleSignup(formData);
      
      // Store tokens
      localStorage.setItem('accessToken', result.access);
      localStorage.setItem('refreshToken', result.refresh);
      
      // Clear Google signup data
      localStorage.removeItem('google_signup_data');
      
      setSuccessMessage(result.message || 'تم إنشاء الحساب بنجاح!');
      
      setTimeout(() => {
        navigate('/UserDashboard');
      }, 1500);
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: error.message || 'حدث خطأ أثناء إنشاء الحساب'
      }));
    }
  };

  if (!googleData) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="login">
      <div className="main-container">
        <div className="login-content">
          <div className="login-card">
            <Link className="back" to="/login">
              <FaChevronLeft />
            </Link>
            <h1 className="login-title">إكمال بيانات الحساب</h1>
            <p className="login-subtitle">يرجى إكمال بياناتك لإنشاء حسابك</p>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullname">الاسم الكامل</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className={`form-input ${errors.fullname ? "error" : ""}`}
                  placeholder="أدخل اسمك الكامل"
                  disabled={isLoading}
                />
                {errors.fullname && (
                  <div className="error-message">
                    <MdWarning style={{ color: "#ff9800", marginLeft: "4px" }} />
                    {errors.fullname}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  className="form-input"
                  disabled={true}
                  style={{ backgroundColor: '#f5f5f5', color: '#666' }}
                />
                <small style={{ color: '#666', fontSize: '0.85em' }}>
                  البريد الإلكتروني من Google
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="gender">الجنس</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`form-input ${errors.gender ? "error" : ""}`}
                  disabled={isLoading}
                >
                  <option value="">اختر الجنس</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
                {errors.gender && (
                  <div className="error-message">
                    <MdWarning style={{ color: "#ff9800", marginLeft: "4px" }} />
                    {errors.gender}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">رقم الهاتف</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`form-input ${errors.phone ? "error" : ""}`}
                  placeholder="أدخل رقم هاتفك"
                  disabled={isLoading}
                />
                {errors.phone && (
                  <div className="error-message">
                    <MdWarning style={{ color: "#ff9800", marginLeft: "4px" }} />
                    {errors.phone}
                  </div>
                )}
              </div>

              {errors.general && (
                <div className="error-message">
                  <MdWarning style={{ color: "#ff9800", marginLeft: "4px" }} />
                  {errors.general}
                </div>
              )}

              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
              </button>
            </form>

            {successMessage && (
              <div className="success-message">
                <MdCheckCircle style={{ color: "green", marginLeft: "4px" }} />
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignUp;