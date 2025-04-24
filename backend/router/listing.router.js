const express = require('express');
const router = express.Router();
const listingCtrl = require('../controllers/listingcontroller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

const auth = require('../middleware/auth.middleware.js');

router.post('/', auth, upload.single('image'), listingCtrl.addListing);
router.put('/:id', auth, listingCtrl.updateListing);
router.put('/image/:id', auth, upload.single('image'), listingCtrl.updateListingImage);
router.delete('/:id', auth, listingCtrl.deleteListing);

router.get('/', listingCtrl.getAllListings);
router.get('/:id', listingCtrl.getListingById);

module.exports = router;