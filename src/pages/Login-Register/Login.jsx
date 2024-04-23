import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-formContainer">
        <div>
          <div className="title-logo">
            <h1 className="logo">🗣️</h1>
            <h1 className="title">Shopper</h1>
          </div>
          <form className="register-form">
            <h1>
              <strong>Sign In</strong>
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
            <button
              className="register-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}{" "}
              {/* Prevents the button from being spam clicked */}
            </button>
          </form>
          <p className="register-login-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
