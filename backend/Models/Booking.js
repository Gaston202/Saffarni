const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["restaurant", "hotel"],
      required: true,
    },

    // ===== Restaurant booking =====
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: function () {
        return this.type === "restaurant";
      },
    },

    reservationDate: {
      type: Date,
      required: function () {
        return this.type === "restaurant";
      },
    },

    reservationTime: {
      type: String,
      required: function () {
        return this.type === "restaurant";
      },
    },

    // ===== Hotel booking =====
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: function () {
        return this.type === "hotel";
      },
    },

    checkInDate: {
      type: Date,
      required: function () {
        return this.type === "hotel";
      },
    },

    checkOutDate: {
      type: Date,
      required: function () {
        return this.type === "hotel";
      },
    },

    numberOfRooms: {
      type: Number,
      min: 1,
      required: function () {
        return this.type === "hotel";
      },
    },

    // ===== Shared fields =====
    numberOfGuests: {
      type: Number,
      min: 1,
      required: true,
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

    /*
    // OPTIONAL (future improvement)
    destination: {
      type: Schema.Types.ObjectId,
      ref: "Destination",
    },
    */
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
