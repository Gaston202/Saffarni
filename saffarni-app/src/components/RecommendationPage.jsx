import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { destinations } from "../data/destinations";
import PreferencesSidebar from "./PreferencesSidebar";
import DestinationCard from "./DestinationCard";
import MapView from "./MapView";

const RecommendationPage = () => {
  const navigate = useNavigate();

  const handleCustomizeTrip = (destinationId) => {
    navigate(`/customize/${destinationId}`);
  };
  const [preferences, setPreferences] = useState({
    duration: [3, 7],
    budget: [1000, 3000],
    selectedPreferences: [],
    travelStyles: [],
  });

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      // Filter by duration
      if (
        dest.duration < preferences.duration[0] ||
        dest.duration > preferences.duration[1]
      ) {
        return false;
      }

      // Filter by budget
      if (
        dest.price < preferences.budget[0] ||
        dest.price > preferences.budget[1]
      ) {
        return false;
      }

      // Filter by preferences (if any selected)
      if (preferences.selectedPreferences.length > 0) {
        const hasMatchingPreference = preferences.selectedPreferences.some(
          (pref) => dest.preferences.includes(pref)
        );
        if (!hasMatchingPreference) {
          return false;
        }
      }

      // Filter by travel styles (if any selected)
      if (preferences.travelStyles.length > 0) {
        const hasMatchingStyle = preferences.travelStyles.some((style) =>
          dest.travelStyles.includes(style)
        );
        if (!hasMatchingStyle) {
          return false;
        }
      }

      return true;
    });
  }, [preferences]);

  const [selectedDestination, setSelectedDestination] = useState(null);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-[1800px] mx-auto grid grid-cols-[320px_1fr_400px] gap-8">
        <PreferencesSidebar
          preferences={preferences}
          setPreferences={setPreferences}
        />

        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-semibold text-foreground">
            Recommended Destinations
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onSelect={() => setSelectedDestination(destination)}
                  isSelected={selectedDestination?.id === destination.id}
                  onCustomize={handleCustomizeTrip}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>
                  No destinations match your preferences. Try adjusting your
                  filters.
                </p>
              </div>
            )}
          </div>
        </div>

        <MapView
          destinations={filteredDestinations}
          selectedDestination={selectedDestination}
          onSelectDestination={setSelectedDestination}
        />
      </div>
    </div>
  );
};

export default RecommendationPage;
