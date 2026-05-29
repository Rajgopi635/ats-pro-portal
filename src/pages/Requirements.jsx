import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

import {
  Pencil,
  Trash2
} from "lucide-react";

import EditRequirementModal from "../components/EditRequirementModal";

function Requirements() {

  const [requirements, setRequirements] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [editingRequirement,
    setEditingRequirement] =
    useState(null);

  useEffect(() => {

    fetchRequirements();

  }, []);

  async function fetchRequirements() {

    const { data } =
      await supabase
        .from("requirements")
        .select("*")
        .order("id", {
          ascending: false
        });

    setRequirements(data || []);
  }

  async function deleteRequirement(id) {

    const confirmDelete =
      window.confirm(
        "Delete this requirement?"
      );

    if (!confirmDelete) return;

    await supabase
      .from("requirements")
      .delete()
      .eq("id", id);

    fetchRequirements();
  }

  const filteredRequirements =
    requirements.filter(
      (req) =>
        req.job_title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        req.client
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <div className="dashboard">

      <div className="topbar">

        <h1>Requirements</h1>

        <input
          type="text"
          placeholder="Search Requirement..."
          className="search-box"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      <div className="cards">

        <div className="card">

          <h3>
            Total Requirements
          </h3>

          <p>
            {requirements.length}
          </p>

        </div>

      </div>

      <div className="table-section">

        <div className="table-header">
          Requirements List
        </div>

        <table>

          <thead>

            <tr>

              <th>Job Title</th>

              <th>Client</th>

              <th>POC</th>

              <th>Budget</th>

              <th>Status</th>

              <th>Created</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredRequirements.map(
              (req) => (

                <tr key={req.id}>

                  <td>
                    {req.job_title}
                  </td>

                  <td>
                    {req.client}
                  </td>

                  <td>
                    {req.poc}
                  </td>

                  <td>
                    {req.budget_rate}
                  </td>

                  <td>

                    <span
                      className={`status-badge ${req.status?.toLowerCase()}`}
                    >
                      {req.status}
                    </span>

                  </td>

                  <td>

                    {
                      new Date(
                        req.created_at
                      ).toLocaleDateString()
                    }

                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          setEditingRequirement(req)
                        }
                      >

                        <Pencil size={16} />

                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteRequirement(req.id)
                        }
                      >

                        <Trash2 size={16} />

                      </button>

                    </div>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      {editingRequirement && (

        <EditRequirementModal

          requirement={
            editingRequirement
          }

          closeModal={() =>
            setEditingRequirement(
              null
            )
          }

          refreshRequirements={
            fetchRequirements
          }

        />

      )}

    </div>

  );
}

export default Requirements;