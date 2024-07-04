const { default: mongoose } = require("mongoose");

/**
 * The function `db_connect` attempts to connect to a MongoDB database using Mongoose and logs a
 * success message if the connection is successful.
 */
const db_connect = () => {
  try {
    mongoose.connect(
      "mongodb+srv://Lovelyram:u96W8zjMrFYSzAIx@cluster0.83s8v4s.mongodb.net/ecommerence?retryWrites=true&w=majority&appName=cluster0"
    );
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database error");
  }
};
module.exports = db_connect;
