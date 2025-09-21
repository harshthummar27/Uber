import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ubercaptainlogo from "../assets/uber-captain-logo.png";
import homeimg from "../assets/home-img.avif";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen relative">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <img className="w-16" src={ubercaptainlogo} alt="" />
        <Link
          to="/captain-login"
          className="top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-4/5">
        <img className="h-full w-full object-cover" src={homeimg} alt="" />
      </div>

      <div
        onClick={() => {
          setFinishRidePanel(true);
        }}
        className="h-1/5 relative p-6 flex items-center justify-between bg-yellow-400"
      >
        <h5
          onClick={() => {}}
          className="text-center  p-1 w-[93%] absolute top-0"
        >
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className=" px-10 bg-green-600 text-white font-semibold p-3 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed  w-full translate-y-full z-10 bottom-0 bg-white px-3 pt-12 py-6 "
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
