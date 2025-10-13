import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/context";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignUp() {
  const { backendUrl, isLogin, setIsLogin } = useContext(AppContext);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleInputDetails(event) {
    const { name, value } = event.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(backendUrl + "/api/user/register", {
        ...user,
      });

      console.log(response);
      if (response.status === 201 && response.data.success) {
        toast.success(response.data.message);
        setUser({
          name: "",
          email: "",
          password: "",
        });
        setIsLogin(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="md:[50%] w-[90%] max-w-[380px] flex flex-col justify-center items-center my-20 gap-4 border border-[#dfdfdf] rounded-lg py-8 px-3 text-gray-600 shadow-[0px_0px_10px_#ddd]"
    >
      <div className="w-[90%]">
        <h1 className="text-2xl font-bold mb-2">Create Account</h1>
        <p className="text-sm">Please sign up to book an appointment</p>
      </div>
      <div className="w-[90%]">
        <p className="text-sm">Full Name</p>
        <input
          type="text"
          className="w-full border py-1.5 px-2 mt-1 rounded-sm border-[#cccccc]"
          value={user.name}
          name="name"
          onChange={handleInputDetails}
        />
      </div>
      <div className="w-[90%]">
        <p className="text-sm">Email</p>
        <input
          type="email"
          className="w-full border py-1.5 px-2 mt-1 rounded-sm border-[#cccccc]"
          name="email"
          value={user.email}
          onChange={handleInputDetails}
        />
      </div>
      <div className="w-[90%]">
        <p className="text-sm">Password</p>
        <input
          type="password"
          className="w-full border py-1.5 px-2 mt-1 rounded-sm border-[#cccccc]"
          value={user.password}
          name="password"
          onChange={handleInputDetails}
        />
      </div>
      <div className="w-[90%] mt-3">
        <button
          type="submit"
          className="w-full border py-2 px-5 cursor-pointer rounded-md bg-[#6969ff] text-white"
        >
          Create Account
        </button>
      </div>
      <div className="w-[90%] text-sm">
        <p>
          Already have and account?
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            Login here
          </span>
        </p>
      </div>
    </form>
  );
}
