const express = require("express");
const connectDb = require("./Configuration/connectDB");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
// Increase JSON body limit to accept base64 images from frontend
app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ limit: '8mb', extended: true }));

// Routes
const HotelRoute = require("./Routes/HotelRoute");
const userRoute = require("./Routes/UserRoute"); 
const ActivityRoute = require("./Routes/ActivityRoute");
const DestinationRoute = require("./Routes/DestinationRoute"); 
const adminRoutes = require("./Routes/adminRoutes");
<<<<<<< HEAD
const BookingRoute = require("./Routes/BookingRoute");
=======
const tripRoutes = require("./Routes/TripRoute");
>>>>>>> 42605744cd047e2c6f2f6abc180f37c38a6583f0

// Database connection
connectDb();

// Use routes
app.use("/api", HotelRoute);  // hotel routes
app.use("/api", userRoute);   // user routes (signin, users, etc.)
app.use("/api", ActivityRoute); // activity routes base path
app.use("/api", DestinationRoute); // destination routes base path
app.use("/api", BookingRoute); // booking routes
app.use("/api/admin", adminRoutes); // admin routes
app.use("/api", tripRoutes); // trip routes (user-facing)

// Start server (only when not in Vercel serverless environment)
const port = process.env.PORT || 6005;

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, (error) => {
    if (error) {
      console.log("Server Failed");
    } else {
      console.log(`Server Started on port ${port}`);
    }
  });
}

// Export for Vercel serverless
module.exports = app;
