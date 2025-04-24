import { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import "../styles/Auth.css";

export default function UpdateListingImage() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", image);

    try {
      await API.put(`/listings/image/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      setMsg("Image updated!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to update image");
    }
  };

  if (!user) return <div className="auth-container">Please login to update listing image.</div>;

  return (
    <div className="auth-container">
      <h2>Update Listing Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} required />
        <button type="submit">Update Image</button>
      </form>
      <div className="msg">{msg}</div>
    </div>
  );
}