import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const CaptainLogin = () => {

        const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [captainData, setCaptainData] = useState({});
        
            const submitHandler = (e) => {
                e.preventDefault();
                setCaptainData({
                    email : email,
                    password : password
                })
                console.log(captainData);
                setEmail('');
                setPassword(''); }

  return (
    <div  className="p-7 h-screen  flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://pngimg.com/d/uber_PNG24.png"
          alt=""
        />
        <form onSubmit={(e) => {
            submitHandler(e)
        }}>
          <h3 className="text-lg font-medium mb-2">What's your Email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
                setEmail(e.target.value)
            }}
            type="email"
            placeholder="example@gmail.com"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) =>  {
                setPassword(e.target.value)
            }}
            type="password"
            placeholder="password"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
          />
          <button className="bg-[#111] text-white font-semibold mb-7 mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base ">
            Login
          </button>
        </form>
        <p className="text-center">Join a fleet? <Link to='/captain-signup' className="text-blue-600">Register as a captain</Link></p>
      </div>
      <div>
        <Link to='/login' className="flex items-center justify-center bg-[#d5622d] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base ">Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin