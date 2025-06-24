import React, { useState, useEffect } from "react";
import { FaChartBar, FaStar, FaBookOpen, FaHeart } from "react-icons/fa";
import { fetchProtectedData } from "../../../api"; // Adjust path as needed

const Stats = () => {
  const [userStats, setUserStats] = useState({
    completedKhatmas: 0,
    currentKhatmas: 0,
    totalParticipants: 0, // Not in current stats, will adjust
    averageDaily: 0,
    streak: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchProtectedData('api/stats/user/'); // Fetch user stats
        setUserStats({
          completedKhatmas: data.completed_khatmas || 0,
          currentKhatmas: data.total_khatmas - data.completed_khatmas || 0, // Approximate
          totalParticipants: data.totalParticipants, // Will need a new endpoint or calculation
          averageDaily: data.average_daily_chapters || 0,
          streak: data.current_streak || 0,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load stats. Please try again.');
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

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