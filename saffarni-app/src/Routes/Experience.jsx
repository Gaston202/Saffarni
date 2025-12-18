import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { activityService } from "../services/activityService";
import { AuthContext } from "@/context/AuthContext";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// Remove experiences import
// import { experiences } from "../data/experiencesData";

import { experienceTypes, cities } from "../data/experiencesData";

export default function Experiences() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.user ? true : false;

  const [filters, setFilters] = useState({
    category: "All",
    city: "All",
  });
  const [experiences, setExperiences] = useState([]); // DATA FROM BACKEND
  const [loading, setLoading] = useState(true);

  // Fetch all activities from backend
  const fetchActivities = async () => {
    try {
      const data = await activityService.getAll();
      setExperiences(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching activities:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const addToTrip = (experience) => {
    const stored = JSON.parse(localStorage.getItem("tripPlan")) || [];
    const updated = [...stored, experience];
    localStorage.setItem("tripPlan", JSON.stringify(updated));
    alert(`Added "${experience.title}" to your Trip Plan!`);
  };

  const filteredExperiences = experiences.filter((exp) => {
    const category = exp.category?.toLowerCase() || "";
    const city = exp.destinationId?.title?.toLowerCase() || "";

    const selectedCategory = filters.category.toLowerCase();
    const selectedCity = filters.city.toLowerCase();

    return (
      (filters.category === "All" || category === selectedCategory) &&
      (filters.city === "All" || city === selectedCity)
    );
  });

  if (loading) {
    return <p className="text-center mt-10">Loading experiences...</p>;
  }

  return (
    <div className="min-h-screen bg-[#fffaf7]">
      <section className="text-center py-16 bg-gradient-to-b from-[#fff6f2] to-[#fffaf7]">
        <h1 className="text-4xl font-bold text-[#1f3a63]">
          Discover <span className="text-[#ff6b3d]">Experiences</span> That
          Inspire You
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Handpicked adventures, local secrets, and AI-powered suggestions
          tailored to your style.
        </p>
      </section>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 pb-20">
        {/* Filters */}
        <aside className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 md:col-span-1">
          <h2 className="text-lg font-semibold text-[#1f3a63] mb-4">
            Filter by
          </h2>

          {/* Category */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Category</h3>
            <div className="flex flex-wrap gap-2">
              {experienceTypes.map((cat) => (
                <Button
                  key={cat}
                  variant={filters.category === cat ? "default" : "outline"}
                  onClick={() => setFilters({ ...filters, category: cat })}
                  className={
                    filters.category === cat ? "bg-[#ff6b3d] text-white" : ""
                  }
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* City */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">City</h3>
            <Select
              value={filters.city}
              onValueChange={(value) => setFilters({ ...filters, city: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </aside>

        {/* Experiences List */}
        <main className="md:col-span-3">
          <h2 className="text-2xl font-semibold text-[#1f3a63] mb-6">
            Recommended Experiences
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((exp) => (
              <Card
                key={exp._id}
                className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <img src={exp.imageUrl} className="h-40 w-full object-cover" />

                <CardHeader>
                  <CardTitle className="text-lg text-[#1f3a63]">
                    {exp.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600">
                    {exp.destinationId?.title}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="text-[#ff6b3d] font-medium">
                      {exp.category}
                    </span>{" "}
                    • {exp.duration}
                  </p>
                  <p className="text-sm mt-1 font-medium">{exp.price} TND</p>
                </CardContent>

                <CardFooter className="flex justify-end">
                  <Button
                    className="bg-[#ff6b3d] hover:bg-[#ff8059] text-white"
                    onClick={() => addToTrip(exp)}
                  >
                    Add to Trip
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
