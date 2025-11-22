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
        availableRooms: { type: Number, required: true },
    }
);
const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = Hotel;






