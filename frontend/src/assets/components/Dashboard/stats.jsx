import React, { useState } from "react";
// import { FaChartBar, FaStar, FaBookOpen, FaHeart } from "lucide-react";
import { FaChartBar, FaStar, FaBookOpen, FaHeart } from "react-icons/fa";

const Stats = () => {
  const [userStats] = useState({
    completedKhatmas: 12,
    currentKhatmas: 3,
    totalParticipants: 156,
    averageDaily: 2.5,
    streak: 15,
  });
  return (
    <div className="stats-container">
      

      <div className="stats-grid">
        <div className={`stats-card`}>
          <div className="stats-card-icon">
            <FaStar color="var(--color-available)" size={24} />
            <span className="count" style={{ color: "var(--color-available)" }}>
              {userStats.completedKhatmas}
            </span>
          </div>
          <p className="label">ختمات مكتملة</p>
        </div>

        <div className={`stats-card`}>
          <div className="stats-card-icon">
            <FaBookOpen color="var(--color-completed)" size={24} />
            <span className="count" style={{ color: "var(--color-completed)" }}>
              {userStats.currentKhatmas}
            </span>
          </div>
          <p className="label">ختمات جارية</p>
        </div>

        <div className={`stats-card`}>
          <div className="stats-card-icon">
            <FaHeart color="var(--accent-color)" size={24} />
            <span className="count" style={{ color: "var(--accent-color)" }}>
              {userStats.streak}
            </span>
          </div>
          <p className="label">أيام متتالية</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
