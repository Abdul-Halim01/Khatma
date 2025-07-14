import React, { useState, useEffect } from "react";
import {
  FaSignOutAlt as LogOut,
  FaCrown as Crown,
  FaUsers as Users,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchProtectedData } from "../../../api"; // Adjust path

const MyKhatmahs = () => {
  const [khatmas, setKhatmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadKhatmas = async () => {
      try {
        const data = await fetchProtectedData("api/khatmas/?filter=my_khatmas");
        setKhatmas(data.results || data); // Handle pagination if present
        setLoading(false);
      } catch (err) {
        setError("Failed to load khatmas. Please try again.");
        setLoading(false);
      }
    };
    loadKhatmas();
  }, []);

  if (loading) return <div>Loading khatmas...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="myKh-container">
      <div className="myKh-header">
        <div className="myKh-icon">
          <LogOut className="myKh-icon-inner" />
        </div>
        <h2 className="myKh-title">ختماتي الحالية</h2>
      </div>
      <div className="myKh-grid">
        {khatmas.map((khatma) => {
          return <CurrentKhatmaCard key={khatma.id} khatma={khatma} />;
        })}
      </div>
    </div>
  );
};

/*
 *  كارد الختمات
 */
function CurrentKhatmaCard({ khatma }) {
  return (
    <Link
      to={`/KhatmahPage/${khatma.id}`}
      className={`myKh-card`}
      id={`${khatma.id}`}
    >
      <div className="myKh-card-header">
        <div className="myKh-type">
          <div
            className={`myKh-type-icon ${
              khatma.type === "private" ? "private" : "public"
            }`}
          >
            {khatma.type === "private" ? (
              <Crown className="myKh-icon-small" />
            ) : (
              <Users className="myKh-icon-small" />
            )}
          </div>
          <div>
            <h3 className="myKh-name">{khatma.name}</h3>
            <p className="myKh-progress-note">
              مشاركتك: {Math.floor(Math.random() * 5) + 1} أجزاء
            </p>
          </div>
        </div>
      </div>

      <div className="myKh-progress-wrapper">
        <div className="myKh-progress-bar-bg">
          <div
            className="myKh-progress-bar-fill"
            style={{ width: `${khatma.completion_percentage}%` }}
          ></div>
        </div>
        <span className="myKh-progress-text">
          التقدم الإجمالي: {khatma.completion_percentage}%
        </span>
      </div>
    </Link>
  );
}

export default MyKhatmahs;
