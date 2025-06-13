import React from "react";
import "./styles/Overview.css";
import MyKhatmahs from "./MyKhatmahs";
import Stats from "./stats";
function Overview() {
  return (
    <section className="overview">
      <div className="welcome-section">
        <h2 className="welcome-title">مرحبًا بك في منصة الختمات</h2>
        <p className="subtitle">تتبع رحلتك الروحانية مع القرآن الكريم</p>
      </div>
      <Stats />
      <MyKhatmahs />
    </section>
  );
}

export default Overview;
