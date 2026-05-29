import { useState } from "react";

function EditSubmissionModal({
  submission,
  onClose,
  onUpdate,
}) {
  const [status, setStatus] = useState(
    submission.interview_status || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate({
      interview_status: status,
    });
  };

  return (
    <div className="modal-overlay">

      <div className="modal-content">

        <h2>Edit Submission</h2>

        <form onSubmit={handleSubmit}>

          <label>Status</label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="Submitted">
              Submitted
            </option>

            <option value="Interview Scheduled">
              Interview Scheduled
            </option>

            <option value="Interview Completed">
              Interview Completed
            </option>

            <option value="Selected">
              Selected
            </option>

            <option value="Rejected">
              Rejected
            </option>

            <option value="On Hold">
              On Hold
            </option>
          </select>

          <div className="modal-actions">

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit">
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditSubmissionModal;