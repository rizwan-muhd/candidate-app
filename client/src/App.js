import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import CandidateList from "./Pages/CandidateListPage";
import SkillsDistributionChart from "./Components/CandidateChart";

function App() {
  const [candidate, setCandidate] = useState({
    name: "",
    skills: "",
    experience: 0,
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await axios.post("/api/candidates", candidate);
    // console.log("Candidate added:", response.data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={candidate.name}
          onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={candidate.skills}
          onChange={(e) =>
            setCandidate({ ...candidate, skills: e.target.value })
          }
          placeholder="Skills"
          required
        />
        <input
          type="number"
          value={candidate.experience}
          onChange={(e) =>
            setCandidate({ ...candidate, experience: e.target.value })
          }
          placeholder="Experience (Years)"
          required
        />
        <input
          type="text"
          value={candidate.location}
          onChange={(e) =>
            setCandidate({ ...candidate, location: e.target.value })
          }
          placeholder="Location"
          required
        />
        <button type="submit">Add Candidate</button>
      </form>
      <CandidateList />
      <SkillsDistributionChart />
    </div>
  );
}

export default App;
