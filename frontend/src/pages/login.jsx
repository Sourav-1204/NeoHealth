import React, { useEffect, useState } from "react";
import SignUp from "../components/login/SignUp";
import SignIn from "../components/login/SignIn";
import { useContext } from "react";
import { AppContext } from "../context/context";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { isLogin, setIsLogin, token } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="w-full flex items-center justify-center">
      {isLogin ? (
        <SignIn isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : (
        <SignUp isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
    </div>
  );
}
