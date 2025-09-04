import React, { useState } from "react";
import Button from "./Button.js";
import { useNavigate } from "react-router-dom"; // <-- NEW: Import the navigate hook
import logins from "./dummyLogins.json";

const Login = ({ switchView, handleCustomerLoginSuccess, handleAgentLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.form) {
      setErrors((prev) => ({ ...prev, [name]: "", form: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username)
      newErrors.username = "Username or Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  const { username, password } = formData;

  // ✅ Make sure logins exists
  if (!logins) {
    setErrors({ form: "Login data not loaded yet." });
    return;
  }

  // ✅ Customer login check
  if (
    username === logins.customer?.username &&
    password === logins.customer?.password
  ) {
    handleCustomerLoginSuccess();
    switchView("customer-dashboard");
    return;
  }

  // ✅ Agent login check without using .find()
  let isAgent = false;
  if (Array.isArray(logins.agents)) {
    for (let i = 0; i < logins.agents.length; i++) {
      const agent = logins.agents[i];
      if (agent.username === username && agent.password === password) {
        isAgent = true;
        break;
      }
    }
  }

  if (isAgent) {
    handleAgentLoginSuccess();
    navigate("/agent/dashboard");
    return;
  }

  // ❌ If nothing matches
  setErrors({ form: "Invalid username or password." });
};


  return (
    <div className="auth-form-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {errors.form && (
            <div className="form-group">
              <span className="error-message">{errors.form}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Email or Agent ID
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`form-input ${errors.username ? "error" : ""}`}
              placeholder="Enter your email or ID"
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? "error" : ""}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="password-toggle-button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {/* --- MODIFIED: Use SVG icons instead of text --- */}
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                className="checkbox-input"
              />
              <span className="checkbox-text">Remember me</span>
            </label>
          </div>

          <Button type="submit" variant="primary" fullWidth>
            Sign In
          </Button>

          <div className="auth-footer">
            <div className="forgot-password">
              <button className="link-button">Forgot your password?</button>
            </div>
            <div className="signup-section">
              <p>Don't have an account?</p>
              <button
                className="link-button primary-link"
                onClick={() => switchView("customer-signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
