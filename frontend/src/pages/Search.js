import React, { useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import "../styles/Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchProduct = async () => {
    const all = await API.get("/listings");
    const filtered = all.data.filter((listing) =>
      listing.itemName.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="search-container">
      <h2>Search Product</h2>
      <input
        type="text"
        placeholder="Enter product name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchProduct}>Search</button>
      <ul>
        {results.map((r) => (
          <li key={r._id} className="search-result">
            <Link to={`/product/${r._id}`}>
              <span>{r.itemName}</span>
              <img
                src={`http://localhost:5000/uploads/${r.imageName}`}
                alt={r.itemName}
                className="result-image"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;