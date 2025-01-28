import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/login.module.css";
import Navbar from "../components/Navbar";

const SignUp = () => {
  const [fullName, setFullName] = useState(""); // For full name
  const [email, setEmail] = useState(""); // For email
  const [password, setPassword] = useState(""); // For password
  const [rePassword, setRePassword] = useState(""); // For re-entering password
  const [mobileNumber, setMobileNumber] = useState(""); // For mobile number

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate that both passwords match
    if (password !== rePassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      fullName: fullName,
      email: email,
      password: password,
      mobileNumber: mobileNumber,
    };

    try {
      const response = await fetch("https://your-api-endpoint.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Sign-up successful:", data);
        // Handle success (e.g., navigate to another page or show success message)
      } else {
        console.error("Sign-up failed:", response.status);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error occurred during sign-up:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.wrapper}>
          <form onSubmit={handleSignUp}>
            <h2>Sign Up</h2>

            {/* Full Name Input */}
            <div className={styles.inputfield}>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <label>Enter your full name</label>
            </div>

            {/* Email Input */}
            <div className={styles.inputfield}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Enter your email</label>
            </div>

            {/* Password Input */}
            <div className={styles.inputfield}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Enter your password</label>
            </div>

            {/* Re-enter Password Input */}
            <div className={styles.inputfield}>
              <input
                type="password"
                required
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
              <label>Re-enter your password</label>
            </div>

            {/* Mobile Number Input */}
            <div className={styles.inputfield}>
              <input
                type="tel"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                pattern="[0-9]{10}" // Ensures only 10-digit numbers are accepted
                title="Enter a valid 10-digit mobile number"
              />
              <label>Enter your mobile number</label>
            </div>

            <button type="submit">Sign Up</button>

            {/* Login Redirect */}
            <div className={styles.register}>
              <p>
                Already signed up?{" "}
                <Link to="/login" style={{ color: "#1976d2" }}>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
