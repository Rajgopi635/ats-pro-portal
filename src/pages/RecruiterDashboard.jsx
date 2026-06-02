import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function RecruiterDashboard() {

  const [candidates, setCandidates] =
    useState([]);

  const [submissions, setSubmissions] =
    useState([]);

  useEffect(() => {

    fetchCandidates();
    fetchSubmissions();

  }, []);

  async function fetchCandidates() {

    const {
  data: { user }
} = await supabase.auth.getUser();

    const { data } =
  await supabase
    .from("candidates")
    .select("*")
    .eq(
      "created_by",
      user.email
    );

    setCandidates(data || []);

  }

  async function fetchSubmissions() {

    const { data } =
      await supabase
        .from("candidate_submissions")
        .select("*");

    setSubmissions(data || []);

  }

const myCandidateIds =
  candidates.map(
    (c) => c.id
  );

const mySubmissions =
  submissions.filter(
    (s) =>
      myCandidateIds.includes(
        s.candidate_id
      )
  );

const interviewCount =
  mySubmissions.filter(
    (s) =>
      s.interview_slot_received ===
      "Yes"
  ).length;

const selectedCount =
  mySubmissions.filter(
    (s) =>
      s.interview_status ===
      "Selected"
  ).length;

  const activeCandidates =
  candidates.filter(
    (c) =>
      c.status === "Active"
  ).length;

const sevenDaysAgo =
  new Date();

sevenDaysAgo.setDate(
  sevenDaysAgo.getDate() - 7
);

const recentlyAdded =
  candidates.filter(
    (c) =>
      new Date(
        c.created_at
      ) >= sevenDaysAgo
  ).length;

  const recentCandidates =
  [...candidates]
    .sort(
      (a, b) =>
        new Date(b.created_at) -
        new Date(a.created_at)
    )
    .slice(0, 5);

  return (

    <div className="dashboard">

      <div className="topbar">
        <h1>
          Recruiter Dashboard
        </h1>
      </div>

      <div className="cards">

        <div className="card">
          <h3>My Candidates</h3>
          <p>{candidates.length}</p>
        </div>

        <div className="card">
          <h3>Interviews</h3>
          <p>{interviewCount}</p>
        </div>

        <div className="card">
          <h3>Selected</h3>
          <p>{selectedCount}</p>
        </div>

      </div>
<div className="table-section">

  <div className="table-header">
    Recently Added Candidates
  </div>

  <table>

    <thead>

      <tr>
        <th>Name</th>
        <th>Technology</th>
        <th>Status</th>
        <th>Added On</th>
      </tr>

    </thead>

    <tbody>

      {recentCandidates.length > 0 ? (

        recentCandidates.map(
          (candidate) => (

            <tr key={candidate.id}>

              <td>
                {candidate.candidate_name}
              </td>

              <td>
                {candidate.technology}
              </td>

              <td>
                {candidate.status}
              </td>

              <td>
                {new Date(
                  candidate.created_at
                ).toLocaleDateString()}
              </td>

            </tr>

          )
        )

      ) : (

        <tr>

          <td
            colSpan="4"
            style={{
              textAlign: "center"
            }}
          >
            No Candidates Found
          </td>

        </tr>

      )}

    </tbody>

  </table>

</div>
    </div>

  );
}

export default RecruiterDashboard;