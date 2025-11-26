const express = require("express");
const connectDb = require("./Configuration/connectDB");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const HotelRoute = require("./Routes/HotelRoute");
const userRoute = require("./Routes/UserRoute");
const DestinationRoute = require("./Routes/DestinationRoute");

// Database connection
connectDb();

// Use routes
app.use("/api", HotelRoute);  // hotel routes
app.use("/api", userRoute);          // user routes (signin, users, etc.)
app.use("/api/destinations", DestinationRoute);  // destination routes

// Start server
const port = process.env.PORT || 6005;
app.listen(port, (error) => {
  if (error) {
    console.log("Server Failed");
  } else {
    console.log(`Server Started on port ${port}`);
  }
});
