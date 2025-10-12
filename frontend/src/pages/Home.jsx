import React from "react";
import Navbar from "../components/Navbar";
import HomeHero from "../components/home/homeHero";
import HomeSpeciality from "../components/home/homeSpeciality";
import HomeDoctors from "../components/home/homeDoctors";
import HomeCreateAcc from "../components/home/homeCreateAcc";

export default function Home() {
  return (
    <div className="w-full h-full">
      <HomeHero />
      <HomeSpeciality />
      <HomeDoctors />
      <HomeCreateAcc />
    </div>
  );
}
