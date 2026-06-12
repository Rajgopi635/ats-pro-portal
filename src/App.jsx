import { useEffect, useState } from "react";
import { FaBrain, FaCode, FaDatabase } from "react-icons/fa";
import Dashboard from "./pages/Dashboard";
import Requirements from "./pages/Requirements";
import Candidates from "./pages/Candidates";
import Submissions from "./pages/Submissions";
import Login from "./pages/Login";
import { supabase } from "./services/supabase";
import AdminDashboard from "./pages/AdminDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import SalesDashboard from "./pages/SalesDashboard";

import {
  LayoutDashboard,
  BriefcaseBusiness,
  Users,
  FileText
} from "lucide-react";

function App() {

  const [activePage, setActivePage] =
    useState("dashboard");

  const [user, setUser] =
    useState(null);

  const [userRole, setUserRole] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    checkUser();

    const {
      data: authListener
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {

        const currentUser =
          session?.user || null;

        setUser(currentUser);

        if (currentUser) {

          fetchUserRole(
            currentUser.email
          );

        }

      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };

  }, []);

  async function fetchUserRole(email) {

  console.log("Logged In Email:", email);

  const { data, error } =
    await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

  console.log("Role Data:", data);
  console.log("Role Error:", error);

  if (error) {
    return;
  }

  setUserRole(data.role);
}

  async function checkUser() {

    const {
      data: { session }
    } = await supabase.auth.getSession();

    const currentUser =
      session?.user || null;

    setUser(currentUser);

    if (currentUser) {

      await fetchUserRole(
        currentUser.email
      );

    }

    setLoading(false);
  }

  async function handleLogout() {

    await supabase.auth.signOut();

    setUser(null);
    setUserRole("");
  }

  if (loading) {

    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        Loading...
      </div>
    );

  }

  if (!user) {

    return (
      <Login
        onLogin={setUser}
      />
    );

  }

  return (

    <div className="app-layout">

      <div className="sidebar">

        <div>

          <h1>ATS PRO</h1>

          <p>Recruitment Portal</p>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              marginBottom: "20px"
            }}
          >
            Role: {userRole}
          </p>

          <div
            className={`menu-item ${
              activePage === "dashboard"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage(
                "dashboard"
              )
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </div>

          {userRole !== "recruiter" && (
  <div
    className={`menu-item ${
      activePage === "requirements"
        ? "active"
        : ""
    }`}
    onClick={() =>
      setActivePage(
        "requirements"
      )
    }
  >
    <BriefcaseBusiness size={20} />
    Requirements
  </div>
)}

          <div
            className={`menu-item ${
              activePage === "candidates"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage(
                "candidates"
              )
            }
          >
            <Users size={20} />
            Candidates
          </div>

          {userRole !== "recruiter" && (
  <div
    className={`menu-item ${
      activePage === "submissions"
        ? "active"
        : ""
    }`}
    onClick={() =>
      setActivePage(
        "submissions"
      )
    }
  >
    <FileText size={20} />
    Submissions
  </div>
)}

        </div>

        <div className="sidebar-footer">

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

          <div className="footer-title">
            ATS PRO v1.0
          </div>

          <div className="footer-copy">
            © 2026 All Rights Reserved
          </div>

        </div>

      </div>

      <div className="main-content">

  {activePage === "dashboard" &&
 userRole === "admin" && (
  <AdminDashboard
    userRole={userRole}
  />
)}

{activePage === "dashboard" &&
 userRole === "recruiter" && (
  <RecruiterDashboard />
)}

{activePage === "dashboard" &&
 userRole === "sales" && (
  <SalesDashboard />
)}

  {activePage ===
  "requirements" &&
  userRole !== "recruiter" && (
  <Requirements
    userRole={userRole}
  />
)}

  {activePage ===
    "candidates" && (
    <Candidates
      userRole={userRole}
    />
  )}

  {activePage ===
    "submissions" &&
    userRole !== "recruiter" && (
    <Submissions />
  )}

</div>

    </div>

  );
}

export default App;