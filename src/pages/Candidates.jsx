import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

import AddCandidateModal from "../components/AddCandidateModal";
import EditCandidateModal from "../components/EditCandidateModal";

import {
  Pencil,
  Trash2
} from "lucide-react";

function Candidates() {

  const [candidates, setCandidates] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingCandidate,
    setEditingCandidate] =
    useState(null);

  useEffect(() => {

    fetchCandidates();

  }, []);

  async function fetchCandidates() {

    const { data } =
      await supabase
        .from("candidates")
        .select("*")
        .order("id", {
          ascending: false
        });

    setCandidates(data || []);
  }

  async function deleteCandidate(id) {

    const confirmDelete =
      window.confirm(
        "Delete Candidate?"
      );

    if (!confirmDelete) return;

    await supabase
      .from("candidates")
      .delete()
      .eq("id", id);

    fetchCandidates();
  }

  const filtered =
    candidates.filter(
      (c) =>

        c.candidate_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        c.technology
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        c.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <div className="dashboard">

      <div className="topbar">

        <h1>Candidates</h1>

        <div className="top-buttons">

          <input
            type="text"
            className="search-box"
            placeholder="Search Candidate..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <button
            className="add-btn"
            onClick={() =>
              setShowModal(true)
            }
          >
            + Add Candidate
          </button>

        </div>

      </div>

      <div className="cards">

        <div className="card">

          <h3>
            Total Candidates
          </h3>

          <p>
            {candidates.length}
          </p>

        </div>

      </div>

      <div className="table-section">

        <div className="table-header">

          Candidate Database

        </div>

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Technology</th>

              <th>Experience</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map(
              (c) => (

                <tr key={c.id}>

                  <td>
                    {c.candidate_name}
                  </td>

                  <td>
                    {c.email}
                  </td>

                  <td>
                    {c.phone}
                  </td>

                  <td>
                    {c.technology}
                  </td>

                  <td>
                    {c.experience}
                  </td>

                  <td>

                    <span className="status submitted">

                      {c.status}

                    </span>

                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          setEditingCandidate(c)
                        }
                      >

                        <Pencil size={16} />

                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteCandidate(c.id)
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

      {showModal && (

        <AddCandidateModal

          closeModal={() =>
            setShowModal(false)
          }

          refreshCandidates={
            fetchCandidates
          }

        />

      )}

      {editingCandidate && (

        <EditCandidateModal

          candidate={
            editingCandidate
          }

          closeModal={() =>
            setEditingCandidate(
              null
            )
          }

          refreshCandidates={
            fetchCandidates
          }

        />

      )}

    </div>

  );
}

export default Candidates;