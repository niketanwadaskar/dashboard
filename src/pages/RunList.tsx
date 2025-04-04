import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRuns } from "../utils/fetchRuns";

interface Run {
  id: number;
  name: string;
  status: string;
  date: string;
  [key: string]: any;
}

const RunList: React.FC = () => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const runsPerPage = 5;

  useEffect(() => {
    fetchRuns()
      .then((res) => res)
      .then((data) => setRuns(data))
      .catch((err) => console.error("Failed to load data", err));
  }, []);

  const paginatedRuns = runs.slice(
    (currentPage - 1) * runsPerPage,
    currentPage * runsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl text-green font-bold mb-4">Run List</h1>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRuns.map((run) => (
            <tr key={run.id} className="border-t">
              <td className="p-2">{run.id}</td>
              <td className="p-2">
                <Link to={`/details/${run.id}`} className="text-blue-600 hover:underline">
                  {run.name}
                </Link>
              </td>
              <td className="p-2">{run.status}</td>
              <td className="p-2">{run.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={currentPage * runsPerPage >= runs.length}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RunList;
