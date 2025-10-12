import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

export default function DoctorsList() {
  const { doctors, getAllDoctors, atoken, changeAvailability } =
    useContext(AdminContext);
  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div className="w-full p-5 flex flex-col gap-5 text-gray-500 max-h-[calc(100vh_-_1rem)] overflow-y-scroll">
      <p className="text-xl font-medium">List</p>
      <div className="w-[90%] temp-grid gap-10">
        {doctors.map((item) => (
          <div
            key={item._id}
            className="rounded-xl border border-[#cdd8ff] tranform hover:translate-y-[-10px] duration-300 transition-transform bg-white"
          >
            <img
              src={item.image}
              alt=""
              className="w-full bg-[#EAEFFF] rounded-t-xl object-cover"
            />
            <div className="py-4 px-5">
              <p className="text-lg font-medium">{item.name}</p>
              <p className="text-sm">{item.speciality}</p>
              <div className="flex gap-2">
                <input
                  className="cursor-pointer text-blue-500"
                  type="checkbox"
                  value={item.available}
                  onChange={() => changeAvailability(item._id)}
                  checked={item.available}
                />
                <p className="text-sm">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
