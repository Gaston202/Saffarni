const express = require("express");
const userRoute = express.Router();

const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  getOneUser,
  signIn,
} = require("../Controllers/UserController");

const { updateProfile, updatePreferences, addTrip } = require("../Controllers/UserController");

const isAuth = require("../Middleware/isAuth");
const isAutho = require("../Middleware/isAutho");

// GET all users 
userRoute.get("/users", getUsers);

// GET one user 
userRoute.get("/users/:id", isAuth, isAutho(["user", "admin"]), getOneUser);

// REGISTER a new user
userRoute.post("/users", postUser);

// Update profile 
userRoute.put("/users/updateProfile", isAuth, updateProfile);

// Update preferences 
userRoute.put("/users/updatePreferences", isAuth, updatePreferences);

// Add trip to user's profile
userRoute.post('/users/:id/trips', isAuth, addTrip);

// UPDATE user (only admin allowed)
userRoute.put("/users/:id", isAuth, isAutho(["admin"]), putUser);

// DELETE user (only admin allowed)
userRoute.delete("/users/:id", isAuth, isAutho(["admin"]), deleteUser);

// LOGIN
userRoute.post("/signin", signIn);

module.exports = userRoute;
