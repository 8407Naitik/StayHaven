const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Note: We need a secure JWT secret in our.env file!

// Function to generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

// @desc    Register a new user (Student/Owner/Mess Provider)
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    // 1. Basic Validation
    if (!name ||!email ||!password ||!role) {
        res.status(400);
        throw new Error('Please include all fields: name, email, password, and role.');
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists with this email.');
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user in the database
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    // 5. Send response with JWT token
    if (user) {
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
            message: `${user.role} registered successfully.`,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data received.');
    }
});

// @desc    Authenticate a user and get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ where: { email } });

    // 2. Check user and password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
            message: 'Login successful.',
        });
    } else {
        res.status(401); // 401: Unauthorized
        throw new Error('Invalid credentials (email or password incorrect).');
    }
});

module.exports = {
    registerUser,
    loginUser,
};