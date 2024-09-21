import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import TaskableWelcome from "./components/TaskableWelcome";
import TaskifyProfile from "./components/TaskifyProfile";
import VerifyIdentity from "./components/VerifyIdentity";
import Dashboard from "./components/dashboard";

// Menubar component
function MenuBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div>
        <Link to="/" style={{ marginRight: "20px" }}>
          Home
        </Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Router>
        {/* Render the MenuBar */}
        {/* <MenuBar /> */}

        <Routes>
          <Route path="/" element={<TaskableWelcome />} />
          <Route path="/profile" element={<TaskifyProfile />} />
          <Route path="/verify" element={<VerifyIdentity />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <h1>TEST</h1>
    </>
  );
}
