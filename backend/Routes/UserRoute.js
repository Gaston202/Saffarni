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

const isAuth = require("../Middleware/isAuth");
const isAutho = require("../Middleware/isAutho");

// GET all users (admin only or public depending on your needs)
userRoute.get("/users", getUsers);

// GET one user (must be logged in + specific role allowed)
userRoute.get("/users/:id", isAuth, isAutho(["user", "admin"]), getOneUser);

// REGISTER a new user
userRoute.post("/users", postUser);

// UPDATE user (only admin allowed)
userRoute.put("/users/:id", isAuth, isAutho(["admin"]), putUser);

// DELETE user (only admin allowed)
userRoute.delete("/users/:id", isAuth, isAutho(["admin"]), deleteUser);

// LOGIN
userRoute.post("/signin", signIn);

module.exports = userRoute;
