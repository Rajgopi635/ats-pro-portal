import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function AddSubmissionModal({
  closeModal,
  refreshSubmissions
}) {

  const [requirements, setRequirements] =
    useState([]);

  const [candidates, setCandidates] =
    useState([]);

  const [selectedRequirement,
    setSelectedRequirement] =
    useState(null);

  const [selectedCandidate,
    setSelectedCandidate] =
    useState(null);

  const [formData, setFormData] =
    useState({

      requirement_id: "",

      candidate_id: "",

      candidate_name: "",

      job_title: "",

      client: "",

      rate: "",

      submission_date: "",

      interview_slot_received: "No",

      interview_date: "",

      interview_status: "Pending",

      feedback_remarks: ""

    });

  useEffect(() => {

    fetchRequirements();

    fetchCandidates();

  }, []);

  async function fetchRequirements() {

    const { data } = await supabase
      .from("requirements")
      .select("*")
      .order("id", { ascending: false });

    setRequirements(data || []);
  }

  async function fetchCandidates() {

    const { data } = await supabase
      .from("candidates")
      .select("*")
      .order("candidate_name");

    setCandidates(data || []);
  }

  function handleRequirementChange(e) {

    const requirementId =
      e.target.value;

    const req =
      requirements.find(
        (r) =>
          r.id == requirementId
      );

    if (!req) return;

    setSelectedRequirement(req);

    setFormData({
      ...formData,

      requirement_id:
        requirementId,

      job_title:
        req.job_title,

      client:
        req.client,

      rate:
        req.budget_rate
    });
  }

  function handleCandidateChange(e) {

    const candidateId =
      e.target.value;

    const candidate =
      candidates.find(
        (c) =>
          c.id == candidateId
      );

    if (!candidate) return;

    setSelectedCandidate(
      candidate
    );

    setFormData({
      ...formData,

      candidate_id:
        candidate.id,

      candidate_name:
        candidate.candidate_name
    });
  }

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  }

  async function saveSubmission() {

    if (

      !formData.requirement_id ||

      !formData.candidate_id ||

      !formData.submission_date

    ) {

      alert(
        "Please fill all required fields"
      );

      return;
    }

    const { error } =
      await supabase
        .from(
          "candidate_submissions"
        )
        .insert([formData]);

    if (!error) {

      refreshSubmissions();

      closeModal();

    } else {

      alert(error.message);
    }
  }

  return (

    <div className="modal-overlay">

      <div className="submission-modal">

        <h2>
          Add Candidate Submission
        </h2>

        <div className="form-grid">

          {/* Requirement */}

          <div>

            <label className="field-label">

              Requirement

            </label>

            <select
              className="custom-select"
              onChange={
                handleRequirementChange
              }
            >

              <option value="">
                Select Requirement
              </option>

              {requirements.map(
                (req) => (

                  <option
                    key={req.id}
                    value={req.id}
                  >

                    {req.job_title}
                    {" - "}
                    {req.client}

                  </option>

                )
              )}

            </select>

          </div>

          {/* Candidate */}

          <div>

            <label className="field-label">

              Candidate

            </label>

            <select
              className="custom-select"
              onChange={
                handleCandidateChange
              }
            >

              <option value="">
                Select Candidate
              </option>

              {candidates.map(
                (candidate) => (

                  <option
                    key={
                      candidate.id
                    }
                    value={
                      candidate.id
                    }
                  >

                    {
                      candidate.candidate_name
                    }

                  </option>

                )
              )}

            </select>

          </div>

          {/* Candidate Preview */}

          {selectedCandidate && (

            <div
              className="candidate-preview"
            >

              <p>

                <strong>
                  Email:
                </strong>{" "}

                {
                  selectedCandidate.email
                }

              </p>

              <p>

                <strong>
                  Phone:
                </strong>{" "}

                {
                  selectedCandidate.phone
                }

              </p>

              <p>

                <strong>
                  Technology:
                </strong>{" "}

                {
                  selectedCandidate.technology
                }

              </p>

              <p>

                <strong>
                  Experience:
                </strong>{" "}

                {
                  selectedCandidate.experience
                }

              </p>

            </div>

          )}

          {/* Requirement Preview */}

          {selectedRequirement && (

            <div
              className="candidate-preview"
            >

              <p>

                <strong>
                  Job Title:
                </strong>{" "}

                {
                  selectedRequirement.job_title
                }

              </p>

              <p>

                <strong>
                  Client:
                </strong>{" "}

                {
                  selectedRequirement.client
                }

              </p>

              <p>

                <strong>
                  Budget:
                </strong>{" "}

                {
                  selectedRequirement.budget_rate
                }

              </p>

            </div>

          )}

          <div>

            <label className="field-label">

              Submission Date

            </label>

            <input
              type="date"
              name="submission_date"
              onChange={
                handleChange
              }
            />

          </div>

          <div>

            <label className="field-label">

              Interview Slot Received

            </label>

            <select
              className="custom-select"
              name="interview_slot_received"
              onChange={
                handleChange
              }
            >

              <option>
                No
              </option>

              <option>
                Yes
              </option>

            </select>

          </div>

          <div>

            <label className="field-label">

              Interview Date

            </label>

            <input
              type="date"
              name="interview_date"
              onChange={
                handleChange
              }
            />

          </div>

          <div>

            <label className="field-label">

              Interview Status

            </label>

            <select
              className="custom-select"
              name="interview_status"
              onChange={
                handleChange
              }
            >

              <option>
                Pending
              </option>

              <option>
                Scheduled
              </option>

              <option>
                Selected
              </option>

              <option>
                Rejected
              </option>

            </select>

          </div>

          <div>

            <label className="field-label">

              Feedback / Remarks

            </label>

            <textarea
              className="remarks-box"
              placeholder="Feedback / Remarks"
              name="feedback_remarks"
              onChange={
                handleChange
              }
            />

          </div>

        </div>

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={closeModal}
          >

            Cancel

          </button>

          <button
            className="save-btn"
            onClick={saveSubmission}
          >

            Save Submission

          </button>

        </div>

      </div>

    </div>
  );
}

export default AddSubmissionModal;