import { FaBookOpen } from "react-icons/fa";
import userImage from "../../imgs/Quran.jpg";
import "./styles/Header.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState ,useEffect } from "react";
import axios from "axios";

/**
 * 
 * هحتاج بيانات المستخدم من الباك اند
 */

const Header = ({ menuOpen, setMenuOpen }) => {

  const [userData, setUserData] = useState(null);

  /**دي الفانكشن اللي هجيب بيها بيانات المستخدم من الباك اند */
  function fetchUserData() {
    axios.get("http://localhost:5000/api/user/me")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchUserData();
  }, []);


  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* الشعار */}
        <div className="header-logo">
          <FaBookOpen className="header-icon" />
          <h1 className="header-title">ختمة</h1>
        </div>

        {/* معلومات المستخدم */}
        <div className="header-user">
          <img src={userImage} alt="User" className="user-image" />
          <span className="user-name">محمد أحمد</span>
        </div>

        {/* زر الفتح والإغلاق للجوال */}
        <div className="mobile-menu-button">
          <button onClick={handleToggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
