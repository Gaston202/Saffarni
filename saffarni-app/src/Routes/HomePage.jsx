import Hero from "../components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Compass,
  BookOpen,
  MoreHorizontal,
  MapPin,
  Calendar,
  User,
  Bed,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen px-16 bg-gradient-to-br from-blue-50 via-orange-50 to-blue-50">
      <Hero />
      <div className="my-12 flex justify-center">
        <Card
          className="p-8 shadow-lg max-w-4xl w-full"
          style={{ backgroundColor: "#F2F2F2" }}
        >
          <div className="mb-4 flex gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              style={{ color: "#DF6951", borderColor: "#DF6951" }}
            >
              <Compass className="w-4 h-4" style={{ color: "#DF6951" }} />
              Adventure
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              style={{ color: "#DF6951", borderColor: "#DF6951" }}
            >
              <BookOpen className="w-4 h-4" style={{ color: "#DF6951" }} />
              Culture
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              style={{ color: "#DF6951", borderColor: "#DF6951" }}
            >
              <MoreHorizontal
                className="w-4 h-4"
                style={{ color: "#DF6951" }}
              />
              More
            </Button>
          </div>

          <div className="space-y-4">
            {/* Search Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Where to? */}
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <MapPin className="w-5 h-5" style={{ color: "#DF6951" }} />
                <div>
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: "#DF6951" }}
                  >
                    Where to ?
                  </h3>
                  <p className="text-sm text-gray-400">Search destinations</p>
                </div>
              </div>

              {/* Date Range */}
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <Calendar className="w-5 h-5" style={{ color: "#DF6951" }} />
                <div className="font-medium" style={{ color: "#DF6951" }}>
                  Jan 30 › Feb 5
                </div>
              </div>

              {/* Guests */}
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <User className="w-5 h-5" style={{ color: "#DF6951" }} />
                <div
                  className="flex items-center gap-4 font-medium"
                  style={{ color: "#DF6951" }}
                >
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4" style={{ color: "#DF6951" }} />
                    <span>1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" style={{ color: "#DF6951" }} />
                    <span>3</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <Button className="bg-[#DF6951] text-white hover:bg-[#c85a48] shadow-lg hover:shadow-xl w-full">
              Generate My Trip
            </Button>
          </div>
        </Card>
      </div>

      {/* We Offer Best Services Section */}
      <div className="max-w-7xl mx-auto py-16">
        <h2
          className="text-5xl font-bold text-center mb-16"
          style={{ color: "#255194" }}
        >
          We Offer Best Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div
            className="absolute top-16 right-8"
            style={{ color: "#DF6951", fontSize: "24px" }}
          >
            +
          </div>

          {/* Personalized Recommendations */}
          <Card className="p-8 text-center bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 flex items-center justify-center">
                {/* illustration */}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4" style={{ color: "#255194" }}>
              Personalized
              <br />
              Recommendations
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get travel plans that adapt to you — smarter with every journey.
            </p>
          </Card>

          {/* Smart Trip Generation */}
          <Card className="p-8 text-center bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow relative">
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 flex items-center justify-center">
                  {/* illustration */}
                </div>
              </div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#255194" }}
              >
                Smart Trip Generation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                AI instantly creates your perfect trip based on your interests,
                budget, and style.
              </p>
            </div>
          </Card>

          {/* All-in-One Booking */}
          <Card className="p-8 text-center bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow relative">
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 flex items-center justify-center">
                  {/* illustration */}
                </div>
              </div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#255194" }}
              >
                All-in-One Booking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Plan, customize, and book everything in one seamless platform.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
