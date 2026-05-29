import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function CandidateTable({ refresh }) {

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, [refresh]);

  async function fetchCandidates() {

    const { data, error } = await supabase
      .from("candidates")
      .select("*")
      .order("id", { ascending: false });

    console.log(data);

    if (!error) {
      setCandidates(data);
    }
  }

  return (
    <div className="table-section">

      <div className="table-header">
        Recent Candidates
      </div>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Technology</th>
            <th>Status</th>
            <th>Experience</th>
          </tr>
        </thead>

        <tbody>

          {candidates.map((candidate) => (

            <tr key={candidate.id}>

              <td>{candidate.name}</td>

              <td>{candidate.technology}</td>

              <td>{candidate.status}</td>

              <td>{candidate.experience}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default CandidateTable;