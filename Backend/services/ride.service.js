const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

// -------------------- OTP Generator --------------------
function getOtp(num) {
    return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
}

// -------------------- Fare Calculation --------------------
const VEHICLE_RATES = {
    auto: { baseFare: 20, perKm: 8, perMinute: 1.5, minimumFare: 50 },
    car: { baseFare: 35, perKm: 11, perMinute: 2, minimumFare: 80 },
    moto: { baseFare: 15, perKm: 5.5, perMinute: 1, minimumFare: 40 }
};

// Calculate fare for a single vehicle type
async function calculateFare(distanceMeters, durationSeconds, vehicleType) {
    const rates = VEHICLE_RATES[vehicleType];
    if (!rates) throw new Error("Invalid vehicle type");

    const distanceKm = distanceMeters / 1000;
    const durationMin = durationSeconds / 60;

    let fare =
        rates.baseFare +
        distanceKm * rates.perKm +
        durationMin * rates.perMinute;

    if (fare < rates.minimumFare) {
        fare = rates.minimumFare;
    }

    return Math.round(fare);
}

// -------------------- Calculate All Vehicle Fares --------------------
async function calculateAllFares(distanceMeters, durationSeconds) {
    const allFares = {};
    for (const vehicleType of Object.keys(VEHICLE_RATES)) {
        allFares[vehicleType] = await calculateFare(distanceMeters, durationSeconds, vehicleType);
    }
    return allFares;
}

// -------------------- Ride Creation --------------------
async function createRide({ user, pickup, destination }) {
    if (!user || !pickup || !destination) {
        throw new Error('All fields are required');
    }

    // Get distance & duration from map service
    const dt = await mapService.getDistanceTimeFromCoords(pickup, destination);

    // Create ride in DB
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        distance: dt.distance.value,  // meters
        duration: dt.duration.value,  // seconds
        fare: 0,                      // will calculate later
        otp: getOtp(6)
    });

    return ride;
}

module.exports = {
    createRide,
    calculateFare,
    calculateAllFares, // <-- add this
    VEHICLE_RATES
};
