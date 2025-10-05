const express = require('express');
const router = express.Router();
const { 
    getRooms, 
    createRoom,
    updateRoom,
    deleteRoom,
    getRoomById 
} = require('../controllers/roomController'); 

// Public routes (Search and Filter Module)
// GET /api/rooms - Retrieve all rooms, supports search/filtering later
router.get('/', getRooms);
// GET /api/rooms/:id - Retrieve a specific room
router.get('/:id', getRoomById);

// Private routes (Owner/Admin only)
// POST /api/rooms - Create a new room listing
router.post('/', createRoom);
// PUT /api/rooms/:id - Update a room listing
router.put('/:id', updateRoom);
// DELETE /api/rooms/:id - Delete a room listing
router.delete('/:id', deleteRoom);

module.exports = router;