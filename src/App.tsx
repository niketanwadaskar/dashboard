import { Routes, Route } from "react-router-dom";
import RunList from "./pages/RunList";
import RunDetails from "./pages/RunDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RunList />} />
      <Route path="/details/:id" element={<RunDetails />} />
    </Routes>
  );
}


export default App
