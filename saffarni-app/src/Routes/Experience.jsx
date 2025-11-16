import React, { useState } from "react";
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

import {
  defaultFilters,
  experiences,
  experienceTypes,
  cities,
} from "../data/experiencesData";

export default function Experiences() {
  const [filters, setFilters] = useState({ ...defaultFilters, city: "All" });

  const addToTrip = (experience) => {
    const stored = JSON.parse(localStorage.getItem("tripPlan")) || [];
    const updated = [...stored, experience];
    localStorage.setItem("tripPlan", JSON.stringify(updated));
    alert(`Added "${experience.title}" to your Trip Plan!`);
  };
  const filteredExperiences = experiences.filter((exp) => {
    return (
      (filters.type === "All" || exp.type === filters.type) &&
      (filters.city === "All" || exp.location === filters.city) &&
      (filters.season === "All") && // for now not linked to data
      (filters.budget === "All") // for now not linked to data
    );
  });

  return (
    <div className="min-h-screen bg-[#fffaf7]">
    
      <section className="text-center py-16 bg-gradient-to-b from-[#fff6f2] to-[#fffaf7]">
        <h1 className="text-4xl font-bold text-[#1f3a63]">
          Discover <span className="text-[#ff6b3d]">Experiences</span> That Inspire You
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Handpicked adventures, local secrets, and AI-powered suggestions tailored to your style.
        </p>
      </section>

   
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 pb-20">

        <aside className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 md:col-span-1">
          <h2 className="text-lg font-semibold text-[#1f3a63] mb-4">Filter by</h2>

          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Season</h3>
            <Select
              value={filters.season}
              onValueChange={(value) => setFilters({ ...filters, season: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Summer">Summer</SelectItem>
                <SelectItem value="Winter">Winter</SelectItem>
                <SelectItem value="Year-Round">Year-Round</SelectItem>
              </SelectContent>
            </Select>
          </div>

      
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Type</h3>
            <div className="flex flex-wrap gap-2">
              {experienceTypes.map((t) => (
                <Button
                  key={t}
                  variant={filters.type === t ? "default" : "outline"}
                  onClick={() => setFilters({ ...filters, type: t })}
                  className={filters.type === t ? "bg-[#ff6b3d] text-white" : ""}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

  
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

          <div>
            <h3 className="font-medium text-gray-700 mb-2">Budget</h3>
            <Select
              value={filters.budget}
              onValueChange={(value) => setFilters({ ...filters, budget: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </aside>
        <main className="md:col-span-3">
          <h2 className="text-2xl font-semibold text-[#1f3a63] mb-6">
            Recommended Experiences
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((exp) => (
              <Card
                key={exp.id}
                className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="h-40 w-full object-cover"
                />

                <CardHeader>
                  <CardTitle className="text-lg text-[#1f3a63]">
                    {exp.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600">{exp.location}</p>
                  <p className="text-sm mt-1">
                    <span className="text-[#ff6b3d] font-medium">{exp.type}</span> •{" "}
                    {exp.duration}
                  </p>
                  <p className="text-sm mt-1 font-medium">{exp.price}</p>
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
