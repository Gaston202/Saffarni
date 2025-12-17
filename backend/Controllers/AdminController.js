const User = require("../Models/Users");
const Trip = require("../Models/Trip");
const Hotel = require("../Models/Hotel");
const Destination = require("../Models/Destination");
const Activity = require("../Models/Activity");


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ msg: "Failed to fetch users" });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // prevent admin from deleting themselves (important safety check)
    if (req.user.id === id) {
      return res.status(400).json({
        msg: "Admin cannot delete their own account",
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ msg: "Failed to delete user" });
  }
};


exports.changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ msg: "Invalid role value" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      msg: "User role updated successfully",
      user,
    });
  } catch (error) {
    console.error("Change role error:", error);
    res.status(500).json({ msg: "Failed to update role" });
  }
};


exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("user", "email userName")
      .sort({ createdAt: -1 });

    res.status(200).json(trips);
  } catch (error) {
    console.error("Get trips error:", error);
    res.status(500).json({ msg: "Failed to fetch trips" });
  }
};


exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findByIdAndDelete(id);

    if (!trip) {
      return res.status(404).json({ msg: "Trip not found" });
    }

    res.status(200).json({ msg: "Trip deleted successfully" });
  } catch (error) {
    console.error("Delete trip error:", error);
    res.status(500).json({ msg: "Failed to delete trip" });
  }
};


// GET ALL HOTELS
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Get hotels error:", error);
    res.status(500).json({ msg: "Failed to fetch hotels" });
  }
};

// CREATE HOTEL
exports.createHotel = async (req, res) => {
  try {
    const { name, location, image, rating, reviews, price, amenities, description, availableRooms, destinationId } = req.body;

    if (!name || !location || !image || !price || !description) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const newHotel = await Hotel.create({
      name,
      location,
      image,
      rating: rating || 0,
      reviews: reviews || 0,
      price,
      amenities: amenities || [],
      description,
      availableRooms: availableRooms || 0,
      destinationId,
    });

    res.status(201).json({ msg: "Hotel created successfully", hotel: newHotel });
  } catch (error) {
    console.error("Create hotel error:", error);
    res.status(500).json({ msg: "Failed to create hotel" });
  }
};

// DELETE HOTEL
exports.deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findByIdAndDelete(id);

    if (!hotel) {
      return res.status(404).json({ msg: "Hotel not found" });
    }

    res.status(200).json({ msg: "Hotel deleted successfully" });
  } catch (error) {
    console.error("Delete hotel error:", error);
    res.status(500).json({ msg: "Failed to delete hotel" });
  }
};



// GET ALL DESTINATIONS
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    res.status(200).json(destinations);
  } catch (error) {
    console.error("Get destinations error:", error);
    res.status(500).json({ msg: "Failed to fetch destinations" });
  }
};

// CREATE DESTINATION
exports.createDestination = async (req, res) => {
  try {
    const { id, title, location, image, rating, reviews, description, price, currency, duration, travelStyles, preferences } = req.body;

    if (!id || !title || !location || !image || !price || !description) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const newDestination = await Destination.create({
      id,
      title,
      location,
      image,
      rating: rating || 0,
      reviews: reviews || 0,
      description,
      price,
      currency: currency || "TND",
      duration: duration || 1,
      travelStyles: travelStyles || [],
      preferences: preferences || [],
    });

    res.status(201).json({ msg: "Destination created successfully", destination: newDestination });
  } catch (error) {
    console.error("Create destination error:", error);
    res.status(500).json({ msg: "Failed to create destination" });
  }
};

// DELETE DESTINATION
exports.deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findByIdAndDelete(id);

    if (!destination) {
      return res.status(404).json({ msg: "Destination not found" });
    }

    res.status(200).json({ msg: "Destination deleted successfully" });
  } catch (error) {
    console.error("Delete destination error:", error);
    res.status(500).json({ msg: "Failed to delete destination" });
  }
};



// GET ALL ACTIVITIES
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().populate("destinationId", "title").sort({ createdAt: -1 });
    res.status(200).json(activities);
  } catch (error) {
    console.error("Get activities error:", error);
    res.status(500).json({ msg: "Failed to fetch activities" });
  }
};

// CREATE ACTIVITY
exports.createActivity = async (req, res) => {
  try {
    const { title, description, destinationId, price, duration, category, imageUrl } = req.body;

    if (!title || !description || !destinationId || !price || !duration || !category) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const newActivity = await Activity.create({
      title,
      description,
      destinationId,
      price,
      duration,
      category,
      imageUrl,
    });

    res.status(201).json({ msg: "Activity created successfully", activity: newActivity });
  } catch (error) {
    console.error("Create activity error:", error);
    res.status(500).json({ msg: "Failed to create activity" });
  }
};

// DELETE ACTIVITY
exports.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);

    if (!activity) {
      return res.status(404).json({ msg: "Activity not found" });
    }

    res.status(200).json({ msg: "Activity deleted successfully" });
  } catch (error) {
    console.error("Delete activity error:", error);
    res.status(500).json({ msg: "Failed to delete activity" });
  }
};
