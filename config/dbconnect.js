const { default: mongoose } = require("mongoose");

/**
 * The function `db_connect` attempts to connect to a MongoDB database using Mongoose and logs a
 * success message if the connection is successful.
 */

const uri = process.env.MANGODB_URL;
const db_connect = () => {
  try {
    if (uri) {
      mongoose.connect(
        uri
      );
      console.log("Database Connected Successfully");

    }

  } catch (error) {
    console.log("Database error");
  }
};
module.exports = db_connect;



