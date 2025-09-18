import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [userData, setUserData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
    }

  return (
    <div  className="p-7 h-screen  flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={(e) => {

            setUserData({
                fullname : {
                    firstname : firstname,
                    lastname : lastname
                },
                email :email,
                password : password
            })
            console.log(userData)
            submitHandler(e)
            setFirstname('')
            setLastname('')
            setEmail('')
            setPassword('')
        }}>
            
          <h3 className="text-base font-medium mb-2">What's your Name</h3>
            <div className='flex gap-4 mb-6'>
                <input
            required
            value={firstname}
            onChange={(e)=>{
                setFirstname(e.target.value);
            }}
            type="text"
            placeholder="First name"
            className="bg-[#eeeeee] m w-1/2 rounded px-4 py-2 border  text-base placeholder:text-sm "
          />
          <input
            required
            value={lastname}
            onChange={(e) => {
                setLastname(e.target.value)
            }}
            type="text"
            placeholder="Last name"
            className="bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm "
          />
            </div>

          <h3 className="text-base font-medium mb-2">What's your Email</h3>
          <input
            required
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            type="email"
            placeholder="example@gmail.com"
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm "
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
                setPassword(e.target.value)
            }}
            type="password"
            placeholder="password"
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm "
          />
          <button className="bg-[#111] text-white font-semibold mb-7 mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm ">
            Signup
          </button>
        </form>
        <p className="text-center">Already have a account? <Link to='/login' className="text-blue-600">Login here</Link></p>
      </div>
      <div>
        <p className='text-[12px] leading-tight'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora sapiente ab amet ad quibusdam porro?</p>
      </div>
    </div>
  )
}

export default UserSignup