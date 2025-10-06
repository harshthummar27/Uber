const Ride = require('../models/ride.model');
const rideService = require('../services/ride.service');

// -------------------- Create Ride --------------------
module.exports.createRide = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { pickup, destination } = req.body;
    if (!pickup || !destination) {
      return res.status(400).json({ message: 'pickup and destination required' });
    }

    const ride = await rideService.createRide({ user: userId, pickup, destination });

    res.status(201).json({
      status: 'OK',
      ride: {
        id: ride._id,
        pickup: ride.pickup,
        destination: ride.destination,
        distance: { value: ride.distance, text: `${(ride.distance / 1000).toFixed(2)} km` },
        duration: { value: ride.duration, text: `${Math.round(ride.duration / 60)} min` },
        status: ride.status
      }
    });
  } catch (err) {
    console.error('createRide error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// -------------------- Get Ride Distance --------------------
module.exports.getRideDistance = async (req, res) => {
  try {
    const rideId = req.params.rideId;
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    res.json({
      status: 'OK',
      pickup: ride.pickup,
      destination: ride.destination,
      distance: { value: ride.distance, text: `${(ride.distance / 1000).toFixed(2)} km` },
      duration: { value: ride.duration, text: `${Math.round(ride.duration / 60)} min` },
      status: ride.status
    });
  } catch (err) {
    console.error('getRideDistance error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// -------------------- Get Fare --------------------
module.exports.getFare = async (req, res) => {
    try {
        const rideId = req.params.rideId;
        const ride = await Ride.findById(rideId);
        if (!ride) return res.status(404).json({ message: 'Ride not found' });

        if (!ride.distance || !ride.duration) {
            return res.status(400).json({ message: 'Distance not available yet' });
        }

        const fares = await rideService.calculateAllFares(ride.distance, ride.duration);

        res.json({
            rideId: ride._id,
            fares, // all vehicle fares
            distance: { value: ride.distance, text: `${(ride.distance / 1000).toFixed(2)} km` },
            duration: { value: ride.duration, text: `${Math.round(ride.duration / 60)} min` }
        });

    } catch (err) {
        console.error('getFare error:', err);
        res.status(500).json({ message: err.message || 'Server error' });
    }
};

