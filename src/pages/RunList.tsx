import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRuns } from "../utils/fetchRuns";
import Loader from "../components/Loader";

interface Run {
  id: string;
  name: string;
  status: string;
  date: string;
  [key: string]: string;
}

const RunList: React.FC = () => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("DateAsc");

  const runsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    fetchRuns()
      .then((res) => res)
      .then((data) => setRuns(data as unknown as Run[]))
      .catch((err) => console.error("Failed to load data", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredRuns = runs.filter((run) => {
    return statusFilter === "All" || run.status === statusFilter;
  });

  const sortedRuns = [...filteredRuns].sort((a, b) => {
    if (sortBy === "NameAsc") return a.name.localeCompare(b.name);
    if (sortBy === "NameDesc") return b.name.localeCompare(a.name);
    if (sortBy === "DateAsc")
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === "DateDesc")
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    return 0;
  });

  const paginatedRuns = sortedRuns.slice(
    (currentPage - 1) * runsPerPage,
    currentPage * runsPerPage
  );

  const totalPages = Math.ceil(filteredRuns.length / runsPerPage);

  if (loading) return <Loader />;

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl text-green-700 font-semibold mb-4 sm:mb-6 text-center">
        Run List
      </h1>

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 overflow-hidden">
        {/* Filter and Sort Controls */}
        <div className="mb-6 flex justify-between">
          <div className="flex items-center gap-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none px-4 py-2 rounded-xl bg-gray-50 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition"
              >
                <option value="All">All</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="running">Running</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort by
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none px-4 py-2 rounded-xl bg-gray-50 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition"
              >
                <option value="DateDesc">Date ↓</option>
                <option value="DateAsc">Date ↑</option>
                <option value="NameAsc">Name A-Z</option>
                <option value="NameDesc">Name Z-A</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Table wrapper with horizontal scroll */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-full border-collapse text-sm text-gray-700">
            <thead>
              <tr className="bg-green-100 text-left">
                <th className="py-3 px-4 text-gray-600 whitespace-nowrap">
                  ID
                </th>
                <th className="py-3 px-4 text-gray-600 whitespace-nowrap">
                  Name
                </th>
                <th className="py-3 px-4 text-gray-600 whitespace-nowrap">
                  Status
                </th>
                <th className="py-3 px-4 text-gray-600 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedRuns.map((run) => (
                <tr
                  key={run.id}
                  className="hover:bg-gray-50 transition-all duration-300"
                >
                  <td className="py-2 px-4 border-t whitespace-nowrap">
                    {run.id}
                  </td>
                  <td className="py-2 px-4 border-t whitespace-nowrap">
                    <Link
                      to={`/details/${run.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {run.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-t whitespace-nowrap">
                    {run.status}
                  </td>
                  <td className="py-2 px-4 border-t whitespace-nowrap">
                    {run.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 text-sm sm:text-base">
            Page {currentPage} of {totalPages}
          </div>

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
