import React, { useRef, useState } from "react";
import userlogo from "../assets/uber-user-logo.png";
import mapimg from "../assets/mapimg.gif";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panalOpen, setPanalOpen] = useState(false);
  const [vehiclePanal, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [step, setStep] = useState(1); // 1 = pickup, 2 = destination, 3 = choose vehicle
  const [distanceInfo, setDistanceInfo] = useState(null);
  const panalRef = useRef(null);
  const panalCloseRef = useRef(null);
  const vehiclePanalRef = useRef(null);
  const ConfirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [rideId, setRideId] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  useGSAP(
    function () {
      if (panalOpen) {
        gsap.to(panalRef.current, {
          height: "70%",
          padding: 20,
        });
        gsap.to(panalCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panalRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panalCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panalOpen]
  );
  useGSAP(
    function () {
      if (vehiclePanal) {
        gsap.to(vehiclePanalRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanalRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanal]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(ConfirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ConfirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  const fetchDistanceAndTime = async (pickup, destination) => {
    if (!pickup || !destination) return; // only call if both are set

    // validate length >= 3
    if (pickup.length < 3 || destination.length < 3) {
      console.warn("Pickup or destination too short for backend call");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // get token if needed
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-distance-time`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { origin: pickup, destination: destination },
        }
      );

      setDistanceInfo(res.data); // store result in state
      console.log("Distance info:", res.data);
    } catch (err) {
      console.error("Error fetching distance:", err);
    }
  };

  const findTrip = async () => {
    // basic checks
    if (!pickup || !destination) {
      alert("Please enter both pickup and destination.");
      return;
    }
    if (!pickupCoords || !destinationCoords) {
      alert(
        "Please pick suggestions from the list so we have coordinates (tap a suggestion)."
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");
      // 1) Create ride
      const createRes = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides`,
        {
          pickup: {
            address: pickup,
            lat: Number(pickupCoords.lat),
            lng: Number(pickupCoords.lng),
          },
          destination: {
            address: destination,
            lat: Number(destinationCoords.lat),
            lng: Number(destinationCoords.lng),
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // createRes.data.ride.id is returned by your controller
      const newRideId = createRes?.data?.ride?.id;
      if (!newRideId) {
        console.error("create ride response unexpected:", createRes.data);
        alert("Failed to create ride (bad response).");
        return;
      }
      setRideId(newRideId);

      // 2) Immediately fetch distance using rideId
      const distRes = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/${newRideId}/distance`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDistanceInfo(distRes.data); // your UI shows distanceInfo.distance.text etc

      // 3) Show vehicle panel
      setVehiclePanel(true);
      setPanalOpen(false);
    } catch (err) {
      console.error("Error in findTrip:", err);
      alert(
        "Something went wrong while creating the ride. See console for details."
      );
    }
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img className="w-16 absolute left-5 top-5" src={userlogo} alt="" />
      <div className="h-screen w-screen">
        <img className="h-full w-full object-cover" src={mapimg} alt="" />
      </div>
      <div className=" flex flex-col justify-end absolute h-screen top-0 w-full ">
        <div className="h=[30%] p-5 relative bg-white">
          <h5
            ref={panalCloseRef}
            onClick={() => {
              setPanalOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-grey-900 rounded-full"></div>
            <input
              onClick={() => step === 1 && setPanalOpen(true)}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setPickupCoords(null);
                setStep(1);
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />

            <input
              onClick={() => step === 2 && setPanalOpen(true)}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setDestinationCoords(null);
                setStep(2);
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>

          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find a trip
          </button>
        </div>
        <div ref={panalRef} className="h-0 bg-white">
          <LocationSearchPanel
            pickup={pickup}
            setPickup={setPickup}
            destination={destination}
            setDestination={setDestination}
            step={step}
            setStep={setStep}
            setPanalOpen={setPanalOpen}
            setVehiclePanal={setVehiclePanel}
            setPickupCoords={setPickupCoords} // NEW
            setDestinationCoords={setDestinationCoords} // NEW
          />
        </div>

        <div
          ref={vehiclePanalRef}
          className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full"
        >
          {distanceInfo && (
            <div className="p-3 bg-gray-50 rounded-lg mt-3 flex justify-between rounded-full">
              <p className="text-sm">
                <span className="font-bold">Distance:</span>{" "}
                {distanceInfo.distance.text}
              </p>
              <p className="text-sm">
                <span className="font-bold">Duration:</span>{" "}
                {distanceInfo.duration.text}
              </p>
            </div>
          )}
          <VehiclePanel
            rideId={rideId}
            pickup={pickup}
            destination={destination}
            distanceInfo={distanceInfo}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
        <div
          ref={ConfirmRidePanelRef}
          className="fixed w-full z-10 bottom-0 bg-white px-3 pt-12 py-6 translate-y-full"
        >
          <ConfirmRide
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
          />
        </div>
        <div
          ref={vehicleFoundRef}
          className="fixed w-full z-10 bottom-0 bg-white px-3 pt-12 py-6 translate-y-full"
        >
          <LookingForDriver setVehicleFound={setVehicleFound} />
        </div>
        <div
          ref={waitingForDriverRef}
          className="fixed translate-y-full w-full z-10 bottom-0 bg-white px-3 pt-12 py-6 "
        >
          <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
        </div>
      </div>
    </div>
  );
};

export default Home;
