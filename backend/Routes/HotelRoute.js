const express = require("express");
const HotelRouter = express.Router();
const { getHotels ,getHotelbyId } = require("../Controllers/HotelController");
HotelRouter.get("/hotels", getHotels);
HotelRouter.get("/hotels/:id", getHotelbyId);

module.exports = HotelRouter;