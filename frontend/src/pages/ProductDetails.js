import '../styles/ProductDetails.css';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import DeleteListingButton from '../components/DeleteListingButton';
import { AuthContext } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get(`/listings/${id}`)
      .then(res => setListing(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!listing) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <h2>{listing.itemName}</h2>
      <p><strong>Category:</strong> {listing.category}</p>
      <p><strong>Description:</strong> {listing.description}</p>
      <p><strong>Condition:</strong> {listing.condition}</p>
      <p><strong>Price:</strong> ₹{listing.price}</p>
      <p><strong>Status:</strong> {listing.status}</p>
      <p><strong>Owner:</strong> {listing.ownerId?.name} ({listing.ownerId?.email})</p>
      <img src={`http://localhost:5000/uploads/${listing.imageName}`} alt={listing.itemName} width="200" />

      {user && (
        <div style={{ marginTop: "1rem" }}>
          <Link to={`/update-listing/${listing._id}`} style={{ marginRight: "1rem" }}>
            Edit Listing
          </Link>
          <Link to={`/update-listing-image/${listing._id}`} style={{ marginRight: "1rem" }}>
            Update Image
          </Link>
          <DeleteListingButton id={listing._id} onDeleted={() => window.location.href = "/"} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;