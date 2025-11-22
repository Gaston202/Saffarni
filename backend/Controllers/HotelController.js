const Hotel = require('../Models/Hotel');

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
const getHotelbyId = async (req, res) => {
    const { id } = req.params;
    try {
        const hotel = await Hotel.findById(id);
        if (hotel) {
            res.status(200).json(hotel);
        } else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
    


module.exports = {getHotels, getHotelbyId};