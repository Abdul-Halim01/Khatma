import { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { fetchProtectedData } from "../../../api";
//مكون للكرت بتاع الخاتمه نفسه اللي المفروض البانات بتاعته جاي من الباك اند
function MainKhatmaCard({ khatmah }) {
  async function joinkhatma() {
    try {
      const res = await fetchProtectedData(`api/khatmas/${khatmah.id}/join/`, {
        method: "POST",
      });
      const data = res.JSON(); // إذا كانت الاستجابة JSON
      console.log("Joined khatma successfully:", data);
    } catch (error) {
      console.error("Error joining khatma:", error);
    }
  }

  return (
    <div className="khatmah-card">
      <div className="card-header">
        <h3 className="khatmah-title">{khatmah.name}</h3>
        <span
          className="status-badge"
          style={{
            backgroundColor: getStatusColor(khatmah.status),
          }}
        >
          {getStatusText(khatmah.status)}
        </span>
      </div>

      <p className="khatmah-description">{khatmah.description}</p>

      <div className="participants-info">
        <span className="participants-count">
          <FaUsers /> {khatmah.participants_count} مشارك
        </span>
      </div>

      <ProgressBar progress={khatmah.completion_percentage} />

      <Link
        onClick={() => joinkhatma()}
        to={`/KhatmahPage/${khatmah.id}`}
        className={`join-button ${khatmah.status}`}
        disabled={khatmah.status === "completed"}
      >
        {khatmah.status === "completed"
          ? "مكتملة"
          : khatmah.status === "reserved"
          ? "انضم إلى قائمة الانتظار"
          : "انضم الآن"}
      </Link>
    </div>
  );
}

//فانكشن عشان تغير لون الاسبان حسب حالة الخاتمه
const getStatusColor = (status) => {
  switch (status) {
    case "available":
      return "var(--color-available)";
    case "reserved":
      return "var(--color-reserved)";
    case "completed":
      return "var(--color-completed)";
    default:
      return "var(--color-available)";
  }
};

//فانكشن عشان محتوي الاسبان حسب حالة الخاتمه ودي هتختصر عشان مفيش كل ده اصلا    xxxxxxxxxxxxxxxxxx هتتعدل  xxxxxxxxxxxxxxxx
const getStatusText = (status) => {
  switch (status) {
    case "available":
      return "متاحة للانضمام";
    case "reserved":
      return "محجوزة";
    case "completed":
      return "مكتملة";
    default:
      return "متاحة";
  }
};

function ProgressBar({ progress }) {
  return (
    <div className="progress-section">
      <div className="progress-info">
        <span className="progress-label">
          <FaFire /> الانجاز
        </span>
        <span className="progress-percentage">{progress}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
            background: `${
              progress < 50
                ? "var( --color-reserved)"
                : progress >= 50 && progress < 75
                ? "var(--color-completed)"
                : "var(--color-available)"
            }`,
          }}
        ></div>
      </div>
    </div>
  );
}

export { MainKhatmaCard, ProgressBar };
