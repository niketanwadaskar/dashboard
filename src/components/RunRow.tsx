// src/pages/RunDetails.tsx
import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const COLORS = ["red", "yellow", "green"];

const RunDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const run = location.state?.run;

  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const sendColorToIframe = (color: string) => {
    iframeRef.current?.contentWindow?.postMessage({ type: "changeColor", color }, "*");
  };

  if (!run) {
    return <p>Run data not found. Go back and click on a run to view details.</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <button onClick={() => navigate("/")}>⬅ Back</button>
      <h2>Run Details - ID: {id}</h2>

      <div style={{ marginBottom: "1rem" }}>
        {Object.entries(run).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {String(value)}
          </div>
        ))}
      </div>

      <h3>3D Text Viewer</h3>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        {COLORS.map((color) => (
          <button key={color} onClick={() => sendColorToIframe(color)} style={{ background: color, padding: "0.5rem 1rem", color: "#fff", border: "none", borderRadius: 4 }}>
            {color.toUpperCase()}
          </button>
        ))}
      </div>

      <iframe
        ref={iframeRef}
        title="3D Text Viewer"
        src={`/viewer.html?name=${encodeURIComponent(run.name)}`}
        width="100%"
        height="400px"
        style={{ border: "1px solid #ccc", borderRadius: "8px" }}
      ></iframe>
    </div>
  );
};

export default RunDetails;
