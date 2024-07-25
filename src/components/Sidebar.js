import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/admin/dashboard") {
      setActiveTab("home");
    } else if (path === "/admin/grades") {
      setActiveTab("grades");
    } else if (path === "/admin/teachers") {
      setActiveTab("teachers");
    } else if (path === "/admin/profile") {
      setActiveTab("profile");
    }
  }, [location]);

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link
            to="/admin/dashboard"
            className={activeTab === "home" ? "active" : ""}
          >
            <i className="fas fa-home"></i> Home
          </Link>
        </li>
        <li>
          <Link
            to="/admin/grades"
            className={activeTab === "grades" ? "active" : ""}
          >
            <i className="fas fa-book"></i> Grades
          </Link>
        </li>
        <li>
          <Link
            to="/admin/teachers"
            className={activeTab === "teachers" ? "active" : ""}
          >
            <i className="fas fa-chalkboard-teacher"></i> Teachers
          </Link>
        </li>
        <li>
          <Link
            to="/admin/profile"
            className={activeTab === "profile" ? "active" : ""}
          >
            <i className="fas fa-user"></i> Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
