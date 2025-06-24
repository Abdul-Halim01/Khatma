import React, { useState } from "react";
import "./styles/registration.css";
import { MdWarning, MdCheckCircle } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import api from "../../../api";
import axios from "axios";

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
  const handleSubmit = async (e) => {
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
  };

  return (
    <div className="login">
      <div className="main-container">
        <div className="login-content">
          <div className="login-card">
            <Link className="back" to="/">
              <FaChevronLeft />
            </Link>
            <h1 className="login-title">إنشاء حساب</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              {["name", "email", "password", "gender", "phone"].map((field) => (
                <div className="form-group" key={field}>
                  <label>
                    {field === "name"
                      ? "الاسم الكامل"
                      : field === "email"
                      ? "البريد الإلكتروني"
                      : field === "password"
                      ? "كلمة المرور"
                      : field === "gender"
                      ? "الجنس"
                      : "رقم الهاتف"}
                  </label>
                  {field === "gender" ? (
                    <select
                      name={field}
                      className={`form-input ${errors[field] ? "error" : ""}`}
                      value={formData[field]}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    >
                      <option value="">اختر الجنس</option>
                      <option value="male">ذكر</option>
                      <option value="female">أنثى</option>
                    </select>
                  ) : (
                    <input
                      type={
                        field === "password"
                          ? "password"
                          : field === "email"
                          ? "email"
                          : "text"
                      }
                      name={field}
                      className={`form-input ${errors[field] ? "error" : ""}`}
                      value={formData[field]}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      placeholder={`أدخل ${
                        field === "name"
                          ? "اسمك"
                          : field === "email"
                          ? "بريدك"
                          : field === "password"
                          ? "كلمة المرور"
                          : field === "phone"
                          ? "رقم هاتفك"
                          : ""
                      }`}
                    />
                  )}
                  {errors[field] && (
                    <div className="error-message">
                      <MdWarning
                        style={{ color: "#ff9800", marginLeft: "4px" }}
                      />
                      {errors[field]}
                    </div>
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
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
