import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { FaHandHoldingHeart } from "react-icons/fa6";

export default function Navbar() {
  const { atoken, setAtoken } = useContext(AdminContext);
  const { dtoken, setDtoken } = useContext(DoctorContext);

  const navigate = useNavigate();

  function logout() {
    navigate("/");
    if (atoken) {
      setAtoken("");
      localStorage.removeItem("aToken");
    } else {
      setDtoken("");
      dtoken && localStorage.removeItem("dToken");
    }
  }
  return (
    <div className="flex justify-between items-center text-sm py-3 px-4 sm:px-10 bg-white border-b border-[#ccc]">
      <div className="flex items-center gap-2">
        <div className="flex gap-1 text-[#000080]">
          <span>
            <FaHandHoldingHeart className="text-blue-500 text-3xl" />
          </span>
          <h1 className="flex flex-col justify-center text-4xl logo-font leading-[20px]">
            NeoHealth <span className="text-[12px] font-semibold text-blue-800">{atoken ? "Admin Panel" : "Doctor Panel"}</span>
          </h1>
        </div>
        <p className="border border-[#adadad] rounded-full py-0.5 px-5">
          {atoken ? "Admin" : "Doctor"}
        </p>
      </div>
      <div>
        <button
          className="md:px-10 px-5 py-2 text-sm bg-[#5a8eff] text-white rounded-full hover:border hover:bg-white hover:text-[#5a8eff] transition-all duration-300 ease-in-out"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
