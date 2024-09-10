import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import NavBar from "./Navbar";

const SkillsDistributionChart = ({ experience, skill }) => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCandidates = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/candidate/get-candidate?experience=${experience}&skills=${skill}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      }
    );
    const candidates = response.data;

    // Create a map to count occurrences of each skill
    const skillsMap = {};
    candidates.forEach((candidate) => {
      candidate.skills.forEach((skill) => {
        if (skillsMap[skill]) {
          skillsMap[skill]++;
        } else {
          skillsMap[skill] = 1;
        }
      });
    });

    // Transform the map into an array suitable for Recharts
    const chartData = Object.keys(skillsMap).map((skill) => ({
      name: skill,
      candidate: skillsMap[skill],
    }));

    setData(chartData);
  };

  useEffect(() => {
    if (token) {
      fetchCandidates();
    }
  }, [skill, experience, token]);

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Skills Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis dataKey="candidate" />
            <Tooltip />
            <Legend />
            <Bar dataKey="candidate" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default SkillsDistributionChart;
