import React, { useState } from "react";
import "./styles/registration.css";
import { MdWarning, MdCheckCircle } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import api from "../../../api";
import axios from "axios";
import SuccessMessage from "../reusable/SuccessMessage";

const api_url = import.meta.env.VITE_API_URL;

const api_url = import.meta.env.VITE_API_URL;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

//ده المكون الكامل الكلي
const SignUp = ({ route = "/api/user/register/", method = "register" }) => {
  //الداتا اللي المفروض تتبعت
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    setSuccessMessage("");
  };

  //فانكشن الارسال و الربط ب الباك اند
  /**const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm(formData , setErrors);
    if (!isValid) return;

    setIsLoading(true);
    try {
      //ده غلط المفروض يستقبل الداتا كلها
      const { email, password, fullname, gender, phone } = formData;
      const response = await axios.post(`${api_url}/api/signup/`, {
        fullname: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        phone: formData.phone,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Signup successful:', response.data);    
      setTimeout(() => navigate("/login"), 1500);
     
    } catch (error) {
      console.log("خطأ من السيرفر:", error.response?.data);
      alert(
        "فشل تسجيل الحساب: " +
          (error.response?.data?.message || "تحقق من البيانات المدخلة")
      );
    } finally {
      setIsLoading(false);
    }
  };**/


  /*** */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm(formData , setErrors);
    if (!isValid) return;

    setIsLoading(true);
    try {
      //ده غلط المفروض يستقبل الداتا كلها
      const response = await axios.post(`${api_url}/api/signup/`, {
        fullname: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        phone: formData.phone,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Signup successful:', response.data);    
      setTimeout(() => navigate("/login"), 1500);
     
    } catch (error) {
      console.log("خطأ من السيرفر:", error.response?.data);
      alert(
        "فشل تسجيل الحساب: " +
          (error.response?.data?.message || "تحقق من البيانات المدخلة")
      );
    } finally {
      setIsLoading(false);
    }
  };
  /*** */


  return (
    <div className="login">
      <div className="main-container">
        <div className="login-content">
          <div className="login-card">
            <Link className="back" to="/">
              <FaChevronLeft />
            </Link>
            <h1 className="login-title">إنشاء حساب</h1>
            <SignUpForm formData={formData} errors={errors} handleInputChange={handleInputChange} handleSubmit={handleSubmit} isLoading={isLoading} />
            {successMessage && (
              <SuccessMessage successMessage={"تم إنشاء الحساب بنجاح!."} />
            )}    
          </div>
        </div>
      </div>
    </div>
  );
};

//فورم التسجيل

function SignUpForm({ formData, errors, handleInputChange, handleSubmit, isLoading }) {
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">الاسم الكامل</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`form-input ${errors.name ? "error" : ""}`}
          placeholder="أدخل اسمك"
          disabled={isLoading}
        />
        {errors.name && (
          <div className="error-message">
            <MdWarning style={{ color: "#ff9800", marginInlineEnd: 4 }} />
            {errors.name}
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
          onChange={handleInputChange}
          className={`form-input ${errors.email ? "error" : ""}`}
          placeholder="أدخل بريدك"
          disabled={isLoading}
        />
        {errors.email && (
          <div className="error-message">
            <MdWarning style={{ color: "#ff9800", marginInlineEnd: 4 }} />
            {errors.email}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">كلمة المرور</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className={`form-input ${errors.password ? "error" : ""}`}
          placeholder="أدخل كلمة المرور"
          disabled={isLoading}
        />
        {errors.password && (
          <div className="error-message">
            <MdWarning style={{ color: "#ff9800", marginInlineEnd: 4 }} />
            {errors.password}
          </div>
        )}
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
            <MdWarning style={{ color: "#ff9800", marginInlineEnd: 4 }} />
            {errors.gender}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">رقم الهاتف</label>
        <input
          type="text"
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
            <MdWarning style={{ color: "#ff9800", marginInlineEnd: 4 }} />
            {errors.phone}
          </div>
        )}
      </div>

      <button type="submit" className="login-button" disabled={isLoading}>
        {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
      </button>
    </form>
  );
}



//vaildation function
const validateField = (name, value) => {
  if (!value.trim())
    return `${
      name === "name"
        ? "الاسم"
        : name === "email"
        ? "البريد الإلكتروني"
        : name === "password"
        ? "كلمة المرور"
        : name === "gender"
        ? "الجنس"
        : "رقم الهاتف"
    } مطلوب`;
  if (name === "email" && !emailRegex.test(value))
    return "يرجى إدخال بريد إلكتروني صحيح";
  if (name === "password" && value.length < 6)
    return "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
  if (name === "phone" && !phoneRegex.test(value.replace(/\s/g, "")))
    return "يرجى إدخال رقم هاتف صحيح";
  if (name === "name" && value.length < 3)
    return "الاسم يجب أن يكون 3 أحرف على الأقل";
  return "";
};

// validation function for form
function validateForm(formData , setErrors) {
  const newErrors = {};
  Object.keys(formData).forEach((key) => {
    newErrors[key] = validateField(key, formData[key]);
  });
  setErrors(newErrors);

  // لو فيه أي خطأ = false، لو كله تمام = true
  return !Object.values(newErrors).some(Boolean);
}

export default SignUp;
