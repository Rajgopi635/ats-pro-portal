import { useState } from "react";
import { supabase } from "../services/supabase";

function EditCandidateModal({
  candidate,
  closeModal,
  refreshCandidates
}) {

  const [formData, setFormData] =
    useState(candidate);

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  }

  async function updateCandidate() {

    const { error } =
      await supabase
        .from("candidates")
        .update({

          candidate_name:
            formData.candidate_name,

          email:
            formData.email,

          phone:
            formData.phone,

          technology:
            formData.technology,

          experience:
            formData.experience,

          location:
            formData.location,

          current_ctc:
            formData.current_ctc,

          expected_ctc:
            formData.expected_ctc,

          notice_period:
            formData.notice_period,

          resume_link:
            formData.resume_link,

          status:
            formData.status

        })
        .eq("id", candidate.id);

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

        <h2>Edit Candidate</h2>

        <div className="candidate-form-grid">

          <div>
            <label className="field-label">
              Candidate Name
            </label>

            <input
              name="candidate_name"
              value={
                formData.candidate_name || ""
              }
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="field-label">
              Email
            </label>

            <input
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="field-label">
              Phone
            </label>

            <input
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="field-label">
              Technology
            </label>

            <input
              name="technology"
              value={
                formData.technology || ""
              }
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="field-label">
              Experience
            </label>

            <input
              name="experience"
              value={
                formData.experience || ""
              }
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="field-label">
              Location
            </label>

            <input
              name="location"
              value={
                formData.location || ""
              }
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="field-label">
              Current CTC
            </label>

            <input
              name="current_ctc"
              value={
                formData.current_ctc || ""
              }
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="field-label">
              Expected CTC
            </label>

            <input
              name="expected_ctc"
              value={
                formData.expected_ctc || ""
              }
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="field-label">
              Notice Period
            </label>

            <input
              name="notice_period"
              value={
                formData.notice_period || ""
              }
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="field-label">
              Resume Link
            </label>

            <input
              name="resume_link"
              value={
                formData.resume_link || ""
              }
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="field-label">
              Status
            </label>

            <select
              className="custom-select"
              name="status"
              value={
                formData.status || ""
              }
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
                Selected
              </option>

              <option>
                Inactive
              </option>

            </select>
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
            onClick={updateCandidate}
          >
            Update Candidate
          </button>

        </div>

      </div>

    </div>

  );
}

export default EditCandidateModal;