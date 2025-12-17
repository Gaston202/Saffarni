const express = require('express');
const Destinationroute = express.Router();
const isAuth = require('../Middleware/isAuth');
const {
  getDestinations,
  getDestinationById,
  getDestinationDetails,
  
} = require('../Controllers/DestinationController');

Destinationroute.get('/destinations', isAuth, getDestinations);
Destinationroute.get('/destinations/:destinationId/details', isAuth, getDestinationDetails);
Destinationroute.get('/destinations/:id', isAuth, getDestinationById);

module.exports = Destinationroute;