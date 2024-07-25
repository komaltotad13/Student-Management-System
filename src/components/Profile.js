// import React from "react";
// import Sidebar from "./Sidebar";
// import "./Profile.css";

// const Profile = () => {
//   // Mock profile data for now
//   const profileData = {
//     name: "Admin User",
//     email: "admin@example.com",
//   };

//   return (
//     <div className="profile-container">
//       <Sidebar />
//       <div className="profile-content">
//         <h2>Profile</h2>
//         <div className="profile-card">
//           <h3>{profileData.name}</h3>
//           <p>Email: {profileData.email}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// ================================================================
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./Profile.css";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/profile"
      );
      setProfileData(response.data);
    } catch (error) {
      console.error("There was an error fetching the profile data!", error);
    }
  };

  return (
    <div className="profile-container">
      <Sidebar />
      <div className="profile-content">
        <h2>Profile</h2>
        <div className="profile-card">
          <h3>{profileData.name}</h3>
          <p>Email: {profileData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
