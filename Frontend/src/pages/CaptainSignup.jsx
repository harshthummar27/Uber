import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../Context/CaptainContext";
import axios from "axios";
import captionlog from "../assets/uber-captain-logo.png";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity: Number(capacity),
        vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");

        // Clear form
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setCapacity("");
        setColor("");
        setPlate("");
        setVehicleType("");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        console.error("Validation errors:", error.response.data.errors);
        alert(error.response.data.errors.map((err) => `${err.msg}`).join("\n"));
      } else {
        console.error("Signup error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Signup failed!");
      }
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-3"
          src={captionlog}
          alt=""
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-base font-medium mb-2">
            What's our Captain Name
          </h3>
          <div className="flex gap-4 mb-4">
            <input
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
              placeholder="First name"
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border"
            />
            <input
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              placeholder="Last name"
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border"
            />
          </div>

          <h3 className="text-base font-medium mb-2">Email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="example@gmail.com"
            className="bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full"
          />

          <h3 className="text-base font-medium mb-2">Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full"
          />

          <h3 className="text-base font-medium mb-2">Vehicle Details</h3>
          <div className="flex gap-4 mb-4">
            <input
              required
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type="text"
              placeholder="Color"
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border"
            />
            <input
              required
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              type="text"
              placeholder="Plate"
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border"
            />
          </div>

          <div className="flex gap-4 mb-6">
            <input
              required
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              type="number"
              placeholder="Capacity"
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border"
            />
            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border"
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
          </div>

          <button className="bg-[#111] text-white w-full py-2 rounded">
            Create Captain account
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
