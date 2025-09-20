import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { CaptainDataContext } from "../Context/CaptainContext";
import captionlog from "../assets/uber-captain-logo.png";


const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captain = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captain
    );
    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen  flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src={captionlog}
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your Email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="example@gmail.com"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="password"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
          />
          <button className="bg-[#111] text-white font-semibold mb-7 mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base ">
            Login
          </button>
        </form>
        <p className="text-center">
          Join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="flex items-center justify-center bg-[#d5622d] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base "
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
