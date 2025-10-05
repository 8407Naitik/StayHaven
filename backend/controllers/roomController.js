const Room = require('../models/Room');
const asyncHandler = require('express-async-handler'); // Helper for error handling (install next)

// @desc    Get all room listings
// @route   GET /api/rooms
// @access  Public (Used by Search and Filter Module)
const getRooms = asyncHandler(async (req, res) => {
    // Find all rooms in the PostgreSQL database
    const rooms = await Room.findAll({
        order:[] // Show newest first
    });
    res.status(200).json(rooms);
});


// @desc    Create a new room listing
// @route   POST /api/rooms
// @access  Private (Owner/Admin only - Auth will be added later)
const createRoom = asyncHandler(async (req, res) => {
    // Destructure necessary fields from the request body
    const { title, description, rent, latitude, longitude, address, city } = req.body;

    // Basic Validation
    if (!title ||!description ||!rent ||!latitude ||!longitude ||!address ||!city) {
        res.status(400);
        throw new Error('Please include all required room details.');
    }

    // Create the listing in the database
    const room = await Room.create({
        // owner_id: req.user.id, // Will be implemented with User Management Module
        title,
        description,
        rent,
        latitude,
        longitude,
        address,
        city,
        // Amenities and image arrays will use defaults unless specified in req.body
    });

    if (room) {
        res.status(201).json({
            message: 'Room listing created successfully',
            room: room
        });
    } else {
        res.status(400);
        throw new Error('Invalid room data received.');
    }
});


// --- Placeholder functions (to be implemented later) ---

// @desc    Get single room by ID
// @route   GET /api/rooms/:id
// @access  Public
const getRoomById = asyncHandler(async (req, res) => {
    res.status(501).json({ message: 'GET Room by ID not yet implemented' });
});

// @desc    Update a room listing
// @route   PUT /api/rooms/:id
// @access  Private
const updateRoom = asyncHandler(async (req, res) => {
    res.status(501).json({ message: 'PUT Update Room not yet implemented' });
});

// @desc    Delete a room listing
// @route   DELETE /api/rooms/:id
// @access  Private
const deleteRoom = asyncHandler(async (req, res) => {
    res.status(501).json({ message: 'DELETE Room not yet implemented' });
});

module.exports = {
    getRooms,
    createRoom,
    updateRoom,
    deleteRoom,
    getRoomById
};