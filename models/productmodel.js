const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Catagary",
    },
    brand: {
        type: String,
        enum: ["apple", "samsong", "oppo"]
    },
    quantity: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
        default: 0
    },
    image: {
        type: Array,
        required: true,
    },
    color: {
        type: String,
        enum: ["Black", "Blue", "Red"]
    },
    ratings: [{
        star: Number,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },]

}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Product', productSchema);