import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { destinationService } from "../services/destinationService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ArrowLeft, X, Utensils, Building2, MapPin, Star, Loader2 } from "lucide-react";

const TripCustomizationPage = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [details, setDetails] = useState({
    restaurants: [],
    hotels: [],
    places: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [destData, detailsData] = await Promise.all([
          destinationService.getDestinationById(destinationId),
          destinationService.getDestinationDetails(destinationId),
        ]);
        setDestination(destData);
        setDetails(detailsData);
        setError(null);
      } catch (err) {
        setError("Failed to load destination details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (destinationId) {
      fetchData();
    }
  }, [destinationId]);

  const [selectedItems, setSelectedItems] = useState({
    restaurants: [],
    hotels: [],
    places: [],
  });

  const getItemId = (item) => {
    return item.id || item._id;
  };

  const toggleItem = (category, item) => {
    setSelectedItems((prev) => {
      const categoryItems = prev[category];
      const itemId = getItemId(item);
      const isSelected = categoryItems.some((i) => getItemId(i) === itemId);

      if (isSelected) {
        return {
          ...prev,
          [category]: categoryItems.filter((i) => getItemId(i) !== itemId),
        };
      } else {
        return {
          ...prev,
          [category]: [...categoryItems, item],
        };
      }
    });
  };

  const isItemSelected = (category, item) => {
    const itemId = getItemId(item);
    return selectedItems[category].some((selectedItem) => getItemId(selectedItem) === itemId);
  };

  const totalSelected =
    selectedItems.restaurants.length +
    selectedItems.hotels.length +
    selectedItems.places.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin" style={{ color: "#DF6951" }} />
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error || "Destination not found"}</p>
          <Button
            onClick={() => navigate("/destinations")}
            className="bg-[#DF6951] text-white hover:bg-[#c85a48]"
          >
            Back to Destinations
          </Button>
        </div>
      </div>
    );
  }

  const renderItemCard = (item, category) => {
    const selected = isItemSelected(category, item);
    const itemId = getItemId(item);
    const icon =
      category === "restaurants" ? <Utensils className="w-4 h-4" /> : 
      category === "hotels" ? <Building2 className="w-4 h-4" /> : 
      <MapPin className="w-4 h-4" />;
    const showImage = item.image;

    return (
      <Card
        key={itemId}
        className={cn(
          "overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1",
          selected && "ring-2 ring-[#DF6951]"
        )}
        style={selected ? { backgroundColor: "#FFF5F2" } : {}}
        onClick={() => toggleItem(category, item)}
      >
        {showImage && (
          <div className="relative w-full h-44 overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1">
              <div style={selected ? { '--checkbox-bg': '#DF6951', '--checkbox-border': '#DF6951' } : {}}>
                <Checkbox
                  checked={selected}
                  onCheckedChange={() => toggleItem(category, item)}
                  onClick={(e) => e.stopPropagation()}
                  className={selected ? "!bg-[#DF6951] !border-[#DF6951] data-[state=checked]:!bg-[#DF6951] data-[state=checked]:!border-[#DF6951]" : ""}
                  style={selected ? { backgroundColor: '#DF6951', borderColor: '#DF6951' } : {}}
                />
              </div>
            </div>
          </div>
        )}
        {!showImage && (
          <div className="absolute top-2 right-2 z-10">
            <Checkbox
              checked={selected}
              onCheckedChange={() => toggleItem(category, item)}
              onClick={(e) => e.stopPropagation()}
              className={selected ? "!bg-[#DF6951] !border-[#DF6951] data-[state=checked]:!bg-[#DF6951] data-[state=checked]:!border-[#DF6951]" : ""}
              style={selected ? { backgroundColor: '#DF6951', borderColor: '#DF6951' } : {}}
            />
          </div>
        )}
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {icon}
            <h4 className="text-lg font-semibold flex-1">{item.name}</h4>
            <span className="text-xs bg-muted px-2 py-1 rounded-full">
              {item.type}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 fill-[#DF6951] text-[#DF6951]" />
            <span className="text-sm">{item.rating}</span>
            {item.price && (
              <span className="ml-auto text-xs bg-[#DF6951] text-white px-2 py-1 rounded">
                {item.price}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {item.description}
          </p>
          <p className="text-xs text-muted-foreground">{item.address}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/destinations")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recommendations
          </Button>
          <h1 className="text-4xl font-semibold mb-2">Customize Your Trip</h1>
          <h2 className="text-2xl font-semibold mb-2" style={{ color: "#DF6951" }}>
            {destination?.title}
          </h2>
          <p className="text-muted-foreground flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4" />
            {destination?.location}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_350px] gap-8">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="w-5 h-5" />
                  Restaurants ({details.restaurants.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
                  {details.restaurants.map((item) =>
                    renderItemCard(item, "restaurants")
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Hotels ({details.hotels.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
                  {details.hotels.map((item) => renderItemCard(item, "hotels"))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Places to Visit ({details.places.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
                  {details.places.map((item) => renderItemCard(item, "places"))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="sticky top-8 h-fit">
            <CardHeader>
              <CardTitle>Your Trip Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-[#DF6951] text-white px-4 py-2 rounded-md text-center font-semibold">
                {totalSelected} {totalSelected === 1 ? "item" : "items"}{" "}
                selected
              </div>

              <div className="max-h-[500px] overflow-y-auto space-y-4">
                {totalSelected === 0 ? (
                  <p className="text-center text-muted-foreground italic py-8">
                    No items selected yet. Start building your trip!
                  </p>
                ) : (
                  <>
                    {selectedItems.restaurants.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Utensils className="w-4 h-4" />
                          Restaurants
                        </h4>
                        <ul className="space-y-2">
                          {selectedItems.restaurants.map((item) => (
                            <li
                              key={getItemId(item)}
                              className="flex items-center justify-between bg-muted p-2 rounded"
                            >
                              <span className="text-sm">{item.name}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-destructive"
                                onClick={() => toggleItem("restaurants", item)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedItems.hotels.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Hotels
                        </h4>
                        <ul className="space-y-2">
                          {selectedItems.hotels.map((item) => (
                            <li
                              key={getItemId(item)}
                              className="flex items-center justify-between bg-muted p-2 rounded"
                            >
                              <span className="text-sm">{item.name}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-destructive"
                                onClick={() => toggleItem("hotels", item)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedItems.places.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Places to Visit
                        </h4>
                        <ul className="space-y-2">
                          {selectedItems.places.map((item) => (
                            <li
                              key={getItemId(item)}
                              className="flex items-center justify-between bg-muted p-2 rounded"
                            >
                              <span className="text-sm">{item.name}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-destructive"
                                onClick={() => toggleItem("places", item)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>

              {totalSelected > 0 && (
                <Button className="w-full bg-[#DF6951] text-white hover:bg-[#c85a48]">
                  Save Trip Plan
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TripCustomizationPage;
