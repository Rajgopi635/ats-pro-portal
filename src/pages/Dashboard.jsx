import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import AddRequirementModal from "../components/AddRequirementModal";
import AddSubmissionModal from "../components/AddSubmissionModal";

function Dashboard() {

  const [requirements, setRequirements] =
    useState([]);

  const [submissions, setSubmissions] =
    useState([]);

  const [showRequirementModal,
    setShowRequirementModal] =
    useState(false);

  const [showSubmissionModal,
    setShowSubmissionModal] =
    useState(false);

  const [activeView,
    setActiveView] =
    useState("requirements");

  const [filteredData,
    setFilteredData] =
    useState([]);

  useEffect(() => {

    fetchRequirements();
    fetchSubmissions();

  }, []);

  useEffect(() => {

    if (activeView === "requirements") {

      setFilteredData(requirements);

    } else if (
      activeView === "submissions"
    ) {

      setFilteredData(submissions);

    } else if (
      activeView === "interviews"
    ) {

      setFilteredData(

        submissions.filter(
          (s) =>
            s.interview_slot_received ===
            "Yes"
        )

      );

    } else if (
      activeView === "selected"
    ) {

      setFilteredData(

        submissions.filter(
          (s) =>
            s.interview_status ===
            "Selected"
        )

      );

    }

  }, [
    activeView,
    requirements,
    submissions
  ]);

  async function fetchRequirements() {

    const { data, error } =
      await supabase
        .from("requirements")
        .select("*")
        .order("id", {
          ascending: false
        });

    if (error) {

      console.log(error);
      return;

    }

    setRequirements(data || []);
  }

  async function fetchSubmissions() {

    const { data, error } =
      await supabase
        .from("candidate_submissions")
        .select("*")
        .order("id", {
          ascending: false
        });

    if (error) {

      console.log(error);
      return;

    }

    setSubmissions(data || []);
  }

  return (

    <div className="dashboard">

      <div className="topbar">

        <h1>ATS Dashboard</h1>

        <div className="top-buttons">

          <button
            className="add-btn"
            onClick={() =>
              setShowRequirementModal(
                true
              )
            }
          >
            + Add Requirement
          </button>

          <button
            className="add-btn"
            onClick={() =>
              setShowSubmissionModal(
                true
              )
            }
          >
            + Add Submission
          </button>

        </div>

      </div>

      <div className="cards">

        <div
          className="card"
          onClick={() =>
            setActiveView(
              "requirements"
            )
          }
        >
          <h3>
            Total Requirements
          </h3>

          <p>
            {requirements.length}
          </p>

        </div>

        <div
          className="card"
          onClick={() =>
            setActiveView(
              "submissions"
            )
          }
        >
          <h3>
            Total Submissions
          </h3>

          <p>
            {submissions.length}
          </p>

        </div>

        <div
          className="card"
          onClick={() =>
            setActiveView(
              "interviews"
            )
          }
        >
          <h3>
            Interviews
          </h3>

          <p>

            {
              submissions.filter(
                (s) =>
                  s.interview_slot_received ===
                  "Yes"
              ).length
            }

          </p>

        </div>

        <div
          className="card"
          onClick={() =>
            setActiveView(
              "selected"
            )
          }
        >
          <h3>
            Selected
          </h3>

          <p>

            {
              submissions.filter(
                (s) =>
                  s.interview_status ===
                  "Selected"
              ).length
            }

          </p>

        </div>

      </div>

      <div className="table-section">

        <div className="table-header">

          {activeView ===
          "requirements"

            ? "Requirements"

            : activeView ===
              "submissions"

            ? "All Submissions"

            : activeView ===
              "interviews"

            ? "Interview Candidates"

            : "Selected Candidates"}

        </div>

        <table>

          <thead>

            {activeView ===
            "requirements" ? (

              <tr>

                <th>
                  Job Title
                </th>

                <th>
                  Client
                </th>

                <th>
                  POC
                </th>

                <th>
                  Budget
                </th>

                <th>
                  Status
                </th>

                <th>
                  Created
                </th>

              </tr>

            ) : (

              <tr>

                <th>
                  Candidate
                </th>

                <th>
                  Job Title
                </th>

                <th>
                  Client
                </th>

                <th>
                  Status
                </th>

              </tr>

            )}

          </thead>

          <tbody>

            {filteredData.length >
            0 ? (

              filteredData.map(
                (item) =>

                  activeView ===
                  "requirements" ? (

                    <tr
                      key={item.id}
                    >

                      <td>
                        {
                          item.job_title
                        }
                      </td>

                      <td>
                        {
                          item.client
                        }
                      </td>

                      <td>
                        {item.poc}
                      </td>

                      <td>
                        {
                          item.budget_rate
                        }
                      </td>

                      <td>

                        <span className="status submitted">

                          {
                            item.status
                          }

                        </span>

                      </td>

                      <td>

                        {new Date(
                          item.created_at
                        ).toLocaleDateString()}

                      </td>

                    </tr>

                  ) : (

                    <tr
                      key={item.id}
                    >

                      <td>
                        {
                          item.candidate_name
                        }
                      </td>

                      <td>
                        {
                          item.job_title
                        }
                      </td>

                      <td>
                        {
                          item.client
                        }
                      </td>

                      <td>
                        {
                          item.interview_status
                        }
                      </td>

                    </tr>

                  )
              )

            ) : (

              <tr>

                <td
                  colSpan={
                    activeView ===
                    "requirements"
                      ? 6
                      : 4
                  }
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "20px"
                  }}
                >
                  No Data Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {showSubmissionModal && (

        <AddSubmissionModal
          closeModal={() =>
            setShowSubmissionModal(
              false
            )
          }
          refreshSubmissions={
            fetchSubmissions
          }
        />

      )}

    </div>

  );
}

export default Dashboard;