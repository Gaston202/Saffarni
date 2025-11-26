import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { destinationService } from "../services/destinationService";
import PreferencesSidebar from "../components/PreferencesSidebar";
import DestinationCard from "../components/DestinationCard";
import MapView from "../components/MapView";
import { Loader2 } from "lucide-react";

const RecommendationPage = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const data = await destinationService.getAllDestinations();
        console.log('Fetched destinations:', data);
        console.log('Number of destinations:', data.length);
        setDestinations(data);
        setError(null);
      } catch (err) {
        setError("Failed to load destinations. Please try again later.");
        console.error('Error details:', err);
        console.error('Error response:', err.response);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleCustomizeTrip = (destinationId) => {
    navigate(`/customize/${destinationId}`);
  };

  const [preferences, setPreferences] = useState({
    duration: [1, 30],
    budget: [0, 10000],
    selectedPreferences: [],
    travelStyles: [],
  });

  const filteredDestinations = useMemo(() => {
    console.log('Filtering destinations. Total:', destinations.length);
    console.log('Preferences:', preferences);
    const filtered = destinations.filter((dest) => {
      // Filter by duration
      if (
        dest.duration < preferences.duration[0] ||
        dest.duration > preferences.duration[1]
      ) {
        console.log(`Filtered out ${dest.title} - duration: ${dest.duration}`);
        return false;
      }

      // Filter by budget
      if (dest.price < preferences.budget[0] || dest.price > preferences.budget[1]) {
        console.log(`Filtered out ${dest.title} - price: ${dest.price}`);
        return false;
      }

      // Filter by selected preferences
      if (preferences.selectedPreferences.length > 0) {
        const hasMatchingPreference = preferences.selectedPreferences.some((pref) =>
          dest.preferences.includes(pref)
        );
        if (!hasMatchingPreference) {
          console.log(`Filtered out ${dest.title} - no matching preference`);
          return false;
        }
      }

      // Filter by travel styles
      if (preferences.travelStyles.length > 0) {
        const hasMatchingStyle = preferences.travelStyles.some((style) =>
          dest.travelStyles.includes(style)
        );
        if (!hasMatchingStyle) {
          console.log(`Filtered out ${dest.title} - no matching travel style`);
          return false;
        }
      }

      return true;
    });
    console.log('Filtered destinations:', filtered.length);
    return filtered;
  }, [destinations, preferences]);

  const [selectedDestination, setSelectedDestination] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-orange-50 to-blue-50">
        <Loader2 className="w-12 h-12 animate-spin" style={{ color: "#DF6951" }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-orange-50 to-blue-50">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#DF6951] text-white px-4 py-2 rounded hover:bg-[#c85a48]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-orange-50 to-blue-50">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr_400px] gap-4 sm:gap-6 lg:gap-8">

        {/* SIDEBAR */}
        <PreferencesSidebar
          preferences={preferences}
          setPreferences={setPreferences}
        />

        {/* MAIN CONTENT */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
            Recommended Destinations
          </h2>

          {/* DESTINATIONS GRID */}
          <div
            className="grid gap-4 sm:gap-6 pr-2"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
          >
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination._id || destination.id}
                  destination={destination}
                  onSelect={() => setSelectedDestination(destination)}
                  isSelected={selectedDestination?._id === destination._id || selectedDestination?.id === destination.id}
                  onCustomize={handleCustomizeTrip}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>No destinations match your preferences. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* MAP */}
        <div className="hidden xl:block">
          <MapView
            destinations={filteredDestinations}
            selectedDestination={selectedDestination}
            onSelectDestination={setSelectedDestination}
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
