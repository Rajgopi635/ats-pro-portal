import { useEffect, useState } from "react";
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

  const [recruiters, setRecruiters] =
    useState([]);

  const [selectedRecruiter,
    setSelectedRecruiter] =
    useState("");

  useEffect(() => {
    loadRecruiters();
  }, []);

  async function loadRecruiters() {

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

    if (!selectedRecruiter) {
      alert("Please assign a recruiter");
      return;
    }

    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { error } =
      await supabase
        .from("requirements")
        .insert([
          {
            ...formData,

            created_by:
              user.email,

            assigned_to:
              selectedRecruiter
          }
        ]);

    if (!error) {

console.log("ACTIVITY LOG CODE RUNNING");

  const { data, error: activityError } =
  await supabase
    .from("activity_logs")
    .insert([
      {
        activity_type: "requirement",
        activity_message:
          `TEST-${Date.now()}`,
        created_by: user.email
      }
    ])
    .select();

console.log("Inserted Row:", data);
console.log("Insert Error:", activityError);

  refreshRequirements();
window.location.reload();

} else {

      alert(error.message);

    }

  }

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>Add Requirement</h2>

        <div className="form-grid">

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
            defaultValue="Open"
          >
            <option value="Open">
              Open
            </option>

            <option value="Hold">
              Hold
            </option>

            <option value="Closed">
              Closed
            </option>

          </select>

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
            onClick={saveRequirement}
          >
            Save Requirement
          </button>

        </div>

      </div>

    </div>

  );

}

export default AddRequirementModal;