import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("https://your-api-endpoint.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        // Handle success (e.g., navigate to another page or store token in localStorage)
      } else {
        console.error("Login failed:", response.status);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.wrapper}>
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className={styles.inputfield}>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Enter your email</label>
            </div>
            <div className={styles.inputfield}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Enter your password</label>
            </div>
            <div className={styles.forget}>
              <label htmlFor="remember">
                <input type="checkbox" id={styles.remember} />
                <p>Remember me</p>
              </label>
              <a href="#" style={{ color: "#1976d2" }}>
                Forgot password?
              </a>
            </div>
            <button type="submit">Log In</button>
            <div className={styles.register}>
              <p>
                Don't have an account?{" "}
                <Link to="/signup" style={{ color: "#1976d2" }}>
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
