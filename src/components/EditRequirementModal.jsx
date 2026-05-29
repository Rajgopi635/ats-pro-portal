import { useState } from "react";
import { supabase } from "../services/supabase";

function EditRequirementModal({
  requirement,
  closeModal,
  refreshRequirements
}) {

  const [formData, setFormData] =
    useState(requirement);

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  }

  async function updateRequirement() {

    const { error } =
      await supabase
        .from("requirements")
        .update({

          job_title:
            formData.job_title,

          client:
            formData.client,

          poc:
            formData.poc,

          budget_rate:
            formData.budget_rate,

          status:
            formData.status

        })
        .eq("id", requirement.id);

    if (!error) {

      refreshRequirements();

      closeModal();

    } else {

      alert(error.message);
    }
  }

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>
          Edit Requirement
        </h2>

        <input
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
        />

        <input
          name="client"
          value={formData.client}
          onChange={handleChange}
        />

        <input
          name="poc"
          value={formData.poc}
          onChange={handleChange}
        />

        <input
          name="budget_rate"
          value={formData.budget_rate}
          onChange={handleChange}
        />

        <select
          className="custom-select"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >

          <option>
            Open
          </option>

          <option>
            Hold
          </option>

          <option>
            Closed
          </option>

        </select>

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={closeModal}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={updateRequirement}
          >
            Update
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditRequirementModal;