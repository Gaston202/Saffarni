 const Activity = require("../Models/Activity");

// Create activity
exports.createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all activities
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().populate("destinationId");
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get by destination
exports.getActivitiesByDestination = async (req, res) => {
  try {
    const activities = await Activity.find({
      destinationId: req.params.id,
    });
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateActivity = async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
exports.deleteActivity = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Activity deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
