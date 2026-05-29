import { useState } from "react";
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

    const { error } = await supabase
      .from("candidates")
      .insert([formData]);

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