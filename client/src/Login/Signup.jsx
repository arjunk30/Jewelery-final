import React, { useRef, useEffect, useState } from "react";
import "./Signup.css"; // Assuming you want to keep the file name for styles
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const loginRef = useRef(null);
  const profileRef = useRef(null);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending Data:", user);

    try {
      const result = await axios.post("http://localhost:3001/login", user);
      console.log("Login Response:", result);

      const role = result?.data?.role;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/home");
      } else {
        alert("Unknown role received from server");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  // Animation setup
  useEffect(() => {
    const handleClick = () => {
      requestAnimationFrame(() => {
        loginRef.current?.classList.remove("hide-login");
        formRef.current?.classList.remove("hide-form");
      });

      setTimeout(() => {
        sectionRef.current?.classList.remove("hide-section");
      }, 1000);
    };

    const profileEl = profileRef.current;
    profileEl?.addEventListener("click", handleClick);

    return () => {
      profileEl?.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="boo">
      <div className="login hide-login" ref={loginRef}>
        <form
          onSubmit={handleSubmit}
          className="login-container hide-form"
          autoComplete="off"
          ref={formRef}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            alt="user icon"
            ref={profileRef}
          />
          <div className="input-container hide-section" ref={sectionRef}>
            <p>
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={user.email}
                onChange={inputHandler}
              />
            </p>
            <p>
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                value={user.password}
                onChange={inputHandler}
              />
            </p>
            <p>
              <input type="submit" value="Log in" />
            </p>
            <p>
              New user?{" "}
              <Link className="link" to="/register">
                Register now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
