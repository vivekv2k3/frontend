import React, { useState } from "react";
import Login from "./Login";
import CustomerSignUp from "./CustomerSignUp";

// NEW: Import the specific CSS for this page right here.
import "./Auth.css";

// It now accepts the handleLoginSuccess function as a prop
// ... imports

// It no longer receives or passes the agent login handler
const AuthPage = ({ handleCustomerLoginSuccess , handleAgentLoginSuccess }) => {
  const [currentView, setCurrentView] = useState("login");

  const switchView = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="auth-page">
    <div className="auth-container auth-background">
      {currentView === 'login' && (
        <Login 
          switchView={switchView} 
          handleCustomerLoginSuccess={handleCustomerLoginSuccess}
          handleAgentLoginSuccess={handleAgentLoginSuccess}
        />
      )}
      {currentView === 'customer-signup' && (
        <CustomerSignUp switchView={switchView} />
      )}
    </div>
    </div>
  );
};

export default AuthPage;