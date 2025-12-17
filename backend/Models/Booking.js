const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["restaurant", "hotel"],
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: function() {
        return this.type === "restaurant";
      },
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: function() {
        return this.type === "hotel";
      },
    },
    // For restaurants
    reservationDate: {
      type: Date,
      required: function() {
        return this.type === "restaurant";
      },
    },
    reservationTime: {
      type: String, // e.g., "19:00"
      required: function() {
        return this.type === "restaurant";
      },
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: 1,
    },
    // For hotels
    checkInDate: {
      type: Date,
      required: function() {
        return this.type === "hotel";
      },
    },
    checkOutDate: {
      type: Date,
      required: function() {
        return this.type === "hotel";
      },
    },
    numberOfRooms: {
      type: Number,
      required: function() {
        return this.type === "hotel";
      },
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    specialRequests: {
      type: String,
      default: "",
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;

