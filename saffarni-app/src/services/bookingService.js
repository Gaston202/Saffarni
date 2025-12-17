import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:6005/api";

export const bookingService = {
  // CREATE BOOKING
  createBooking: async (bookingData) => {
    const token = localStorage.getItem("token");

    const res = await axios.post(`${API_URL}/bookings`, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },

  // GET MY BOOKINGS
  getUserBookings: async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API_URL}/bookings/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },

  // GET BOOKING BY ID
  getBookingById: async (id) => {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API_URL}/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },

  // UPDATE BOOKING
  updateBooking: async (id, updateData) => {
    const token = localStorage.getItem("token");

    const res = await axios.put(`${API_URL}/bookings/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },

  // DELETE BOOKING
  deleteBooking: async (id) => {
    const token = localStorage.getItem("token");

    const res = await axios.delete(`${API_URL}/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },
};
