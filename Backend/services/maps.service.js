// services/maps.service.js
const axios = require("axios");

module.exports.getAddressCoordinate = async (address) => {
  // still using GOOGLE_MAPS_API env var name
  const apikey = process.env.GOOGLE_MAPS_API;
  if (!apikey) throw new Error("Geoapify API key not set in environment");

  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&limit=1&apiKey=${apikey}`;

  try {
    const response = await axios.get(url);

    if (response.data && response.data.features.length > 0) {
      // Geoapify returns coordinates as [lon, lat]
      const [lon, lat] = response.data.features[0].geometry.coordinates;
      return {
        lat: Number(lat),
        lng: Number(lon),
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error.message || error);
    throw error;
  }
};
