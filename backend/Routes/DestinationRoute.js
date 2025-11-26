const express = require('express');
const router = express.Router();
const {
  getDestinations,
  getDestinationById,
  getDestinationDetails,
} = require('../Controllers/DestinationController');

router.get('/', getDestinations);
router.get('/:destinationId/details', getDestinationDetails);
router.get('/:id', getDestinationById);

module.exports = router;

