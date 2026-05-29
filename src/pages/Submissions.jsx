import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { Pencil } from "lucide-react";
import EditSubmissionModal from "../components/EditSubmissionModal";

function Submissions() {

  const [submissions, setSubmissions] = useState([]);
  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedSubmission,
    setSelectedSubmission] =
    useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {

    const { data, error } = await supabase
      .from("candidate_submissions")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setSubmissions(data || []);
  }

  const handleEdit = (submission) => {

    setSelectedSubmission(submission);
    setShowEditModal(true);
  };

  const updateSubmission = async (
    updatedData
  ) => {

    const { error } = await supabase
      .from("candidate_submissions")
      .update(updatedData)
      .eq("id", selectedSubmission.id);

    if (error) {
      console.log(error);
      return;
    }

    setShowEditModal(false);
    fetchSubmissions();
  };

  return (

    <div className="dashboard">

      <div className="topbar">
        <h1>Submissions</h1>
      </div>

      <div className="table-section">

        <div className="table-header">
          Candidate Submissions
        </div>

        <table>

          <thead>
            <tr>
              <th>Candidate</th>
              <th>Job Title</th>
              <th>Client</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {submissions.map((item) => (

              <tr key={item.id}>

                <td>{item.candidate_name}</td>

                <td>{item.job_title}</td>

                <td>{item.client}</td>

                <td>{item.interview_status}</td>

                <td>

                  <button
                    className="action-btn edit"
                    onClick={() =>
                      handleEdit(item)
                    }
                  >
                    <Pencil size={16} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {showEditModal &&
        selectedSubmission && (

        <EditSubmissionModal
          submission={selectedSubmission}
          onClose={() =>
            setShowEditModal(false)
          }
          onUpdate={updateSubmission}
        />

      )}

    </div>
  );
}

export default Submissions;