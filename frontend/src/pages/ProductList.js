import React, { useEffect, useState, useContext } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
import '../styles/ProductList.css';
import { AuthContext } from '../context/AuthContext';

const ProductList = () => {
  const [listings, setListings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get('/listings')
      .then(res => setListings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>All Products</h2>
      <div className="card-grid">
        {listings.map(listing => (
          <div className="card" key={listing._id}>
            <Link to={`/product/${listing._id}`}>
              <img
                src={`http://localhost:5000/uploads/${listing.imageName}`}
                alt={listing.itemName}
              />
              <h3>{listing.itemName}</h3>
            </Link>
            {user && (
              <div style={{ marginTop: "0.5rem" }}>
                <Link
                  to={`/update-listing/${listing._id}`}
                  className="edit-btn"
                  style={{ marginRight: "1rem" }}
                >
                  Edit Listing
                </Link>
                <Link
                  to={`/update-listing-image/${listing._id}`}
                  className="update-img-btn"
                >
                  Update Image
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;