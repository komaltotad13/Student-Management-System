import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import "./AllottingMarks.css";

const AllottingMarks = () => {
  const location = useLocation();
  const { grade, subject } = location.state || {};
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudentsAndMarks = async () => {
      try {
        const studentsResponse = await fetch(
          `http://localhost:8080/api/students/grade/${grade}`
        );
        const marksResponse = await fetch(
          `http://localhost:8080/api/marks/grade/${grade}/subject/${subject}`
        );

        if (studentsResponse.ok && marksResponse.ok) {
          const studentsData = await studentsResponse.json();
          const marksData = await marksResponse.json();

          const studentsWithMarks = studentsData.map((student) => {
            const studentMarks =
              marksData.find(
                (mark) => mark.registrationNumber === student.registrationNumber
              ) || {};
            return {
              ...student,
              fa1: studentMarks.fa1 || 0,
              fa2: studentMarks.fa2 || 0,
              finalMark: studentMarks.finalMark || 0,
              newFa1: "",
              newFa2: "",
              newFinal: "",
            };
          });

          setStudents(studentsWithMarks);
        } else {
          console.error("Failed to fetch students or marks");
        }
      } catch (error) {
        console.error("Error fetching students and marks:", error);
      }
    };

    if (grade && subject) {
      fetchStudentsAndMarks();
    }
  }, [grade, subject]);

  const handleMarksChange = (index, exam, value) => {
    const updatedStudents = [...students];
    const maxMark = exam === "newFinal" ? 50 : 25;

    if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= maxMark)) {
      updatedStudents[index][exam] = value;
      setStudents(updatedStudents);
    }
  };

  const handleUpdate = async (student) => {
    if (
      student.newFa1 === "" &&
      student.newFa2 === "" &&
      student.newFinal === ""
    ) {
      alert("No changes to update.");
      return;
    }

    const updatedMarks = {
      registrationNumber: student.registrationNumber,
      subject: subject,
      gradeName: grade,
      fa1: student.newFa1 !== "" ? parseInt(student.newFa1) : student.fa1,
      fa2: student.newFa2 !== "" ? parseInt(student.newFa2) : student.fa2,
      finalMark:
        student.newFinal !== ""
          ? parseInt(student.newFinal)
          : student.finalMark,
    };

    try {
      const response = await fetch("http://localhost:8080/api/marks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMarks),
      });

      if (response.ok) {
        const updatedMark = await response.json();
        setStudents((prevStudents) =>
          prevStudents.map((s) =>
            s.registrationNumber === updatedMark.registrationNumber
              ? {
                  ...s,
                  fa1: updatedMark.fa1,
                  fa2: updatedMark.fa2,
                  finalMark: updatedMark.finalMark,
                  newFa1: "",
                  newFa2: "",
                  newFinal: "",
                }
              : s
          )
        );
        alert("Marks updated successfully!");
      } else {
        alert("Failed to update marks. Please try again.");
      }
    } catch (error) {
      console.error("Error updating marks:", error);
      alert("An error occurred while updating marks. Please try again.");
    }
  };

  const calculateTotal = (student) => {
    return (student.fa1 || 0) + (student.fa2 || 0) + (student.finalMark || 0);
  };

  return (
    <div className="allotting-marks-container">
      <TeacherSidebar />
      <div className="main-content">
        <div className="grade-subject-info">
          <h2>
            Grade: <span>{grade || "N/A"}</span>, Subject:{" "}
            <span>{subject || "N/A"}</span>
          </h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Registration No.</th>
              <th>FA 1</th>
              <th>FA 2</th>
              <th>Final</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{student.registrationNumber}</td>
                <td>
                  <input
                    type="number"
                    value={student.newFa1}
                    onChange={(e) =>
                      handleMarksChange(index, "newFa1", e.target.value)
                    }
                    placeholder="__/25"
                  />
                  <span className="stored-mark">
                    {student.fa1 !== null ? student.fa1 : "0"}
                  </span>
                </td>
                <td>
                  <input
                    type="number"
                    value={student.newFa2}
                    onChange={(e) =>
                      handleMarksChange(index, "newFa2", e.target.value)
                    }
                    placeholder="__/25"
                  />
                  <span className="stored-mark">
                    {student.fa2 !== null ? student.fa2 : "0"}
                  </span>
                </td>
                <td>
                  <input
                    type="number"
                    value={student.newFinal}
                    onChange={(e) =>
                      handleMarksChange(index, "newFinal", e.target.value)
                    }
                    placeholder="__/50"
                  />
                  <span className="stored-mark">
                    {student.finalMark !== null ? student.finalMark : "0"}
                  </span>
                </td>
                <td>{calculateTotal(student)}</td>
                <td>
                  <button
                    className="update-button"
                    onClick={() => handleUpdate(student)}
                  >
                    Update
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

export default AllottingMarks;
