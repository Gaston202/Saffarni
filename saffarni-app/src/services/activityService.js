import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:6005/api";

export const activityService = {
  async getAll() {
    const res = await axios.get(`${BASE_URL}/activities`);
    return res.data;
  },
  async getByDestination(destinationId) {
    const res = await axios.get(`${BASE_URL}/activities/destination/${destinationId}`);
    return res.data;
  },
  async create(payload) {
    const res = await axios.post(`${BASE_URL}/activities`, payload);
    return res.data;
  },
  async update(id, payload) {
    const res = await axios.put(`${BASE_URL}/activities/${id}`, payload);
    return res.data;
  },
  async remove(id) {
    const res = await axios.delete(`${BASE_URL}/activities/${id}`);
    return res.data;
  },
};