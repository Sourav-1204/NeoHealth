import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/context";
import axios from "axios";
import { toast } from "react-toastify";
import { data, useNavigate } from "react-router-dom";

export default function MyAppointments() {
  const navigate = useNavigate();
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appoinments, setAppointments] = useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const sloteDateFormat = (getDate) => {
    const dateArray = getDate.split("/");
    return (
      dateArray[0] + " " + months[Number(dateArray[1] - 1)] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error.data.message);
    }
  };

  const cancelAppointments = async (appointmentId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/cancel-appoinment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  const init = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      theme: {
        color: "#3E54F5",
      },
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (data.success) {
            toast.success(data.message);
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const makePayments = async (appointmentId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201 && response.data.success) {
        init(response.data.order);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="md:w-[80%] w-[90%] flex flex-col my-10 gap-5 text-gray-600">
        <p className="text-2xl">My Appointments</p>
        <hr />
        {appoinments && appoinments.length > 0 ? (
          appoinments.map((item) => (
            <div className="w-full flex md:items-center gap-4" key={item._id}>
              <div className="flex items-start">
                <img
                  src={item.docData.image}
                  alt="docimg"
                  className="w-36 bg-[#EAEFFF] rounded-md"
                />
              </div>
              <div className="md:flex-2 flex md:flex-row flex-col gap-y-4 justify-between">
                <div className="flex-1 text-sm">
                  <p className="text-lg font-semibold text-gray-800">
                    {item.docData.name}
                  </p>
                  <p>{item.docData.speciality}</p>
                  <p className="font-medium text-gray-800 mt-1">Address:</p>
                  <p>{item.docData.address.line1}</p>
                  <p>{item.docData.address.line2}</p>
                  <p className="mt-1">
                    <span className="font-semibold text-gray-800">
                      Date & Time:
                    </span>{" "}
                    {sloteDateFormat(item.slotDate) + " | " + item.slotTime}
                  </p>
                </div>
                <div className="flex flex-col justify-end gap-2 text-center text-sm">
                  {!item.className && item.payment && !item.isCompleted && (
                    <button className="py-2 px-10 border border-[#ccc] bg-green-300 rounded-md">
                      Paid
                    </button>
                  )}
                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <button
                      onClick={() => makePayments(item._id)}
                      className="py-2 px-10 border border-[#ccc] transition-all duration-300 hover:bg-blue-600 hover:text-white rounded-md"
                    >
                      Pay Online
                    </button>
                  )}
                  {!item.cancelled && !item.isCompleted && (
                    <button
                      onClick={() => cancelAppointments(item._id)}
                      className="py-2 px-10 border border-[#ccc] transition-all duration-300 hover:bg-red-600 hover:text-white rounded-md"
                    >
                      Cancel Appointment
                    </button>
                  )}
                  {item.cancelled && !item.isCompleted && (
                    <button className="py-2 px-10 border border-[#ccc] text-[#ff7171] rounded-md">
                      Cancelled
                    </button>
                  )}
                  {item.isCompleted && (
                    <button className="py-2 px-10 border border-green-500 text-green-500 rounded-md">
                      Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="min-h-[150px]">
            <p className="text-2xl text-[#ff9191]">
              You don't have any appoinments
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
