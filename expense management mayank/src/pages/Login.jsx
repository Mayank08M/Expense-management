import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/login.module.css";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      emailAddress: email,
      password: password,
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Login successful!", {
          position: "top-center",
          autoClose: 3000, // Toast disappears after 3 seconds
        });
        console.log("Login successful:", data);
        // You can redirect the user or store the token in localStorage
      } else {
        toast.error(data.message || "Login failed. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
        console.error("Login failed:", data);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <>
      <Navbar />
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
      <ToastContainer /> {/* Ensure this is included */}
    </>
  );
};

export default Login;
