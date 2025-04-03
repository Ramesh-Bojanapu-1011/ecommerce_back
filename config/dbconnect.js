const mongoose = require("mongoose");

/**
 * The function `db_connect` attempts to connect to a MongoDB database using Mongoose and logs a
 * success message if the connection is successful.
 */

const db_connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process if connection fails
  }
};
module.exports = db_connect;
