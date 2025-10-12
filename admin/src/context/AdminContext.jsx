import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
  const [atoken, setAtoken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        {
          headers: {
            Authorization: `Bearer ${atoken}`,
          },
        }
      );

      if (response.status === 201 && response.data.success) {
        setDoctors(response.data.doctors);
        console.log(response.data.doctors);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        {
          headers: {
            Authorization: `Bearer ${atoken}`,
          },
        }
      );
      
      if (response.status === 201 && response.data.success) {
        toast.success(response.data.message);
        getAllDoctors();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const getAllAppointments = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { Authorization: `Bearer ${atoken}` },
      });

      if (response.status === 200 && response.data.success) {
        setAppointments(response.data.appointments.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${atoken}` } }
      );

      if (response.status === 201 && response.data.success) {
        toast.success(response.data.message);
        getDashData();
        getAllAppointments();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/admin/dashboard-data",
        { headers: { Authorization: `Bearer ${atoken}` } }
      );

      if (response.status === 201 && response.data.success) {
        setDashData(response.data.dashData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    atoken,
    setAtoken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    getAllAppointments,
    cancelAppointment,
    getDashData,
    dashData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
