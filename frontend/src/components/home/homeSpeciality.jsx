import React from "react";
import { specialityData } from "../../assets/images/assets";
import { useNavigate } from "react-router-dom";

export default function HomeSpeciality() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center gap-8 p-5">
      <div className="flex flex-col items-center space-y-5">
        <h1 className="text-3xl font-semibold">Find By Speciality</h1>
        <p className="text-center text-sm font-medium max-w-[480px]">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
      </div>
      <div className="w-full flex items-center sm:justify-center gap-4 overflow-scroll pt-5">
        {specialityData.map((item, index) => (
          <div
            className="flex flex-col items-center gap-2 transition-transform duration-300 hover:-translate-y-2"
            key={index}
            onClick={() => navigate(`/doctors/:${item.speciality}`)}
          >
            <img src={item.image} alt="img" className="w-16" />
            <p className="text-xs text-center whitespace-nowrap">
              {item.speciality}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
