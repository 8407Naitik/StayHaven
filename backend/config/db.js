const { Sequelize } = require('sequelize');

// Initialize Sequelize using the DATABASE_URL from the.env file
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, 
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false, 
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Neon PostgreSQL Connection established successfully.');
    // NOTE: We moved the synchronization logic (sequelize.sync) to server.js
  } catch (error) {
    console.error('Unable to connect to Neon DB:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB, sequelize };