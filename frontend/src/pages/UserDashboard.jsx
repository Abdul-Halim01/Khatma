import React, { useState } from "react";
import Sidebar from "../assets/components/Dashboard/Sidebar";
import Header from "../assets/components/Dashboard/Header";
import Overview from "../assets/components/Dashboard/Overview";
import CreateKhatma from "../assets/components/Dashboard/createKhatma";
import AllKhatmahs from "../assets/components/Dashboard/AllKhatmahs";
import FinishedKhatmah from "../assets/components/Dashboard/FinishedKhatmah";

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
            setMenuOpen={setMenuOpen}
          />
          {activeSection === "overview" && <Overview />}
          {activeSection === "newKhatma" && (
            <CreateKhatma setActiveSection={setActiveSection} />
          )}
          {activeSection === "joinKhatma" && <AllKhatmahs />}
          {activeSection === "finishedKhatmahs" && <FinishedKhatmah />}

          {/* {activeSection === "myKhatmas" && <MyKhatmahs />}*/}
        </div>
      </div>
    </section>
  );
}

export default UserDashboard;
