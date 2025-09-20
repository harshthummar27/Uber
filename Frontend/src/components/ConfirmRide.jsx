import React from "react";
import ubergo from "../assets/ubergo.jpg";

const ConfirmRide = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclePanel(false);
        }}
        className="text-center p-1 w-[93%] absolute top-0"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>

      <div className="flex justify-between gap-2 flex-col items-center">
        <img className="h-20" src={ubergo} alt="" />
      </div>
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-gray-200 border-b-2">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">556/11-4</h3>
            <p className="text-sm -mt-1 text-gray-600">Water foll, Kullu</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-gray-200 border-b-2">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">556/11-4</h3>
            <p className="text-sm -mt-1 text-gray-600">Water foll, Kullu</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3">
          <i className="text-lg ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">Rs.300</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash cash</p>
          </div>
        </div>
      </div>
      <button className="mt-5 w-full bg-green-600 text-white font-semibold p-2 rounded-lg">
        Confirm
      </button>
    </div>
  );
};

export default ConfirmRide;
