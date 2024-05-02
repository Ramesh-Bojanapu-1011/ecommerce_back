const { default: mongoose } = require("mongoose");

const db_connect = () => {
  try {
    mongoose.connect('mongodb://localhost:27017/ecommerence');
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database error");
  }
};
module.exports = db_connect;
