// models/Activity.js
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: { 
    type: String, 
    required: true,
  },
  category: {
    type: String,
    enum: ["adventure", "culture", "relaxation", "food", "nature"],
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);
