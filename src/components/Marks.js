import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import "./Marks.css";

const Marks = () => {
  const [loggedInTeacherEmail, setLoggedInTeacherEmail] = useState("");
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInTeacherEmail = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/teachers/loggedInTeacher"
        );
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setLoggedInTeacherEmail(data[0].email);
          }
        }
      } catch (error) {
        console.error("Error fetching logged-in teacher email:", error);
      }
    };

    fetchLoggedInTeacherEmail();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (loggedInTeacherEmail) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/subjects/teacher?email=${loggedInTeacherEmail}`
          );
          if (response.ok) {
            const data = await response.json();
            setSubjects(data);
          }
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
      }
    };

    fetchSubjects();
  }, [loggedInTeacherEmail]);

  const handleViewClick = (subject) => {
    navigate("/teacher/allotting-marks", {
      state: { grade: subject.gradeName, subject: subject.name },
    });
  };

  return (
    <div className="marks-container">
      <TeacherSidebar />
      <div className="main-content">
        <h2>Marks</h2>
        <table>
          <thead>
            <tr>
              <th>Grade</th>
              <th>Subject</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td>{subject.gradeName}</td>
                <td>{subject.name}</td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => handleViewClick(subject)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marks;
