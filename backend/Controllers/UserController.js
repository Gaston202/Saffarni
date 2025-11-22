const User = require("../Models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// SIGN IN (LOGIN)
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ msg: "User not registered" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: foundUser._id, role: foundUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      msg: "Login successful",
      user: foundUser,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// REGISTER (SIGN UP)

const postUser = async (req, res) => {
  try {
    const { userName, email, age, password } = req.body;

    // Check for required fields (age is optional)
    if (!userName || !email || !password) {
      return res.status(400).json({ msg: "Please fill required fields (userName, email, password)" });
    }

    // Check if user already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      // only include age if provided
      ...(age ? { age } : {}),
      password: hashedPassword,
    });

    res.status(201).json({
      msg: "User successfully registered",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error adding user" });
  }
};

//GET ALL USERS

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // hide passwords
    if (users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error getting users" });
  }
};

// GET ONE USER

const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;

    const foundUser = await User.findById(id, "-password");
    if (!foundUser) {
      return res.status(404).json({ msg: "No user found with this ID" });
    }

    res.status(200).json({ user: foundUser });
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving user" });
  }
};

//UPDATE USER

const putUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    await User.findByIdAndUpdate(id, data);

    res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error updating user" });
  }
};

// DELETE USER

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    await User.findByIdAndDelete(id);

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting user" });
  }
};

module.exports = {
  signIn,
  postUser,
  getUsers,
  getOneUser,
  putUser,
  deleteUser,
};
