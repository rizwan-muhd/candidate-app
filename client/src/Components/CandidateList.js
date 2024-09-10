import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicModal from "./Modal";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, TextField, Box } from "@mui/material";
import SkillsDistributionChart from "./CandidateChart";

export default function CandidateTable() {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [candidate, setCandidate] = useState([]);
  const [view, setView] = useState(true);
  const [skill, setSkill] = useState([]);
  const [experience, setExperience] = useState(10);
  const [editData, setEditData] = useState([]);
  useEffect(() => {
    getCandidate();
  }, [skill, experience]);

  const getCandidate = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/candidate/get-candidate?experience=${experience}&skills=${skill}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      }
    );
    setCandidate(response.data);
    console.log(response);
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/api/candidate/delete-candidate?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      }
    );
    getCandidate();
  };

  return (
    <>
      <BasicModal open={open} setOpen={setOpen} editData={editData} />
      <Box sx={{ display: "flex", gap: 2, m: 2 }}>
        <TextField
          label="Search by Skills"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <TextField
          label="Experience below"
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Add Candidate
        </Button>
        <Button variant="outlined" onClick={() => setView(!view)}>
          View
        </Button>
      </Box>
      {view ? (
        <TableContainer component={Paper} sx={{ m: 6 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>name</TableCell>
                <TableCell align="left">skills</TableCell>
                <TableCell align="left">Experience</TableCell>
                <TableCell align="left">location</TableCell>
                <TableCell align="left">videoInterviewResult</TableCell>
                <TableCell align="left">codingResult</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidate.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left"> {row.skills.join(", ")}</TableCell>
                  <TableCell align="left">{row.experience}</TableCell>
                  <TableCell align="left">{row.location}</TableCell>
                  <TableCell align="left">{row.videoInterviewResult}</TableCell>
                  <TableCell align="left">{row.codingResult}</TableCell>
                  <TableCell align="left">
                    <DeleteIcon onClick={() => handleDelete(row._id)} />
                    <EditIcon
                      onClick={() => {
                        setOpen(true);
                        setEditData(row);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <SkillsDistributionChart skill={skill} experience={experience} />
      )}
    </>
  );
}
