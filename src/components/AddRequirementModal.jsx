import { useState } from "react";

import { supabase } from "../services/supabase";

function AddRequirementModal({
  closeModal,
  refreshRequirements
}) {

  const [formData, setFormData] = useState({
    job_title: "",
    client: "",
    poc: "",
    budget_rate: "",
    status: "Open"
  });

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function saveRequirement() {

    if (
      !formData.job_title ||
      !formData.client ||
      !formData.poc ||
      !formData.budget_rate
    ) {
      alert("Please fill all fields");
      return;
    }

    const { error } = await supabase
      .from("requirements")
      .insert([formData]);

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

        <h2>Add Requirement</h2>

        <input
          type="text"
          placeholder="Job Title"
          name="job_title"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Client"
          name="client"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="POC"
          name="poc"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Budget / Rate"
          name="budget_rate"
          onChange={handleChange}
        />

        <select
          className="custom-select"
          name="status"
          onChange={handleChange}
        >
          <option>Open</option>
          <option>Hold</option>
          <option>Closed</option>
        </select>

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={closeModal}
          >
            Cancel
          </button>

          <button onClick={saveRequirement}>
            Save Requirement
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddRequirementModal;