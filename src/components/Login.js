import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (userType === "admin") {
        response = await axios.post(`http://localhost:8080/api/admin/login`, {
          email,
          password,
        });
      } else if (userType === "teacher") {
        response = await axios.post(
          `http://localhost:8080/api/teachers/login`,
          {
            email,
            password,
          }
        );
      } else if (userType === "student") {
        response = await axios.post(
          `http://localhost:8080/api/students/login`,
          {
            registrationNumber,
            password,
          }
        );
      }

      setMessage(response.data);
      if (response.data === "Login successful") {
        alert(response.data);
        if (userType === "admin") {
          navigate("/admin/dashboard");
        } else if (userType === "teacher") {
          navigate("/teacher/dashboard");
        } else if (userType === "student") {
          navigate("/student/dashboard");
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      setMessage("Invalid credentials");
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login as {userType}</h2>
      <form onSubmit={handleSubmit}>
        {(userType === "admin" || userType === "teacher") && (
          <>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </>
        )}
        {userType === "student" && (
          <>
            <div>
              <label>Registration Number:</label>
              <input
                type="text"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
