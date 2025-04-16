"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../signup/signup.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    _id: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

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

      if (response.status === 200) {
        console.log("User is logged in:", response.data);
        setLoginMessage("User is Logged in.");

        const data = await response.data;
        console.log("data", data);

        if (response) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("user", JSON.stringify(data.username));
          router.push("/");
        } else {
          alert(data.message || "Login Failed");
        }
      }
    } catch (error) {
      console.error("Error finding user:", error);
    }

    setFormData({ _id: "", email: "", password: "", confirmPassword: "" });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoginMessage(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [loginMessage]);

  return (
    <div>
      {loginMessage && <div>{loginMessage}</div>}
      <form action="" onSubmit={handleSubmit} className={styles.signupform}>
        <div className={styles.signupCard}>
          <div className="flex min-h-screen w-full">
            <div className="w-2/5 bg-[#2874f0] text-white p-1 flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-4">Login</h1>
              <p className="text-sm leading-relaxed">
                Get access to your Orders, Wishlist and Recommendations
              </p>
              <Image
                src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
                width={300}
                height={200}
                alt="Login illustration"
                className="mt-8 w-full"
              />
            </div>

            {/* Right Section */}
            <div className="w-3/5 bg-white p-10 flex flex-col justify-center">
              <input
                type="email"
                name="email"
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
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="border-b border-gray-300 py-3 mb-6 focus:outline-none"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mb-4">
                By continuing, you agree to BuyNest Terms of Use and Privacy
                Policy.
              </p>

              <button
                className="bg-orange-500 text-white font-semibold py-3 rounded-sm mb-4 transition-transform duration-200
             hover:scale-105 disabled:opacity-10 disabled:cursor-not-allowed disabled:hover:scale-100 hover:cursor-pointer"
                type="submit"
                disabled={!isFormValid}
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
