import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:6005/api';

export const bookingService = {
  // Create a new booking
  createBooking: async (bookingData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/bookings`, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Get all bookings for the current user
  getUserBookings: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Get a single booking by ID
  getBookingById: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  },

  // Update a booking
  updateBooking: async (id, updateData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/bookings/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  },

  // Delete a booking
  deleteBooking: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_URL}/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  },
};

