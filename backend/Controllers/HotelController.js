const Hotel = require('../Models/Hotel');

// Get all hotels
const getHotels = async (req, res) => {
    const hotels= await Hotel.find();
    try {
        if (hotels && hotels.length > 0) {
        const hotels = await Hotel.find();
            res.status(200).json(hotels);
        } else {
            res.status(404).json({ message: 'No hotels found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Post a new hotel
const postHotel = async (req, res) => {
    const Hotel = req.body;
    try {
        const foundHotel = await Hotel.findOne({ name: Hotel.name });
        if (foundHotel) {
            return res.status(409).json({ message: 'Hotel already exists' });
        }
        else {
            const newHotel = new Hotel(Hotel);
            const savedHotel = await newHotel.save();
            res.status(201).json(savedHotel);
         }
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {getHotels, postHotel};