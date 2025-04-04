import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRuns } from "../utils/fetchRuns";
import Loader from "../components/Loader";

interface Run {
  id: number;
  name: string;
  status: string;
  date: string;
  [key: string]: any;
}

const RunList: React.FC = () => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const runsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    fetchRuns()
      .then((res) => res)
      .then((data) => setRuns(data))
      .catch((err) => console.error("Failed to load data", err))
      .finally(() => setLoading(false));
  }, []);

  const paginatedRuns = runs.slice(
    (currentPage - 1) * runsPerPage,
    currentPage * runsPerPage
  );

  if (loading) return <Loader text="Loading runs..." />;

  const totalPages = Math.ceil(runs.length / runsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl text-green-700 font-semibold mb-6 text-center">Run List</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <table className="w-full border-collapse text-sm text-gray-700">
          <thead>
            <tr className="bg-green-100 text-left">
              <th className="py-3 px-4 text-gray-600">ID</th>
              <th className="py-3 px-4 text-gray-600">Name</th>
              <th className="py-3 px-4 text-gray-600">Status</th>
              <th className="py-3 px-4 text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRuns.map((run) => (
              <tr key={run.id} className="hover:bg-gray-50 transition-all duration-300">
                <td className="py-2 px-4 border-t">{run.id}</td>
                <td className="py-2 px-4 border-t">
                  <Link
                    to={`/details/${run.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {run.name}
                  </Link>
                </td>
                <td className="py-2 px-4 border-t">{run.status}</td>
                <td className="py-2 px-4 border-t">{run.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-between items-center">
          {/* Pagination Info */}
          <div className="text-gray-600">
            <span>Page {currentPage} of {totalPages}</span>
          </div>

          {/* Pagination Controls */}
          <div className="flex gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md transition-colors hover:bg-blue-500 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md transition-colors hover:bg-blue-500 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunList;
