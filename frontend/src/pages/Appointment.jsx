import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doctors } from "../assets/images/assets";
import infoIcon from "../assets/images/info_icon.svg";
import verifiedicon from "../assets/images/verified_icon.svg";
import { AppContext } from "../context/context";
import { toast } from "react-toastify";
import axios from "axios";

export default function Appointment() {
  const navigate = useNavigate();
  const { docId } = useParams();
  const { token, backendUrl, getDoctorsData, doctors, currencySymbol } =
    useContext(AppContext);
  const [docInfo, setDocInfo] = useState({});
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [relatedDoc, setRelateDoc] = useState([]);
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  function fetchDocInfo() {
    const docInfo = doctors.find((item) => item._id === docId);
    setDocInfo(docInfo);
  }

  function fetchRelatedDoctors() {
    const relatedDoctors = doctors.filter(
      (item) => docInfo?.speciality === item.speciality
    );
    setRelateDoc(relatedDoctors);
  }

  const getAvailableDates = async () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book an appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "/" + month + "/" + year;

      const response = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201 && response.data.success) {
        toast.success(response.data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data.message ||
          "Something went wrong please try again later."
      );
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId]);

  useEffect(() => {
    getAvailableDates();
    fetchRelatedDoctors();
  }, [docInfo]);

  return (
    <div className="md:w-[80%] w-[90%] flex flex-col items-center mx-auto mt-5 text-gray-600 max-w-screen">
      <div className="w-full flex md:flex-row flex-col gap-4">
        <div className="">
          <img
            src={docInfo?.image}
            alt="doctorimage"
            className="w-full md:max-w-72 bg-blue-600 rounded-lg"
          />
        </div>
        <div className="flex flex-1 flex-col border border-[#adadad] rounded-md p-8 py-7">
          <h4 className="md:text-3xl text-2xl font-semibold mb-2 flex items-center gap-2">
            {docInfo?.name}
            <img src={verifiedicon} alt="verified" className="w-5" />
          </h4>
          <p className="flex gap-3 items-center mb-4">
            {docInfo?.degree} - {docInfo?.speciality}{" "}
            <span className="text-xs border border-[#cccccc] rounded-full px-2 py-1">
              {docInfo?.experience}
            </span>
          </p>
          <p className="flex gap-1 items-center text-black text-sm font-semibold mb-2">
            About <img src={infoIcon} alt="info" className="w-[14px]" />
          </p>
          <p className="text-sm mb-4">{docInfo?.about}</p>
          <p className="font-semibold">
            Appointment fees:{" "}
            <span className="text-black">${docInfo?.fees}</span>
          </p>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="md:ml-72 md:pl-4 mt-8">
          <p className="font-semibold">Booking Slots</p>
          <div className="flex items-center gap-3 w-full mt-4 overflow-x-auto">
            {docSlots.length &&
              docSlots.map((item, ind) => (
                <div
                  key={ind}
                  className={`min-w-16 flex flex-col justify-center border border-[#adadad] rounded-full py-5 text-center font-medium ${
                    slotIndex === ind ? "bg-blue-600 text-white" : ""
                  }`}
                  onClick={() => setSlotIndex(ind)}
                >
                  <p>{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()} </p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 overflow-x-auto mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, ind) => (
                <p
                  className={`text-nowrap border border-[#adadad] rounded-full px-4 py-2 text-sm ${
                    item.time === slotTime ? "bg-blue-600 text-white" : ""
                  }`}
                  key={ind}
                  onClick={() => setSlotTime(item.time)}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={bookAppointment}
            className="bg-blue-600 text-white rounded-full px-20 py-3 text-sm my-6"
          >
            BooK an appointment
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 my-16 text-[#262626]">
        <h1 className="text-3xl font-medium">Related Doctors</h1>
        <p className="md:w-1/3 text-center text-sm">
          Simply browse through our extensive list of trusted doctors.
        </p>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center gap-4 mt-5 px-2">
          {relatedDoc.length > 0
            ? relatedDoc.map((item) => (
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
            : null}
        </div>
      </div>
    </div>
  );
}
