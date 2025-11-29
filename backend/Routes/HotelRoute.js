const express = require("express");
const HotelRouter = express.Router();

const isAuth = require("../Middleware/isAuth");
const isAutho = require("../Middleware/isAutho");

const { getHotels ,getHotelbyId , updateHotel,deleteHotel} = require("../Controllers/HotelController");
HotelRouter.get("/hotels", isAuth, getHotels);
HotelRouter.get("/hotels/:id", isAuth, getHotelbyId);
HotelRouter.put("/hotels/:id", isAuth, isAutho(["admin"]), updateHotel);
HotelRouter.delete("/hotels/:id", isAuth, isAutho(["admin"]), deleteHotel);

module.exports = HotelRouter;