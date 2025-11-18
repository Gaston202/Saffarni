var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelSchema = new Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        image: { type: String, required: true },
        rating: { type: Number, required: true },
        reviews: { type: Number, required: true },
        price: { type: Number, required: true },
        amenities: { type: [String], required: true },
        description: { type: String, required: true },
    }
);
const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = Hotel;






/*
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
*/