import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";
import "./TeacherProfile.css";

const TeacherProfile = ({ loggedInTeacher }) => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  //   const fetchProfileData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8080/api/teacher/profile"
  //       );
  //       setProfileData(response.data);
  //     } catch (error) {
  //       console.error("There was an error fetching the profile data!", error);
  //     }
  //   };
  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/teachers/profile",
        {
          params: {
            email: loggedInTeacher,
          },
        }
      );
      setProfileData(response.data);
    } catch (error) {
      console.error("There was an error fetching the profile data!", error);
    }
  };

  return (
    <div className="teacher-profile-container">
      <TeacherSidebar />
      <div className="teacher-profile-content">
        <h2>Profile</h2>
        <div className="teacher-profile-card">
          <h3>{profileData.name}</h3>
          <p>Email: {profileData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
