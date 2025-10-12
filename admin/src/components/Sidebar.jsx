import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";
import { DoctorContext } from "../context/DoctorContext";

export default function Sidebar() {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-white">
      {atoken && (
        <ul className="admin-ul text-sm mt-5 text-[#515151] link-active">
          <NavLink
            to="/admin-dashboard"
            className="md:min-w-72 flex items-center gap-3 mt-3 px-3 md:px-9"
          >
            <img src={assets.home_icon} alt="" className="max-md:min-w-6" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            to="/all-appointments"
            className="md:min-w-72 flex items-center gap-3 mt-3 px-3 md:px-9"
          >
            <img
              src={assets.appointment_icon}
              alt=""
              className="max-md:min-w-6"
            />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            to="/add-doctor"
            className="md:min-w-72 flex items-center gap-3 mt-3 px-3 md:px-9"
          >
            <img src={assets.add_icon} className="max-md:min-w-6" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>
          <NavLink
            to="/doctor-list"
            className="md:min-w-72 flex items-center gap-3 mt-3 px-3 md:px-9"
          >
            <img src={assets.people_icon} alt="" className="max-md:min-w-6" />
            <p className="hidden md:block">Doctor List</p>
          </NavLink>
        </ul>
      )}
      {dtoken && (
        <ul className="admin-ul text-sm mt-5 text-[#515151]">
          <NavLink
            to="/doctor-dashboard"
            className="md:min-w-72 flex items-center gap-3 mt-3 px-3 md:px-9"
          >
            <img src={assets.home_icon} alt="" className="max-md:min-w-6" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            to="/doctor-appointments"
            className="md:min-w-72 flex items-center gap-3 mt-3 px-3 md:px-9"
          >
            <img
              src={assets.appointment_icon}
              alt=""
              className="max-md:min-w-6"
            />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            to="/doctor-profile"
            className="md:min-w-72 flex items-center gap-3 mt-3 px-3 md:px-9"
          >
            <img src={assets.people_icon} alt="" className="max-md:min-w-6" />
            <p className="hidden md:block">Doctor Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
}
