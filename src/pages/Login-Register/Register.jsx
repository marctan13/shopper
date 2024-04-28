import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Register.css"
import { useShopContext } from "../../contexts/ShopContext";

function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const verifyPasswordRef = useRef();
  const navigate = useNavigate();
  const {cartItems} = useShopContext();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifyPasswordError, setVerifyPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const verifyPassword = verifyPasswordRef.current.value;

    // Validate passwords...
    if (password !== verifyPassword) {
      setVerifyPasswordError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // Make HTTP request to register endpoint
      const response = await fetch("http://localhost:5173/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          cartItems, // Include cartItems in the registration request payload
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
        // Redirect user to login page
        navigate("/login");
      } else {
        setMessage("Registration failed. Please try again later.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Registration failed. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-formContainer">
        <div>
          <div className="title-logo">
            <h1 className="logo">🗣️</h1>
            <h1 className="title">Shopper</h1>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <h1>
              <strong>Register Account</strong>
            </h1>
            <input
              required
              type="email"
              ref={emailRef}
              placeholder="Email"
              className="register-input"
            />
            <input
              required
              type="password"
              placeholder="Password"
              ref={passwordRef}
              className="register-input"
            />
            {passwordStrength && (
              <div className="register-error">{passwordStrength}</div>
            )}
            <input
              required
              type="password"
              placeholder="Verify Password"
              ref={verifyPasswordRef}
              className="register-input"
            />
            {verifyPasswordError && (
              <div className="register-error">{verifyPasswordError}</div>
            )}
            <button
              className="register-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}{" "}
            </button>
          </form>
          <p className="register-login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
