import { useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

export default function DeleteListingButton({ id, onDeleted }) {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      await API.delete(`/listings/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (onDeleted) onDeleted();
    }
  };

  if (!user) return null;

  return (
    <button onClick={handleDelete}>
      Delete Listing
    </button>
  );
}