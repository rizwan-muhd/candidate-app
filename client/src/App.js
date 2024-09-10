import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CandidateList from "./Pages/CandidateListPage";
import SkillsDistributionChart from "./Components/CandidateChart";
import ChatApp from "./Pages/CandidateFormpage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/candidates" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        {token ? (
          <>
            <Route path="/candidates" element={<CandidateList />} />
            <Route path="/chart" element={<SkillsDistributionChart />} />
            <Route path="/chat" element={<ChatApp />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
