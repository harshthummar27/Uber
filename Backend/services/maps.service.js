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

module.exports.getDistanceTime = async (origin, destination) => {
  const apiKey = process.env.GOOGLE_MAPS_API_DIS;

  if (!origin || !destination) {
    return {
      status: "ERROR",
      message: "Origin and destination are required"
    };
  }

  try {
    // Geocode origin
    const originRes = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(origin)}&limit=1&apiKey=${apiKey}`
    );
    if (!originRes.data.features.length)
      return { status: "ERROR", message: "Origin not found" };
    const originCoords = originRes.data.features[0].geometry.coordinates;

    // Geocode destination
    const destinationRes = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(destination)}&limit=1&apiKey=${apiKey}`
    );
    if (!destinationRes.data.features.length)
      return { status: "ERROR", message: "Destination not found" };
    const destinationCoords = destinationRes.data.features[0].geometry.coordinates;

    // Routing
    const routingRes = await axios.get(
      `https://api.geoapify.com/v1/routing?waypoints=${originCoords[1]},${originCoords[0]}|${destinationCoords[1]},${destinationCoords[0]}&mode=drive&apiKey=${apiKey}`
    );

    const route = routingRes.data.features[0];
    const distanceValue = route.properties.distance;
    const durationValue = route.properties.time;

    // Human-readable
    const distanceText = `${Math.round(distanceValue / 1000)} km`;
    const hours = Math.floor(durationValue / 3600);
    const minutes = Math.floor((durationValue % 3600) / 60);
    const durationText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

    return {
      distance: { text: distanceText, value: distanceValue },
      duration: { text: durationText, value: durationValue },
      status: "OK"
    };
  } catch (err) {
    console.error(err);
    return { status: "ERROR", message: err.message };
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    return {
      status: "ERROR",
      predictions: [],
      message: "query is required"
    };
  }

  const apiKey = process.env.GOOGLE_MAPS_API_AUTOCOMPLETE;
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&limit=5&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (!response.data.features || response.data.features.length === 0) {
      return {
        status: "ZERO_RESULTS",
        predictions: []
      };
    }

    const predictions = response.data.features.map((f, idx) => {
      const props = f.properties;
      const description = props.formatted;

      // Terms array (split by commas like Google)
      const parts = description.split(",").map(p => p.trim());
      let offset = 0;
      const terms = parts.map(p => {
        const term = { offset, value: p };
        offset += p.length + 2; // +2 for ", "
        return term;
      });

      return {
        description,
        place_id: props.place_id || `geoapify-${idx}`,
        structured_formatting: {
          main_text: parts[0],
          secondary_text: parts.slice(1).join(", ")
        },
        terms,
        geometry: {
          location: {
            lat: f.geometry.coordinates[1],
            lng: f.geometry.coordinates[0]
          }
        }
      };
    });

    return {
      status: "OK",
      predictions
    };
  } catch (err) {
    console.error(err);
    return {
      status: "ERROR",
      predictions: [],
      message: err.message
    };
  }
};


