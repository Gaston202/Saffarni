const Activityrouter = require("express").Router();
const {
  createActivity,
  getActivities,
  getActivitiesByDestination,
  updateActivity,
  deleteActivity,
} = require("../Controllers/ActivityController");

// CRUD
Activityrouter.post("/activities", createActivity);
Activityrouter.get("/activities", getActivities);
Activityrouter.get("/activities/destination/:id", getActivitiesByDestination);
Activityrouter.put("/activities/:id", updateActivity);
Activityrouter.delete("/activities/:id", deleteActivity);
module.exports = Activityrouter;
 