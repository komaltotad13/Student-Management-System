// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import "./AdminDashboard.css";
// import { GlobalStateContext } from "./GlobalStateContext";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const { stats } = useContext(GlobalStateContext);

//   const handleLogout = () => {
//     navigate("/");
//   };

//   return (
//     <div className="admin-dashboard">
//       <Sidebar />
//       <div className="main-content">
//         <nav>
//           <h2>Admin Dashboard</h2>
//           <button onClick={handleLogout}>Logout</button>
//         </nav>
//         <div className="cards">
//           <div className="card">
//             <i className="fas fa-user-graduate"></i>
//             <h3>Total Students</h3>
//             <p>{stats.students}</p>
//           </div>
//           <div className="card">
//             <i className="fas fa-chalkboard-teacher"></i>
//             <h3>Total Teachers</h3>
//             <p>{stats.teachers}</p>
//           </div>
//           <div className="card">
//             <i className="fas fa-school"></i>
//             <h3>Total Classes</h3>
//             <p>{stats.classes}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// ================================================================================
// import React, { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import "./AdminDashboard.css";
// import { GlobalStateContext } from "./GlobalStateContext";
// import axios from "axios";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const { stats, setStats } = useContext(GlobalStateContext);

//   const handleLogout = () => {
//     navigate("/");
//   };

//   const fetchStats = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8080/api/grades/stats"
//       );
//       setStats(response.data);
//     } catch (error) {
//       console.error("There was an error fetching the stats!", error);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, [fetchStats]); // Add fetchStats to dependency array if needed

//   return (
//     <div className="admin-dashboard">
//       <Sidebar />
//       <div className="main-content">
//         <nav>
//           <h2>Admin Dashboard</h2>
//           <button onClick={handleLogout}>Logout</button>
//         </nav>
//         <div className="cards">
//           <div className="card">
//             <i className="fas fa-user-graduate"></i>
//             <h3>Total Students</h3>
//             <p>{stats.students}</p>
//           </div>
//           <div className="card">
//             <i className="fas fa-chalkboard-teacher"></i>
//             <h3>Total Teachers</h3>
//             <p>{stats.teachers}</p>
//           </div>
//           <div className="card">
//             <i className="fas fa-school"></i>
//             <h3>Total Classes</h3>
//             <p>{stats.classes}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// ================================================================================== newest
// import React, { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import "./AdminDashboard.css";
// import { GlobalStateContext } from "./GlobalStateContext";
// import axios from "axios";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const { stats, setStats } = useContext(GlobalStateContext);

//   const handleLogout = () => {
//     navigate("/");
//   };

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/stats");
//         setStats(response.data);
//       } catch (error) {
//         console.error("There was an error fetching the stats!", error);
//       }
//     };

//     fetchStats();
//   }, [setStats]);

//   return (
//     <div className="admin-dashboard">
//       <Sidebar />
//       <div className="main-content">
//         <nav>
//           <h2>Admin Dashboard</h2>
//           <button onClick={handleLogout}>Logout</button>
//         </nav>
//         <div className="cards">
//           <div className="card">
//             <i className="fas fa-user-graduate"></i>
//             <h3>Total Students</h3>
//             <p>{stats.students}</p>
//           </div>
//           <div className="card">
//             <i className="fas fa-chalkboard-teacher"></i>
//             <h3>Total Teachers</h3>
//             <p>{stats.teachers}</p>
//           </div>
//           <div className="card">
//             <i className="fas fa-school"></i>
//             <h3>Total Classes</h3>
//             <p>{stats.classes}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// ================================================================================== newest - 7
// import React, { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import "./AdminDashboard.css";
// import { GlobalStateContext } from "./GlobalStateContext";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const { stats, updateStats } = useContext(GlobalStateContext);

//   const handleLogout = () => {
//     navigate("/");
//   };

//   useEffect(() => {
//     updateStats();
//   }, [updateStats]);

//   return (
//     <div className="admin-dashboard">
//       <Sidebar />
//       <div className="main-content">
//         <nav>
//           <h2>Admin Dashboard</h2>
//           <button onClick={handleLogout}>Logout</button>
//         </nav>
//         <div className="cards">
//           <div className="card">
//             <i className="fas fa-book"></i>
//             <h3>Total Classes</h3>
//             <p>{stats.grades}</p>
//           </div>
//           <div className="card">
//             <i className="fas fa-user-graduate"></i>
//             <h3>Total Students</h3>
//             <p>{stats.students}</p>
//           </div>
//           <div className="card">
//             <i className="fas fa-chalkboard-teacher"></i>
//             <h3>Total Teachers</h3>
//             <p>{stats.teachers}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// ================================================================================== newest - 8
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
