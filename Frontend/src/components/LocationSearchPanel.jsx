// LocationSearchPanel.jsx (updated)
import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationSearchPanel = ({
  pickup,
  setPickup,
  destination,
  setDestination,
  step,
  setStep,
  setVehiclePanal,
  setPanalOpen,
  // NEW: functions to store coords in Home state
  setPickupCoords,
  setDestinationCoords
}) => {
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSuggestions = async (input, setSuggestions) => {
      if (!input || input.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${encodeURIComponent(input)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuggestions(res.data.predictions || []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setSuggestions([]);
      }
    };

    if (step === 1) fetchSuggestions(pickup, setPickupSuggestions);
    if (step === 2) fetchSuggestions(destination, setDestinationSuggestions);
  }, [pickup, destination, step, token]);

  // IMPORTANT: receive full suggestion object (elem), not just text
  const handleSelectSuggestion = async (elem) => {
    if (!elem || !elem.description) return;

    // Try to read coords from suggestion object first
    let lat = elem.geometry?.location?.lat;
    let lng = elem.geometry?.location?.lng;

    // If suggestion has no geometry, fallback to your geocode endpoint
    if ((lat === undefined || lng === undefined) && elem.description) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-coordinates?address=${encodeURIComponent(elem.description)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        lat = res.data.lat;
        lng = res.data.lng;
      } catch (err) {
        console.warn("Fallback geocode failed:", err);
      }
    }

    if (step === 1) {
      setPickup(elem.description);
      setPickupCoords(lat && lng ? { lat: Number(lat), lng: Number(lng) } : null);
      setStep(2);
      setPanalOpen(true);
    } else if (step === 2) {
      setDestination(elem.description);
      setDestinationCoords(lat && lng ? { lat: Number(lat), lng: Number(lng) } : null);
      setStep(3);
      setPanalOpen(false);
      // setVehiclePanal(true);
    }
  };

  return (
    <div>
      {step === 1 &&
        pickupSuggestions.map((elem, index) => (
          <div
            key={`pickup-${index}`}
            onClick={() => handleSelectSuggestion(elem)}
            className="flex gap-4 items-center my-2 border-2 p-3 border-gray-50 active:border-black justify-start rounded-xl cursor-pointer"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem.description}</h4>
          </div>
        ))}

      {step === 2 &&
        destinationSuggestions.map((elem, index) => (
          <div
            key={`dest-${index}`}
            onClick={() => handleSelectSuggestion(elem)}
            className="flex gap-4 items-center my-2 border-2 p-3 border-gray-50 active:border-black justify-start rounded-xl cursor-pointer"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem.description}</h4>
          </div>
        ))}
    </div>
  );
};

export default LocationSearchPanel;
