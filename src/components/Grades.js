// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| [newest - 8]
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./Grades.css";
import { Tabs, Tab, Box, Button, TextField } from "@mui/material";
import { GlobalStateContext } from "./GlobalStateContext";

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [currentGrade, setCurrentGrade] = useState(null);
  const [gradeName, setGradeName] = useState("");
  const [classTeacher, setClassTeacher] = useState("");
  const { updateStats } = useContext(GlobalStateContext);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    fetchGrades();
  }, []);

  useEffect(() => {
    if (grades.length > 0) {
      setCurrentGrade(grades[0]);
    }
  }, [grades]);

  const fetchGrades = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/grades");
      setGrades(response.data);
    } catch (error) {
      console.error("There was an error fetching the grades!", error);
    }
  };

  const updateCurrentGrade = async () => {
    if (currentGrade) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/grades/${currentGrade.id}`
        );
        setCurrentGrade(response.data);
      } catch (error) {
        console.error("There was an error updating the current grade!", error);
      }
    }
  };

  // Add the following function to check the teacher's email
  const checkTeacherExists = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/teachers/email/${email}`
      );
      return response.data.exists;
    } catch (error) {
      console.error("There was an error checking the teacher's email!", error);
      return false;
    }
  };

  const handleCreateGrade = async () => {
    // Utility function to validate email format
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    if (!validateEmail(classTeacher)) {
      alert("Please enter a valid email address for the class teacher.");
      return;
    }

    const teacherExists = await checkTeacherExists(classTeacher);
    if (!teacherExists) {
      alert("The class teacher email does not exist.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/grades/check/${gradeName}`
      );
      if (response.data) {
        alert("A grade with the same name already exists!");
        return;
      }

      await axios.post("http://localhost:8080/api/grades", {
        name: gradeName,
        classTeacher: classTeacher,
      });
      setGradeName("");
      setClassTeacher("");
      fetchGrades();
      updateStats();
    } catch (error) {
      console.error("There was an error creating the grade!", error);
    }
  };

  const handleDeleteGrade = async (gradeId) => {
    try {
      await axios.delete(`http://localhost:8080/api/grades/${gradeId}`);
      fetchGrades();
      updateStats();
    } catch (error) {
      console.error("There was an error deleting the grade!", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className="grades-container">
      <Sidebar />
      <div className="grades-content">
        <h2>Grades</h2>
        <div className="create-grade-container">
          <div className="create-grade">
            <TextField
              value={gradeName}
              onChange={(e) => setGradeName(e.target.value)}
              placeholder="Enter grade name"
              variant="outlined"
              size="small"
            />
            <TextField
              value={classTeacher}
              onChange={(e) => setClassTeacher(e.target.value)}
              placeholder="Enter class teacher"
              variant="outlined"
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateGrade}
            >
              Create Grade
            </Button>
          </div>
        </div>
        <ul className="grades-list">
          {grades.map((grade) => (
            <li
              key={grade.id}
              className={grade === currentGrade ? "active" : ""}
              onClick={() => setCurrentGrade(grade)}
            >
              {grade.name}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteGrade(grade.id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>

        {currentGrade && (
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              aria-label="grade tabs"
            >
              <Tab label="Details" />
              <Tab label="Subjects" />
              <Tab label="Students" />
            </Tabs>
            <TabPanel value={tabIndex} index={0}>
              <GradeDetails
                grade={currentGrade}
                onUpdate={fetchGrades}
                updateStats={updateStats}
                updateCurrentGrade={updateCurrentGrade}
              />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              <GradeSubjects
                gradeId={currentGrade.id}
                onUpdate={fetchGrades}
                gradeName={currentGrade.name}
                updateCurrentGrade={updateCurrentGrade}
              />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
              <GradeStudents
                gradeId={currentGrade.id}
                onUpdate={fetchGrades}
                gradeName={currentGrade.name}
                updateCurrentGrade={updateCurrentGrade}
              />
            </TabPanel>
          </Box>
        )}
      </div>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const GradeDetails = ({ grade, onUpdate, updateStats, updateCurrentGrade }) => {
  const [studentRegistrationNumber, setStudentRegistrationNumber] =
    useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [subjectTeacher, setSubjectTeacher] = useState("");

  const handleCreateStudent = async () => {
    try {
      await axios.post("http://localhost:8080/api/students", {
        registrationNumber: studentRegistrationNumber,
        password: studentPassword,
        gradeName: grade.name,
      });
      setStudentRegistrationNumber("");
      setStudentPassword("");
      onUpdate();
      updateStats();
      updateCurrentGrade();
    } catch (error) {
      console.error("There was an error creating the student!", error);
    }
  };

  const checkTeacherExists = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/teachers/email/${email}`
      );
      return response.data.exists;
    } catch (error) {
      console.error("There was an error checking the teacher's email!", error);
      return false;
    }
  };

  // Utility function to validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleCreateSubject = async () => {
    if (!validateEmail(subjectTeacher)) {
      alert("Please enter a valid email address for the subject teacher.");
      return;
    }

    const teacherExists = await checkTeacherExists(subjectTeacher);
    if (!teacherExists) {
      alert("The subject teacher email does not exist.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/subjects", {
        name: subjectName,
        gradeName: grade.name,
        teacherEmail: subjectTeacher,
      });
      setSubjectName("");
      setSubjectTeacher("");
      onUpdate();
      updateStats();
      updateCurrentGrade();
    } catch (error) {
      console.error("There was an error creating the subject!", error);
    }
  };

  return (
    <div>
      <h3>Details for {grade.name}</h3>
      <div className="form-group">
        <TextField
          placeholder="Student Registration Number"
          value={studentRegistrationNumber}
          onChange={(e) => setStudentRegistrationNumber(e.target.value)}
          className="form-input"
        />
        <TextField
          placeholder="Student Password"
          value={studentPassword}
          onChange={(e) => setStudentPassword(e.target.value)}
          className="form-input"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateStudent}
          className="form-button"
        >
          Add Student
        </Button>
      </div>
      <div className="form-group">
        <TextField
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="form-input"
        />
        <TextField
          placeholder="Subject Teacher"
          value={subjectTeacher}
          onChange={(e) => setSubjectTeacher(e.target.value)}
          className="form-input"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateSubject}
          className="form-button"
        >
          Add Subject
        </Button>
      </div>
    </div>
  );
};

const GradeSubjects = ({
  gradeId,
  onUpdate,
  gradeName,
  updateCurrentGrade,
}) => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, [gradeId]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/grades/${gradeId}/subjects`
      );
      setSubjects(response.data);
    } catch (error) {
      console.error("There was an error fetching the subjects!", error);
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    try {
      await axios.delete(`http://localhost:8080/api/subjects/${subjectId}`);
      fetchSubjects();
      onUpdate();
      updateCurrentGrade();
    } catch (error) {
      console.error("There was an error deleting the subject!", error);
    }
  };

  return (
    <div>
      <h3>Subjects of {gradeName}</h3>
      <table>
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Teacher Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.name}</td>
              <td>{subject.teacherEmail}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteSubject(subject.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const GradeStudents = ({
  gradeId,
  onUpdate,
  gradeName,
  updateCurrentGrade,
}) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, [gradeId]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/students/grade/${gradeName}`
      );
      setStudents(response.data);
    } catch (error) {
      console.error("There was an error fetching the students!", error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/students/${studentId}`);
      fetchStudents();
      onUpdate();
      updateCurrentGrade();
    } catch (error) {
      console.error("There was an error deleting the student!", error);
    }
  };

  return (
    <div>
      <h3>Students for {gradeName}</h3>
      <table>
        <thead>
          <tr>
            <th>Student Reg. No.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.registrationNumber}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grades;
