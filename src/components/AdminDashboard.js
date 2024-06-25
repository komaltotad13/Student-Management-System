import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./AdminDashboard.css";
import { GlobalStateContext } from "./GlobalStateContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { stats } = useContext(GlobalStateContext);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <nav>
          <h2>Admin Dashboard</h2>
          <button onClick={handleLogout}>Logout</button>
        </nav>
        <div className="cards">
          <div className="card">
            <i className="fas fa-school"></i>
            <h3>Total Classes</h3>
            <p>{stats.grades}</p>
          </div>
          <div className="card">
            <i className="fas fa-user-graduate"></i>
            <h3>Total Students</h3>
            <p>{stats.students}</p>
          </div>
          <div className="card">
            <i className="fas fa-chalkboard-teacher"></i>
            <h3>Total Teachers</h3>
            <p>{stats.teachers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
