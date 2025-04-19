import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register">
      <div className="register-header">Register</div>

      <div className="register-container">
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              className="register-input"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="register-input"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="register-input"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="Register" className="register-submit" />
          </form>

          <p className="register-footer">
            Already have an account ? back to{" "}
            <a href="/" className="register-link">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
