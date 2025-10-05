const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Requires the exported sequelize instance

const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    // (This will eventually link to the Owner/User model)
    owner_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rent: {
        type: DataTypes.INTEGER, // Monthly rent in ₹
        allowNull: false,
    },
    // Geospatial Data for Map Search
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Amenities
    water_charge_included: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    electricity_charge_included: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    wifi_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    furnishing_type: {
        type: DataTypes.ENUM('Unfurnished', 'Semi-Furnished', 'Fully-Furnished'),
        defaultValue: 'Semi-Furnished',
    },
    // Virtual Room Tour Module (Array of Image URLs)
    images_urls: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [], // <-- CORRECTED SYNTAX
    },
    // Review and Rating Module
    average_rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    is_verified: {
        type: DataTypes.BOOLEAN, // For "Verified Property" tag (Admin Control)
        defaultValue: false,
    },
}, {
    timestamps: true,
    tableName: 'rooms',
});

module.exports = Room;