import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Star,
  Wifi,
  Coffee,
  Utensils,
  ParkingCircle,
  Waves,
  Dumbbell,
  Filter,
  Heart,
  Loader2,
} from "lucide-react";
import { hotelService } from "../services/hotelService";

const HotelsPage = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [allHotels, setAllHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hotels from backend
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const data = await hotelService.getAllHotels();
        setAllHotels(data);
        setError(null);
      } catch (err) {
        setError("Failed to load hotels. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

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
    const withinPriceRange =
      hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    const meetsRating =
      selectedRating === "all" || hotel.rating >= parseFloat(selectedRating);
    return withinPriceRange && meetsRating;
  });

  return (
    <>
      <div className="min-h-screen px-16 bg-gradient-to-br from-blue-50 via-orange-50 to-blue-50">
        {/* Hero Section */}
        <div className="pt-12 text-center">
          <h1 className="text-6xl font-bold mb-4" style={{ color: "#255194" }}>
            Find Your Perfect Stay
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover the best hotels and accommodations for your journey
          </p>
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
                {loading
                  ? "Loading..."
                  : `${filteredHotels.length} properties found`}
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
              max={2000}
              step={50}
              className="mb-2 [&_[role=slider]]:border-[#DF6951] [&>span>span]:bg-[#DF6951]"
            />
          </Card>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2
                className="w-12 h-12 animate-spin"
                style={{ color: "#DF6951" }}
              />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4 bg-[#DF6951] text-white hover:bg-[#c85a48]"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Hotels Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHotels.map((hotel) => (
                <Card
                  key={hotel._id}
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

                    {/* Available Rooms */}
                    {hotel.availableRooms !== undefined && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                          <span
                            className="font-semibold"
                            style={{ color: "#255194" }}
                          >
                            {hotel.availableRooms}
                          </span>{" "}
                          rooms available
                        </p>
                      </div>
                    )}

                    {/* View Details Button */}
                    <Button
                      className="bg-[#DF6951] text-white hover:bg-[#c85a48] w-full mt-4"
                      onClick={() => navigate(`/hotels/${hotel._id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && !error && filteredHotels.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-4">
                No hotels found matching your criteria
              </p>
              <Button
                onClick={() => {
                  setPriceRange([0, 500]);
                  setSelectedRating("all");
                }}
                variant="outline"
                style={{ color: "#DF6951", borderColor: "#DF6951" }}
              >
                Clear Filters
              </Button>
            </div>
          )}

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
    </>
  );
};

export default HotelsPage;
