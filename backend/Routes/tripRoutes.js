const express = require("express");
const router = express.Router();
const isAuth = require("../Middleware/isAuth");
const { createTrip, getMyTrips } = require("../Controllers/TripController");

router.post("/", isAuth, createTrip);
router.get("/me", isAuth, getMyTrips);

module.exports = router;
