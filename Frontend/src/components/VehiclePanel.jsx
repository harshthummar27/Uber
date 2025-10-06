import React, { useEffect, useState } from "react";
import ubergo from "../assets/ubergo.jpg";
import moto from "../assets/moto.webp";
import uberauto from "../assets/uberauto.webp";
import axios from "axios";

const vehicleImages = {
  car: ubergo,
  moto: moto,
  auto: uberauto,
};

const VehiclePanel = ({ rideId, setVehiclePanel, setConfirmRidePanel }) => {
  const [fares, setFares] = useState({});
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!rideId) return; // <-- important

  const fetchFares = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/${rideId}/fare`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFares(res.data.fares || {});
    } catch (err) {
      console.error("Error fetching fares:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchFares();
}, [rideId]);


  if (loading) return <div>Loading vehicle fares...</div>;
  if (!Object.keys(fares).length) return <div>No fares available</div>;

  const vehicleDetails = [
    { type: "car", name: "UberGo", description: "Affordable, compact rides", eta: "2 min", capacity: 4 },
    { type: "moto", name: "Moto", description: "Fast and affordable", eta: "3 min", capacity: 1 },
    { type: "auto", name: "UberAuto", description: "Budget-friendly rides", eta: "2 min", capacity: 3 },
  ];

  return (
    <div className="p-4">
      <h5
        onClick={() => setVehiclePanel(false)}
        className="text-center p-1 w-[93%] absolute top-0 cursor-pointer"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>

      {vehicleDetails.map((vehicle) => (
        <div
          key={vehicle.type}
          onClick={() => setConfirmRidePanel(true)}
          className="flex border-2 border-gray-200 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between cursor-pointer"
        >
          <img className="h-10" src={vehicleImages[vehicle.type]} alt={vehicle.name} />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base flex items-center justify-between">
              {vehicle.name} <span className="ml-1"><i className="ri-user-3-fill">{vehicle.capacity}</i></span>
            </h4>
            <h5 className="font-medium text-sm">{vehicle.eta} away</h5>
            <p className="font-normal text-xs text-gray-600">{vehicle.description}</p>
          </div>
          <h2 className="text-lg font-semibold">Rs.{fares[vehicle.type]}</h2>
        </div>
      ))}
    </div>
  );
};

export default VehiclePanel;
