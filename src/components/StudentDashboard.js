import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [loggedInStudent, setLoggedInStudent] = useState(null);

  useEffect(() => {
    fetchLoggedInStudent();
  }, []);

  const fetchLoggedInStudent = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/students/loggedInStudent"
      );
      setLoggedInStudent(response.data);
    } catch (error) {
      console.error(
        "There was an error fetching the logged-in student!",
        error
      );
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/students/logout");
      setLoggedInStudent(null);
      navigate("/");
    } catch (error) {
      console.error("There was an error logging out!", error);
    }
  };

  return (
    <div className="student-dashboard">
      <StudentSidebar />
      <div className="main-content">
        <nav>
          <h2>Student Dashboard</h2>
          <button onClick={handleLogout}>Logout</button>
        </nav>
        <div className="cards">
          <div className="card">
            <i className="fas fa-user"></i>
            <h3>Registration Number</h3>
            <p>
              {loggedInStudent ? loggedInStudent.registrationNumber : "N/A"}
            </p>
          </div>
          <div className="card">
            <i className="fas fa-chart-bar"></i>
            <h3>Number of Present Days</h3>
            <p>{loggedInStudent ? loggedInStudent.presentCount : "N/A"}</p>
          </div>
          <div className="card">
            <i className="fas fa-chart-bar"></i>
            <h3>Number of Absent Days</h3>
            <p>{loggedInStudent ? loggedInStudent.absentCount : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
