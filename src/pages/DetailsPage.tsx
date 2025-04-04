import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRunById, Run } from "../data/fetchRuns";
import BabylonViewer from "../components/BabylonViewer";

function DetailsPage() {
  const { id } = useParams();
  const [run, setRun] = useState<Run | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRunById(id).then((data) => {
        setRun(data || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <p>Loading run details...</p>;
  if (!run) return <p>Run not found.</p>;

  return (
    <div>
      <h1>{run.name}</h1>
      <p>
        <strong>Status:</strong> {run.status}
      </p>
      <p>
        <strong>Date:</strong> {run.date}
      </p>
      <p>
        <strong>Duration:</strong> {run.duration}
      </p>
      <p>
        <strong>Description:</strong> {run.description}
      </p>

      <hr />

      {/* 🔜 Placeholder for Babylon and iframe */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1, border: "1px solid #ccc", height: "400px" }}>
          <BabylonViewer />
        </div>
        <div style={{ flex: 1, border: "1px solid #ccc", height: "400px" }}>
          <iframe
            title="Run Viewer"
            src="https://example.com/viewer"
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
