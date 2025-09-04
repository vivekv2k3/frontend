import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EvergreenCreditCard from "./EvergreenCreditCard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Root directly loads EvergreenCreditCard */}
        <Route path="/" element={<EvergreenCreditCard />} />
      </Routes>
    </Router>
  );
}

export default App;
 