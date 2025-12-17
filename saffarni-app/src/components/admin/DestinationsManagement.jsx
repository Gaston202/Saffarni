import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:6005/api";

export default function DestinationsManagement({ token }) {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    location: "",
    image: "",
    rating: 0,
    reviews: 0,
    description: "",
    price: 0,
    duration: 1,
    travelStyles: "",
    preferences: "",
  });

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    try {
      setLoading(true);
      let res;
      try {
        res = await axios.get(`${API_URL}/admin/destinations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        if (err.response && err.response.status === 404) {
          res = await axios.get(`${API_URL}/destinations`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
        } else {
          throw err;
        }
      }
      setDestinations(res.data);
    } catch (error) {
      console.error("Failed to load destinations:", error);
      alert("Failed to load destinations");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/admin/destinations`, {
        ...formData,
        travelStyles: formData.travelStyles.split(",").map((s) => s.trim()),
        preferences: formData.preferences.split(",").map((p) => p.trim()),
        rating: parseFloat(formData.rating),
        reviews: parseInt(formData.reviews),
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Destination added successfully");
      setFormData({
        id: "",
        title: "",
        location: "",
        image: "",
        rating: 0,
        reviews: 0,
        description: "",
        price: 0,
        duration: 1,
        travelStyles: "",
        preferences: "",
      });
      setShowForm(false);
      loadDestinations();
    } catch (error) {
      console.error("Failed to add destination:", error);
      alert("Failed to add destination");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;
    try {
      await axios.delete(`${API_URL}/admin/destinations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Destination deleted successfully");
      loadDestinations();
    } catch (error) {
      console.error("Failed to delete destination:", error);
      alert("Failed to delete destination");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold" style={{ color: "#255194" }}>
          Destinations Management
        </h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#DF6951] hover:bg-[#c85a48] text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Destination
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>ID</Label>
                <Input
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>Duration (days)</Label>
                <Input
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Rating</Label>
                <Input
                  name="rating"
                  type="number"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Reviews</Label>
                <Input
                  name="reviews"
                  type="number"
                  value={formData.reviews}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Travel Styles (comma-separated)</Label>
                <Input
                  name="travelStyles"
                  value={formData.travelStyles}
                  onChange={handleInputChange}
                  placeholder="Adventure, Culture, Relaxation"
                />
              </div>
              <div>
                <Label>Preferences (comma-separated)</Label>
                <Input
                  name="preferences"
                  value={formData.preferences}
                  onChange={handleInputChange}
                  placeholder="Beach, Mountain, City"
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <Button type="submit" className="bg-[#DF6951] hover:bg-[#c85a48] text-white">
              Add Destination
            </Button>
          </form>
        </Card>
      )}

      {loading ? (
        <p>Loading destinations...</p>
      ) : (
        <div className="grid gap-4">
          {destinations.map((destination) => (
            <Card key={destination._id} className="p-4 bg-white">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold" style={{ color: "#255194" }}>
                    {destination.title}
                  </h3>
                  <p className="text-sm text-gray-600">{destination.location}</p>
                  <p className="text-sm text-gray-600">${destination.price} · {destination.duration} days</p>
                  <p className="text-sm text-gray-600">{destination.description}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(destination._id)}
                  className="bg-red-500 hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
