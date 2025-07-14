import { FaBookOpen } from "react-icons/fa";
import userImage from "../../imgs/Quran.jpg";
import "./styles/Header.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState ,useEffect } from "react";
import axios from "axios";
import { fetchProtectedData } from '../../../api'; // Adjust path
/**
 * 
 * هحتاج بيانات المستخدم من الباك اند
 */

const Header = ({ menuOpen, setMenuOpen }) => {
  const [userData, setUserData] = useState("مستخدم مجهول");

  const fetchUserData = async () => {
    try {
      const data = await fetchProtectedData('api/user/me/');
      setUserData(data);
    } catch (err) {
      console.error('Failed to fetch user data:', err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <FaBookOpen className="header-icon" />
          <h1 className="header-title">ختمة</h1>
        </div>
        <div className="header-user">
          {userData && (
            <>
              <img src={userData.profile_picture || userImage} alt="User" className="user-image" />
              <span className="user-name">{userData.fullname || 'مستخدم مجهول'}</span>
            </>
          )}
        </div>
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
