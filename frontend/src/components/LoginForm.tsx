import { useEffect, useState } from "react";
import InputField from "./InputField";
import axios from "axios";
import { Button } from "@mui/material";
import "./LoginForm.module.css";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<{_id: "", email: "", password: "" }[]>([]);
  const [users, setUsers] = useState<{ _id: string; email: string }[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<{users: {_id:string, email: string}}>("http://localhost:3000/users");
        console.log("API Response:", response.data); // ✅ Debugging

        if (Array.isArray(response.data.users)) {
          // ✅ Ensure it's an array
          console.log("if is success");
          setUsers(response.data.users);
          console.log("users now", users);
        } else {
          console.error("Expected an array, but got:", response.data.users);
          setUsers([]); // Fallback to empty array
        }
      } catch (error) {
        console.log("error is: ", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log("Updated users:", users);
  }, [users]); // Runs whenever `users` is updated

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit");
    try{
      const response = await axios.post("http://localhost:3000/user", {
        email: formData.email,
        password: formData.password
      })

      if(response.status ===200) {
        console.log("User added:", response.data);
      } 
    }catch (error) {
      console.error("Error adding user:", error);
  }

    setUsers((prevUsers) => [...prevUsers, formData]); 
    setFormData({_id: "", email: "", password: "" });
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <InputField
          className="input"
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          className="input"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>

      <h3>Fetched Users</h3>
      <ul>
        {users.length > 0 ? (
          users.map((user) => <li key={user._id}>{user.email}</li>)
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
};

export default LoginForm;
