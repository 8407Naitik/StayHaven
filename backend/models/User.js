const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Crucial: Emails must be unique for login
    validate: {
      isEmail: true,
    },
  },
  password: { // Will store the HASHED password
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Student', 'Room Owner', 'Mess Provider', 'Admin'),
    defaultValue: 'Student', // Most users will start as students
    allowNull: false,
  },
  // For Verification in User Management Module
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  // For the Roommate Matching Module
  preferences: {
    type: DataTypes.JSON, // Stores matching criteria like gender, habits, budget range
    defaultValue: {},
  }
}, {
  timestamps: true,
  tableName: 'users',
});

module.exports = User;