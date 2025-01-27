const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var BlogSchema = new mongoose.Schema(
  {
    tilte: {
      type: String,
      required: true,
    },
    decription: {
      type: String,
      required: true,
    },
    catagary: {
      type: String,
      required: true,
      unique: true,
    },
    numberofViews: {
      type: Number,
      default: 0,
    },
    isliked: {
      type: Boolean,
      default: false,
    },
    isdisliked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
      default:
        "https://i.pinimg.com/736x/10/79/30/1079304734a87199e22b4781ad83c8cf.jpg",
    },
    author: {
      type: String,
      default: "Admin",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Blog", BlogSchema);
