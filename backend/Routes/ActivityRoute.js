const router = require("express").Router();
const {
  createActivity,
  getActivities,
  getActivitiesByDestination,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");

// CRUD
router.post("/", createActivity);
router.get("/", getActivities);
router.get("/destination/:id", getActivitiesByDestination);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

module.exports = router;
 