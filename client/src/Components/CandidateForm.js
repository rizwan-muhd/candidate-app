import {
  Typography,
  Box,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import React from "react";
import { useFormik, FormikProvider, Form } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";

const skillOptions = [
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "Python",
  "Django",
];
function CandidateForm({ handleClose, editData }) {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const token = localStorage.getItem("token");
  // Validation schema using Yup
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    skills: Yup.array()
      .min(1, "At least one skill is required")
      .required("Skills are required"),
    experience: Yup.number()
      .min(0, "Experience must be a positive number")
      .required("Experience is required"),
    location: Yup.string().required("Location is required"),
    videoInterviewResult: Yup.string().required(
      "Video Interview Result is required"
    ),
    codingResult: Yup.number()
      .min(0, "Coding result must be a positive number")
      .required("Coding Result is required"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: editData ? editData.name : "",
      skills: editData ? editData.skills : [],
      experience: editData ? editData.experience : "",
      location: editData ? editData.location : "",
      videoInterviewResult: editData ? editData.videoInterviewResult : "",
      codingResult: editData ? editData.codingResult : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form Submitted", values);
      if (editData) {
        values._id = editData._id;
        const res = await axios.put(
          "http://localhost:8080/api/candidate/update-candidate",
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in Authorization header
            },
          }
        );
        if (res.status === 200) {
          handleClose();
        }
      } else {
        const res = await axios.post(
          "http://localhost:8080/api/candidate/add-candidate",
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in Authorization header
            },
          }
        );
        if (res.status === 200) {
          handleClose();
        }
      }
    },
  });

  return (
    <>
      <Box width="80%" m="80px auto">
        <Typography sx={{ mb: "15px", color: "black" }} fontSize="18px">
          Candidate
        </Typography>

        <FormikProvider value={formik}>
          <Form>
            <Box
              display="grid"
              gap="15px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ gridColumn: "span 2" }}
              />

              <Autocomplete
                multiple
                fullWidth
                freeSolo
                id="skills"
                options={skillOptions}
                value={formik.values.skills}
                onChange={(event, value) =>
                  formik.setFieldValue("skills", value)
                }
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Skills"
                    error={
                      formik.touched.skills && Boolean(formik.errors.skills)
                    }
                    helperText={formik.touched.skills && formik.errors.skills}
                    sx={{ gridColumn: "span 2" }}
                  />
                )}
              />
              <TextField
                fullWidth
                id="experience"
                name="experience"
                label="Experience (in years)"
                type="number"
                value={formik.values.experience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.experience && Boolean(formik.errors.experience)
                }
                helperText={
                  formik.touched.experience && formik.errors.experience
                }
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                id="location"
                name="location"
                label="Location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.location && Boolean(formik.errors.location)
                }
                helperText={formik.touched.location && formik.errors.location}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                id="videoInterviewResult"
                name="videoInterviewResult"
                label="Video Interview Result"
                value={formik.values.videoInterviewResult}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.videoInterviewResult &&
                  Boolean(formik.errors.videoInterviewResult)
                }
                helperText={
                  formik.touched.videoInterviewResult &&
                  formik.errors.videoInterviewResult
                }
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                id="codingResult"
                name="codingResult"
                label="Coding Result"
                type="number"
                value={formik.values.codingResult}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.codingResult &&
                  Boolean(formik.errors.codingResult)
                }
                helperText={
                  formik.touched.codingResult && formik.errors.codingResult
                }
                sx={{ gridColumn: "span 2" }}
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  boxShadow: "none",
                  color: "white",
                  borderRadius: 0,
                  padding: "15px 40px",
                }}
              >
                Submit
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      </Box>
    </>
  );
}

export default CandidateForm;
