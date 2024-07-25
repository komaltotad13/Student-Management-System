// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "./Sidebar";
// import {
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Alert,
// } from "@mui/material";
// import "./Teachers.css";

// const Teachers = () => {
//   const [teacherEmail, setTeacherEmail] = useState("");
//   const [teacherPassword, setTeacherPassword] = useState("");
//   const [teachers, setTeachers] = useState([]);
//   const [alert, setAlert] = useState(null);

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const fetchTeachers = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/teachers");
//       setTeachers(response.data);
//     } catch (error) {
//       console.error("There was an error fetching the teachers!", error);
//     }
//   };

//   const handleCreateTeacher = async () => {
//     try {
//       await axios.post("http://localhost:8080/api/teachers", {
//         email: teacherEmail,
//         password: teacherPassword,
//       });
//       setTeacherEmail("");
//       setTeacherPassword("");
//       setAlert({ type: "success", message: "Teacher created successfully!" });
//       fetchTeachers();
//     } catch (error) {
//       console.error("There was an error creating the teacher!", error);
//       setAlert({ type: "error", message: "Failed to create teacher." });
//     }
//   };

//   const handleDeleteTeacher = async (teacherId) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/teachers/${teacherId}`);
//       fetchTeachers();
//     } catch (error) {
//       console.error("There was an error deleting the teacher!", error);
//     }
//   };

//   return (
//     <div className="teachers-container">
//       <Sidebar />
//       <div className="teachers-content">
//         <h2>Create Teacher</h2>
//         <div className="form-group">
//           <TextField
//             label="Teacher Email"
//             value={teacherEmail}
//             onChange={(e) => setTeacherEmail(e.target.value)}
//             className="form-input"
//           />
//           <br />
//           <TextField
//             label="Teacher Password"
//             value={teacherPassword}
//             onChange={(e) => setTeacherPassword(e.target.value)}
//             className="form-input"
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleCreateTeacher}
//             className="form-button"
//           >
//             Create Teacher
//           </Button>
//         </div>
//         {alert && (
//           <Alert severity={alert.type} onClose={() => setAlert(null)}>
//             {alert.message}
//           </Alert>
//         )}
//         <TableContainer component={Paper} className="teachers-table">
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Teacher Email ID</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {teachers.map((teacher) => (
//                 <TableRow key={teacher.id}>
//                   <TableCell>{teacher.email}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => handleDeleteTeacher(teacher.id)}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </div>
//   );
// };

// export default Teachers;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";
import "./Teachers.css";

const Teachers = () => {
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("There was an error fetching the teachers!", error);
    }
  };

  const handleCreateTeacher = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/teachers", {
        email: teacherEmail,
        password: teacherPassword,
      });
      if (response.data === "Teacher with this email already exists") {
        setAlert({
          type: "error",
          message: "Teacher with this email already exists",
        });
      } else {
        setTeacherEmail("");
        setTeacherPassword("");
        setAlert({ type: "success", message: "Teacher created successfully!" });
        fetchTeachers();
      }
    } catch (error) {
      console.error("There was an error creating the teacher!", error);
      setAlert({ type: "error", message: "Failed to create teacher." });
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    try {
      await axios.delete(`http://localhost:8080/api/teachers/${teacherId}`);
      fetchTeachers();
    } catch (error) {
      console.error("There was an error deleting the teacher!", error);
    }
  };

  return (
    <div className="teachers-container">
      <Sidebar />
      <div className="teachers-content">
        <h2>Create Teacher</h2>
        <div className="form-group">
          <TextField
            label="Teacher Email"
            value={teacherEmail}
            onChange={(e) => setTeacherEmail(e.target.value)}
            className="form-input"
          />
          <br />
          <TextField
            label="Teacher Password"
            value={teacherPassword}
            onChange={(e) => setTeacherPassword(e.target.value)}
            className="form-input"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTeacher}
            className="form-button"
          >
            Create Teacher
          </Button>
        </div>
        {alert && (
          <Alert severity={alert.type} onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        )}
        <TableContainer component={Paper} className="teachers-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Teacher Email ID</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteTeacher(teacher.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Teachers;
