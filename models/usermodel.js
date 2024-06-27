const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    Fist_name: {
      type: String,
      required: true,
    },
    Last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isBlocked:{
      type:Boolean,
      default:false
    },
    cart: {
      type: Array,
      default: [],
    },
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

/* This code snippet is a pre-save hook in Mongoose that is used to hash the user's password before
saving it to the database. */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

/* The code snippet `userSchema.methods.is_password_is_matched` is creating a method on the userSchema
model that can be used to compare a user's entered password with the hashed password stored in the
database. */
userSchema.methods.is_password_is_matched = async function (entred_password) {
  return await bcrypt.compare(entred_password, this.password);
};

//Export the model
module.exports = mongoose.model("User", userSchema);
