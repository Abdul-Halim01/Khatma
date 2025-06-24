import React, { useState, useEffect } from "react";
import { FaSignOutAlt as LogOut, FaCrown as Crown, FaUsers as Users } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchProtectedData } from "../../../api"; // Adjust path

const MyKhatmahs = () => {
  const [khatmas, setKhatmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadKhatmas = async () => {
      try {
        const data = await fetchProtectedData('api/khatmas/');
        setKhatmas(data.results || data); // Handle pagination if present
        setLoading(false);
      } catch (err) {
        setError('Failed to load khatmas. Please try again.');
        setLoading(false);
      }
    };
    loadKhatmas();
  }, []);

  if (loading) return <div>Loading khatmas...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="myKh_container">
      <div className="myKh_header">
        <div className="myKh_icon">
          <LogOut className="myKh_icon-inner" />
        </div>
        <h2 className="myKh_title">ختماتي الحالية</h2>
      </div>
      <div className="myKh_grid">
        {khatmas.map((khatma) => (
          <KhatmaCard key={khatma.id} khatma={khatma} />
        ))}
      </div>
    </div>
  );
};

function KhatmaCard({ khatma }) {
  return (
    <Link to={`/KhatmahPage/${khatma.id}`} className={`myKh_card`}>
      <div className="myKh_card-header">
        <div className="myKh_type">
          <div
            className={`myKh_type-icon ${khatma.is_public ? "public" : "private"}`}
          >
            {khatma.is_public ? (
              <Users className="myKh_icon-small" />
            ) : (
              <Crown className="myKh_icon-small" />
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
            style={{ width: `${khatma.completion_percentage}%` }}
          ></div>
        </div>
        <span className="myKh_progress-text">
          التقدم الإجمالي: {khatma.completion_percentage}%
        </span>
      </div>
    </Link>
  );
}

export default MyKhatmahs;