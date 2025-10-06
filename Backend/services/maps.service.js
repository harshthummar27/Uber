// services/maps.service.js
require("dotenv").config();
const axios = require("axios");

const GEOAPIFY_KEY = process.env.GOOGLE_MAPS_API || process.env.GEOAPIFY_KEY;
const GEOAPIFY_DIS_KEY = process.env.GOOGLE_MAPS_API_DIS || process.env.GEOAPIFY_KEY_DIS;
const GEOAPIFY_AUTOCOMPLETE_KEY = process.env.GOOGLE_MAPS_API_AUTOCOMPLETE || process.env.GEOAPIFY_KEY_AUTOCOMPLETE;
const NOMINATIM_EMAIL = process.env.NOMINATIM_EMAIL || "";

function isQuotaError(err) {
  if (!err) return false;
  if (err.response && [429, 402, 403].includes(err.response.status)) return true;
  try {
    const msg = JSON.stringify(err.response && err.response.data ? err.response.data : err.message || "");
    const lower = msg.toLowerCase();
    if (lower.includes("quota") || lower.includes("limit") || lower.includes("exceed") || lower.includes("over limit")) return true;
  } catch (e) {}
  return false;
}

/* ------------------ GEOAPIFY (primary) ------------------ */

async function geoapifyGeocode(address, apiKey = GEOAPIFY_KEY) {
  if (!apiKey) throw new Error("Geoapify API key not configured");
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&limit=1&apiKey=${apiKey}`;
  const res = await axios.get(url);
  if (!res.data || !res.data.features || res.data.features.length === 0) {
    const err = new Error("Geoapify: address not found");
    err.isNotFound = true;
    throw err;
  }
  const [lon, lat] = res.data.features[0].geometry.coordinates;
  return { lat: Number(lat), lng: Number(lon) };
}

async function geoapifyAutocomplete(input, apiKey = GEOAPIFY_AUTOCOMPLETE_KEY || GEOAPIFY_KEY) {
  if (!apiKey) throw new Error("Geoapify API key not configured");
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&limit=5&apiKey=${apiKey}`;
  const res = await axios.get(url);
  if (!res.data || !res.data.features) return [];
  return res.data.features.map((f, idx) => {
    const props = f.properties || {};
    const desc = props.formatted || f.properties.display_name || "";
    const parts = desc.split(",").map(p => p.trim());
    let offset = 0;
    const terms = parts.map(p => {
      const t = { offset, value: p };
      offset += p.length + 2;
      return t;
    });
    return {
      description: desc,
      place_id: props.place_id || `geoapify-${idx}`,
      structured_formatting: {
        main_text: parts[0] || desc,
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
}

async function geoapifyRoute(originCoords, destCoords, apiKey = GEOAPIFY_DIS_KEY || GEOAPIFY_KEY) {
  if (!apiKey) throw new Error("Geoapify API key not configured for routing");
  // originCoords & destCoords are {lat, lng}
  const waypoints = `${originCoords.lat},${originCoords.lng}|${destCoords.lat},${destCoords.lng}`;
  const url = `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&apiKey=${apiKey}`;
  const res = await axios.get(url);
  if (!res.data || !res.data.features || res.data.features.length === 0) {
    const err = new Error("Geoapify routing not found");
    err.isNotFound = true;
    throw err;
  }
  const route = res.data.features[0];
  const distanceValue = route.properties.distance;
  const durationValue = route.properties.time;
  // Geoapify geometry = coordinates [lon, lat] pairs
  const coords = (route.geometry && route.geometry.coordinates ? route.geometry.coordinates : []).map(c => [c[1], c[0]]);
  return { distanceValue, durationValue, routeCoords: coords };
}

/* ------------------ NOMINATIM (fallback geocode / autocomplete) ------------------ */

async function nominatimGeocode(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1${NOMINATIM_EMAIL ? `&email=${encodeURIComponent(NOMINATIM_EMAIL)}` : ""}`;
  const res = await axios.get(url, { headers: { "User-Agent": "uber-clone/1.0 (your-app)" } });
  if (!res.data || res.data.length === 0) {
    const err = new Error("Nominatim: address not found");
    err.isNotFound = true;
    throw err;
  }
  return { lat: Number(res.data[0].lat), lng: Number(res.data[0].lon) };
}

async function nominatimAutocomplete(input) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&limit=5${NOMINATIM_EMAIL ? `&email=${encodeURIComponent(NOMINATIM_EMAIL)}` : ""}`;
  const res = await axios.get(url, { headers: { "User-Agent": "uber-clone/1.0 (your-app)" } });
  if (!res.data || res.data.length === 0) return [];
  return res.data.map((f, idx) => {
    const display = f.display_name || "";
    const parts = display.split(",").map(p => p.trim()); 
    let offset = 0;
    const terms = parts.map(p => {
      const t = { offset, value: p };
      offset += p.length + 2;
      return t;
    });
    return {
      description: display,
      place_id: f.place_id || `nominatim-${idx}`,
      structured_formatting: {
        main_text: parts[0] || display,
        secondary_text: parts.slice(1).join(", ")
      },
      terms,
      geometry: {
        location: {
          lat: Number(f.lat),
          lng: Number(f.lon)
        }
      }
    };
  });
}

/* ------------------ OSRM (fallback routing) ------------------ */

async function osrmRoute(originCoords, destCoords) {
  // OSRM expects lng,lat order in URL
  const url = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destCoords.lng},${destCoords.lat}?overview=full&geometries=geojson`;
  const res = await axios.get(url);
  if (!res.data || res.data.code !== "Ok" || !res.data.routes || res.data.routes.length === 0) {
    const err = new Error("OSRM: route not found");
    err.isNotFound = true;
    throw err;
  }
  const r = res.data.routes[0];
  const distanceValue = r.distance; // meters
  const durationValue = r.duration; // seconds
  const coords = (r.geometry && r.geometry.coordinates ? r.geometry.coordinates : []).map(c => [c[1], c[0]]);
  return { distanceValue, durationValue, routeCoords: coords };
}

/* ------------------ Exported functions (used by controllers) ------------------ */

// services/maps.service.js (add near other exported functions)
module.exports.getDistanceTimeFromCoords = async (originCoords, destCoords) => {
  if (!originCoords || !destCoords) {
    throw new Error('origin and dest coords required');
  }

  try {
    // Prefer Geoapify routing if keys available
    if (GEOAPIFY_DIS_KEY || GEOAPIFY_KEY) {
      try {
        const r = await geoapifyRoute(originCoords, destCoords, GEOAPIFY_DIS_KEY || GEOAPIFY_KEY);
        return {
          distance: { value: r.distanceValue, text: `${Math.round(r.distanceValue / 1000)} km` },
          duration: { value: r.durationValue, text: `${Math.floor(r.durationValue / 60)} min` },
          routeCoords: r.routeCoords,
          provider: 'geoapify'
        };
      } catch (err) {
        // if quota or error -> fallback to OSRM below
      }
    }

    // Fallback OSRM
    const r2 = await osrmRoute(originCoords, destCoords);
    return {
      distance: { value: r2.distanceValue, text: `${Math.round(r2.distanceValue / 1000)} km` },
      duration: { value: r2.durationValue, text: `${Math.floor(r2.durationValue / 60)} min` },
      routeCoords: r2.routeCoords,
      provider: 'osrm'
    };
  } catch (err) {
    console.error('getDistanceTimeFromCoords error:', err);
    throw err;
  }
};

module.exports.getAddressCoordinate = async (address) => {
  // try Geoapify first, fallback to Nominatim
  try {
    if (!address) throw new Error("address required");
    if (GEOAPIFY_KEY) {
      try {
        return await geoapifyGeocode(address);
      } catch (err) {
        if (isQuotaError(err) || err.isNotFound) {
          // fallback
        } else {
          // other error -> rethrow
          throw err;
        }
      }
    }
    // fallback to nominatim
    return await nominatimGeocode(address);
  } catch (err) {
    // propagate
    throw err;
  }
};

// module.exports.getDistanceTime = async (origin, destination) => {
//   if (!origin || !destination) {
//     return {
//       status: "ERROR",
//       message: "Origin and destination are required"
//     };
//   }

//   try {
//     // Step 1: try to geocode with Geoapify (if key present). If fails -> nominatim.
//     let originCoords, destinationCoords;
//     let usedGeoapify = false;

//     if (GEOAPIFY_KEY) {
//       try {
//         originCoords = await geoapifyGeocode(origin, GEOAPIFY_KEY);
//         destinationCoords = await geoapifyGeocode(destination, GEOAPIFY_KEY);
//         usedGeoapify = true;
//       } catch (err) {
//         if (isQuotaError(err) || err.isNotFound) {
//           // fallback to Nominatim below
//           usedGeoapify = false;
//         } else {
//           // other error -> fallback as well
//           usedGeoapify = false;
//         }
//       }
//     }

//     if (!originCoords || !destinationCoords) {
//       // use Nominatim
//       originCoords = await nominatimGeocode(origin);
//       destinationCoords = await nominatimGeocode(destination);
//     }

//     // Step 2: routing - try Geoapify routing first (if available & was used for geocode), else OSRM
//     try {
//       if (usedGeoapify && (GEOAPIFY_DIS_KEY || GEOAPIFY_KEY)) {
//         try {
//           const r = await geoapifyRoute(originCoords, destinationCoords, GEOAPIFY_DIS_KEY || GEOAPIFY_KEY);
//           const distanceText = `${Math.round(r.distanceValue / 1000)} km`;
//           const hours = Math.floor(r.durationValue / 3600);
//           const minutes = Math.floor((r.durationValue % 3600) / 60);
//           const durationText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

//           return {
//             distance: { text: distanceText, value: r.distanceValue },
//             duration: { text: durationText, value: r.durationValue },
//             routeCoords: r.routeCoords,
//             status: "OK",
//             provider: "geoapify"
//           };
//         } catch (err) {
//           if (!isQuotaError(err)) {
//             // if not quota, still fallback to OSRM
//           }
//         }
//       }

//       // fallback to OSRM routing
//       const r2 = await osrmRoute(originCoords, destinationCoords);
//       const distanceText2 = `${Math.round(r2.distanceValue / 1000)} km`;
//       const hours2 = Math.floor(r2.durationValue / 3600);
//       const minutes2 = Math.floor((r2.durationValue % 3600) / 60);
//       const durationText2 = hours2 > 0 ? `${hours2}h ${minutes2}m` : `${minutes2}m`;

//       return {
//         distance: { text: distanceText2, value: r2.distanceValue },
//         duration: { text: durationText2, value: r2.durationValue },
//         routeCoords: r2.routeCoords,
//         status: "OK",
//         provider: "osrm"
//       };

//     } catch (err) {
//       console.error("Routing error:", err.message || err);
//       return { status: "ERROR", message: err.message || "Routing failed" };
//     }

//   } catch (err) {
//     console.error(err);
//     return { status: "ERROR", message: err.message || "Server error" };
//   }
// };

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    return {
      status: "ERROR",
      predictions: [],
      message: "query is required"
    };
  }

  // try Geoapify autocomplete first
  try {
    if (GEOAPIFY_AUTOCOMPLETE_KEY || GEOAPIFY_KEY) {
      try {
        const preds = await geoapifyAutocomplete(input, GEOAPIFY_AUTOCOMPLETE_KEY || GEOAPIFY_KEY);
        if (preds && preds.length > 0) {
          return { status: "OK", predictions: preds };
        }
      } catch (err) {
        if (!isQuotaError(err)) {
          // if some other error, fallback anyway
        }
      }
    }

    // fallback to nominatim
    const nomi = await nominatimAutocomplete(input);
    if (!nomi || nomi.length === 0) {
      return { status: "ZERO_RESULTS", predictions: [] };
    }
    return { status: "OK", predictions: nomi };

  } catch (err) {
    console.error(err);
    return {
      status: "ERROR",
      predictions: [],
      message: err.message
    };
  }
};
