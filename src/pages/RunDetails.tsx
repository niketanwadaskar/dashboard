import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRunById } from "../utils/fetchRuns";

interface Run {
  id: number;
  name: string;
  status: string;
  date: string;
  [key: string]: any;
}

const RunDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [run, setRun] = useState<Run | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    id &&
      fetchRunById(id)
        .then(async (res) => await res)
        .then((data) => {
          //@ts-ignore
          return setRun(data);
        });
  }, [id]);

  const changeColor = (color: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "changeColor", color },
      "*"
    );
  };

  if (!run) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <button
        className="mb-4 px-4 py-2 bg-gray-400 text-white rounded"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <h1 className="text-2xl font-bold mb-2">Run Details (ID: {run.id})</h1>
      <div className="mb-4">
        {Object.entries(run).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value as any}
          </p>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-2">3D Viewer</h2>
      <div className="flex gap-4 mb-2">
        <button
          className="bg-green-500 text-white px-4 py-1 rounded"
          onClick={() => changeColor("green")}
        >
          Green
        </button>
        <button
          className="bg-yellow-400 text-black px-4 py-1 rounded"
          onClick={() => changeColor("yellow")}
        >
          Yellow
        </button>
        <button
          className="bg-red-500 text-white px-4 py-1 rounded"
          onClick={() => changeColor("red")}
        >
          Red
        </button>
      </div>

      <iframe
        ref={iframeRef}
        src={`/viewer.html?name=${encodeURIComponent(run.name)}`}
        style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}
        title="3D Viewer"
      />
    </div>
  );
};

export default RunDetails;
