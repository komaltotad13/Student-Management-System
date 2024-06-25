import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentSidebar from "./StudentSidebar";
import "./StudentMarks.css";

const StudentMarks = () => {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLoggedInStudentAndMarks = async () => {
    try {
      setLoading(true);
      setError(null);
      const studentResponse = await axios.get(
        "http://localhost:8080/api/students/loggedInStudent"
      );

      if (!studentResponse.data) {
        throw new Error("No logged-in student found");
      }

      const registrationNumber = studentResponse.data.registrationNumber;
      const marksResponse = await axios.get(
        `http://localhost:8080/api/marks/student/${registrationNumber}`
      );

      setMarks(marksResponse.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoggedInStudentAndMarks();
  }, []);

  const calculateTotalMarks = (fa1, fa2, finalMark) => {
    return (fa1 || 0) + (fa2 || 0) + (finalMark || 0);
  };

  const renderTableContent = () => {
    if (loading) {
      return Array(5)
        .fill()
        .map((_, index) => (
          <tr key={index} className="skeleton-row">
            <td>
              <div className="skeleton-loader"></div>
            </td>
            <td>
              <div className="skeleton-loader"></div>
            </td>
            <td>
              <div className="skeleton-loader"></div>
            </td>
            <td>
              <div className="skeleton-loader"></div>
            </td>
            <td>
              <div className="skeleton-loader"></div>
            </td>
          </tr>
        ));
    }

    if (error) {
      return (
        <tr>
          <td colSpan="5" className="error-message">
            Error: {error}
            <button
              onClick={fetchLoggedInStudentAndMarks}
              className="retry-button"
            >
              Retry
            </button>
          </td>
        </tr>
      );
    }

    return marks.map((mark, index) => (
      <tr key={index}>
        <td>{mark.subject}</td>
        <td>{mark.fa1}</td>
        <td>{mark.fa2}</td>
        <td>{mark.finalMark}</td>
        <td>{calculateTotalMarks(mark.fa1, mark.fa2, mark.finalMark)}</td>
      </tr>
    ));
  };

  return (
    <div className="student-dashboard">
      <StudentSidebar />
      <div className="main-content">
        <nav>
          <h2>Student Marks</h2>
        </nav>
        <div className="student-marks-container">
          <table className="marks-table">
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>FA 1</th>
                <th>FA 2</th>
                <th>Final Marks</th>
                <th>Total Marks</th>
              </tr>
            </thead>
            <tbody>{renderTableContent()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentMarks;
