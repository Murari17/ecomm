const express = require('express');

const {
    allUsers,
    getUserById,
    addUser,
    updateUser,
    deleteuser
} = require('./../controllers/user.controller.js');
const logger = require('./../middleware/logger.middleware.js');

const userRouter = express.Router();

const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

userRouter.post('/register', async (req, res) => {
    const { name, mobile, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        const user = new User({ name, mobile, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
});

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, name: user.name });
});

userRouter.post('/', addUser);
userRouter.get('/', logger, allUsers);
userRouter.get('/:id', getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteuser);

module.exports = userRouter;