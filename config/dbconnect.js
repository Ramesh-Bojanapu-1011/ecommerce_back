const { default: mongoose } = require("mongoose");

const db_connect = () => {
  try {
    mongoose.connect(
      "mongodb+srv://Lovelyram:2tqzwUxPtWoojllk@cluster0.83s8v4s.mongodb.net/ecommerence?retryWrites=true&w=majority&appName=cluster0"
    );
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database error");
  }
};
module.exports = db_connect;
