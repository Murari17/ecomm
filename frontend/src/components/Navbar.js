import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      {user && (
        <Link to="/add-listing" style={{ marginLeft: "1rem" }}>
          Add Listing
        </Link>
      )}
      {user ? (
        <>
          <span style={{ marginLeft: "1rem" }}>Welcome, {user.name}</span>
          <button style={{ marginLeft: "1rem" }} onClick={() => setUser(null)}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: "1rem" }}>Login</Link>
          {/* {location.pathname === "/login" && (
            <Link to="/register" style={{ marginLeft: "1rem" }}>
              Register
            </Link>
          )} */}
        </>
      )}
    </nav>
  );
}