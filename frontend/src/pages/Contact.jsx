import React from "react";
import contactimg from "../assets/images/contact_image.png";

export default function Contact() {
  return (
    <div className="w-full mx-auto my-10 px-7">
      <div className="flex flex-col items-center gap-10">
        <div className="flex gap-2 text-2xl text-gray-700 pt-5">
          <span>CONTACT</span>
          <span className="font-semibold">US</span>
        </div>
        <div className="flex md:flex-row flex-col md:items-center gap-10 mb-5">
          <div className="flex items-center justify-center">
            <img
              src={contactimg}
              alt="contactimg"
              className="w-full md:max-w-[360px]"
            />
          </div>
          <div className="flex flex-col items-start text-gray-700 text-sm">
            <h5 className="text-xl font-semibold mb-7">OUR OFFICE</h5>
            <p>00000 Willms Station</p>
            <p className="mb-5">Suite 000, Washington, USA</p>
            <p>Tel: (000) 000-0000</p>
            <p className="mb-5">Email: sourav@gmail.com</p>
            <h5 className="text-xl font-semibold mb-7">CAREERS AT PRESCRIPTO</h5>
            <p>Learn more about our teams and job openings.</p>
            <button className="w-fit border text-sm px-10 py-4 text-black mt-6 hover:bg-black hover:text-white">Explore Jobs</button>
          </div>
        </div>
      </div>
    </div>
  );
}
