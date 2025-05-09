const path = require('path');
const express = require('express');
const dbConnect = require('./utils/db.js');
const userRouter = require('./router/user.router.js');
const logger = require('./middleware/logger.middleware.js');
const upload = require('./middleware/fileUpload.middleware.js');
const listingRouter = require('./router/listing.router.js');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(cors());

app.post("/", upload.single('myImage'), (req, res) => {
    console.log(req.file);
    res.send("Okay");
});

app.use("/api/users", userRouter);
app.use("/api/listings", listingRouter);

app.listen(PORT, function () {
    console.log(`Server started at ${PORT}`);
    dbConnect();
});