import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function SalesDashboard() {

  const [requirements, setRequirements] =
    useState([]);

  const [submissions, setSubmissions] =
    useState([]);

  useEffect(() => {

    fetchRequirements();
    fetchSubmissions();

  }, []);

  async function fetchRequirements() {

    const { data } =
      await supabase
        .from("requirements")
        .select("*");

    setRequirements(data || []);

  }

  async function fetchSubmissions() {

    const { data } =
      await supabase
        .from("candidate_submissions")
        .select("*");

    setSubmissions(data || []);

  }

  const openRequirements =
    requirements.filter(
      (r) =>
        r.status === "Open"
    ).length;

  const selectedCount =
    submissions.filter(
      (s) =>
        s.interview_status ===
        "Selected"
    ).length;

  return (

    <div className="dashboard">

      <div className="topbar">
        <h1>
          Sales Dashboard
        </h1>
      </div>

      <div className="cards">

        <div className="card">
          <h3>Total Requirements</h3>
          <p>{requirements.length}</p>
        </div>

        <div className="card">
          <h3>Open Requirements</h3>
          <p>{openRequirements}</p>
        </div>

        <div className="card">
          <h3>Total Submissions</h3>
          <p>{submissions.length}</p>
        </div>

        <div className="card">
          <h3>Selected</h3>
          <p>{selectedCount}</p>
        </div>

      </div>

    </div>

  );
}

export default SalesDashboard;