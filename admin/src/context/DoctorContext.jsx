import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

export default function DoctorContextProvider({ children }) {
  const [dtoken, setDtoken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );

  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAppointments = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/doctor/appointments",
        {
          headers: { Authorization: `Bearer ${dtoken}` },
        }
      );

      if (response.status === 200 && response.data.success) {
        setAppointments(response.data.appointments.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const dashboardData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { Authorization: `Bearer ${dtoken}` },
      });
      if (data.success) {
        setDashData(data.dashData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${dtoken}` },
        }
      );
      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message);
        dashboardData();
        getAppointments();
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
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${dtoken}` },
        }
      );

      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message);
        dashboardData();
        getAppointments();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { Authorization: `Bearer ${dtoken}` },
      });
     
      if (response.status === 200 && response.data.success) {
        setProfileData(response.data.doctorData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    dtoken,
    setDtoken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    dashboardData,
    profileData,
    setProfileData,
    getProfileData,
  };
  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
}
