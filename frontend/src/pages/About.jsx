import React from "react";
import aboutimg from "../assets/images/about_image.png";

export default function About() {
  const whyChooseUs = [
    {
      id: "1",
      heading: "EFFICIENCY:",
      text: "Streamlined appointment scheduling that fits into your busy lifestyle.",
    },
    {
      id: "2",
      heading: "CONVENIENCE:",
      text: "Access to a network of trusted healthcare professionals in your area.",
    },
    {
      id: "3",
      heading: "PERSONALIZATION:",
      text: "Tailored recommendations and reminders to help you stay on top of your health.",
    },
  ];
  return (
    <div className="w-full mx-auto my-10 lg:px-25 md:px-15 px-7">
      <div className="flex flex-col items-center mt-10 space-y-10">
        <div className="flex gap-2 pt-7">
          <span className="text-2xl text-[#777777]">ABOUT</span>
          <span className="text-2xl font-semibold">US</span>
        </div>
        <div className="flex md:flex-row flex-col md:justify-center gap-12">
          <div className="flex items-center justify-center">
            <img src={aboutimg} alt="img" className="w-full md:max-w-[360px]" />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center space-y-7 text-sm text-gray-700">
            <p>
              Welcome to Prescripto, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At Prescripto, we
              understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.
            </p>
            <p>
              Prescripto is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service. Whether you're booking your first appointment or
              managing ongoing care, Prescripto is here to support you every
              step of the way.
            </p>
            <h5 className="text-lg font-bold">Our Vision</h5>
            <p>
              Our vision at Prescripto is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h4 className="text-xl">WHY <span className="font-semibold text-gray-700">CHOOSE US?</span></h4>
          <div className="flex md:flex-row flex-col">
            {whyChooseUs.map((item) => (
              <div
                key={item.id}
                className="border border-[#cccccc] text-gray-700 px-10 md:py-15 py-8 flex flex-col space-y-5 hover:bg-[#4d4dff] hover:text-[#fff] transition-all duration-400 ease-in-out"
              >
                <p className="font-semibold">{item.heading}</p>
                <p className="text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
