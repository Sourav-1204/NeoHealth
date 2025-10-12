import React, { useContext, useEffect, useState } from "react";
import { specialityData } from "../../assets/images/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/context";

export default function Main() {
  const { doctors } = useContext(AppContext);
  const [currentSpeciality, setCurrentSpeciality] = useState("");
  const [selectedDoctor, setSelectedDoctors] = useState(doctors);

  const navigate = useNavigate();

  function fetchDoctorsBySpecialty() {
    setSelectedDoctors(
      currentSpeciality !== ""
        ? doctors.filter(
            (item) =>
              item.speciality.toLowerCase() === currentSpeciality.toLowerCase()
          )
        : doctors
    );
  }

  useEffect(() => {
    setSelectedDoctors(doctors);
  }, [doctors]);

  useEffect(() => {
    fetchDoctorsBySpecialty();
  }, [currentSpeciality]);

  return (
    <div className="flex flex-col items-center mt-8 mb-10 mx-auto md:px-25 px-5">
      <div className="w-full flex justify-start">
        <p className="font-medium text-lg text-gray-700 pl-3">Browse through the doctors specialist.</p>
      </div>
      <div className="w-full flex lg:flex-row flex-col lg:items-start items-center justify-between mt-10 space-y-10 lg:gap-5">
        <div className="lg:w-[20%] w-[90%] flex flex-col items-center gap-3">
          {specialityData.map((item, ind) => (
            <div
              key={ind}
              className="w-[90%]"
              onClick={() =>
                setCurrentSpeciality(
                  currentSpeciality !== item.speciality ? item.speciality : ""
                )
              }
            >
              <p
                className="w-full border border-[#bbbbbb] pl-3 py-2 rounded-md text-sm cursor-pointer"
                style={
                  currentSpeciality === item.speciality
                    ? { backgroundColor: "#eaefff" }
                    : {}
                }
              >
                {item.speciality}
              </p>
            </div>
          ))}
        </div>
        <div className="lg:w-[80%] w-[90%] grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 gap-y-6">
          {selectedDoctor.length > 0 ? (
            selectedDoctor.map((item) => (
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
            ))
          ) : (
            <div>
              <p>No doctor available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
