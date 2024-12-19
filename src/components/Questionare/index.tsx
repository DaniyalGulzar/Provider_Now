"use client";

import React, { useState } from "react";
import Card from "../Cards"; // Assuming Card component exists in this path
import { FaTimes } from "react-icons/fa";

interface CardData {
  text: string;
  type: "radio" | "checkbox";
  showIcon: boolean;
}

interface QuestionareProps {
  boxShadow?: boolean;
  button?: React.ReactNode;
}

const Questionare: React.FC<QuestionareProps> = ({ boxShadow, button }) => {
  const title = "Questionare Management";

  // Initial card data
  const initialCards: CardData[] = [
    { text: "BoA", type: "radio", showIcon: true },
    { text: "FSA FEEDS", type: "radio", showIcon: true },
    { text: "HEQ FSA/HRA", type: "radio", showIcon: true },
    { text: "HEQ HSA", type: "radio", showIcon: true },
    { text: "Inspira", type: "radio", showIcon: true },
    { text: "Lively", type: "radio", showIcon: true },
    { text: "Navia", type: "radio", showIcon: true },
    { text: "Optum FSA", type: "radio", showIcon: true },
    { text: "Optum HSA", type: "radio", showIcon: true },
    { text: "Other", type: "radio", showIcon: true },
  ];

  const [cardsData, setCardsData] = useState<CardData[]>(initialCards);

  const addNewCard = () => {
    const newCard: CardData = {
      text: `New Card ${cardsData.length + 1}`,
      type: "radio",
      showIcon: true,
    };
    setCardsData((prevCards) => [...prevCards, newCard]);
  };

  const removeCard = (index: number) => {
    const updatedCards = cardsData.filter((_, i) => i !== index);
    setCardsData(updatedCards);
  };

  return (
    <div
      className={`p-4 bg-white rounded-lg my-10 max-w-8xl mt-10 mx-10 lg:mx-10 lg:h-auto sm:h-auto ${
        boxShadow
          ? "shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)]"
          : ""
      }`}
    >
      <div className="flex items-center justify-between flex-col md:flex-row mb-2">
        <h2 className="text-center text-xl lg:text-2xl md:text-2xl sm:text-left">
          {title}
        </h2>
      </div>
      <hr className=" border-gray-300 " />
      <div className="mt-8 relative w-full">
        <p className="text-center text-gray-600 mb-2">
          HSA/FSA Provider Selection
        </p>
        <h3 className="text-lg font-bold text-center mb-3 flex items-center justify-center space-x-2">
          <span>Select Your HSA/FSA Provider</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cardsData.map((card, index) => (
            <div key={index} className="relative  rounded-lg p-4">
              {/* <Card text={card.text} type={card.type} /> */}
              <button
                className="text-white bg-[#631681] rounded-full h-[13px]   absolute top-3 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  removeCard(index);
                }}
              >
                <FaTimes size={12} />
              </button>
            </div>
          ))}
          <div
            className="relative bg-white border rounded-lg h-[58px] mt-3 shadow mx-4 flex items-center p-4 space-x-2"
            onClick={addNewCard}
          >
            <span className="text-black-600">Add More</span>
          </div>
        </div>
        {button && <div className="flex justify-center mt-6">{button}</div>}
      </div>
    </div>
  );
};

export default Questionare;
