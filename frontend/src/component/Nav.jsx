import React from 'react';
import logo from "../assets/logo.jpg";
import { IoPersonCircle } from 'react-icons/io5';
import { useSelector } from 'react-redux';

function Nav() {
  const userData = useSelector(state => state.user);

  return (
    <div className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10'>

      <div className='lg:w-[20%] w-[40%] lg:pl-[50px] '>
        <img src={logo} alt="logo" className='w-[60px] rounded-[5px] border-2 border-white ' />
      </div>

      <div className='w-[30%] lg:flex items-center justify-center gap-4'>

        {!userData && <IoPersonCircle className='w-[50px] h-[50px] fill-black cursor-pointer ' />}
        {userData && (
          <div className='w-[50px] h-[50px] 
rounded-full text-white flex items-center justify-center 
text-[20px] border-2 bg-black border-white
cursor-pointer'>

            {/* FIX APPLIED HERE: Added ?. after 'name' */}
            {userData?.Name?.slice(0, 1).toUpperCase()}

          </div>
        )}
        {userData?.role === "educator" && <div className='px-[20px] py-[10px] border-2 
          border-white text-white bg-[black] rounded-[10px] 
          text-[18px] font-light cursor-pointer'>Dashboard</div>}

        {!userData ? (
          <span className='px-[20px] py-[10px] border-2 
            border-white text-white rounded-[10px] text-[18px] 
            font-light cursor-pointer bg-[#000000d5]'>Login</span>
        ) : (
          <span className='px-[20px] py-[10px] bg-white 
            text-black rounded-[10px] shadow-sm shadow-black text-
            [18px] cursor-pointer'>LogOut</span>
        )}

      </div>

    </div>
  )
}

export default Nav;