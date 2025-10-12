import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";

export default function Dashboard() {
  const { atoken, getDashData, dashData, cancelAppointment } =
    useContext(AdminContext);

  const { sloteDateFormat } = useContext(AppContext);

  console.log(dashData);

  useEffect(() => {
    if (atoken) {
      getDashData();
    }
  }, [atoken]);

  return (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105">
          <img src={assets.doctor_icon} alt="" className="w-14" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.doctors}
            </p>
            <p className="text-gray-400">Doctors</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105">
          <img src={assets.appointments_icon} alt="" className="w-14" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.appointments}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105">
          <img src={assets.patients_icon} alt="" className="w-14" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.patients}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border-my">
          <img src={assets.list_icon} />
          <p className="font-semibold">Latest Booking</p>
        </div>
        <div className="pt-4 border-my border-t-0">
          {dashData &&
          dashData.latestAppointments &&
          dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
              >
                <img
                  className="rounded-full w-10"
                  src={item.docData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.docData.name}
                  </p>
                  <p className="text-gray-600">
                    {sloteDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-sm text-red-400 font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-sm text-green-500 font-medium">Completed</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    className="w-10 cursor-pointer"
                  />
                )}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-5">
              <p>No appointments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
