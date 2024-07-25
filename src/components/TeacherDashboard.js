import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [loggedInTeacher, setLoggedInTeacher] = useState("");

  useEffect(() => {
    fetchLoggedInTeacher();
  }, []);

  const fetchLoggedInTeacher = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/teachers/loggedInTeacher"
      );
      setLoggedInTeacher(response.data.email);
    } catch (error) {
      console.error(
        "There was an error fetching the logged-in teacher!",
        error
      );
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/teachers/logout");
      setLoggedInTeacher("");
      navigate("/");
    } catch (error) {
      console.error("There was an error logging out!", error);
    }
  };

  return (
    <div className="teacher-dashboard">
      <TeacherSidebar />
      <div className="main-content">
        <nav>
          <h2>Teacher Dashboard</h2>
          <button onClick={handleLogout}>Logout</button>
        </nav>
        <div className="cards">
          <div className="card">
            <i className="fas fa-book"></i>
            <h3>Card 1</h3>
            <p>0</p>
          </div>
          <div className="card">
            <i className="fas fa-user"></i>
            <h3>Card 2</h3>
            <p>0</p>
          </div>
          <div className="card">
            <i className="fas fa-chart-bar"></i>
            <h3>Card 3</h3>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
