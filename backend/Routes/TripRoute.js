const express = require("express");
const router = express.Router();
const isAuth = require("../Middleware/isAuth");

const {
  createTrip,
  getUserTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} = require("../Controllers/TripController");

// Create a trip for logged-in user
router.post("/trips", isAuth, createTrip);

// Get trips for current user
router.get("/trips", isAuth, getUserTrips);

// Get single trip
router.get("/trips/:id", isAuth, getTripById);

// Update trip
router.put("/trips/:id", isAuth, updateTrip);

// Delete trip
router.delete("/trips/:id", isAuth, deleteTrip);

module.exports = router;
