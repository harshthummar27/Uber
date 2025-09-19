import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../Context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");

        // reset fields
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber logo"
        />

        <form onSubmit={submitHandler}>
          <h3 className="text-base font-medium mb-2">What's your Name</h3>
          <div className="flex gap-4 mb-6">
            <input
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
              placeholder="First name"
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
            />
            <input
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              placeholder="Last name"
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
            />
          </div>

          <h3 className="text-base font-medium mb-2">What's your Email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="example@gmail.com"
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
          />

          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
          />

          <button className="bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-base">
            Create account
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[12px] leading-tight">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
          sapiente ab amet ad quibusdam porro?
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
