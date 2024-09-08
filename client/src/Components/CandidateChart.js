// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const SkillsDistributionChart = () => {
//   const [data, setData] = useState([]);

//   const fetchCandidates = async () => {
//     const response = await axios.get("http://localhost:5000/api/candidates");
//     const candidates = response.data;

//     // Create a map to count occurrences of each skill
//     const skillsMap = {};
//     candidates.forEach((candidate) => {
//       candidate.skills.forEach((skill) => {
//         if (skillsMap[skill]) {
//           skillsMap[skill]++;
//         } else {
//           skillsMap[skill] = 1;
//         }
//       });
//     });

//     // Transform the map into an array suitable for Recharts
//     const chartData = Object.keys(skillsMap).map((skill) => ({
//       name: skill,
//       count: skillsMap[skill],
//     }));

//     setData(chartData);
//   };

//   useEffect(() => {
//     fetchCandidates();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Skills Distribution</h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart data={data}>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="count" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default SkillsDistributionChart;

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Dummy Data for Skills Distribution
const dummyCandidates = [
  {
    id: 1,
    name: "John Doe",
    skills: ["JavaScript", "React", "Node.js"],
  },
  {
    id: 2,
    name: "Jane Smith",
    skills: ["JavaScript", "Angular", "CSS"],
  },
  {
    id: 3,
    name: "Bob Johnson",
    skills: ["Python", "Django", "React"],
  },
  {
    id: 4,
    name: "Alice Davis",
    skills: ["Java", "Spring", "Hibernate"],
  },
  {
    id: 5,
    name: "Charlie Brown",
    skills: ["JavaScript", "React", "Node.js", "CSS"],
  },
];

const SkillsDistributionChart = () => {
  const [data, setData] = useState([]);

  // Function to process the candidates' skills and create chart data
  const processSkillsData = (candidates) => {
    const skillsMap = {};

    // Iterate through each candidate's skills and count occurrences
    candidates.forEach((candidate) => {
      candidate.skills.forEach((skill) => {
        if (skillsMap[skill]) {
          skillsMap[skill]++;
        } else {
          skillsMap[skill] = 1;
        }
      });
    });

    // Convert skillsMap into array format suitable for Recharts
    const chartData = Object.keys(skillsMap).map((skill) => ({
      name: skill,
      candidates: skillsMap[skill],
    }));

    setData(chartData);
  };

  useEffect(() => {
    // Instead of making an API call, use the dummy data
    processSkillsData(dummyCandidates);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Skills Distribution</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="candidates" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsDistributionChart;
