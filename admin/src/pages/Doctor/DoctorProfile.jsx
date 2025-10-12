import React, { useContext, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function DoctorProfile() {
  const { dtoken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updaetProfile = async () => {
    try {
      const dataToBeUpdated = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const response = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        dataToBeUpdated,
        { headers: { Authorization: `Bearer ${dtoken}` } }
      );
      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message);
        setIsEdit(false);
        getProfileData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useState(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);
  return (
    profileData && (
      <div>
        <div className="flex flex-col m-5 gap-4 text-gray-600">
          <div>
            <img
              className="sm:max-w-60 rounded-lg w-full bg-blue-500"
              src={profileData.image}
            />
          </div>
          <div className="flex-1 border border-stone-100 rounded-lg bg-white p-8 py-7">
            <p className="text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex gap-2 items-center mt-1">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="border border-blue-400 rounded-full py-0.4 px-2 text-xs">
                {profileData.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center mt-3 text-neutral-800 font-medium text-sm gap-1">
                About:{" "}
              </p>
              <p className="text-sm max-w-[700px] mt-1">{profileData.about}</p>
            </div>
            <p className="mt-4 font-medium">
              Appointment fees:{" "}
              <span className="text-gray-800">
                {currency}
                {isEdit ? (
                  <input
                    className="py-1.5 px-2 border-my rounded"
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>
            <div className="flex gap-2 py-2">
              <p>Address: </p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    className="py-1.5 px-2 border-my rounded"
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    className="py-1.5 px-2 border-my rounded"
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <input
                className="py-1.5 px-2 border-my rounded"
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
                id="available"
              />
              <label htmlFor="available">Available</label>
            </div>
            {!isEdit && (
              <button
                onClick={() => setIsEdit(true)}
                className="mt-5 px-4 py-1 border border-blue-500 rounded-full text-sm hover:text-white hover:bg-blue-500 transition-all duration-300 ease-in-out "
              >
                Edit
              </button>
            )}
            {isEdit && (
              <div className="flex items-center gap-3">
                <button
                  onClick={updaetProfile}
                  className="mt-5 px-4 py-1 border border-blue-500 rounded-full text-sm hover:text-white hover:bg-blue-500 transition-all duration-300 ease-in-out "
                >
                  Save Information
                </button>
                <button
                  onClick={() => setIsEdit(false)}
                  className="mt-5 px-4 py-1 border border-red-500 rounded-full text-sm hover:text-white hover:bg-red-500 transition-all duration-300 ease-in-out "
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}
