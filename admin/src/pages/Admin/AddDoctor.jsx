import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddDoctor() {
  const { atoken, backendUrl } = useContext(AdminContext);
  const [doctor, setDoctor] = useState({
    profile: false,
    docName: "",
    email: "",
    password: "",
    experience: "1 Year",
    fees: "",
    speciality: "General Physician",
    education: "",
    address: {
      address1: "",
      address2: "",
    },
    about: "",
  });

  function handleDoctorDetails(event) {
    const { name, value } = event.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  }

  async function handleAddDoctorForm(event) {
    event.preventDefault();

    try {
      if (!doctor.profile) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();

      formData.append("image", doctor.profile);
      formData.append("name", doctor.docName);
      formData.append("email", doctor.email);
      formData.append("password", doctor.password);
      formData.append("experience", doctor.experience);
      formData.append("fees", Number(doctor.fees));
      formData.append("about", doctor.about);
      formData.append("speciality", doctor.speciality);
      formData.append("degree", doctor.education);
      formData.append(
        "address",
        JSON.stringify({
          line1: doctor.address.address1,
          line2: doctor.address.address2,
        })
      );

      const response = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: {
            Authorization: `Bearer ${atoken}`,
          },
        }
      );

      console.log(response, "response");

      if (response.status === 201 && response.data.success) {
        toast.success(response.data.message);
        setDoctor({
          profile: false,
          docName: "",
          email: "",
          password: "",
          experience: "1 Year",
          fees: "",
          speciality: "General Physician",
          education: "",
          address: {
            address1: "",
            address2: "",
          },
          about: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <form className="m-5 w-full" onSubmit={handleAddDoctorForm}>
      <p className="text-lg font-medium mb-3">Add Doctor</p>
      <div className="bg-white p-8 rounded w-full max-w-4xl max-h-[80vh] overflow-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-800">
          <label htmlFor="doc-img">
            <img
              src={
                doctor.profile
                  ? URL.createObjectURL(doctor.profile)
                  : assets.upload_area
              }
              className="w-16 bg-gray-100 cursor-pointer rounded-full"
            />
          </label>
          <input
            type="file"
            name="profile"
            id="doc-img"
            onChange={(e) =>
              setDoctor((prev) => ({ ...prev, profile: e.target.files[0] }))
            }
            hidden
          />
          <p>
            {doctor.profile ? doctor.profile.name : "Upload doctor"} <br />{" "}
            {doctor.profile
              ? (doctor.profile.size / 1024).toFixed(1) + "kb"
              : "picture"}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                className="border-my py-2 px-3 rounded"
                type="text"
                placeholder="Name"
                value={doctor.docName}
                name="docName"
                required
                onChange={handleDoctorDetails}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                className="border-my py-2 px-3 rounded"
                type="email"
                placeholder="Email"
                value={doctor.email}
                name="email"
                onChange={handleDoctorDetails}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Pasword</p>
              <input
                className="border-my py-2 px-3 rounded"
                type="password"
                placeholder="Password"
                value={doctor.password}
                name="password"
                onChange={handleDoctorDetails}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                name="experience"
                value={doctor.experience}
                id="experience"
                className="border-my py-2 px-3 rounded"
                onChange={handleDoctorDetails}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                className="border-my py-2 px-3 rounded"
                type="number"
                placeholder="Fees"
                value={doctor.fees}
                name="fees"
                onChange={handleDoctorDetails}
                required
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                name="speciality"
                value={doctor.speciality}
                id="speciality"
                className="border-my py-2 px-3 rounded"
                onChange={handleDoctorDetails}
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynaecologist">Gynaecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                className="border-my py-2 px-3 rounded"
                type="text"
                placeholder="Education"
                value={doctor.education}
                name="education"
                onChange={handleDoctorDetails}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                className="border-my py-2 px-3 rounded"
                type="text"
                placeholder="address 1"
                value={doctor.address.address1}
                name="address1"
                onChange={(e) =>
                  setDoctor((prev) => ({
                    ...prev,
                    address: { ...prev.address, address1: e.target.value },
                  }))
                }
                required
              />
              <input
                className="border-my py-2 px-3 rounded"
                type="text"
                placeholder="address 2"
                value={doctor.address.address2}
                name="address2"
                onChange={(e) =>
                  setDoctor((prev) => ({
                    ...prev,
                    address: { ...prev.address, address2: e.target.value },
                  }))
                }
                required
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            className="border-my py-2 px-3 rounded"
            placeholder="Write about doctor"
            value={doctor.about}
            rows={5}
            name="about"
            onChange={handleDoctorDetails}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#5a8eff] rounded-full mt-4 px-10 py-3 text-white text-sm"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
}
