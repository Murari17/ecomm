import { useState, useEffect, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import "../styles/Auth.css";

export default function UpdateListing() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [form, setForm] = useState({ itemName: "", price: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    API.get(`/listings/${id}`).then(res => {
      setForm({ itemName: res.data.itemName, price: res.data.price });
    });
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.put(`/listings/${id}`, form, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMsg("Listing updated!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to update listing");
    }
  };

  if (!user) return <div className="auth-container">Please login to update a listing.</div>;

  return (
    <div className="auth-container">
      <h2>Update Listing</h2>
      <form onSubmit={handleSubmit}>
        <input name="itemName" value={form.itemName} onChange={handleChange} required />
        <input name="price" type="number" value={form.price} onChange={handleChange} required />
        <button type="submit">Update Listing</button>
      </form>
      <div className="msg">{msg}</div>
    </div>
  );
}