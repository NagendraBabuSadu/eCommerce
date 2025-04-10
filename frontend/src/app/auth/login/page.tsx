"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Box, Button, useTheme } from "@mui/material";
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
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, ""); // Remove trailing slashes
    console.log("Sanitized API Base URL:", baseUrl);

    e.preventDefault();
    console.log("handleSubmit");

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
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

  const theme = useTheme();
  return (
    <div>
      {loginMessage && (
        <Alert
          sx={{ bgcolor: theme.palette.background.default, mb: "20px" }}
          variant="outlined"
          severity="success"
        >
          {loginMessage}
        </Alert>
      )}
      <form action="" onSubmit={handleSubmit} className={styles.signupform}>
        <div className={styles.signupCard}>
          <h2>Login</h2>
          <div className="flex min-h-screen w-full">
            <div className="w-2/5 bg-[#2874f0] text-white p-10 flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-4">Login</h1>
              <p className="text-sm leading-relaxed">
                Get access to your Orders, Wishlist and Recommendations
              </p>
              <img
                src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
                alt="Login illustration"
                className="mt-8 w-full"
              />
            </div>

            {/* Right Section */}
            <div className="w-3/5 bg-white p-10 flex flex-col justify-center">
              <input
                type="email"
                name="email" // ✅ this is the key!
                placeholder="Enter Email"
                className="border-b border-gray-300 py-3 mb-6 focus:outline-none"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="border-b border-gray-300 py-3 mb-6 focus:outline-none"
                value={formData.password}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mb-4">
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </p>
              <button
                className="bg-orange-500 text-white font-semibold py-3 rounded-sm mb-4"
                type="submit"
              >
                Login
              </button>
              <p className="text-sm text-blue-500 font-medium cursor-pointer">
                New to BuyNest? Create an account
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
