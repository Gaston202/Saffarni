import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:6005/api";
import { AuthContext } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const defaultPhoto = "https://ui-avatars.com/api/?name=User&background=ff6b3d&color=fff";

const STYLE_OPTIONS = [
  "Adventure",
  "Relaxation",
  "Culture",
  "Foodie",
  "Luxury",
  "Budget friendly",
];

const TRAVEL_FREQUENCY_OPTIONS = [
  "Rarely",
  "Sometimes",
  "Often",
  "Very Often",
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, token, logout } = useContext(AuthContext);
 
const [trips, setTrips] = useState([]);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isPrefsDialogOpen, setIsPrefsDialogOpen] = useState(false);

  const [profileForm, setProfileForm] = useState({
    userName: "",
    email: "",
  });

  const [prefsForm, setPrefsForm] = useState({
    style: [],
    budgetRange: "",
    travelFrequency: "",
    favoriteCity: "",
  });
  useEffect(() => {
  const fetchTrips = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${API_URL}/trips/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTrips(Array.isArray(res.data) ? res.data : res.data.trips || []);

    } catch (err) {
      console.error("Error fetching trips:", err);
    }
  };

  if (!loading && token) {
    fetchTrips();
  }
}, [loading, token]);


  // Load profile on mount / auth change
  useEffect(() => {
  const load = async () => {
    try {
      if (user) {
        setProfile(user);
      } else {
        const stored = localStorage.getItem("user");
        if (stored) setProfile(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  };
  load();
}, [user, token]);

// Redirect to login ONLY after loading is finished
useEffect(() => {
  if (!loading && !user) {
    navigate("/login");
  }
}, [loading, user, navigate]);

const handleLogout = () => logout();

// PHOTO UPLOAD 
const handlePhotoUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;

      // Update UI immediately
      setProfile((prev) => ({
        ...(prev || {}),
        photo: base64Image,
      }));

      try {
        await axios.put(
          `${API_URL}/users/updateProfile`,
          { photo: base64Image },
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
      } catch (err) {
        console.error("Error saving photo on backend:", err);
      }
    };

    reader.readAsDataURL(file);
  } catch (err) {
    console.error("Failed to upload photo:", err);
  }
};

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
      Loading profile...
    </div>
  );
}

const displayUser = profile || {};


const prefs = displayUser?.preferences ?? {};

// OPEN DIALOGS WITH INITIAL VALUES 

const openProfileDialog = () => {
  setProfileForm({
    userName: displayUser.userName || "",
    email: displayUser.email || "",
  });
  setIsProfileDialogOpen(true);
};

const openPrefsDialog = () => {
  setPrefsForm({
    style: Array.isArray(prefs.style) ? prefs.style : [],
    budgetRange: prefs.budgetRange || "",
    travelFrequency: prefs.travelFrequency || "",
    favoriteCity: prefs.favoriteCity || "",
  });
  setIsPrefsDialogOpen(true);
};

// SAVE HANDLERS 

const handleSaveProfile = async () => {
  try {
    const res = await axios.put(
      `${API_URL}/users/updateProfile`,
      {
        userName: profileForm.userName,
        email: profileForm.email,
      },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    setProfile(res.data?.user || user);
    setIsProfileDialogOpen(false);
  } catch (err) {
    console.error("Error updating profile:", err);
  }
};

const handleSavePreferences = async () => {
  try {
    const payload = {
      style: prefsForm.style,
      budgetRange:
        prefsForm.budgetRange !== ""
          ? Number(prefsForm.budgetRange)
          : null,
      travelFrequency: prefsForm.travelFrequency,
      favoriteCity: prefsForm.favoriteCity,
    };

    const res = await axios.put(
      `${API_URL}/users/updatePreferences`,
      payload,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    setProfile((prev) => ({
      ...(prev || {}),
      preferences: res.data?.preferences || payload,
    }));

    setIsPrefsDialogOpen(false);
  } catch (err) {
    console.error("Error updating preferences:", err);
  }
};

  // STYLE CHECKBOX TOGGLE
  const toggleStyleOption = (option) => {
    setPrefsForm((prev) => {
      const current = prev.style || [];
      const exists = current.includes(option);
      return {
        ...prev,
        style: exists
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#fffaf7] py-10 px-6 md:px-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#1f3a63]">My Profile</h1>
        <p className="text-gray-600 mt-2">Your travel information</p>
      </div>

      {/* Main Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Info Card */}
        <Card className="md:col-span-1 shadow-md border border-gray-100 rounded-2xl">
          <CardHeader className="flex flex-col items-center">
            {/* IMAGE */}
            <img
              src={
                displayUser?.photo &&
                displayUser.photo !== "" &&
                displayUser.photo !== null &&
                displayUser.photo !== undefined
                  ? displayUser.photo
                  : defaultPhoto
              }
              alt="User"
              className="w-28 h-28 rounded-full mb-4 border-4 border-[#ff6b3d]"
            />

            {/* UPLOAD INPUT */}
            <input
              type="file"
              accept="image/*"
              id="upload-photo"
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <label
              htmlFor="upload-photo"
              className="cursor-pointer mt-2 text-sm text-[#ff6b3d] hover:underline"
            >
              Change Profile Picture
            </label>

            {/* NAME */}
            <CardTitle className="text-xl font-semibold text-[#1f3a63] mt-3">
              {displayUser.userName || "Name not provided"}
            </CardTitle>

            {/* EMAIL */}
            <p className="text-gray-500 text-sm">
              {displayUser.email || "Email not provided"}
            </p>

            {/* JOIN DATE */}
            <p className="text-sm mt-2 text-gray-600">
              {displayUser.createdAt
                ? `Member since ${new Date(
                    displayUser.createdAt
                  ).toLocaleDateString()}`
                : "Join date not provided"}
            </p>
          </CardHeader>

          <CardContent className="text-center">
            <Button
              className="bg-[#ff6b3d] hover:bg-[#ff8059] text-white w-full mb-3"
              onClick={openProfileDialog}
            >
              Edit Profile
            </Button>
            <Button
              variant="outline"
              className="w-full text-[#1f3a63] border-gray-300"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </CardContent>
        </Card>

        {/* Travel Insights + Preferences */}
        <div className="md:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Travel Insights */}
          <Card className="shadow-md border border-gray-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#1f3a63] text-lg font-semibold">
                Travel Insights
              </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-3 text-center mt-4">
              <div>
                <p className="text-2xl font-bold text-[#ff6b3d]">
                  {trips?.length ?? 0}
                </p>
                <p className="text-gray-600 text-sm">Trips Planned</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-[#ff6b3d]">
                  {displayUser.destinations ?? "0"}
                </p>
                <p className="text-gray-600 text-sm">Destinations Visited</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-[#ff6b3d]">
                  {displayUser.budgetAvg ?? "---"}
                </p>
                <p className="text-gray-600 text-sm">Avg. Budget</p>
              </div>
            </CardContent>
          </Card>

          {/* Travel Preferences */}
          <Card className="shadow-md border border-gray-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#1f3a63] text-lg font-semibold">
                Travel Preferences
              </CardTitle>
            </CardHeader>

            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Style:</span>{" "}
                {prefs?.style?.length
                  ? prefs.style.join(", ")
                  : "Not provided"}
              </p>

              <p>
                <span className="font-semibold">Budget Range:</span>{" "}
                {prefs?.budgetRange
                  ? `${prefs.budgetRange}`
                  : "Not provided"}
              </p>

              <p>
                <span className="font-semibold">Travel Frequency:</span>{" "}
                {prefs?.travelFrequency || "Not provided"}
              </p>

              <p>
                <span className="font-semibold">Favorite City:</span>{" "}
                {prefs?.favoriteCity || "Not provided"}
              </p>

              <Button
                variant="outline"
                className="mt-3 text-[#ff6b3d] border-[#ff6b3d]"
                onClick={openPrefsDialog}
              >
                Edit Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* My Trips Section */}
      {/* My Trips Section */}
<div className="max-w-5xl mx-auto mt-12">
  <h2 className="text-2xl font-semibold text-[#1f3a63] mb-6">
    My Trips
  </h2>

  {trips.length === 0 ? (
    <p className="text-gray-500 text-center">No trips added yet.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map((trip) => (
        <Card
          key={trip._id}
          className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm"
        >
          <img
            src={trip.destination?.image}
            alt={trip.destination?.title || "Trip"}
            className="h-40 w-full object-cover"
          />

          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-[#1f3a63]">
              {trip.destination?.title || "Trip"}
            </h3>

            <p className="text-sm text-gray-500">
              {trip.destination?.location || "Unknown location"}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Created on{" "}
              {new Date(trip.createdAt).toLocaleDateString()}
            </p>

            
          </CardContent>
        </Card>
      ))}
    </div>
  )}
</div>


      {/*- MODALS / DIALOGS- */}

      {/* Edit Profile Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="userName">Name</Label>
              <Input
                id="userName"
                value={profileForm.userName}
                onChange={(e) =>
                  setProfileForm((prev) => ({
                    ...prev,
                    userName: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileForm.email}
                onChange={(e) =>
                  setProfileForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsProfileDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Preferences Dialog */}
      <Dialog open={isPrefsDialogOpen} onOpenChange={setIsPrefsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Travel Preferences</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Style multi-select */}
            <div className="space-y-2">
              <Label>Style</Label>
              <div className="grid grid-cols-2 gap-2">
                {STYLE_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-2 text-sm cursor-pointer"
                  >
                    <Checkbox
                      checked={prefsForm.style.includes(option)}
                      onCheckedChange={() => toggleStyleOption(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div className="space-y-2">
              <Label htmlFor="budgetRange">Budget Range (number)</Label>
              <Input
                id="budgetRange"
                type="number"
                value={prefsForm.budgetRange}
                onChange={(e) =>
                  setPrefsForm((prev) => ({
                    ...prev,
                    budgetRange: e.target.value,
                  }))
                }
              />
            </div>

            {/* Travel Frequency */}
            <div className="space-y-2">
              <Label>Travel Frequency</Label>
              <Select
                value={prefsForm.travelFrequency}
                onValueChange={(value) =>
                  setPrefsForm((prev) => ({
                    ...prev,
                    travelFrequency: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {TRAVEL_FREQUENCY_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Favorite City */}
            <div className="space-y-2">
              <Label htmlFor="favoriteCity">Favorite City</Label>
              <Input
                id="favoriteCity"
                value={prefsForm.favoriteCity}
                onChange={(e) =>
                  setPrefsForm((prev) => ({
                    ...prev,
                    favoriteCity: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPrefsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSavePreferences}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
