const express = require("express");
const HotelRouter = express.Router();
const { getHotels ,postHotel } = require("../Controllers/HotelController");
HotelRouter.get("/hotels", getHotels);
HotelRouter.post("/hotels", postHotel);
module.exports = HotelRouter;