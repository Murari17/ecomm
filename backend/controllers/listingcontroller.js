const Listing = require('../models/listing');
const path = require('path');

exports.addListing = async (req, res) => {
  try {
    const ownerId = req.user._id || req.user.id;

    if (!ownerId) {
      return res.status(400).json({ message: "ownerId missing" });
    }

    const listing = new Listing({
      itemName: req.body.itemName,
      category: req.body.category,
      description: req.body.description,
      condition: req.body.condition,
      price: req.body.price,
      imageName: req.file ? req.file.filename : undefined,
      status: req.body.status,
      ownerId
    });
    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllListings = async (_, res) => {
  try {
    const listings = await Listing.find().populate('ownerId', 'name email');
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('ownerId', 'name email');
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    res.status(404).json({ error: 'Listing not found' });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const updated = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Listing not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateListingImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
    const updated = await Listing.findByIdAndUpdate(
      req.params.id,
      { imageName: req.file.filename },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Listing not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const deleted = await Listing.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Listing not found' });
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};