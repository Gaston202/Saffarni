import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:6005/api';

export const userService = {
  async getUser(id, token) {
    const res = await axios.get(`${API_URL}/users/${id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    return res.data?.user || res.data;
  },

  async addTrip(userId, activityId, token) {
    const res = await axios.post(
      `${API_URL}/users/${userId}/trips`,
      { activityId },
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    return res.data?.user || res.data;
  },

  async updateProfile(payload, token) {
    const res = await axios.put(`${API_URL}/users/updateProfile`, payload, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    return res.data;
  },

  async updatePreferences(payload, token) {
    const res = await axios.put(`${API_URL}/users/updatePreferences`, payload, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    return res.data;
  }
};
