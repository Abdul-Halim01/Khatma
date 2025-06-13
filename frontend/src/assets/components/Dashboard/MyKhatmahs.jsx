import React, { useState } from "react";
import {
  FaSignOutAlt as LogOut,
  FaCrown as Crown,
  FaUsers as Users,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const MyKhatmahs = () => {
  /***
   *الختمات دي هتيجي من الباك اند
   */ 
  const [khatmas] = useState([
    {
      id: 1,
      name: "ختمة العائلة الكريمة",
      participants: 12,
      progress: 85,
      type: "private",
      daysLeft: 3,
    },
    {
      id: 2,
      name: "ختمة رمضان المبارك",
      participants: 45,
      progress: 65,
      type: "public",
      daysLeft: 8,
    },
    {
      id: 3,
      name: "ختمة الأصدقاء",
      participants: 8,
      progress: 40,
      type: "private",
      daysLeft: 12,
    },
  ]);

  return (
    <div className="myKh_container">
      <div className="myKh_header">
        <div className="myKh_icon">
          <LogOut className="myKh_icon-inner" />
        </div>
        <h2 className="myKh_title">ختماتي الحالية</h2>
      </div>

      <div className="myKh_grid">
        {khatmas.map((khatma) => {
          return <KhatmaCard key={khatma.id} khatma={khatma} />  
        }
        )}
      </div>
    </div>
  );
};


/* 
 *  كارد الختمات
 */
function KhatmaCard({khatma}) {
  return    <Link to={`/KhatmahPage`} className={`myKh_card`}>
  <div className="myKh_card-header">
    <div className="myKh_type">
      <div
        className={`myKh_type-icon ${
          khatma.type === "private" ? "private" : "public"
        }`}
      >
        {khatma.type === "private" ? (
          <Crown className="myKh_icon-small" />
        ) : (
          <Users className="myKh_icon-small" />
        )}
      </div>
      <div>
        <h3 className="myKh_name">{khatma.name}</h3>
        <p className="myKh_progress-note">
          مشاركتك: {Math.floor(Math.random() * 5) + 1} أجزاء
        </p>
      </div>
    </div>
  </div>

  <div className="myKh_progress-wrapper">
    <div className="myKh_progress-bar-bg">
      <div
        className="myKh_progress-bar-fill"
        style={{ width: `${khatma.progress}%` }}
      ></div>
    </div>
    <span className="myKh_progress-text">
      التقدم الإجمالي: {khatma.progress}%
    </span>
  </div>
</Link>
}

export default MyKhatmahs;
