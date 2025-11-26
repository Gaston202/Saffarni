const Destination = require('../Models/Destination');
const Restaurant = require('../Models/Restaurant');
const Place = require('../Models/Place');
const Hotel = require('../Models/Hotel');

const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDestinationById = async (req, res) => {
  const { id } = req.params;
  try {
    const destination = await Destination.findOne({ id });
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDestinationDetails = async (req, res) => {
  const { destinationId } = req.params;
  try {
    const [restaurants, hotels, places] = await Promise.all([
      Restaurant.find({ destinationId }),
      Hotel.find({ destinationId }),
      Place.find({ destinationId }),
    ]);

    res.status(200).json({
      restaurants,
      hotels,
      places,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDestinations,
  getDestinationById,
  getDestinationDetails,
};

