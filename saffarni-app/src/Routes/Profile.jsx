import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Profile() {
  // Everything is empty by default
  const user = {
    name: "",
    email: "",
    photo: "",
    joined: "",
    trips: [],
    destinations: "",
    budgetAvg: "",
    preferences: {
      style: [],
      budget: "",
      language: "",
      theme: "",
    },
  };

  const trips = []; // No default trips

  return (
    <div className="min-h-screen bg-[#fffaf7] py-10 px-6 md:px-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#1f3a63]">My Profile</h1>
        <p className="text-gray-600 mt-2">Your travel information</p>
      </div>

      {/* Profile Overview */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* User Info */}
        <Card className="md:col-span-1 shadow-md border border-gray-100 rounded-2xl">
          <CardHeader className="flex flex-col items-center">
            <img
              src={user.photo || "https://via.placeholder.com/150"}
              alt="User"
              className="w-28 h-28 rounded-full mb-4 border-4 border-[#ff6b3d]"
            />

            <CardTitle className="text-xl font-semibold text-[#1f3a63]">
              {user.name || "Name not provided"}
            </CardTitle>

            <p className="text-gray-500 text-sm">
              {user.email || "Email not provided"}
            </p>

            <p className="text-sm mt-2 text-gray-600">
              {user.joined ? `Member since ${user.joined}` : "Join date not provided"}
            </p>
          </CardHeader>

          <CardContent className="text-center">
            <Button className="bg-[#ff6b3d] hover:bg-[#ff8059] text-white w-full mb-3">
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full text-[#1f3a63] border-gray-300">
              Log Out
            </Button>
          </CardContent>
        </Card>

        {/* Travel Insights + Preferences */}
        <div className="md:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Travel Insights */}
          <Card className="shadow-md border border-gray-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#1f3a63] text-lg font-semibold">Travel Insights</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-3 text-center mt-4">
              <div>
                <p className="text-2xl font-bold text-[#ff6b3d]">
                  {user.trips.length}
                </p>
                <p className="text-gray-600 text-sm">Trips Planned</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-[#ff6b3d]">
                  {user.destinations || "0"}
                </p>
                <p className="text-gray-600 text-sm">Destinations Visited</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-[#ff6b3d]">
                  {user.budgetAvg || "---"}
                </p>
                <p className="text-gray-600 text-sm">Avg. Budget</p>
              </div>
            </CardContent>
          </Card>

          {/* Travel Preferences */}
          <Card className="shadow-md border border-gray-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#1f3a63] text-lg font-semibold">Travel Preferences</CardTitle>
            </CardHeader>

            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Style:</span>{" "}
                {user.preferences.style.length
                  ? user.preferences.style.join(", ")
                  : "Not provided"}
              </p>

              <p>
                <span className="font-semibold">Budget Range:</span>{" "}
                {user.preferences.budget || "Not provided"}
              </p>

              <p>
                <span className="font-semibold">Preferred Language:</span>{" "}
                {user.preferences.language || "Not provided"}
              </p>

              <p>
                <span className="font-semibold">App Theme:</span>{" "}
                {user.preferences.theme || "Not provided"}
              </p>

              <Button variant="outline" className="mt-3 text-[#ff6b3d] border-[#ff6b3d]">
                Edit Preferences
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* My Trips Section */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-[#1f3a63] mb-6">My Trips</h2>

        {trips.length === 0 ? (
          <p className="text-gray-500 text-center">No trips added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Card
                key={trip.id}
                className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm"
              >
                <img src={trip.image} alt={trip.title} className="h-40 w-full object-cover" />

                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-[#1f3a63]">{trip.title}</h3>
                  <p className="text-sm text-gray-500">
                    {trip.date} • {trip.duration}
                  </p>

                  <Button className="mt-3 bg-[#ff6b3d] hover:bg-[#ff8059] text-white w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
