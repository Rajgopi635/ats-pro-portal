import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function AddCandidateModal({
  closeModal,
  refreshCandidates
}) {

  const [formData, setFormData] =
    useState({

      candidate_name: "",
      email: "",
      phone: "",
      technology: "",
      experience: "",
      location: "",

      current_ctc: "",
      expected_ctc: "",
      notice_period: "",

      resume_link: "",

      status: "Available"
    });

  const [recruiters, setRecruiters] =
    useState([]);

  const [currentUserRole, setCurrentUserRole] =
    useState("");

  const [selectedRecruiter, setSelectedRecruiter] =
    useState("");

  useEffect(() => {
    loadRecruiters();
  }, []);

  async function loadRecruiters() {

    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { data: currentUser } =
      await supabase
        .from("users")
        .select("role")
        .eq("email", user.email)
        .single();

    setCurrentUserRole(
      currentUser?.role || ""
    );

    const { data } =
      await supabase
        .from("users")
        .select("email")
        .eq("role", "recruiter");

    setRecruiters(data || []);

  }

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }

  async function saveCandidate() {

    if (
      !formData.candidate_name ||
      !formData.technology
    ) {
      alert(
        "Candidate Name & Technology Required"
      );
      return;
    }

    const {
      data: { user }
    } = await supabase.auth.getUser();

    const assignedRecruiter =
      currentUserRole === "admin"
        ? selectedRecruiter
        : user.email;

    if (
      currentUserRole === "admin" &&
      !selectedRecruiter
    ) {
      alert(
        "Please assign a recruiter."
      );
      return;
    }

    const { error } =
      await supabase
        .from("candidates")
        .insert([
          {
            ...formData,

            created_by: user.email,

            assigned_to:
              assignedRecruiter
          }
        ]);

    if (!error) {

      refreshCandidates();

      closeModal();

    } else {

      alert(error.message);

    }

  }

  return (

    <div className="modal-overlay">

      <div className="candidate-modal">

        <h2>Add Candidate</h2>

        <div className="form-grid">

          <input
            placeholder="Candidate Name"
            name="candidate_name"
            onChange={handleChange}
          />

          <input
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />

          <input
            placeholder="Phone"
            name="phone"
            onChange={handleChange}
          />

          <input
            placeholder="Technology"
            name="technology"
            onChange={handleChange}
          />

          <input
            placeholder="Experience"
            name="experience"
            onChange={handleChange}
          />

          <input
            placeholder="Location"
            name="location"
            onChange={handleChange}
          />

          <input
            placeholder="Current CTC"
            name="current_ctc"
            onChange={handleChange}
          />

          <input
            placeholder="Expected CTC"
            name="expected_ctc"
            onChange={handleChange}
          />

          <input
            placeholder="Notice Period"
            name="notice_period"
            onChange={handleChange}
          />

          <input
            placeholder="Resume Link"
            name="resume_link"
            onChange={handleChange}
          />

          <select
            className="custom-select"
            name="status"
            onChange={handleChange}
          >

            <option>
              Available
            </option>

            <option>
              Submitted
            </option>

            <option>
              Interview
            </option>

            <option>
              Placed
            </option>

            <option>
              Inactive
            </option>

          </select>

          {currentUserRole === "admin" && (

            <select
              className="custom-select"
              value={selectedRecruiter}
              onChange={(e) =>
                setSelectedRecruiter(
                  e.target.value
                )
              }
            >

              <option value="">
                Assign Recruiter
              </option>

              {recruiters.map(
                (r) => (

                  <option
                    key={r.email}
                    value={r.email}
                  >
                    {r.email}
                  </option>

                )
              )}

            </select>

          )}

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
            onClick={saveCandidate}
          >
            Save Candidate
          </button>

        </div>

      </div>

    </div>

  );
}

export default AddCandidateModal;