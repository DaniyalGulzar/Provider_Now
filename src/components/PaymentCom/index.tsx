import React from "react";
import InputField from "../InputField";
import Button from "../Button";
import Link from "next/link";

interface PaymentComProps {
  title: string;
  cardSectionTitle1: string;
}

const PaymentCom: React.FC<PaymentComProps> = ({
  title,
  cardSectionTitle1,
}) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl  mx-10 font-bold mb-4">{title}</h2>
      <div className="shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] rounded-md mx-3 lg:mx-10 bg-white">
        <div className="px-4 lg:px-40 rounded-md py-4">
          <h3 className=" flex justify-center text-2xl font-bold text-left mt-5 mb-3">
            {cardSectionTitle1}
          </h3>
          <span className="flex justify-center font-bold items-center mb-4">
            (We provide HSA and FSA)
          </span>
          <div className="bg-white shadow-lg mb-10 p-5">
            <h2 className="text-xl font-bold mb-4  ">Price Detail</h2>
            <hr className="my-4 border-gray-300" />
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-gray-500">Subtotal</span>
                <span>$100.00</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-gray-500">Tax</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-gray-500">Discount</span>
                <span>-$5.00</span>
              </div>
              <div className="flex justify-between items-center font-semibold">
                <span className="font-bold">Total Price</span>
                <span>$105.00</span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md p-5">
            <h2 className="text-xl font-bold mb-4">Rewards Balance</h2>
            <hr className="my-4 border-gray-300" />
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex justify-between items-center border-b pb-2">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-500">
                    Total Reward Points
                  </span>
                  <span className="font-semi-bold text-gray-500">
                    Minimum $10 can be redeemed at one transaction
                  </span>
                </div>
                <span className="font-bold text-3xl">$5</span>
              </div>
              <div className="flex lg:flex-row  border border-rounded items-center px-15">
                <input
                  name="bar"
                  placeholder=""
                  className="flex-1 h-[48px] border-none pl-4 outline-none"
                />
                <Button className="bg-[#631681] text-white w-[150px] h-[50px] rounded-lg ">
                  Redeem now{" "}
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-2  mt-5">
            <InputField
              name="name"
              placeholder="Type Your Name "
              label="Card Holder Name"
            />
          </div>
          <div className="space-y-2  mt-5">
            <InputField
              type="email"
              name="email"
              placeholder=" Type Your Email Address"
              label="Card Number"
            />
          </div>
          <div className="flex mt-3 flex-wrap gap-4">
            <div className="flex-1">
              <InputField
                type="date"
                name="dob"
                label="Expiry"
                placeholder="Date of Birth"
              />
            </div>
            <div className="flex-1">
             
              <InputField
                name="number"
                placeholder="CVC"
                label="CVC"
              />
            </div>
          </div>
          <div className="flex mt-5 justify-center">
            <div className="w-full bg-gray-200 border-2 border-dotted border-gray-400 w-4/5 p-6 flex items-start text-left mb-5">
              <div className="flex flex-col w-full">
                <p className="font-bold text-gray-700 mb-2">Disclaimer:</p>
                <p className="text-gray-600">
                  This is a disclaimer text that provides important information
                  about file uploads.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8 gap-4 w-full">
            <Button className="bg-white border border-[#631681] text-[#631681] font-semibold px-4 py-2 rounded w-40">
              Back
            </Button>
            <Link href="/success">
              <Button className="bg-[#631681] text-white px-4 py-2 font-semibold rounded w-40">
                PayNow
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentCom;