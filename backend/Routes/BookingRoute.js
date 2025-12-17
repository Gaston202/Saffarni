const express = require("express");
const bookingRoute = express.Router();
const isAuth = require("../Middleware/isAuth");
const {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../Controllers/BookingController");

// Create booking
bookingRoute.post("/bookings", isAuth, createBooking);

// Get MY bookings (important)
bookingRoute.get("/bookings/my", isAuth, getUserBookings);

// Get booking by id
bookingRoute.get("/bookings/:id", isAuth, getBookingById);

// Update booking
bookingRoute.put("/bookings/:id", isAuth, updateBooking);

// Delete booking
bookingRoute.delete("/bookings/:id", isAuth, deleteBooking);

module.exports = bookingRoute;
