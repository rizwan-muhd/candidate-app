import { Typography, Box, TextField, Button } from "@mui/material";
import React from "react";
import { useFormik, FormikProvider, Form } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Validation schema using Yup
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await axios.post(
        "http://localhost:8080/api/user/login",
        values
      );
      console.log("Form Submitted", res);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.userDetails.role);
        navigate("/candidates");
      }
    },
  });

  return (
    <Box width="60%" m="80px auto" sx={{}}>
      <Typography sx={{ mb: "15px", color: "black" }} fontSize="18px">
        Candidate App Login
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
              Login
            </Button>
            <Button
              // Redirect to register page, add action accordingly
              color="primary"
              variant="contained"
              sx={{
                backgroundColor: "black",
                boxShadow: "none",
                color: "white",
                borderRadius: 0,
                padding: "15px 40px",
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Box>
        </Form>
      </FormikProvider>
    </Box>
  );
}

export default Login;
