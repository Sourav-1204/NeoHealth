import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/context";

export default function HomeDoctors() {
  const navigate = useNavigate();
  const { doctors, currencySymbol } = useContext(AppContext);
  
  return (
    <div className="w-full flex flex-col items-center justify-center my-15 gap-15">
      <div className="flex flex-col items-center gap-5 p-4">
        <h1 className="text-3xl font-semibold">Top Doctors to Book</h1>
        <p className="text-sm font-medium text-center">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>
      <div className="lg:w-[90%] grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-center gap-5 sm:px-20 px-10">
        {doctors.slice(0, 10).map((item) => (
          <div
            key={item._id}
            className="rounded-xl border border-[#cdd8ff] tranform hover:translate-y-[-10px] duration-300 transition-transform"
            onClick={() => navigate(`/appointment/${item._id}`)}
          >
            <img
              src={item.image}
              alt=""
              className="bg-[#EAEFFF] rounded-t-xl"
            />
            <div className="py-4 px-5">
              <p className="flex gap-2">
                {item.available ? (
                  <span className="text-green-500">• Available</span>
                ) : (
                  <span className="text-gray-500">• Not Available</span>
                )}
              </p>
              <p className="text-lg font-medium">{item.name}</p>
              <p className="text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          className="rounded-full py-3 px-13 bg-[#eaefff]"
          onClick={() => navigate("/doctors")}
        >
          more
        </button>
      </div>
    </div>
  );
}
