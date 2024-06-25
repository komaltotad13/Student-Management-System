import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./StudentSidebar.css";

const StudentSidebar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/student/dashboard") {
      setActiveTab("home");
    } else if (path === "/student/marks") {
      setActiveTab("marks");
    }
  }, [location]);

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link
            to="/student/dashboard"
            className={activeTab === "home" ? "active" : ""}
          >
            <i className="fas fa-home"></i> Home
          </Link>
        </li>
        <li>
          <Link
            to="/student/marks"
            className={activeTab === "marks" ? "active" : ""}
          >
            <i className="fas fa-tasks"></i> Marks
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default StudentSidebar;
