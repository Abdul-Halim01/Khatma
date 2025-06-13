import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdGroups, MdOutlineEmojiEvents } from 'react-icons/md';
import { BsBook } from 'react-icons/bs';
import "./styles/createKhatma.css"

const CreateKhatma = ({ darkMode = false }) => {
  const [khatmaDetails, setKhatmaDetails] = useState({
    name: '',
    description: '',
    type: '',
    duration: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKhatmaDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement khatma creation logic
    console.log('Creating khatma:', khatmaDetails);
  };

  return (
    <div className="create-khatma-container">
      <div className="header-section">
        <div className="icon-container">
          <FaPlus className="plus-icon" />
        </div>
        <h2 className="title">إنشاء ختمة جديدة</h2>
        <p className="subtitle">ابدأ رحلة روحانية جديدة مع الأحباب</p>
      </div>

      <div className="khatma-types-grid">
        {[
          {
            type: "group",
            icon: MdGroups,
            title: "ختمة جماعية",
            color: "emerald",
          },
          {
            type: "private",
            icon: MdOutlineEmojiEvents,
            title: "ختمة خاصة",
            color: "purple",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`khatma-type-card ${darkMode ? 'dark-mode' : ''}`}
            onClick={() => setKhatmaDetails(prev => ({ ...prev, type: item.type }))}
          >
            <div className="card-content">
              <item.icon className={`type-icon ${item.color}`} />
              <h3 className={`type-title ${item.color}`}>{item.title}</h3>
              <p className="type-description">
                {item.type === "group"
                  ? "ختمة عامة للكل ستظهر علي الموقع واي شخص يستطيع المشاركه"
                  : "ختمة مخصصه لك لن تظهر علي الموقع للكل وانما ستحصل علي رابط تبعثه لمن تريده المشاركه"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={`details-form ${darkMode ? 'dark-mode' : ''}`}>
        <h3 className="form-title">
          <BsBook className="form-icon" />
          تفاصيل الختمة
        </h3>
        <div className="form-content">
          <input
            type="text"
            name="name"
            value={khatmaDetails.name}
            onChange={handleInputChange}
            placeholder="اسم الختمة"
            className={`form-input ${darkMode ? 'dark-mode' : ''}`}
          />
          <textarea
            name="description"
            value={khatmaDetails.description}
            onChange={handleInputChange}
            placeholder="وصف الختمة (اختياري)"
            rows="3"
            className={`form-input ${darkMode ? 'dark-mode' : ''}`}
          />
          <select
            name="type"
            value={khatmaDetails.type}
            onChange={handleInputChange}
            className={`form-input ${darkMode ? 'dark-mode' : ''}`}
          >
            <option value="">نوع الختمه</option>
            <option value="private">خاصه</option>
            <option value="group">عامة</option>
          </select>
          <div className="form-footer">
            <select
              name="duration"
              value={khatmaDetails.duration}
              onChange={handleInputChange}
              className={`form-input duration-select ${darkMode ? 'dark-mode' : ''}`}
            >
              <option value="">عدد الأيام المتوقع</option>
              <option value="7">7 أيام</option>
              <option value="14">14 يوم</option>
              <option value="30">30 يوم</option>
              <option value="custom">مخصص</option>
            </select>
            <button type="submit" className="submit-button">
              إنشاء الختمة
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateKhatma;