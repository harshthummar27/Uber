import React from "react";
import { Link } from "react-router-dom";
import homeimg from "../assets/home-img.avif";
import ubergo from "../assets/ubergo.jpg";

const Riding = () => {
  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>

      <div className="h-1/2">
        <img className="h-full w-full object-cover" src={homeimg} alt="" />
      </div>

      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img className="h-12" src={ubergo} alt="" />
          <div className="text-right">
            <h2 className="text-lg font-medium">munnodon</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">GJ18 AB 2500</h4>
            <p className="text-sm text-gray-600">Reng Rover Sport</p>
          </div>
        </div>

        <div className="flex justify-between gap-2 flex-col items-center">
          <div className="w-full mt-5">
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
        </div>
        <button className="mt-5 w-full bg-green-600 text-white font-semibold p-2 rounded-lg">
          Make A payment
        </button>
      </div>
    </div>
  );
};

export default Riding;

<Link
  to="/home"
  className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
>
  <i className="text-lg font-medium ri-home-5-line"></i>
</Link>;
