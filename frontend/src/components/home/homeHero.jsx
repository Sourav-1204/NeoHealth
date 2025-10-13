import React from "react";
import hero1 from "../../assets/images/header_img.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import groupProfile from "../../assets/images/group_profiles.png";
import { useNavigate } from "react-router-dom";

export default function HomeHero() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-center">
      <div className="md:w-[80%] w-[95%] flex md:flex-row flex-col mt-[20px] mb-[50px] bg-[#5f5fe7] rounded-xl lg:px-20 md:px-10 px-6">
        <div className="md:w-[50%] md:h-full flex flex-col md:items-start items-center justify-center space-y-5 py-10 md:py-[10vw] md:mb-[-30px] m-auto">
          <div className="flex items-start justify-center">
            <h2 className="lg:text-5xl md:text-4xl text-white text-3xl font-bold leading-tight">
              Book Appointment With Trusted Doctors
            </h2>
          </div>
          <div className="flex md:flex-row flex-col items-center gap-3 text-white">
            <img src={groupProfile} alt="img" />
            <p className="text-sm">
              Simply browse through out extensive list of Doctors schedule your
              appointment hassle-free
            </p>
          </div>
          <button className="w-fit px-10 py-2 rounded-full bg-[#ffffff] text-black flex items-center gap-2 active:scale-105 transition-all duration-300 ease-in-out">
            <p className="text-sm" onClick={() => navigate("/doctors")}>
              Book Appointment
            </p>
            <span>
              <IoIosArrowRoundForward size="24px" />
            </span>
          </button>
        </div>
        <div className="md:w-[50%] relative">
          <img src={hero1} alt="heroimg" className="md:absolute bottom-0" />
        </div>
      </div>
    </div>
  );
}
