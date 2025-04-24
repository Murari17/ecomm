import { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import "../styles/Auth.css";

const categories = [
  "Book", "Engineering Equipment", "Stationery", "Electronics", "Sports Equipment", "Clothing", "Other"
];
const conditions = ["As New", "Good", "Poor"];

export default function AddListing() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    itemName: "",
    category: "",
    description: "",
    condition: "",
    price: "",
    image: null,
    status: "Available"
  });
  const [msg, setMsg] = useState("");

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({
      ...f,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("itemName", form.itemName);
    data.append("category", form.category);
    data.append("description", form.description);
    data.append("condition", form.condition);
    data.append("price", form.price);
    data.append("image", form.image);
    data.append("status", form.status);

    try {
      await API.post("/listings", data, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setMsg("Listing added!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to add listing");
    }
  };

  if (!user) return <div className="auth-container">Please login to add a listing.</div>;

  return (
    <div className="auth-container">
      <h2>Add Listing</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="itemName"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />
        <select name="category" onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />
        <select name="condition" onChange={handleChange} required>
          <option value="">Select Condition</option>
          {conditions.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <button type="submit">Add Listing</button>
      </form>
      <div className="msg">{msg}</div>
    </div>
  );
}