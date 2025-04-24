import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Search from './pages/Search';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import AddListing from './components/AddListing';
import UpdateListing from './components/UpdateListing';
import UpdateListingImage from './components/UpdateListingImage';

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/update-listing/:id" element={<UpdateListing />} />
        <Route path="/update-listing-image/:id" element={<UpdateListingImage />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;