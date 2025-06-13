import React, { useState } from "react";
import "./styles/Navbar.css";

import { HiMiniBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import {
  FaHome,
  FaInfoCircle,
  FaLightbulb,
  FaEnvelope,
  FaBook,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { SlLogin } from "react-icons/sl";
import { FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const links = [
  { label: "الرئيسية", link: "Hero", icon: <FaHome /> },
  { label: "عن الموقع", link: "About", icon: <FaInfoCircle /> },
  { label: "المميزات", link: "Features", icon: <BsStars /> },
  { label: "ختمات عامة", link: "Khatmahs", icon: <FaBook /> },
  { label: "تواصل معنا", link: "Contact", icon: <FaEnvelope /> },
];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="main-container">
        <div className="nav-content">
          <div className="navbar-logo">
            {" "}
            <FaBookOpen className="header-icon" />
            ختمة{" "}
          </div>

          <div className="menu-icon">
            {isOpen ? (
              <IoClose onClick={toggleMenu} />
            ) : (
              <HiMiniBars3 onClick={toggleMenu} />
            )}
            <Link to="/registration" className="login-icon">
              <SlLogin />
            </Link>
          </div>

          <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
            {links.map((l, index) => (
              <li key={index}>
                <ScrollLink to={l.link} smooth={true} duration={300}>
                  <span>{l.label}</span>
                  <span className="icon">{l.icon}</span>
                </ScrollLink>
              </li>
            ))}
            <Link className="login-icon" to="/registration">
              تسجيل دخول
              <SlLogin />
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
