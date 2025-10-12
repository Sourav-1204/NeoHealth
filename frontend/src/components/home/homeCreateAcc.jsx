import React, { useContext } from "react";
import img1 from "../../assets/images/appointment_img.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/context";

export default function HomeCreateAcc() {
  const {token} = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="w-[80%] flex md:flex-row flex-col justify-center items-center my-20 bg-[#5e5eff] rounded-2xl mx-auto px-10 gap-10 pt-10">
      <div className="md:w-[60%] flex flex-col justify-between items-start">
        <h2 className="md:text-5xl text-3xl font-bold text-white">
          Book Appointment With 100+ Trusted Doctors
        </h2>
       {!token && <button
          className="rounded-full py-3 px-10 bg-white mt-5"
          onClick={() => navigate("/login")}
        >
          Create Account
        </button>}
      </div>
      <div className="md:w-[50%] relative flex items-center justify-center">
        <img src={img1} alt="img" className="w-100" />
      </div>
    </div>
  );
}
