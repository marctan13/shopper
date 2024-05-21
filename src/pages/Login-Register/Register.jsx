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
  
    // Validate emails and passwords here...
  
    try {
      setLoading(true);
  
      // Make HTTP request to register endpoint
      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        console.log("Data:", data);
        setMessage(data.error || "Registration failed. Please try again later.");
      } else {
        setMessage("Registration successful!");
        // Redirect user to login page
        navigate("/login");
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
