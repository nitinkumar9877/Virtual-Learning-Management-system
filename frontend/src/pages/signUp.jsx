import React, { useState } from 'react';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";
// Assuming logo and google imports are correct based on your project structure
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";


function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        {
          // FIX: Sending capitalized keys (Name, Password, Email, Role)
          // to match your Mongoose schema requirements.
          Name: name,
          Password: password,
          Email: email,
          Role: role
        },
        { withCredentials: true }
      );

      console.log(result.data);
      toast.success("SignUp Successful!");
      navigate("/");
    }
    catch (error) {
      console.error(error);

      // --- FIX: Robust Error Handling ---
      let errorMessage = "Connection Error: Please ensure your backend server is running on port 5000.";

      if (error.response) {
        // Server responded with an error status (4xx, 5xx)
        errorMessage = error.response.data.message || error.response.statusText;
      } else if (error.request) {
        // Request was made but no response received (network failure)
        // This covers the ERR_CONNECTION_REFUSED scenario
        errorMessage = "Network Error: Could not reach the server.";
      }
      // ----------------------------------

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>

      <form
        className='w-[90%] md:w-[700px] h-[600px] bg-[white] shadow-xl rounded-2xl flex overflow-hidden'
        onSubmit={handleSignup}
      >

        {/* ======================= Left Div - Form Content ======================= */}
        <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 p-4'>

          <h1 className='font-semibold text-[black] text-2xl'>Let's get started</h1>
          <h2 className='text-[#999797] text-[18px]'>Create your account</h2>

          {/* Role Selector */}
          <div className='flex md:w-[80%] w-[70%] items-center justify-between mt-2'>
            <span
              className={`px-[15px] py-[8px] border-2 rounded-xl cursor-pointer hover:border-black transition-all ${role === "student" ? "border-black bg-gray-100 font-medium" : "border-[#e7e6e6] text-[#656464]"}`}
              onClick={() => setRole("student")}
            >
              Student
            </span>
            <span
              className={`px-[15px] py-[8px] border-2 rounded-xl cursor-pointer hover:border-black transition-all ${role === "educator" ? "border-black bg-gray-100 font-medium" : "border-[#e7e6e6] text-[#656464]"}`}
              onClick={() => setRole("educator")}
            >
              Educator
            </span>
          </div>

          {/* Name Input Field */}
          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 mt-2'>
            <label htmlFor="name" className='font-semibold text-sm'>Name</label>
            <input
              id='name'
              type="text"
              className='border border-[#e7e6e6] w-full h-[35px] text-[15px] px-[20px] rounded'
              placeholder='Your name'
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          {/* Email Input Field */}
          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
            <label htmlFor="email" className='font-semibold text-sm'>Email</label>
            <input
              id='email'
              type="email"
              className='border border-[#e7e6e6] w-full h-[35px] text-[15px] px-[20px] rounded'
              placeholder='Your Email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          {/* Password Input Field with Visibility Toggle */}
          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
            <label htmlFor="password" className='font-semibold text-sm'>Password</label>
            <div className='relative w-full'>
              <input
                id='password'
                type={showPassword ? "text" : "password"}
                className='border border-[#e7e6e6] w-full h-[35px] text-[15px] px-[20px] rounded pr-10'
                placeholder='Your Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <span
                className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEye /> : <IoEyeOutline />}
              </span>
            </div>
          </div>

          {/* Submission Button */}
          <button
            type="submit"
            className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px] mt-2'
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color='white' /> : "Sign Up"}
          </button>

          {/* "Or Continue" Divider */}
          <div className='w-[80%] flex items-center gap-2 mt-2'>
            <div className='w-[40%] h-[0.5px] bg-[#c4c4c4]'></div>
            <div className='w-[20%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or</div>
            <div className='w-[40%] h-[0.5px] bg-[#c4c4c4]'></div>
          </div>

          {/* Google Sign-up Button */}
          <div className='w-[80%] h-[40px] border border-[black] rounded-[5px] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors'>
            <img src={google} className='w-[25px] mr-2' alt="Google logo" />
            <span className='text-[18px] text-gray-500'>Sign up with Google</span>
          </div>

          {/* Login Link */}
          <div className='text-[#6f6f6f] mt-2 text-sm'>
            Already have an account?
            <span
              className='underline underline-offset-1 text-black ml-1 cursor-pointer font-medium'
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>

        {/* ======================= Right Div - Branding/Sidebar ======================= */}
        <div className='w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden'>
          <img src={logo} alt="logo" className='w-30 shadow-2xl rounded-full' />
          <span className='text-2xl text-white font-bold mt-4'>VIRTUAL LEARN COURSE</span>
        </div>
      </form>
    </div>
  );
}

export default SignUp;