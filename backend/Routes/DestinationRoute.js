const express = require('express');
const Destinationroute = express.Router();
const {
  getDestinations,
  getDestinationById,
  getDestinationDetails,
  
} = require('../Controllers/DestinationController');

Destinationroute.get('/destinations', getDestinations);
Destinationroute.get('/destinations/:destinationId/details', getDestinationDetails);
Destinationroute.get('/destinations/:id', getDestinationById);

module.exports = Destinationroute;