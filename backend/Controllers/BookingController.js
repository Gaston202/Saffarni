const Booking = require("../Models/Booking");
const Restaurant = require("../Models/Restaurant");
const Hotel = require("../Models/Hotel");

// ================= CREATE BOOKING =================
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

    if (!type || !["restaurant", "hotel"].includes(type)) {
      return res.status(400).json({ msg: "Invalid booking type" });
    }

    const bookingData = {
      user: userId,
      type,
      numberOfGuests,
      specialRequests: specialRequests || "",
    };

    // ===== RESTAURANT BOOKING =====
    if (type === "restaurant") {
      if (!restaurantId || !reservationDate || !reservationTime || !numberOfGuests) {
        return res.status(400).json({ msg: "Missing restaurant booking fields" });
      }

      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ msg: "Restaurant not found" });
      }

      bookingData.restaurantId = restaurantId;
      bookingData.reservationDate = new Date(reservationDate);
      bookingData.reservationTime = reservationTime;
      bookingData.totalPrice = 0;
    }

    // ===== HOTEL BOOKING =====
    if (type === "hotel") {
      if (!hotelId || !checkInDate || !checkOutDate || !numberOfRooms) {
        return res.status(400).json({ msg: "Missing hotel booking fields" });
      }

      const hotel = await Hotel.findById(hotelId);
      if (!hotel) {
        return res.status(404).json({ msg: "Hotel not found" });
      }

      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      if (checkOut <= checkIn) {
        return res.status(400).json({ msg: "Check-out must be after check-in" });
      }

      bookingData.hotelId = hotelId;
      bookingData.checkInDate = checkIn;
      bookingData.checkOutDate = checkOut;
      bookingData.numberOfRooms = numberOfRooms;

      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      bookingData.totalPrice = nights * hotel.price * numberOfRooms;
    }

    const booking = await Booking.create(bookingData);

    const populatedBooking = await Booking.findById(booking._id)
      .populate("restaurantId", "name image address")
      .populate("hotelId", "name image location price");

    res.status(201).json(populatedBooking);
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ msg: "Failed to create booking" });
  }
};

// ================= GET MY BOOKINGS =================
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
    console.error("Get bookings error:", error);
    res.status(500).json({ msg: "Failed to fetch bookings" });
  }
};

// ================= GET BOOKING BY ID =================
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("restaurantId", "name image address")
      .populate("hotelId", "name image location price");

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    if (
      booking.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ msg: "Forbidden" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch booking" });
  }
};

// ================= UPDATE BOOKING =================
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    if (
      booking.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ msg: "Forbidden" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("restaurantId", "name image address")
      .populate("hotelId", "name image location price");

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ msg: "Failed to update booking" });
  }
};

// ================= DELETE BOOKING =================
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    if (
      booking.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ msg: "Forbidden" });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ msg: "Booking deleted successfully" });
  } catch (error) {
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
