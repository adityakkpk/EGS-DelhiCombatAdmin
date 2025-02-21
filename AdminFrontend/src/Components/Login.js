import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:8081/login", values)
      .then((res) => {
        console.log("dashboard");
        if (res.data === "Success") {
          navigate("/dashboard");
        } else {
          alert("No record found  ");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleInputs = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  return (
    <div className="login">
      <div className="login-container">
        <h1>Sign In To DashBoard</h1>
        <h2>Delhi Combat</h2>
        <input
          type="text"
          id="userName"
          name="userName"
          onChange={handleInputs}
          placeholder="Enter UserName"
          className="input-field"
        />

        <input
          type="password"
          id="password"
          name="password"
          onChange={handleInputs}
          placeholder="Enter Password"
          className="input-field"
        />

        <Link to="/dashboard" className="submitButton" onClick={handleSubmit}>
          Sign in
        </Link>
      </div>
    </div>
  );
}
