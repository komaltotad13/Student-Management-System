// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
// import Login from "./components/Login";
// import AdminDashboard from "./components/AdminDashboard";
// import Grades from "./components/Grades";
// import Profile from "./components/Profile";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login/admin" element={<Login userType="admin" />} />
//           <Route path="/login/teacher" element={<Login userType="teacher" />} />
//           <Route path="/login/student" element={<Login userType="student" />} />
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           <Route path="/admin/grades" element={<Grades />} />
//           <Route path="/admin/profile" element={<Profile />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// ========================================= [newest - 3]
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import Grades from "./components/Grades";
import Teachers from "./components/Teachers";
import Profile from "./components/Profile";
import TeacherDashboard from "./components/TeacherDashboard";
import Attendance from "./components/Attendance";
import TeacherProfile from "./components/TeacherProfile";
import { GlobalStateProvider } from "./components/GlobalStateContext";
import "./App.css";

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/admin" element={<Login userType="admin" />} />
            <Route
              path="/login/teacher"
              element={<Login userType="teacher" />}
            />
            <Route
              path="/login/student"
              element={<Login userType="student" />}
            />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/grades" element={<Grades />} />
            <Route path="/admin/teachers" element={<Teachers />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/attendance" element={<Attendance />} />
            <Route path="/teacher/profile" element={<TeacherProfile />} />
          </Routes>
        </div>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
