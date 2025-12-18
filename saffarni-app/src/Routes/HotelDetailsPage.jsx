import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Star,
  Wifi,
  Coffee,
  Utensils,
  ParkingCircle,
  Waves,
  Dumbbell,
  ArrowLeft,
  Heart,
  Loader2,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { hotelService } from "../services/hotelService";

const HotelDetailsPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const data = await hotelService.getHotelById(hotelId);
        setHotel(data);
        setError(null);
      } catch (err) {
        setError("Failed to load hotel details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) {
      fetchHotelDetails();
    }
  }, [hotelId]);

  const amenityIcons = {
    Wifi: <Wifi className="w-5 h-5" />,
    Pool: <Waves className="w-5 h-5" />,
    Restaurant: <Utensils className="w-5 h-5" />,
    Spa: <Coffee className="w-5 h-5" />,
    Parking: <ParkingCircle className="w-5 h-5" />,
    Gym: <Dumbbell className="w-5 h-5" />,
    Coffee: <Coffee className="w-5 h-5" />,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-50 flex items-center justify-center">
        <Loader2
          className="w-12 h-12 animate-spin"
          style={{ color: "#DF6951" }}
        />
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error || "Hotel not found"}</p>
          <Button
            onClick={() => navigate("/hotels")}
            className="bg-[#DF6951] text-white hover:bg-[#c85a48]"
          >
            Back to Hotels
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-16 py-12">
        {/* Back Button */}
        <Button
          onClick={() => navigate("/hotels")}
          variant="ghost"
          className="mb-6 hover:bg-white/50"
          style={{ color: "#255194" }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hotels
        </Button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Hotel Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <Card className="overflow-hidden rounded-3xl shadow-xl bg-white">
              <div className="relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-96 object-cover"
                />
                <button
                  className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#DF6951] hover:text-white transition-colors duration-300 shadow-lg"
                  aria-label="Add to favorites"
                >
                  <Heart className="w-6 h-6" />
                </button>
              </div>
            </Card>

            {/* Hotel Information */}
            <Card className="p-8 rounded-3xl shadow-lg bg-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1
                    className="text-4xl font-bold mb-2"
                    style={{ color: "#255194" }}
                  >
                    {hotel.name}
                  </h1>
                  <div
                    className="flex items-center gap-2 text-lg"
                    style={{ color: "#5E6282" }}
                  >
                    <MapPin className="w-5 h-5" />
                    <span>{hotel.location}</span>
                  </div>
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{ backgroundColor: "#DF6951" }}
                >
                  <Star className="w-6 h-6 fill-white text-white" />
                  <span className="text-xl font-bold text-white">
                    {hotel.rating}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  Based on {hotel.reviews} reviews
                </span>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#255194" }}
                >
                  About This Hotel
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {hotel.description}
                </p>
              </div>

              {/* Amenities Section */}
              <div className="border-t border-gray-200 pt-6">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#255194" }}
                >
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl"
                    >
                      <div style={{ color: "#255194" }}>
                        {amenityIcons[amenity] || (
                          <Coffee className="w-5 h-5" />
                        )}
                      </div>
                      <span
                        className="font-medium"
                        style={{ color: "#255194" }}
                      >
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              {hotel.availableRooms !== undefined && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex items-center gap-2 text-lg">
                    <Calendar className="w-5 h-5" style={{ color: "#255194" }} />
                    <span className="text-gray-700">
                      <span
                        className="font-semibold"
                        style={{ color: "#255194" }}
                      >
                        {hotel.availableRooms}
                      </span>{" "}
                      rooms currently available
                    </span>
                  </div>
                </div>
              )}
            </Card>

            {/* Contact Information */}
            <Card className="p-8 rounded-3xl shadow-lg bg-white">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "#255194" }}
              >
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" style={{ color: "#DF6951" }} />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" style={{ color: "#DF6951" }} />
                  <span className="text-gray-700">contact@{hotel.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" style={{ color: "#DF6951" }} />
                  <span className="text-gray-700">{hotel.location}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-8 rounded-3xl shadow-xl bg-white sticky top-24">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-2">Starting from</p>
                <p
                  className="text-5xl font-bold mb-1"
                  style={{ color: "#DF6951" }}
                >
                  ${hotel.price}
                </p>
                <p className="text-gray-500">per night</p>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Base Price</span>
                    <span
                      className="font-semibold"
                      style={{ color: "#255194" }}
                    >
                      ${hotel.price}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Service Fee</span>
                    <span
                      className="font-semibold"
                      style={{ color: "#255194" }}
                    >
                      ${(hotel.price * 0.1).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Taxes</span>
                    <span
                      className="font-semibold"
                      style={{ color: "#255194" }}
                    >
                      ${(hotel.price * 0.15).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold" style={{ color: "#255194" }}>
                    Total per Night
                  </span>
                  <span className="text-2xl font-bold" style={{ color: "#DF6951" }}>
                    ${(hotel.price * 1.25).toFixed(0)}
                  </span>
                </div>
              </div>

              <Button
                className="w-full py-6 text-lg font-semibold bg-[#DF6951] text-white hover:bg-[#c85a48] rounded-xl"
              >
                Book Now
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Free cancellation up to 24 hours before check-in
              </p>
            </Card>

            {/* Why Book Section */}
            <Card className="p-6 rounded-3xl shadow-lg bg-white mt-6">
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: "#255194" }}
              >
                Why Book With Us?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 mt-0.5" style={{ color: "#DF6951" }} />
                  <span className="text-sm text-gray-700">
                    Best Price Guarantee
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 mt-0.5" style={{ color: "#DF6951" }} />
                  <span className="text-sm text-gray-700">
                    24/7 Customer Support
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 mt-0.5" style={{ color: "#DF6951" }} />
                  <span className="text-sm text-gray-700">
                    Free Cancellation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 mt-0.5" style={{ color: "#DF6951" }} />
                  <span className="text-sm text-gray-700">
                    Verified Reviews
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;
