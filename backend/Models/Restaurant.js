const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  destinationId: {
    type: String,
    required: true,
    ref: "Destination",
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);

