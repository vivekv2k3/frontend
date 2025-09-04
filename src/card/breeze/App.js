import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BreezeCreditCard from "./BreezeCreditCard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Root shows BreezeCreditCard directly */}
        <Route path="/" element={<BreezeCreditCard />} />

        {/* You can still keep a separate route if you want */}
        <Route path="/breeze" element={<BreezeCreditCard />} />
      </Routes>
    </Router>
  );
}

export default App;
