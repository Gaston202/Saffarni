import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:6005/api";

export default function ActivitiesManagement({ token }) {
  const [activities, setActivities] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    destinationId: "",
    price: 0,
    duration: "",
    category: "adventure",
    imageUrl: "",
  });

  useEffect(() => {
    loadActivities();
    loadDestinations();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      let res;
      try {
        res = await axios.get(`${API_URL}/admin/activities`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        if (err.response && err.response.status === 404) {
          res = await axios.get(`${API_URL}/activities`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
        } else {
          throw err;
        }
      }
      setActivities(res.data);
    } catch (error) {
      console.error("Failed to load activities:", error);
      alert("Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  const loadDestinations = async () => {
    try {
      const res = await axios.get(`${API_URL}/destinations`);
      setDestinations(res.data);
    } catch (error) {
      console.error("Failed to load destinations:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/admin/activities`, {
        ...formData,
        price: parseFloat(formData.price),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Activity added successfully");
      setFormData({
        title: "",
        description: "",
        destinationId: "",
        price: 0,
        duration: "",
        category: "adventure",
        imageUrl: "",
      });
      setShowForm(false);
      loadActivities();
    } catch (error) {
      console.error("Failed to add activity:", error);
      alert("Failed to add activity");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this activity?")) return;
    try {
      await axios.delete(`${API_URL}/admin/activities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Activity deleted successfully");
      loadActivities();
    } catch (error) {
      console.error("Failed to delete activity:", error);
      alert("Failed to delete activity");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold" style={{ color: "#255194" }}>
          Activities Management
        </h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#DF6951] hover:bg-[#c85a48] text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Activity
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                <Label>Duration</Label>
                <Input
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 2 hours, 1 day"
                  required
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="culture">Culture</SelectItem>
                    <SelectItem value="relaxation">Relaxation</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="nature">Nature</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Destination</Label>
                <Select value={formData.destinationId} onValueChange={(value) => setFormData({ ...formData, destinationId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((dest) => (
                      <SelectItem key={dest._id} value={dest._id}>
                        {dest.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Image URL</Label>
                <Input
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
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
              Add Activity
            </Button>
          </form>
        </Card>
      )}

      {loading ? (
        <p>Loading activities...</p>
      ) : (
        <div className="grid gap-4">
          {activities.map((activity) => (
            <Card key={activity._id} className="p-4 bg-white">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold" style={{ color: "#255194" }}>
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {activity.destinationId?.title || "Unknown Destination"}
                  </p>
                  <p className="text-sm text-gray-600">${activity.price} · {activity.duration}</p>
                  <p className="text-sm text-gray-600 capitalize">{activity.category}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(activity._id)}
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
