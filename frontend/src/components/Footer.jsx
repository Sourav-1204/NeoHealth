import React from "react";
import { FaRegCopyright } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="w-full flex flex-col items-center justify-center bg-[#ecf1ff] max-md:p-5">
      <div className="md:w-[80%] md:h-[300px] flex md:flex-row flex-col md:items-center items-start justify-between gap-y-5">
        <div className="md:w-[50%] flex flex-col items-start space-y-4">
          <h1
            onClick={() => navigate("/")}
            className="flex gap-1 items-center text-4xl text-[#000080] logo-font"
          >
            <span>
              <FaHandHoldingHeart className="text-blue-500 text-3xl" />
            </span>
            NeoHealth
          </h1>
          <div className="md:w-[80%]">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, nam
              quaerat repudiandae officia neque quo? Nesciunt eius sapiente ad!
              Libero enim placeat possimus eveniet quasi cumque, tenetur
              incidunt ex quisquam.
            </p>
          </div>
        </div>
        <div className="md:w-[25%] flex flex-col items-start space-y-4 footer-link">
          <p className="text-2xl font-semibold">Company</p>
          <div>
            <p onClick={() => navigate("/")}>Home</p>
            <p onClick={() => navigate("/about")}>About US</p>
            <p onClick={() => navigate("/delivery")}>Delivery</p>
            <p onClick={() => navigate("/privacy-policy")}>Privacy Policy</p>
          </div>
        </div>
        <div className="md:w-[25%] md:h-[140px] flex flex-col items-start space-y-4">
          <p className="text-2xl font-semibold">Get In Touch</p>
          <div>
            <p>+1-212-456-7860</p>
            <p>singhmedicos@mail.com</p>
          </div>
        </div>
      </div>
      <div className="mb-5 max-md:mt-5 flex gap-2 items-center">
        <p className="text-[#888888]">
          <FaRegCopyright className="inline-block mr-2" />
          Copyright 2025 @singhmedicos.com-All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
