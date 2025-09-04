import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import CustomerProfile from "./components/CustomerProfile";
import HelpPage from "./HelpPage";
import Homepage from "./vivek-vasanth/Homepage";
import "./arijeet/Auth.css";
import AuthPage from "./arijeet/AuthPage";
import MainLayout from "./MainLayout";
import AgentPortal from "./sam/AgentPortal";
import ProtectedRoute from "./ProtectedRoute";
import MultiStepForm from "./prasanth/MultiStepForm";
import CreditCardPage from "./card/ultimate/UltimateCreditCardMerged";
import ParisCreditCardPage from "./card/paris/ParisPlatCreditCard";
import BreezeCreditCardPage from "./card/breeze/BreezeCreditCard";
import EvergreenCreditCardPage from "./card/evergreen/EvergreenCreditCard";
import ScrollToTop from "./ScrollToTop";


// This is the main App component that now manages state
const AppContent = () => {
  // ... (all your state and handler functions remain the same)
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAgentSignedIn, setIsAgentSignedIn] = useState(false);
  const navigate = useNavigate();

  const handleCustomerLoginSuccess = () => {
    setIsSignedIn(true);
    navigate("/");
  };

  const handleAgentLoginSuccess = () => {
    setIsAgentSignedIn(true);
    navigate("/agent/dashboard");
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setIsAgentSignedIn(false);
    navigate("/");
  };

  return (
    <Routes>
      {/* --- Routes WITH Navbar --- */}
      <Route
        element={
          <MainLayout isSignedIn={isSignedIn} handleSignOut={handleSignOut} />
        }
      >
        <Route path="/" element={<Homepage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAllowed={isSignedIn}>
              <CustomerProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/help" element={<HelpPage />} />
        <Route
          path="/apply"
          element={
            <ProtectedRoute isAllowed={isSignedIn}>
              <MultiStepForm />
            </ProtectedRoute>
          }
        />
        <Route path="/cards/ultimate-details" element={<CreditCardPage />} />
        <Route path="/cards/paris-details" element={<ParisCreditCardPage />} />
        <Route
          path="/cards/breeze-details"
          element={<BreezeCreditCardPage />}
        />
        <Route
          path="/cards/evergreen-details"
          element={<EvergreenCreditCardPage />}
        />{" "}
        {/* <-- 2. ADD THE NEW ROUTE FOR EVERGREEN */}
      </Route>
      <Route
        path="/login"
        element={
          <AuthPage
            handleCustomerLoginSuccess={handleCustomerLoginSuccess}
            handleAgentLoginSuccess={handleAgentLoginSuccess}
          />
        }
      />
      <Route
        path="/agent/dashboard"
        element={
          <ProtectedRoute isAllowed={isAgentSignedIn}>
            <AgentPortal handleSignOut={handleSignOut} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

// We wrap the AppContent in the Router
const App = () => (
  <Router>
    <ScrollToTop /> {/* <-- MOVE THE COMPONENT HERE */}
    <AppContent />
  </Router>
);

export default App;
