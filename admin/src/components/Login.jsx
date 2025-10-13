import React, { useContext } from "react";
import { useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

export default function Login() {
  const { setAtoken, backendUrl } = useContext(AdminContext);
  const { setDtoken } = useContext(DoctorContext);

  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const OnSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAtoken(data.token);
          toast.success("Login successful");
        } else {
          toast.error("Login failed");
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        console.log(data, "doctor data");
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDtoken(data.token);
          toast.success("Login successful");
        } else {
          toast.error("Login failed");
        }
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Invalid credentials");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <form
      onSubmit={OnSubmitHandler}
      className="w-full min-h-[80vh] flex items-center justify-center"
    >
      <div className="max-w-[380px] w-[90%] flex flex-col items-center p-8 rounded shadow-[0px_0px_15px_10px_#dddddd] gap-y-3 text-sm text-[#5e5e5e] mt-20">
        <p className="text-2xl font-semibold mb-2">
          <span className="text-[#5a8eff]">{state} </span>Login
        </p>
        <div className="w-full">
          <p>Email: </p>
          <input
            type="email"
            value={email}
            required
            className="w-full border border-[#dadada] p-2 mt-1 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <p>Password: </p>
          <input
            type="password"
            value={password}
            required
            className="w-full border border-[#dadada] p-2 mt-1 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="w-full text-white bg-[#5a8eff] py-2 mt-2 rounded cursor-pointer">
          Login
        </button>
        {state === "Admin" ? (
          <p className="w-full">
            Doctor login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-[#5a8eff] underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="w-full">
            Admin login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-[#5a8eff] underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
