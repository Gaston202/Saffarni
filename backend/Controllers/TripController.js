const Trip = require("../Models/Trip");
// Create a new trip (for logged in user)
exports.createTrip = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ msg: "Unauthorized" });

    const { title, destination, startDate, endDate, activities, hotels, budget, notes } = req.body;

    if (!title || !destination || !startDate || !endDate) {
      return res.status(400).json({ msg: "Missing required trip fields" });
    }

    const validActivities = Array.isArray(activities) ? activities : [];
    const validHotels = Array.isArray(hotels) ? hotels : [];

    const newTrip = await Trip.create({
      user: userId,
      title,
      destination,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      activities: validActivities,
      hotels: validHotels,
      budget: budget || 0,
      notes: notes || "",
    });

    res.status(201).json({ msg: "Trip saved", trip: newTrip });
  } catch (error) {
    console.error("Create trip error:", error);
    res.status(500).json({ msg: "Failed to create trip" });
  }
};

// Get trips for current user
exports.getUserTrips = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ msg: "Unauthorized" });

    const trips = await Trip.find({ user: userId })
      .populate("activities")
      .populate("hotels")
      .sort({ createdAt: -1 });

    res.status(200).json(trips);
  } catch (error) {
    console.error("Get user trips error:", error);
    res.status(500).json({ msg: "Failed to fetch trips" });
  }
};

// Get a single trip (owner or admin)
exports.getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id).populate("activities").populate("hotels");
    if (!trip) return res.status(404).json({ msg: "Trip not found" });

    if (req.user.id !== String(trip.user) && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Forbidden" });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error("Get trip by id error:", error);
    res.status(500).json({ msg: "Failed to fetch trip" });
  }
};

// Update a trip (owner or admin)
exports.updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);
    if (!trip) return res.status(404).json({ msg: "Trip not found" });

    if (req.user.id !== String(trip.user) && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Forbidden" });
    }

    const updates = req.body;
    if (updates.startDate) updates.startDate = new Date(updates.startDate);
    if (updates.endDate) updates.endDate = new Date(updates.endDate);

    const updated = await Trip.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ msg: "Trip updated", trip: updated });
  } catch (error) {
    console.error("Update trip error:", error);
    res.status(500).json({ msg: "Failed to update trip" });
  }
};

// Delete a trip (owner or admin)
exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);
    if (!trip) return res.status(404).json({ msg: "Trip not found" });

    if (req.user.id !== String(trip.user) && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Forbidden" });
    }

    await Trip.findByIdAndDelete(id);
    res.status(200).json({ msg: "Trip deleted" });
  } catch (error) {
    console.error("Delete trip error:", error);
    res.status(500).json({ msg: "Failed to delete trip" });
  }
};
