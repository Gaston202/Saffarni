import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { destinationService } from "../services/destinationService";
import { bookingService } from "../services/bookingService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ArrowLeft, X, Utensils, Building2, MapPin, Star, Loader2, Wifi, Coffee, ParkingCircle, Waves, Dumbbell, Calendar, Edit, Trash2 } from "lucide-react";
import { tripService } from "../services/tripService";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";



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
const { token } = useContext(AuthContext);

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
const handleSaveTrip = async () => {
  try {
    const payload = {
      destination: destination._id || destination.id,
      restaurants: selectedItems.restaurants.map(getItemId),
      hotels: selectedItems.hotels.map(getItemId),
      places: selectedItems.places.map(getItemId),
    };

    await tripService.createTrip(payload, token);
    alert("Trip saved successfully!");
    navigate("/profile");
  } catch (error) {
    console.error(error);
    alert("Failed to save trip");
  }
};

  // Fetch bookings
  const fetchBookings = async () => {
    if (!token) return;

    try {
      setBookingsLoading(true);
      const allBookings = await bookingService.getUserBookings();
      
      // Get IDs of restaurants and hotels in this destination
      const restaurantIds = details.restaurants.map((r) => {
        const id = getItemId(r);
        return id?.toString();
      });
      const hotelIds = details.hotels.map((h) => {
        const id = getItemId(h);
        return id?.toString();
      });
      
      // Filter bookings for restaurants/hotels in this destination
      const destinationBookings = allBookings.filter((booking) => {
        if (booking.type === "restaurant" && booking.restaurantId) {
          const bookingRestaurantId = booking.restaurantId._id?.toString() || booking.restaurantId.toString();
          return restaurantIds.includes(bookingRestaurantId);
        } else if (booking.type === "hotel" && booking.hotelId) {
          const bookingHotelId = booking.hotelId._id?.toString() || booking.hotelId.toString();
          return hotelIds.includes(bookingHotelId);
        }
        return false;
      });
      
      setBookings(destinationBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setBookingsLoading(false);
    }
  };

  useEffect(() => {
  if (!token) return;

  if (
    destinationId &&
    (details.restaurants.length > 0 || details.hotels.length > 0)
  ) {
    fetchBookings();
  }
}, [token, destinationId, details.restaurants.length, details.hotels.length]);


  const [selectedItems, setSelectedItems] = useState({
    restaurants: [],
    hotels: [],
    places: [],
  });

  // Reservation dialog states
  const [reservationDialogOpen, setReservationDialogOpen] = useState(false);
  const [reservationType, setReservationType] = useState(null); // "restaurant" or "hotel"
  const [reservationItem, setReservationItem] = useState(null);
  const [reservationLoading, setReservationLoading] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null); // Store the booking being edited

  // Restaurant reservation form state
  const [restaurantReservation, setRestaurantReservation] = useState({
    date: "",
    time: "",
    numberOfGuests: 1,
    specialRequests: "",
  });

  // Hotel reservation form state
  const [hotelReservation, setHotelReservation] = useState({
    checkInDate: "",
    checkOutDate: "",
    numberOfRooms: 1,
    numberOfGuests: 2,
    specialRequests: "",
  });

  // Bookings/reservations state
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);

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

  // Open reservation dialog
  const openReservationDialog = (type, item) => {
    setReservationType(type);
    setReservationItem(item);
    setEditingBooking(null);
    setReservationDialogOpen(true);
    
    // Reset forms
    if (type === "restaurant") {
      setRestaurantReservation({
        date: "",
        time: "",
        numberOfGuests: 1,
        specialRequests: "",
      });
    } else {
      setHotelReservation({
        checkInDate: "",
        checkOutDate: "",
        numberOfRooms: 1,
        numberOfGuests: 2,
        specialRequests: "",
      });
    }
  };

  // Handle reservation submission (create or update)
  const handleReservationSubmit = async () => {
    try {
      setReservationLoading(true);
      
      if (editingBooking) {
        // Update existing booking
        const updateData = {
          specialRequests: reservationType === "restaurant" 
            ? restaurantReservation.specialRequests 
            : hotelReservation.specialRequests,
        };
        
        await bookingService.updateBooking(editingBooking._id, updateData);
        alert("Reservation updated successfully!");
      } else {
        // Create new booking
        let bookingData = {};
        
        if (reservationType === "restaurant") {
          if (!restaurantReservation.date || !restaurantReservation.time || !restaurantReservation.numberOfGuests) {
            alert("Please fill in all required fields");
            setReservationLoading(false);
            return;
          }
          
          bookingData = {
            type: "restaurant",
            restaurantId: reservationItem._id || reservationItem.id,
            reservationDate: restaurantReservation.date,
            reservationTime: restaurantReservation.time,
            numberOfGuests: parseInt(restaurantReservation.numberOfGuests),
            specialRequests: restaurantReservation.specialRequests,
          };
        } else if (reservationType === "hotel") {
          if (!hotelReservation.checkInDate || !hotelReservation.checkOutDate || !hotelReservation.numberOfRooms) {
            alert("Please fill in all required fields");
            setReservationLoading(false);
            return;
          }
          
          bookingData = {
            type: "hotel",
            hotelId: reservationItem._id || reservationItem.id,
            checkInDate: hotelReservation.checkInDate,
            checkOutDate: hotelReservation.checkOutDate,
            numberOfRooms: parseInt(hotelReservation.numberOfRooms),
            numberOfGuests: parseInt(hotelReservation.numberOfGuests),
            specialRequests: hotelReservation.specialRequests,
          };
        }

        await bookingService.createBooking(bookingData);
        alert("Reservation created successfully!");
      }
      
      setReservationDialogOpen(false);
      setEditingBooking(null);
      // Refresh bookings
      fetchBookings();
    } catch (error) {
      console.error("Error saving reservation:", error);
      alert(error.response?.data?.msg || "Failed to save reservation. Please try again.");
    } finally {
      setReservationLoading(false);
    }
  };

  // Handle delete booking
  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) {
      return;
    }

    try {
      await bookingService.deleteBooking(bookingId);
      alert("Reservation cancelled successfully!");
      fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert(error.response?.data?.msg || "Failed to cancel reservation. Please try again.");
    }
  };

  // Handle update booking
  const handleUpdateBooking = (booking) => {
    setEditingBooking(booking);
    setReservationType(booking.type);
    
    if (booking.type === "restaurant") {
      const reservationDate = new Date(booking.reservationDate);
      const dateStr = reservationDate.toISOString().split('T')[0];
      const timeStr = booking.reservationTime || "";
      
      setRestaurantReservation({
        date: dateStr,
        time: timeStr,
        numberOfGuests: booking.numberOfGuests || 1,
        specialRequests: booking.specialRequests || "",
      });
      
      // Find the restaurant item
      const restaurant = details.restaurants.find(
        (r) => (r._id || r.id) === (booking.restaurantId._id || booking.restaurantId)
      );
      setReservationItem(restaurant || booking.restaurantId);
    } else {
      const checkInDate = new Date(booking.checkInDate);
      const checkOutDate = new Date(booking.checkOutDate);
      const checkInStr = checkInDate.toISOString().split('T')[0];
      const checkOutStr = checkOutDate.toISOString().split('T')[0];
      
      setHotelReservation({
        checkInDate: checkInStr,
        checkOutDate: checkOutStr,
        numberOfRooms: booking.numberOfRooms || 1,
        numberOfGuests: booking.numberOfGuests || 2,
        specialRequests: booking.specialRequests || "",
      });
      
      // Find the hotel item
      const hotel = details.hotels.find(
        (h) => (h._id || h.id) === (booking.hotelId._id || booking.hotelId)
      );
      setReservationItem(hotel || booking.hotelId);
    }
    
    setReservationDialogOpen(true);
  };

  const totalSelected =
    selectedItems.restaurants.length +
    selectedItems.hotels.length +
    selectedItems.places.length;

  const amenityIcons = {
    Wifi: <Wifi className="w-4 h-4" />,
    Pool: <Waves className="w-4 h-4" />,
    Restaurant: <Utensils className="w-4 h-4" />,
    Spa: <Coffee className="w-4 h-4" />,
    Parking: <ParkingCircle className="w-4 h-4" />,
    Gym: <Dumbbell className="w-4 h-4" />,
    Coffee: <Coffee className="w-4 h-4" />,
  };

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
          {category === "hotels" && item.amenities && item.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {item.amenities.slice(0, 4).map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-full text-xs"
                  style={{ color: "#255194" }}
                >
                  {amenityIcons[amenity] || <MapPin className="w-3 h-3" />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          )}
          <p className="text-sm text-muted-foreground mb-2">
            {item.description}
          </p>
          <p className="text-xs text-muted-foreground mb-3">{item.address}</p>
          
          {/* Reserve Button for restaurants and hotels */}
          {(category === "restaurants" || category === "hotels") && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                openReservationDialog(category === "restaurants" ? "restaurant" : "hotel", item);
              }}
              className="w-full bg-[#DF6951] text-white hover:bg-[#c85a48]"
              size="sm"
            >
              Reserve
            </Button>
          )}
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
                <Button className="w-full bg-[#DF6951] text-white hover:bg-[#c85a48]"
                onClick={handleSaveTrip}>
                  Save Trip Plan
                </Button>
              )}

              {/* Reservations Section */}
              <div className="pt-4 border-t mt-4">
                <h4 className="font-semibold mb-3">Your Reservations</h4>
                {bookingsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#DF6951" }} />
                  </div>
                ) : bookings.length === 0 ? (
                  <p className="text-center text-muted-foreground italic py-4 text-sm">
                    No reservations yet. Make a reservation to see it here!
                  </p>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {bookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="border rounded-lg p-3 space-y-2 bg-muted/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {booking.type === "restaurant" ? (
                              <Utensils className="w-4 h-4 text-[#DF6951]" />
                            ) : (
                              <Building2 className="w-4 h-4 text-[#DF6951]" />
                            )}
                            <span className="font-semibold text-sm">
                              {booking.type === "restaurant"
                                ? booking.restaurantId?.name
                                : booking.hotelId?.name}
                            </span>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : booking.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        {booking.type === "restaurant" ? (
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {new Date(booking.reservationDate).toLocaleDateString()}
                              </span>
                              <span>at {booking.reservationTime}</span>
                            </div>
                            <div>
                              <span>{booking.numberOfGuests} guest{booking.numberOfGuests > 1 ? "s" : ""}</span>
                            </div>
                            {booking.totalPrice > 0 && (
                              <div className="font-semibold text-foreground">
                                ${booking.totalPrice.toFixed(2)}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              <span>
                                Check-in: {new Date(booking.checkInDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              <span>
                                Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div>
                              <span>{booking.numberOfRooms} room{booking.numberOfRooms > 1 ? "s" : ""}</span>
                              {" • "}
                              <span>{booking.numberOfGuests} guest{booking.numberOfGuests > 1 ? "s" : ""}</span>
                            </div>
                            {booking.totalPrice > 0 && (
                              <div className="font-semibold text-foreground">
                                ${booking.totalPrice.toFixed(2)}
                              </div>
                            )}
                          </div>
                        )}

                        {booking.specialRequests && (
                          <div className="text-xs text-muted-foreground pt-1 border-t">
                            <span className="font-semibold">Special requests: </span>
                            <span>{booking.specialRequests}</span>
                          </div>
                        )}

                        {/* Update and Delete Buttons */}
                        <div className="flex gap-2 pt-2 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateBooking(booking);
                            }}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Update
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBooking(booking._id);
                            }}
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reservation Dialog */}
      <Dialog open={reservationDialogOpen} onOpenChange={setReservationDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingBooking ? "Update" : "Reserve"} {reservationType === "restaurant" ? "Restaurant" : "Hotel"}
            </DialogTitle>
            <DialogDescription>
              {reservationItem?.name}
            </DialogDescription>
          </DialogHeader>

          {reservationType === "restaurant" ? (
            <div className="space-y-4 py-4">
              {!editingBooking && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="reservation-date">Date *</Label>
                    <Input
                      id="reservation-date"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={restaurantReservation.date}
                      onChange={(e) =>
                        setRestaurantReservation({ ...restaurantReservation, date: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reservation-time">Time *</Label>
                    <Input
                      id="reservation-time"
                      type="time"
                      value={restaurantReservation.time}
                      onChange={(e) =>
                        setRestaurantReservation({ ...restaurantReservation, time: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number-of-guests">Number of Guests *</Label>
                    <Input
                      id="number-of-guests"
                      type="number"
                      min="1"
                      max="20"
                      value={restaurantReservation.numberOfGuests}
                      onChange={(e) =>
                        setRestaurantReservation({ ...restaurantReservation, numberOfGuests: e.target.value })
                      }
                    />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="special-requests">Special Requests</Label>
                <textarea
                  id="special-requests"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={restaurantReservation.specialRequests}
                  onChange={(e) =>
                    setRestaurantReservation({ ...restaurantReservation, specialRequests: e.target.value })
                  }
                  placeholder="Any special requests or dietary restrictions..."
                />
              </div>
              {editingBooking && (
                <p className="text-xs text-muted-foreground italic">
                  Note: Date, time, and number of guests cannot be changed. You can only update special requests.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {!editingBooking && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="check-in-date">Check-in Date *</Label>
                    <Input
                      id="check-in-date"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={hotelReservation.checkInDate}
                      onChange={(e) =>
                        setHotelReservation({ ...hotelReservation, checkInDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="check-out-date">Check-out Date *</Label>
                    <Input
                      id="check-out-date"
                      type="date"
                      min={hotelReservation.checkInDate || new Date().toISOString().split('T')[0]}
                      value={hotelReservation.checkOutDate}
                      onChange={(e) =>
                        setHotelReservation({ ...hotelReservation, checkOutDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number-of-rooms">Number of Rooms *</Label>
                    <Input
                      id="number-of-rooms"
                      type="number"
                      min="1"
                      max="10"
                      value={hotelReservation.numberOfRooms}
                      onChange={(e) =>
                        setHotelReservation({ ...hotelReservation, numberOfRooms: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hotel-guests">Number of Guests *</Label>
                    <Input
                      id="hotel-guests"
                      type="number"
                      min="1"
                      max="50"
                      value={hotelReservation.numberOfGuests}
                      onChange={(e) =>
                        setHotelReservation({ ...hotelReservation, numberOfGuests: e.target.value })
                      }
                    />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="hotel-special-requests">Special Requests</Label>
                <textarea
                  id="hotel-special-requests"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={hotelReservation.specialRequests}
                  onChange={(e) =>
                    setHotelReservation({ ...hotelReservation, specialRequests: e.target.value })
                  }
                  placeholder="Any special requests..."
                />
              </div>
              {editingBooking && (
                <p className="text-xs text-muted-foreground italic">
                  Note: Check-in/check-out dates, rooms, and guests cannot be changed. You can only update special requests.
                </p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setReservationDialogOpen(false);
                setEditingBooking(null);
              }}
              disabled={reservationLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReservationSubmit}
              disabled={reservationLoading}
              className="bg-[#DF6951] text-white hover:bg-[#c85a48]"
            >
              {reservationLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : editingBooking ? (
                "Update Reservation"
              ) : (
                "Confirm Reservation"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TripCustomizationPage;
