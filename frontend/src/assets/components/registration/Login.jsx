import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdErrorOutline, MdCheckCircle } from "react-icons/md";
import "./styles/registration.css";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import axios from "axios";
// Two lines important for being use api in every time call API
import api from "../../../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constant";
import Dashboard from "../../../pages/UserDashboard";
import { useNavigate } from "react-router-dom";
import UserDashboard from "../../../pages/UserDashboard";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const api_url = import.meta.env.VITE_API_URL;

/****
 *
 *  formData <= انا هبعتله بيانات الشخص
 *
 *
 * 
 *  */

const Login = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    if (successMessage) setSuccessMessage("");
  };

  const validateForm = () => {
    const emailErr = validateField("email", formData.email);
    const passErr = validateField("password", formData.password);
    setErrors({ email: emailErr, password: passErr });
    return !emailErr && !passErr;
  };

  //فانكشن الارسال و الربط ب الباك اند
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setIsLoading(true);
  
    try {
      // when use api if post use await api.post("route", Dict)
      // Dict is what send to backend
      const response =  await axios.post(`${api_url}/api/login/`, {
        username: formData.email.trim(),
        password: formData.password.trim(),
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      //Need to save them because will use in operation Authentication after
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      // نفترض أن الرد يحتوي على رسالة أو توكن أو بيانات المستخدم
      const { message } = response.data;
  
      // when 
      console.log(response);
      setSuccessMessage(message || "تم تسجيل الدخول بنجاح! مرحباً بك في منصة تلاوة القرآن الكريم");
    
      setFormData({ email: "", password: "" });
  
      setTimeout(() => setSuccessMessage(""), 3000);
  
      // يمكنك توجيه المستخدم إلى صفحة أخرى أو حفظ التوكن هنا
      navigate("/UserDashboard");
    } catch (error) {
      const serverMessage = error?.response?.data?.message || "فشل في تسجيل الدخول. يرجى المحاولة مرة أخرى";
  console.log(error)
      setErrors((prev) => ({
        ...prev,
        email: serverMessage,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSuccessMessage("تم تسجيل الدخول بنجاح عبر Google! مرحباً بك");
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1000);
  };

  return (
    <section className="login">
      <div className="main-container">
        <div className="login-content">
          <div className="login-card">
            <Link className="back" to="/">
              <FaChevronLeft />
            </Link>
            <h1 className="login-title">تسجيل الدخول</h1>
            <p className="login-subtitle">منصة تلاوة القرآن الكريم الجماعية</p>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="أدخل بريدك الإلكتروني"
                  disabled={isLoading}
                />

                {/* لو في مشكله في الايميل هو بيعرف من "فانكشن تحقق الحقل" الخطا هيتسجل في الايرور.ايميل فيكون فيه داتا فيعرضه */}
                {errors.email && (
                  <div className="error-message">
                    <MdErrorOutline size={18} style={{ marginInlineEnd: 5 }} />
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
                  onChange={handleChange}
                  className={`form-input ${errors.password ? "error" : ""}`}
                  placeholder="أدخل كلمة المرور"
                  disabled={isLoading}
                />
                {errors.password && (
                  <div className="error-message">
                    <MdErrorOutline size={18} style={{ marginInlineEnd: 5 }} />
                    {errors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </button>
            </form>

            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">أو</span>
              <div className="divider-line"></div>
            </div>

            <Link
              type="button"
              className="google-button"
              // onClick={handleGoogleLogin}
              to="/UserDashboard"
              disabled={isLoading}
            >
              <FcGoogle size={20} style={{ marginInlineEnd: 8 }} />
              تسجيل الدخول عبر Google
            </Link>

            <div className="toggle-mode">
              <p className="toggle-text">
                "ليس لديك حساب؟"
                <Link className="toggle-button" to="/signup">
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>

            {successMessage && (
              <div className="success-message">
                <MdCheckCircle size={18} style={{ marginInlineEnd: 5 }} />
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

//validation function for fields as the same time
const validateField = (name, value) => {
  if (name === "email") {
    if (!value.trim()) return "البريد الإلكتروني مطلوب";
    if (!emailRegex.test(value)) return "يرجى إدخال بريد إلكتروني صحيح";
  }
  if (name === "password") {
    if (!value.trim()) return "كلمة المرور مطلوبة";
    if (value.length < 6) return "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
  }
  return "";
};

export default Login;
