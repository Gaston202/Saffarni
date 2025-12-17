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

// All booking routes require authentication
bookingRoute.post("/bookings", isAuth, createBooking);
bookingRoute.get("/bookings", isAuth, getUserBookings);
bookingRoute.get("/bookings/:id", isAuth, getBookingById);
bookingRoute.put("/bookings/:id", isAuth, updateBooking);
bookingRoute.delete("/bookings/:id", isAuth, deleteBooking);

module.exports = bookingRoute;

