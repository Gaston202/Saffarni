import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:6005/api';

export const hotelService = {
  // Get all hotels
  getAllHotels: async () => {
    try {
      const response = await axios.get(`${API_URL}/hotels`);
      return response.data;
    } catch (error) {
      console.error('Error fetching hotels:', error);
      throw error;
    }
  },

  // Get hotel by ID
  getHotelById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/hotels/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching hotel:', error);
      throw error;
    }
  }

};