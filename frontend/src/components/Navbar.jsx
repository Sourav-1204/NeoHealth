import React, { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/images/assets";
import { useContext } from "react";
import { AppContext } from "../context/context";
import { FaHandHoldingHeart } from "react-icons/fa6";

export default function Navbar() {
  const { token, setToken, userData, backendUrl } = useContext(AppContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  function logOut() {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav className="relative w-full flex flex-col items-center bg-white z-99">
      <div className="md:w-[80%] w-[90%] flex items-center justify-between my-4">
        <div>
          <h1
            onClick={() => navigate("/")}
            className="flex gap-1 items-center text-4xl text-[#000080] logo-font"
          >
            <span>
              <FaHandHoldingHeart className="text-blue-500 text-3xl" />
            </span>
            NeoHealth
          </h1>
        </div>
        <div className="md:flex items-center hidden">
          <ul className="flex text-sm items-center justify-between link-active">
            <NavLink to="/">
              <p>HOME</p>
            </NavLink>
            <NavLink to="/doctors">
              <p>ALL DOCTORS</p>
            </NavLink>
            <NavLink to="/about">
              <p>ABOUT</p>
            </NavLink>
            <NavLink to="/contact">
              <p>CONTACT</p>
            </NavLink>
          </ul>
          {token && (
            <a
              className="text-sm px-4 py-1.5 border rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out whitespace-nowrap"
              onClick={() =>
                window.open("https://neohealth-admin.onrender.com", "_blank")
              }
            >
              Admin Panel
            </a>
          )}
        </div>
        <div
          className={`w-full h-screen md:hidden fixed top-0 left-0 bg-white items-end transition-all duration-500 ease-in-out z-99 ${
            mobileMenu
              ? "flex flex-col opacity-100 translate-x-0 pointer-events-auto"
              : "flex flex-col opacity-0 translate-x-full pointer-events-auto"
          }`}
        >
          <RxCross1
            size="25px"
            onClick={() => setMobileMenu(!mobileMenu)}
            className="mr-5 mt-8 active:scale-[0.9] transition-all duration-300 ease-in-out"
          />
          <ul className="w-full h-[80%] flex flex-col items-center mobile-link mt-5">
            <NavLink to="/" onClick={() => setMobileMenu(false)}>
              <p className="text-xl">HOME</p>
            </NavLink>
            <NavLink to="/doctors" onClick={() => setMobileMenu(false)}>
              <p className="text-xl">ALL DOCTORS</p>
            </NavLink>
            <NavLink to="/about" onClick={() => setMobileMenu(false)}>
              <p className="text-xl">ABOUT</p>
            </NavLink>
            <NavLink to="/contact" onClick={() => setMobileMenu(false)}>
              <p className="text-xl">CONTACT</p>
            </NavLink>
            {token && (
              <button
                className="mt-5 px-4 py-1.5 border rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out whitespace-nowrap"
                onClick={() =>
                  window.open("https://neohealth-admin.onrender.com", "_blank")
                }
              >
                Admin Panel
              </button>
            )}
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-4">
            {token && userData ? (
              <div
                className="flex items-center gap-2 cursor-pointer group relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={() => setIsOpen(!isOpen)}
              >
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={userData.image}
                  alt=""
                />
                <img className="w-2.5" src={assets.dropdown_icon} alt="" />
                {isOpen && (
                  <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20">
                    <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
                      <p
                        onClick={() => {
                          setIsOpen(false);
                          navigate("/my-profile");
                        }}
                      >
                        My Profile
                      </p>
                      <p
                        onClick={() => {
                          setIsOpen(false);
                          navigate("/my-appointments");
                        }}
                      >
                        My Appointments
                      </p>
                      <p onClick={logOut}>Logout</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm"
              >
                LOGIN
              </button>
            )}
          </div>
          <div className="md:hidden visible ml-3">
            <TbMenuDeep
              onClick={() => setMobileMenu(!mobileMenu)}
              size="25px"
              className="active:scale-105"
            />
          </div>
        </div>
      </div>
      <hr className="md:w-[80%] w-[90%]" />
    </nav>
  );
}
