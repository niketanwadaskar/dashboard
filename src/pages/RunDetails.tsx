import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRunById } from "../utils/fetchRuns";
import Loader from "../components/Loader";

interface Run {
  id: string;
  name: string;
  status: string;
  date: string;
  [key: string]: string;
}

const statusMap = {
  failed: "red",
  running: "yellow",
  completed: "green",
} as { [key: string]: unknown };
const RunDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [run, setRun] = useState<Run | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showViewer, setShowViewer] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRunById(id)
        .then((data: unknown) => {
          return setRun((data as Run) ?? null);
        })
        .catch(() => {
          setRun(null);
        });
    }
  }, [id]);

  const changeColor = (color: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "changeColor", color },
      "*"
    );
  };

  if (!run) return <Loader />;

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded shadow-md hover:bg-gray-600"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800">Run: {run.name}</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Run Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600">Details</h2>
          {Object.entries(run).map(([key, value]) => (
            <div key={key} className="text-sm text-gray-700">
              <strong className="capitalize text-gray-900">{key}:</strong>{" "}
              {value}
            </div>
          ))}
        </div>

        {/* Right: 3D Viewer */}
        <div className="bg-white rounded-2xl shadow-xl p-4 relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-600">3D Viewer</h2>
            <button
              onClick={() => setShowViewer(!showViewer)}
              className="text-sm text-blue-500 underline"
            >
              {showViewer ? "Hide" : "Show"}
            </button>
          </div>

          {showViewer && (
            <>
              <div className="flex gap-2 mb-3 justify-center">
                {["green", "yellow", "red"].map((color) => (
                  <button
                    key={color}
                    className={`px-4 py-1 rounded text-white font-medium shadow-md hover:brightness-110 ${
                      color === "yellow"
                        ? "bg-yellow-400 text-black"
                        : color === "red"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                    onClick={() => changeColor(color)}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </button>
                ))}
              </div>

              <div className="rounded-lg overflow-hidden shadow-inner border border-gray-300">
                <iframe
                  ref={iframeRef}
                  src={`/viewer.html?name=${encodeURIComponent(
                    run.name
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                  )}&color=${encodeURIComponent(statusMap[run.status])}`}
                  style={{
                    width: "100%",
                    height: "350px",
                    border: "none",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    borderRadius: "12px",
                  }}
                  title="3D Viewer"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RunDetails;
