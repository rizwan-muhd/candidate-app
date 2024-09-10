import { Typography, Box, TextField, Button } from "@mui/material";
import React from "react";
import { useFormik, FormikProvider, Form } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  // Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission

      const res = await axios.post(
        "http://localhost:8080/api/user/register",
        values
      );
      console.log("Form Submitted", res);
      if (res.status === 201) {
        navigate("/");
      }
    },
  });

  return (
    <Box width="60%" m="80px auto">
      <Typography sx={{ mb: "15px", color: "black" }} fontSize="18px">
        Candidate App Register
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
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
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
              Register
            </Button>
            <Button
              // Implement the login action if needed
              color="primary"
              variant="contained"
              sx={{
                backgroundColor: "black",
                boxShadow: "none",
                color: "white",
                borderRadius: 0,
                padding: "15px 40px",
              }}
              onClick={() => navigate("/")}
            >
              Login
            </Button>
          </Box>
        </Form>
      </FormikProvider>
    </Box>
  );
}

export default Register;
