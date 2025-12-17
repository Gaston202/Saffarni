import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:6005/api";

export const tripService = {
  createTrip: (data, token) =>
    axios.post(`${API_URL}/trips`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getMyTrips: (token) =>
    axios.get(`${API_URL}/trips/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
