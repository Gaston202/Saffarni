const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],
    hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }],
    places: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
