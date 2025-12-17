const Booking = require("../Models/Booking");
const Restaurant = require("../Models/Restaurant");
const Hotel = require("../Models/Hotel");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const {
      type,
      restaurantId,
      hotelId,
      reservationDate,
      reservationTime,
      numberOfGuests,
      checkInDate,
      checkOutDate,
      numberOfRooms,
      specialRequests,
    } = req.body;

    // Validate type
    if (!type || !["restaurant", "hotel"].includes(type)) {
      return res.status(400).json({ msg: "Invalid booking type. Must be 'restaurant' or 'hotel'" });
    }

    let bookingData = {
      user: userId,
      type,
      specialRequests: specialRequests || "",
    };

    if (type === "restaurant") {
      if (!restaurantId || !reservationDate || !reservationTime || !numberOfGuests) {
        return res.status(400).json({ msg: "Missing required fields for restaurant booking" });
      }

      // Verify restaurant exists
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ msg: "Restaurant not found" });
      }

      bookingData.restaurantId = restaurantId;
      bookingData.reservationDate = new Date(reservationDate);
      bookingData.reservationTime = reservationTime;
      bookingData.numberOfGuests = numberOfGuests;

      // Set total price (you can calculate based on restaurant pricing if needed)
      bookingData.totalPrice = 0; // Add pricing logic if needed
    } else if (type === "hotel") {
      if (!hotelId || !checkInDate || !checkOutDate || !numberOfRooms) {
        return res.status(400).json({ msg: "Missing required fields for hotel booking" });
      }

      // Verify hotel exists
      const hotel = await Hotel.findById(hotelId);
      if (!hotel) {
        return res.status(404).json({ msg: "Hotel not found" });
      }

      // Validate dates
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      
      if (checkOut <= checkIn) {
        return res.status(400).json({ msg: "Check-out date must be after check-in date" });
      }

      if (checkIn < new Date()) {
        return res.status(400).json({ msg: "Check-in date cannot be in the past" });
      }

      // Check room availability
      if (hotel.availableRooms < numberOfRooms) {
        return res.status(400).json({ msg: "Not enough rooms available" });
      }

      bookingData.hotelId = hotelId;
      bookingData.checkInDate = checkIn;
      bookingData.checkOutDate = checkOut;
      bookingData.numberOfRooms = numberOfRooms;
      bookingData.numberOfGuests = numberOfGuests || numberOfRooms * 2; // Default to 2 guests per room

      // Calculate total price (nights * price per night * number of rooms)
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      bookingData.totalPrice = nights * hotel.price * numberOfRooms;
    }

    const booking = await Booking.create(bookingData);
    
    // Populate references
    await booking.populate([
      { path: "restaurantId", select: "name image address" },
      { path: "hotelId", select: "name image location price" },
    ]);

    res.status(201).json({ msg: "Booking created successfully", booking });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ msg: "Failed to create booking", error: error.message });
  }
};

// Get all bookings for the authenticated user
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const bookings = await Booking.find({ user: userId })
      .populate("restaurantId", "name image address")
      .populate("hotelId", "name image location price")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get user bookings error:", error);
    res.status(500).json({ msg: "Failed to fetch bookings" });
  }
};

// Get a single booking by ID
const getBookingById = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate("restaurantId", "name image address")
      .populate("hotelId", "name image location price");

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Check if user owns the booking or is admin
    if (booking.user.toString() !== userId && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Forbidden" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Get booking error:", error);
    res.status(500).json({ msg: "Failed to fetch booking" });
  }
};

// Update booking status
const updateBooking = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const { status, specialRequests } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Check if user owns the booking or is admin
    if (booking.user.toString() !== userId && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Forbidden" });
    }

    const updateData = {};
    if (status) {
      updateData.status = status;
    }
    if (specialRequests !== undefined) {
      updateData.specialRequests = specialRequests;
    }

    const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate("restaurantId", "name image address")
      .populate("hotelId", "name image location price");

    res.status(200).json({ msg: "Booking updated successfully", booking: updatedBooking });
  } catch (error) {
    console.error("Update booking error:", error);
    res.status(500).json({ msg: "Failed to update booking" });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Check if user owns the booking or is admin
    if (booking.user.toString() !== userId && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Forbidden" });
    }

    await Booking.findByIdAndDelete(id);

    res.status(200).json({ msg: "Booking deleted successfully" });
  } catch (error) {
    console.error("Delete booking error:", error);
    res.status(500).json({ msg: "Failed to delete booking" });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};

