import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import axios, { isAxiosError } from "axios";
import { Alert, Box, Button } from "@mui/material";
import styles from "./SignupForm.module.css";
import { useNavigate } from "react-router-dom";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    _id: "",
    email: "",
    password: "",
  });
  const [users, setUsers] = useState<{ _id: string; email: string }[]>([]);
  const [confirmPass, setConfirmPass] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [signupMessage, setSignupMessage] = useState<string | null>(null);
  useEffect(() => {
    console.log("Updated users:", users);
  }, [users]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (confirmPass) {
        console.log("Final Confirm Password:", confirmPass);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [confirmPass]);

  const handleConfirmPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPass(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit");
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        email: formData.email,
        password: formData.password,
      });

      console.log("========> response", response)

      if (response.status === 200) {
        console.log("User added:", response.data);
        setSignupMessage("User signedup Successfully.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setErrorMessage("Signup Failed. User already Exists.");
      } else {
        console.log("Signup failed. Try again.");
      }
    }
    setUsers((prevUsers) => [...prevUsers, formData]);
    setFormData({ _id: "", email: "", password: "" });
    setConfirmPass("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const isPasswordValid =
    confirmPass === formData.password && formData.password.length > 0;

  return (
    <div>
      {signupMessage && (
        <Alert
          sx={{ bgcolor: "background.paper", mb: "20px" }}
          variant="outlined"
          severity="success"
        >
          {signupMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert
          sx={{ bgcolor: "background.paper", mb: "20px" }}
          variant="outlined"
          severity="error"
        >
          {errorMessage}
        </Alert>
      )}

      <form action="" onSubmit={handleSubmit} className={styles.signupform}>
        <div className={styles.signupCard}>
          <h2>Signup</h2>

          <Box>
            <InputField
              className={styles.input}
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
            />

            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPass}
              onChange={handleConfirmPassChange}
              className={styles.input}
            />

            <Button
              variant="contained"
              type="submit"
              sx={{ width: "100%", height: "3rem" }}
              disabled={!isPasswordValid}
            >
              Signup
            </Button>
          </Box>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
