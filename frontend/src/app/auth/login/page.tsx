"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Box, Button } from "@mui/material";
import styles from "../signup/signup.module.css";
import InputField from "@/app/components/InputField";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    _id: "",
    email: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit");

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("-========> response", response);

      if (response.status === 200) {
        console.log("User is logged in:", response.data);
        setLoginMessage("User is Logged in.");
      }
    } catch (error) {
      console.error("Error finding user:", error);
    }

    setFormData({ _id: "", email: "", password: "" });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoginMessage(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [loginMessage]);

  return (
    <div>
        {loginMessage && (
          <Alert
            sx={{ bgcolor: "background.paper", mb: "20px" }}
            variant="outlined"
            severity="success"
          >
            {loginMessage}
          </Alert>
        )}
      <form action="" onSubmit={handleSubmit} className={styles.signupform}>
        <div className={styles.signupCard}>
          <h2>Login</h2>
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

            <Button
              variant="contained"
              type="submit"
              sx={{ width: "100%", height: "3rem" }}
            >
              Login
            </Button>
          </Box>
        </div>
      
      </form>
    </div>
  );
};

export default LoginForm;