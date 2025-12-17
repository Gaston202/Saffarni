const express = require("express");
const isAuth = require("../Middleware/isAuth");
const isAdmin = require("../Middleware/isAdmin");

const {
  getAllUsers,
  deleteUser,
  changeUserRole,
  getAllTrips,
  deleteTrip,
  getAllHotels,
  createHotel,
  deleteHotel,
  getAllDestinations,
  createDestination,
  deleteDestination,
  getAllActivities,
  createActivity,
  deleteActivity,
} = require("../Controllers/AdminController");

const router = express.Router();

router.use(isAuth);
router.use(isAdmin);

// Users management
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/role", changeUserRole);

// Trips management
router.get("/trips", getAllTrips);
router.delete("/trips/:id", deleteTrip);

// Hotels management
router.get("/hotels", getAllHotels);
router.post("/hotels", createHotel);
router.delete("/hotels/:id", deleteHotel);

// Destinations management
router.get("/destinations", getAllDestinations);
router.post("/destinations", createDestination);
router.delete("/destinations/:id", deleteDestination);

// Activities management
router.get("/activities", getAllActivities);
router.post("/activities", createActivity);
router.delete("/activities/:id", deleteActivity);

module.exports = router;
