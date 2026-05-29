import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Requirements from "./pages/Requirements";
import Candidates from "./pages/Candidates";
import Submissions from "./pages/Submissions";

import {
  LayoutDashboard,
  BriefcaseBusiness,
  Users,
  FileText
} from "lucide-react";

function App() {

  const [activePage, setActivePage] =
    useState("dashboard");

  return (

    <div className="app-layout">

      <div className="sidebar">

        <h1>ATS PRO</h1>

        <p>Recruitment Portal</p>

        <div
          className={`menu-item ${
            activePage === "dashboard"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActivePage("dashboard")
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </div>

        <div
          className={`menu-item ${
            activePage === "requirements"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActivePage("requirements")
          }
        >
          <BriefcaseBusiness size={20} />
          Requirements
        </div>

        <div
          className={`menu-item ${
            activePage === "candidates"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActivePage("candidates")
          }
        >
          <Users size={20} />
          Candidates
        </div>

        <div
          className={`menu-item ${
            activePage === "submissions"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActivePage("submissions")
          }
        >
          <FileText size={20} />
          Submissions
        </div>

      </div>

      <div className="main-content">

        {activePage === "dashboard" && (
          <Dashboard />
        )}

        {activePage === "requirements" && (
          <Requirements />
        )}

        {activePage === "candidates" && (
          <Candidates />
        )}

        {activePage === "submissions" && (
          <Submissions />
        )}

      </div>

    </div>

  );
}

export default App;