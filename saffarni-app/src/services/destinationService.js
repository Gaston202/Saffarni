import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:6005/api';

export const destinationService = {
  // Get all destinations
  getAllDestinations: async () => {
    try {
      const response = await axios.get(`${API_URL}/destinations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching destinations:', error);
      throw error;
    }
  },

  // Get destination by ID
  getDestinationById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/destinations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching destination:', error);
      throw error;
    }
  },

  // Get destination details (restaurants, hotels, places)
  getDestinationDetails: async (destinationId) => {
    try {
      const response = await axios.get(`${API_URL}/destinations/${destinationId}/details`);
      return response.data;
    } catch (error) {
      console.error('Error fetching destination details:', error);
      throw error;
    }
  },
};

