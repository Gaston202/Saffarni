import { useState } from "react";
import Footer from "../components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Search,
  Star,
  Wifi,
  Coffee,
  Utensils,
  ParkingCircle,
  Waves,
  Dumbbell,
  Calendar,
  Users,
  Filter,
  Heart,
} from "lucide-react";

const HotelsPage = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample hotel data
  const allHotels = [
    {
      id: 1,
      name: "The Residence Tunis",
      location: "La Marsa, Tunis",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      rating: 4.8,
      reviews: 342,
      price: 180,
      amenities: ["Wifi", "Pool", "Restaurant", "Spa"],
      description: "Luxury beachfront resort with stunning Mediterranean views",
    },
    {
      id: 2,
      name: "Movenpick Hotel Gammarth",
      location: "Gammarth, Tunis",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
      rating: 4.6,
      reviews: 278,
      price: 150,
      amenities: ["Wifi", "Pool", "Parking", "Gym"],
      description:
        "Modern hotel with panoramic sea views and excellent service",
    },
    {
      id: 3,
      name: "Laico Tunis Hotel",
      location: "Downtown, Tunis",
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      rating: 4.5,
      reviews: 512,
      price: 120,
      amenities: ["Wifi", "Restaurant", "Parking", "Coffee"],
      description:
        "Central location perfect for business and leisure travelers",
    },
    {
      id: 4,
      name: "Dar El Marsa Hotel",
      location: "Sidi Bou Said, Tunis",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      rating: 4.9,
      reviews: 189,
      price: 220,
      amenities: ["Wifi", "Pool", "Restaurant", "Spa"],
      description: "Boutique hotel in the heart of the charming blue village",
    },
    {
      id: 5,
      name: "Sheraton Tunis Hotel",
      location: "Berges du Lac, Tunis",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      rating: 4.4,
      reviews: 445,
      price: 140,
      amenities: ["Wifi", "Pool", "Gym", "Parking"],
      description: "Contemporary hotel with business facilities and comfort",
    },
    {
      id: 6,
      name: "Hotel Africa Tunis",
      location: "Avenue Habib Bourguiba, Tunis",
      image:
        "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&h=600&fit=crop",
      rating: 4.3,
      reviews: 621,
      price: 95,
      amenities: ["Wifi", "Restaurant", "Coffee", "Parking"],
      description: "Iconic hotel on the main avenue with classic elegance",
    },
  ];

  const amenityIcons = {
    Wifi: <Wifi className="w-4 h-4" />,
    Pool: <Waves className="w-4 h-4" />,
    Restaurant: <Utensils className="w-4 h-4" />,
    Spa: <Coffee className="w-4 h-4" />,
    Parking: <ParkingCircle className="w-4 h-4" />,
    Gym: <Dumbbell className="w-4 h-4" />,
    Coffee: <Coffee className="w-4 h-4" />,
  };

  // Filter hotels based on price range and rating
  const filteredHotels = allHotels.filter((hotel) => {
    // Price filter
    const withinPriceRange =
      hotel.price >= priceRange[0] && hotel.price <= priceRange[1];

    // Rating filter
    const meetsRating =
      selectedRating === "all" || hotel.rating >= parseFloat(selectedRating);

    // Search query filter (optional - filters by name or location)
    const matchesSearch =
      searchQuery === "" ||
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase());

    return withinPriceRange && meetsRating && matchesSearch;
  });

  return (
    <>
      <div className="min-h-screen px-16 bg-gradient-to-br from-blue-50 via-orange-50 to-blue-50">
        {/* Hero Section */}
        <div className="py-16 text-center">
          <h1 className="text-6xl font-bold mb-4" style={{ color: "#255194" }}>
            Find Your Perfect Stay
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover the best hotels and accommodations for your journey
          </p>

          {/* Search Card */}
          <Card
            className="p-8 shadow-lg max-w-5xl mx-auto"
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location Search */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <MapPin className="w-5 h-5" style={{ color: "#DF6951" }} />
                  <Input
                    placeholder="Where are you going?"
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Check-in Date */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <Calendar className="w-5 h-5" style={{ color: "#DF6951" }} />
                  <div>
                    <p className="text-xs text-gray-400">Check-in</p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#DF6951" }}
                    >
                      Jan 30, 2025
                    </p>
                  </div>
                </div>
              </div>

              {/* Check-out Date */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <Calendar className="w-5 h-5" style={{ color: "#DF6951" }} />
                  <div>
                    <p className="text-xs text-gray-400">Check-out</p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#DF6951" }}
                    >
                      Feb 5, 2025
                    </p>
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <Users className="w-5 h-5" style={{ color: "#DF6951" }} />
                  <div>
                    <p className="text-xs text-gray-400">Guests & Rooms</p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#DF6951" }}
                    >
                      2 Adults, 1 Room
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <Button className="bg-[#DF6951] text-white hover:bg-[#c85a48] shadow-lg hover:shadow-xl w-full mt-6">
              <Search className="w-4 h-4 mr-2" />
              Search Hotels
            </Button>
          </Card>
        </div>

        {/* Filters and Results Section */}
        <div className="max-w-7xl mx-auto pb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2
                className="text-3xl font-bold mb-2"
                style={{ color: "#255194" }}
              >
                Available Hotels
              </h2>
              <p className="text-gray-600">
                {filteredHotels.length} properties found
              </p>
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-4">
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4.0">4.0+ Stars</SelectItem>
                  <SelectItem value="3.5">3.5+ Stars</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="bg-white"
                style={{ color: "#DF6951", borderColor: "#DF6951" }}
              >
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Price Range Filter */}
          <Card className="p-6 mb-8 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: "#255194" }}>
                Price Range per Night
              </h3>
              <span
                className="text-sm font-medium"
                style={{ color: "#DF6951" }}
              >
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={500}
              step={10}
              className="mb-2 [&_[role=slider]]:border-[#DF6951] [&>span>span]:bg-[#DF6951]"
            />
          </Card>

          {/* Hotels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <Card
                key={hotel.id}
                className="overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white"
              >
                {/* Hotel Image */}
                <div className="relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-56 object-cover"
                  />
                  <button
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#DF6951] hover:text-white transition-colors duration-300"
                    aria-label="Add to favorites"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                {/* Hotel Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3
                        className="text-xl font-bold mb-1"
                        style={{ color: "#255194" }}
                      >
                        {hotel.name}
                      </h3>
                      <div
                        className="flex items-center gap-1 text-sm"
                        style={{ color: "#5E6282" }}
                      >
                        <MapPin className="w-4 h-4" />
                        <span>{hotel.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {hotel.description}
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 4).map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-full text-xs"
                        style={{ color: "#255194" }}
                      >
                        {amenityIcons[amenity]}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Rating and Price */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center gap-1 px-2 py-1 rounded"
                        style={{ backgroundColor: "#DF6951" }}
                      >
                        <Star className="w-4 h-4 fill-white text-white" />
                        <span className="text-sm font-semibold text-white">
                          {hotel.rating}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        ({hotel.reviews} reviews)
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-500">Starting from</p>
                      <p
                        className="text-2xl font-bold"
                        style={{ color: "#DF6951" }}
                      >
                        ${hotel.price}
                      </p>
                      <p className="text-xs text-gray-500">per night</p>
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button className="bg-[#DF6951] text-white hover:bg-[#c85a48] w-full mt-4">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Why Book With Us Section */}
          <div className="mt-20">
            <h2
              className="text-5xl font-bold text-center mb-16"
              style={{ color: "#255194" }}
            >
              Why Book With Saffarni?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 text-center bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#DF6951" }}
                  >
                    <Star className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#255194" }}
                >
                  Best Price Guarantee
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We ensure you get the best rates for your hotel bookings with
                  exclusive deals.
                </p>
              </Card>

              <Card className="p-8 text-center bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#DF6951" }}
                  >
                    <Heart className="w-10 h-10 text-white fill-white" />
                  </div>
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#255194" }}
                >
                  Verified Reviews
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Read authentic reviews from real travelers to make informed
                  decisions.
                </p>
              </Card>

              <Card className="p-8 text-center bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#DF6951" }}
                  >
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#255194" }}
                >
                  Prime Locations
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Discover hotels in the best locations, close to attractions
                  and experiences.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HotelsPage;
