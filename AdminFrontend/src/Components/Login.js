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
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    Axios.post("https://egs-delhicombatadmin.onrender.com/api/login", values)
      .then((res) => {
        console.log("dashboard");
        if (res.data === "Success") {
          navigate("/dashboard");
          setLoading(false);
        } else {
          alert("No record found  ");
          setLoading(false);
        }
      })
      .catch((err) =>{ 
        console.log(err)
        setLoading(false);
      });
  };
  const handleInputs = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  if (loading) return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
  
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
