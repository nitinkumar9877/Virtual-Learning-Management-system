import React, { useState } from 'react';
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { toast } from 'react-toastify';
import { serverUrl } from '../App';

function Login() {
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const result = await axios.post(
  //       serverUrl + "api/auth/login",
  //       { Email, Password },
  //       { withCredentials: true }
  //     );
  //     console.log(result.data);
  //     setLoading(false);
  //     toast.success("Login Successfully");
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //     toast.error(error.response?.data?.message || "Login failed. Try again.");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!Email || !Password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        // FIX: Added the necessary forward slash (/) here
        serverUrl + "/api/auth/login",
        { Email, Password },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      toast.success("Login Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Login failed. Check your network.");
    }
  };
  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>

      <form
        className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex'
        onSubmit={handleLogin}
      >

        {/* ======================= Left Div - Form Content ======================= */}
        <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>

          <h1 className='font-semibold text-[black] text-2xl'>Welcome Back</h1>
          <h2 className='text-[#999797] text-[18px]'>Login your account</h2>

          {/* Email Input Field */}
          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input
              id='email'
              type="email"
              className='border border-[#e7e6e6] w-[100%] h-[35px] text-[15px] px-[20px]'
              placeholder='Your Email'
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              required
            />
          </div>

          {/* Password Input Field */}
          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
            <label htmlFor="password" className='font-semibold'>Password</label>
            <input
              id='password'
              type={showPassword ? "text" : "password"}
              className='border border-[#e7e6e6] w-[100%] h-[35px] text-[15px] px-[20px]'
              placeholder='Your Password'
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              required
            />
            <div
              className='absolute right-6 top-[38px] text-xl cursor-pointer text-gray-500'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEye /> : <IoEyeOutline />}
            </div>
          </div>

          {/* Submission Button */}
          <button
            type="submit"
            className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]'
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color='white' /> : "Login"}
          </button>

          <span className='text-[13px] cursor-pointer text-[#585757]'>Forget your password?</span>

          {/* "Or Continue" Divider */}
          <div className='w-[80%] flex items-center gap-2'>
            <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
            <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or continue</div>
            <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
          </div>

          {/* Google Sign-up Button */}
          <div className='w-[80%] h-[40px] border border-[black] rounded-[5px] flex items-center justify-center cursor-pointer'>
            <img src={google} className='w-[25px] mr-2' alt="Google logo" />
            <span className='text-[18px] text-gray-500'>Sign up with Google</span>
          </div>

          <div className='text-[#6f6f6f]'>
            Create a new account{" "}
            <span
              className='underline underline-offset-1 text-[black] cursor-pointer'
              onClick={() => navigate("/signUp")}
            >
              SignUp
            </span>
          </div>

        </div>

        {/* ======================= Right Div - Branding/Sidebar ======================= */}
        <div className='w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden'>
          <img src={logo} alt="logo" className='w-30 shadow-2xl' />
          <span className='text-2xl text-white'>VIRTUAL LEARN COURSE</span>
        </div>
      </form>
    </div>
  );
}

export default Login;
