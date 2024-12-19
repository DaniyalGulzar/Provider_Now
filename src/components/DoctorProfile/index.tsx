"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "../Button";
import { FaCheck } from "react-icons/fa";

interface DoctorProfileProps {
  title: string;
  cardSectionTitle1: string;
  cardSectionTitle2: string;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({
  title,
  cardSectionTitle1,
  cardSectionTitle2,
}) => {
  const [selectedLabel, setSelectedLabel] = useState<string>("");

  const handleLabelClick = (label: string) => {
    setSelectedLabel(label);
  };

  const [isAnnually, setIsAnnually] = useState(false);

  const togglePlan = () => {
    setIsAnnually(!isAnnually);
  };

  const timeSlots = ["30 Mins", "45 Mins", "60 Mins"];

  return (
    <div className=" p-4 ">
      <h2 className="text-2xl lg:mx-10 md:ml-[10px]  font-bold mb-4">
        {title}
      </h2>
      <div className="shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] rounded-md mx-3 lg:mx-10 bg-white">
        <div className="px-4 rounded-md py-4">
          <h4 className="flex justify-center text-2xl font-bold mt-5 mb-3">
            {cardSectionTitle1}
          </h4>
        </div>

        <div className="flex justify-center lg:flex-row sm:flex-row px-6 mb-6">
          {timeSlots.map((slot) => (
            <label
              key={slot}
              onClick={() => handleLabelClick(slot)}
              className={`border shadow-md py-2 px-6 cursor-pointer ${
                selectedLabel === slot ? "bg-[#631681] text-white" : "bg-white"
              }`}
            >
              <span className="font-semibold">{slot}</span>
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-100 px-6 py-6 ">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="shadow-lg p-6 rounded-md text-center bg-white flex flex-col justify-between rounded-xl"
            >
              <div className="flex justify-center mb-4">
                <Image
                  src="/myImages/Avatar pixel.png"
                  alt="Profile"
                  className="object-cover rounded-full"
                  height={100}
                  width={100}
                />
              </div>
              <p className="font-semibold text-md mb-1 text-[#631681]">
                Consultation Fees: $200
              </p>
              <p className="text-pink-500 mb-4 font-semibold">
                Waiting Time: 30 Mins
              </p>
              <Button className="bg-[#631681] border border-[#631681] text-white font-semibold px-4 py-2 rounded w-full">
                Book Now
              </Button>
            </div>
          ))}
        </div>
        {/* Divider with text */}
        <div className="flex items-center justify-center my-4 px-6">
          <hr className="border-gray-300 flex-grow" />
          <span className="text-black-500 text-lg font-bold">Or</span>
          <hr className="border-gray-300 flex-grow" />
        </div>
        <div className="px-4 rounded-md py-2">
          <h3 className="flex justify-center text-2xl font-bold  mb-3">
            {cardSectionTitle2}
          </h3>

          <div className="flex justify-center items-center space-x-4 my-6">
            <span
              style={{
                fontWeight: "bold",
                color: !isAnnually ? "black" : "gray",
              }}
            >
              Monthly
            </span>
            <button
              className="w-12 h-5 bg-gray-300 p-1 pr-2 rounded-full relative flex items-center"
              onClick={togglePlan}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute transition-transform duration-300 ${
                  isAnnually ? "translate-x-8" : "translate-x-0"
                }`}
              />
            </button>
            <span
              style={{
                fontWeight: "bold",
                color: isAnnually ? "black" : "gray",
              }}
            >
              Annually
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-5 mx-4 gap-6 p-2">
            {["Basic", "Pro", "Diamond"].map((plan, idx) => (
              <div key={idx} className="flex justify-center">
                <div className="border shadow-md p-4 rounded-lg bg-gray-100 w-full text-left">
                  <h4 className="font-bold text-xl mb-2">{plan}</h4>
                  <span className="font-bold text-3xl mb-4">
                    ${99 + idx * 50}
                    <span className="text-gray-500 text-sm">/month</span>
                  </span>
                  <hr className="border-gray-300 mt-2" />
                  <h5 className="font-semibold text-lg mt-1">Features:</h5>
                  <ul className="pl-0">
                    {[
                      "Lorem ipsum sun ediot",
                      "Lorem ipsum sun ediot",
                      "Lorem ipsum sun ediot",
                      "Lorem ipsum sun ediot",
                      "Lorem ipsum sun ediot",
                    ].map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-center">
                        <FaCheck className="text-black font-bold mr-2" />{" "}
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-[#631681] border border-[#631681] text-white font-semibold py-2 rounded w-full">
                    Get Started
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center my-8 w-full  ">
            <Button
              type="button"
              // onClick={handleBack}
              className="bg-transparent h-12 border border-2 border-[#751A9B] font-bold text-[#751A9B] hover:bg-purple-700 hover:text-white px-4 py-2 rounded w-full md:w-40"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
