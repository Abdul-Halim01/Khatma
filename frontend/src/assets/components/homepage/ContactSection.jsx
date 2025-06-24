import React, { useState } from "react";
import "./styles/ContactSection.css";
import { Element } from "react-scroll";

const ContactUs = () => {
  //دي داتا المفروض هتروح للباك اند
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //فانكشن الارسال و الربط ب الباك اند

  const handleSubmit = (e) => {
    e.preventDefault();

    //هنا انا برجع الخطأ نفسه
    const newErrors = validateForm(formData);

    //هنا بقي هبعت الداتا + هل في رد جي من الباك؟
    if (Object.keys(newErrors).length === 0) {
      // Simulate form submission
      console.log("Form submitted:", formData);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  if (isSubmitted) {
    return (
      <section className="contact-section">
        <div className="container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>تم إرسال رسالتك بنجاح!</h2>
            <p>شكراً لك على تواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <Element name="Contact">
      <section className="contact-section">
        <div className="container">
          <div className="contact-header">
            <h1>تواصل معنا</h1>
            <p>
              نحن هنا لمساعدتك. أرسل لنا رسالتك أو استفسارك وسنتواصل معك قريباً
            </p>
          </div>

          <div className="contact-form-wrapper">
            <ContactForm formData={formData} errors={errors} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
          </div>
        </div>
      </section>
    </Element>
  );
};

//فورم التواصل
function ContactForm({formData, errors, handleInputChange, handleSubmit}) {
  return (
    <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">الاسم الكامل *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={errors.fullName ? "error" : ""}
                  placeholder="أدخل اسمك الكامل"
                />
                {errors.fullName && (
                  <span className="error-message">{errors.fullName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">البريد الإلكتروني *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "error" : ""}
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject">الموضوع *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={errors.subject ? "error" : ""}
                  placeholder="موضوع الرسالة"
                />
                {errors.subject && (
                  <span className="error-message">{errors.subject}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">الرسالة *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={errors.message ? "error" : ""}
                  placeholder="اكتب رسالتك هنا..."
                  rows="5"
                ></textarea>
                {errors.message && (
                  <span className="error-message">{errors.message}</span>
                )}
              </div>

              <button type="submit" className="submit-btn">
                إرسال الرسالة
              </button>
            </form>
  )
}

//فانشكن بتتشك علي الايميل صح ولا غلط
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

//فانشكن بتتشك علي الفورم كلها صح ولا غلط
const validateForm = (formData) => {
  const newErrors = {};

  if (!formData.fullName.trim()) {
    newErrors.fullName = "الاسم الكامل مطلوب";
  }

  if (!formData.email.trim()) {
    newErrors.email = "البريد الإلكتروني مطلوب";
  } else if (!validateEmail(formData.email)) {
    newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
  }

  if (!formData.subject.trim()) {
    newErrors.subject = "الموضوع مطلوب";
  }

  if (!formData.message.trim()) {
    newErrors.message = "الرسالة مطلوبة";
  } else if (formData.message.trim().length < 10) {
    newErrors.message = "الرسالة يجب أن تكون 10 أحرف على الأقل";
  }

  return newErrors;
};

export default ContactUs;
