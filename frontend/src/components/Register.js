import { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailPattern.test(form.email)) {
      setMsg("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users/register", form);
      setMsg("Registration successful! Please login.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="mobile"
          type="tel"
          placeholder="Mobile"
          pattern="\d{10}"
          maxLength="10"
          title="Please enter a 10-digit mobile number"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
          title="Please enter a valid email address"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <div className="msg">{msg}</div>
    </div>
  );
}
