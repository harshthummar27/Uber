import React from "react";
import ubergo from "../assets/ubergo.jpg";
import moto from "../assets/moto.webp";
import uberauto from "../assets/uberauto.webp";

const VehiclePanel = (props) => {
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
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex border-2 border-gray-200 active:border-black  mb-2 rounded-xl w-full p-3 item-center justify-between"
      >
        <img className="h-10" src={ubergo} alt="" />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill">4</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-normal text-xs text-grey-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">Rs.193.50</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex border-2 border-gray-200 active:border-black  mb-2 rounded-xl w-full p-3 item-center justify-between"
      >
        <img className="h-10" src={moto} alt="" />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Moto
            <span>
              <i className="ri-user-3-fill"></i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 min away</h5>
          <p className="font-normal text-xs text-grey-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">Rs.193.50</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex border-2 border-gray-300 active:border-black  mb-2 rounded-xl w-full p-3 item-center justify-between"
      >
        <img className="h-10" src={uberauto} alt="" />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Uberauto
            <span>
              <i className="ri-user-3-fill">3</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-normal text-xs text-grey-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">Rs.193.50</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
