// backend/config/testConnection.js

const Sequelize = require("sequelize");

// Set up the database connection
const sequelize = new Sequelize("blackFridayDB", "root", "Caboverde10", {
  host: "localhost",
  dialect: "mysql",
});

const testConnection = async () => {
  try {
    await sequelize.authenticate(); // Test the connection
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Run the connection test
testConnection();
