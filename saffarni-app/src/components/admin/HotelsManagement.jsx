import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:6005/api";

export default function HotelsManagement({ token }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: "",
    rating: 0,
    reviews: 0,
    price: 0,
    amenities: "",
    description: "",
    availableRooms: 0,
  });

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      setLoading(true);
      let res;
      try {
        res = await axios.get(`${API_URL}/admin/hotels`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        // if admin route not available, fallback to public hotels endpoint
        if (err.response && err.response.status === 404) {
          res = await axios.get(`${API_URL}/hotels`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
        } else {
          throw err;
        }
      }
      setHotels(res.data);
    } catch (error) {
      console.error("Failed to load hotels:", error);
      alert("Failed to load hotels");
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
      await axios.post(`${API_URL}/admin/hotels`, {
        ...formData,
        amenities: formData.amenities.split(",").map((a) => a.trim()),
        rating: parseFloat(formData.rating),
        reviews: parseInt(formData.reviews),
        price: parseFloat(formData.price),
        availableRooms: parseInt(formData.availableRooms),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Hotel added successfully");
      setFormData({
        name: "",
        location: "",
        image: "",
        rating: 0,
        reviews: 0,
        price: 0,
        amenities: "",
        description: "",
        availableRooms: 0,
      });
      setShowForm(false);
      loadHotels();
    } catch (error) {
      console.error("Failed to add hotel:", error);
      alert("Failed to add hotel");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await axios.delete(`${API_URL}/admin/hotels/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Hotel deleted successfully");
      loadHotels();
    } catch (error) {
      console.error("Failed to delete hotel:", error);
      alert("Failed to delete hotel");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold" style={{ color: "#255194" }}>
          Hotels Management
        </h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#DF6951] hover:bg-[#c85a48] text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Hotel
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  name="name"
                  value={formData.name}
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
                <Label>Available Rooms</Label>
                <Input
                  name="availableRooms"
                  type="number"
                  value={formData.availableRooms}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Amenities (comma-separated)</Label>
                <Input
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleInputChange}
                  placeholder="Wifi, Pool, Restaurant"
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
              Add Hotel
            </Button>
          </form>
        </Card>
      )}

      {loading ? (
        <p>Loading hotels...</p>
      ) : (
        <div className="grid gap-4">
          {hotels.map((hotel) => (
            <Card key={hotel._id} className="p-4 bg-white">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold" style={{ color: "#255194" }}>
                    {hotel.name}
                  </h3>
                  <p className="text-sm text-gray-600">{hotel.location}</p>
                  <p className="text-sm text-gray-600">${hotel.price}/night</p>
                  <p className="text-sm text-gray-600">{hotel.description}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(hotel._id)}
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
