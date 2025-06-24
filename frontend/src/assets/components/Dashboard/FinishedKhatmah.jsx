import React, { useState } from "react";
import { FaCheckCircle, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./styles/FinishedKhatmah.css";

const FinishedKhatmah = () => {
  // This data should come from the backend
  const [finishedKhatmahs] = useState([
    {
      id: 1,
      title: "ختمة رمضان المبارك",
      participants: 45,
      completionDate: "2024-03-15",
      description: "ختمة جماعية لشهر رمضان المبارك",
      type: "public",
      Juzs: [1,5,7],
      intentions:["مغفرة الذنوب " , "استجابة الدعاء" , "ان يرحم الله ابي"]
    },
    {
      id: 2,
      title: "ختمة العائلة",
      participants: 12,
      completionDate: "2024-02-28",
      description: "ختمة خاصة مع العائلة",
      type: "private",
      Juzs: [1,5,7],
      intentions:["مغفرة الذنوب " , "استجابة الدعاء" , "ان يرحم الله ابي"]
    },
    {
      id: 3,
      title: "ختمة الشباب",
      participants: 25,
      completionDate: "2024-01-15",
      description: "ختمة مخصصة للشباب",
      type: "public",
      Juzs: [1,5,7],
      intentions:["مغفرة الذنوب " , "استجابة الدعاء" , "ان يرحم الله ابي"]
    },
  ]);

  return (
    <section className="finished-khatmah-container">
      <div className="finished-khatmah-header">
        <div className="header-icon">
          <FaCheckCircle className="icon-inner" />
        </div>
        <h2 className="header-title">الختمات المكتملة</h2>
        <p className="header-subtitle">سجل إنجازاتك في ختم القرآن الكريم</p>
      </div>

      <div className="finished-khatmah-grid">
        {finishedKhatmahs.map((khatmah) => (
          <div key={khatmah.id} className="finished-khatmah-card">
            <div className="card-header">
              <h3 className="khatmah-title">{khatmah.title}</h3>
              <span className={`type-badge ${khatmah.type}`}>
                {khatmah.type === "public" ? "عامة" : "خاصة"}
              </span>
            </div>

            <p className="khatmah-description">{khatmah.description}</p>

            <div className="khatmah-stats">
              <div className="stat-item">
                <FaUsers className="stat-icon" />
                <span className="stat-value">{khatmah.participants}</span>
                <span className="stat-label">مشارك</span>
              </div>
              <div className="stat-item">
                <FaCalendarAlt className="stat-icon" />
                <span className="stat-value">
                  {new Date(khatmah.completionDate).toLocaleDateString("ar-SA")}
                </span>
                <span className="stat-label">تاريخ الإنجاز</span>
              </div>
            </div>

            <div className="khatmah-juzs-container">
              <p className="khatmah-juzs-title">شاركت بالاجزاء :</p>
              <div className="khatmah-juzs-list">
                {khatmah.Juzs.map((juz) => (
                  <span key={juz} className="juz-number">{juz}</span>
                ))}
              </div>
            </div>

            <div className="khatmah-intentions-container">
              <p className="khatmah-intentions-title">نواياك في الختمة :</p>
              <div className="khatmah-intentions-list">
                {khatmah.intentions.map((intention) => (
                  <span key={intention} className="intention-number"><span className="intention-decoration"></span>{intention}</span>
                ))} 
              </div>
            </div>
          </div>
        ))}
      </div>  
    </section>
  );
};

export default FinishedKhatmah;
