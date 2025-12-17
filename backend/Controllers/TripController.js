const Trip = require("../Models/Trip");

exports.createTrip = async (req, res) => {
  try {
    const { destination, restaurants, hotels, places } = req.body;

    const trip = await Trip.create({
      user: req.user.id,
      destination,
      restaurants,
      hotels,
      places,
    });

    res.status(201).json({ trip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to create trip" });
  }
};

exports.getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id })
      .populate("destination")
      .populate("restaurants hotels places");

    res.json({ trips });
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch trips" });
  }
};
