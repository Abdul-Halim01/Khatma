import React, { useState } from "react";
import {
  FaBookOpen,
  FaPlus,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./styles/Sidebar.css";
import userImage from "../../imgs/Quran.jpg";

const navItems = [
  {
    id: "overview",
    label: "نظرة عامة",
    icon: FaBookOpen,
    color: "var(--color-available)",
  },
  {
    id: "newKhatma",
    label: "ختمة جديدة",
    icon: FaPlus,
    color: "var(--color-available)",
  },
  {
    id: "joinKhatma",
    label: "تسجيل في ختمة",
    icon: FaUsers,
    color: "#2196f3",
  },
  {
    id: "myKhatmas",
    label: "ختمات مكتمله",
    icon: FaSignOutAlt,
    color: "#fb8c00",
  },
];

const Sidebar = ({ activeSection, setActiveSection, menuOpen }) => {
  return (
    <>
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <nav className="nav">
          {/* معلومات المستخدم */}
          <div className="header-user">
            <img src={userImage} alt="User" className="user-image" />
            <span className="user-name">محمد أحمد</span>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setMenuOpen(false); // أغلق القائمة عند الضغط
              }}
              className={`Dash-nav-button ${
                activeSection === item.id ? "active" : ""
              }`}
              style={
                activeSection === item.id
                  ? {
                      borderColor: item.color,
                      backgroundColor: `${item.color}20`,
                      color: item.color,
                    }
                  : {}
              }
            >
              <item.icon className="icon" />
              <span className="label">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
