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

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panalOpen, setPanalOpen] = useState(false);
  const [vehiclePanal, setVehiclePanel] = useState(false);
   const [ confirmRidePanel, setConfirmRidePanel ] = useState(false);
   const [ vehicleFound, setVehicleFound] = useState(false)
   const [ waitingForDriver, setWaitingForDriver] = useState(false)

  const panalRef = useRef(null);
  const panalCloseRef = useRef(null);
  const vehiclePanalRef = useRef(null);
  const ConfirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
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
              onClick={() => setPanalOpen(true)}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg  w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanalOpen(true);
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panalRef} className="h-0 bg-white">
          <LocationSearchPanel
            setPanalOpen={setPanalOpen}
            setVehiclePanal={setVehiclePanel}
          />
        </div>
        <div
          ref={vehiclePanalRef}
          className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full"
        >
          <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
        </div>
        <div
          ref={ConfirmRidePanelRef}
          className="fixed w-full z-10 bottom-0 bg-white px-3 pt-12 py-6 translate-y-full"
        >
          <ConfirmRide setConfirmRidePanel={setConfirmRidePanel}  setVehicleFound={setVehicleFound} />
        </div>
        <div ref={vehicleFoundRef}
          className="fixed w-full z-10 bottom-0 bg-white px-3 pt-12 py-6 translate-y-full"
        >
          <LookingForDriver setVehicleFound={setVehicleFound} />
        </div>
        <div ref={waitingForDriverRef}
          className="fixed w-full z-10 bottom-0 bg-white px-3 pt-12 py-6 "
        >
          <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
        </div>
      </div>
    </div>
  );
};

export default Home;
