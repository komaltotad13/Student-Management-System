import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./TeacherSidebar.css";

const TeacherSidebar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/teacher/dashboard") {
      setActiveTab("home");
    } else if (path === "/teacher/profile") {
      setActiveTab("profile");
    } else if (path === "/teacher/attendance") {
      setActiveTab("attendance");
    } else if (path === "/teacher/marks") {
      setActiveTab("marks");
    }
  }, [location]);

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link
            to="/teacher/dashboard"
            className={activeTab === "home" ? "active" : ""}
          >
            <i className="fas fa-home"></i> Home
          </Link>
        </li>
        <li>
          <Link
            to="/teacher/profile"
            className={activeTab === "profile" ? "active" : ""}
          >
            <i className="fas fa-book"></i> Profile
          </Link>
        </li>
        <li>
          <Link
            to="/teacher/attendance"
            className={activeTab === "attendance" ? "active" : ""}
          >
            <i className="fas fa-tasks"></i> Attendance
          </Link>
        </li>

        <li>
          <Link
            to="/teacher/marks"
            className={activeTab === "marks" ? "active" : ""}
          >
            <i className="fas fa-tasks"></i> Marks
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TeacherSidebar;
