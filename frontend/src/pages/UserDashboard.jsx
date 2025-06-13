import React, { useState } from "react";
import Sidebar from "../assets/components/Dashboard/Sidebar";
import Header from "../assets/components/Dashboard/Header";
import Overview from "../assets/components/Dashboard/Overview";
import CreateKhatma from "../assets/components/Dashboard/createKhatma";

import "./styles/UserDashboard.css";
function UserDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="UserDashboard">
      <div className="main-container">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="Dashboard-content">
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            menuOpen={menuOpen}
          />
         {activeSection === "overview" && <Overview />}
         {activeSection === "newKhatma" && <CreateKhatma />}
         
         {/* {activeSection === "joinKhatma" && <JoinKhatma />}
         {activeSection === "myKhatmas" && <MyKhatmahs />}*/}
        </div>
      </div>
    </section>
  );
}

export default UserDashboard;
