import React, { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import "./Attendance.css";
import { Button, Box } from "@mui/material";

const Attendance = () => {
  const [loggedInTeacherEmail, setLoggedInTeacherEmail] = useState("");
  const [gradeName, setGradeName] = useState("");
  const [students, setStudents] = useState([]);

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
    console.log(loggedInTeacherEmail);
  }, []);

  useEffect(() => {
    const fetchGradeName = async () => {
      if (loggedInTeacherEmail) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/grades/teacher?email=${loggedInTeacherEmail}`
          );
          if (response.ok) {
            const data = await response.json();
            setGradeName(data.name);
          }
        } catch (error) {
          console.error("Error fetching grade name:", error);
        }
      }
    };

    fetchGradeName();
  }, [loggedInTeacherEmail]);

  //   useEffect(() => {
  //     const fetchStudents = async () => {
  //       if (gradeName) {
  //         try {
  //           const response = await fetch(
  //             `http://localhost:8080/api/students/grade/${gradeName}`
  //           );
  //           if (response.ok) {
  //             const students = await response.json();
  //             setStudents(students);
  //           }
  //         } catch (error) {
  //           console.error("Error fetching students:", error);
  //         }
  //       }
  //     };

  //     fetchStudents();
  //   }, [gradeName]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (gradeName) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/students/grade/${encodeURIComponent(
              gradeName
            )}`
          );
          if (response.ok) {
            const students = await response.json();
            setStudents(students);
          }
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
    };

    fetchStudents();
  }, [gradeName]);

  const handleAttendanceClick = async (studentId, status) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/students/${studentId}/attendance`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ attendanceStatus: status }),
        }
      );
      if (response.ok) {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === studentId
              ? {
                  ...student,
                  [`${status}Count`]: student[`${status}Count`] + 1,
                }
              : student
          )
        );
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  return (
    <div className="attendance">
      <TeacherSidebar />
      <div className="main-content">
        <h2>{gradeName}</h2>
        <table>
          <thead>
            <tr>
              <th>Student Reg. No.</th>
              <th>No. of Present Days</th>
              <th>No. of Absent Days</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.registrationNumber}</td>
                <td>
                  <Box>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        handleAttendanceClick(student.id, "present")
                      }
                    >
                      {student.presentCount || 0}
                    </Button>
                  </Box>
                </td>
                <td>
                  <Box>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        handleAttendanceClick(student.id, "absent")
                      }
                    >
                      {student.absentCount || 0}
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
