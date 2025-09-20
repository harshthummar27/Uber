import React from "react";
import { Link } from "react-router-dom";
import homeimg from "../assets/home-img.avif";
import userlogo from "../assets/uber-user-logo.png";

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center h-screen pt-8 flex justify-between flex-col w-full bg-red-400" style={{backgroundImage : `url(${homeimg})`}}>
        <img
          className="w-16 ml-8"
          src={userlogo}
          alt=""
        />
        <div className="bg-white py-4 px-4 pb-7">
          <h2 className="text-3xl font-bold">Get Started with Uber..</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
