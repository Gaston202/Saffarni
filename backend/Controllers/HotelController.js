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
const updateHotel = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(id, updates, { new: true });
        if (updatedHotel) {
            res.status(200).json(updatedHotel);
        } else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(id);
        if (deletedHotel) {
            res.status(200).json({ message: 'Hotel deleted successfully' });
        } else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {getHotels, getHotelbyId, updateHotel, deleteHotel};