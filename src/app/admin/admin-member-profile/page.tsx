"use client";
import AuthWrapper from "@/components/AuthWrapper";
import Button from "@/components/Button";
import Image from "next/image";
import React, { useState } from "react";
import { IoTrash } from "react-icons/io5";
import { Circles } from "react-loader-spinner";
import Link from "next/link";
import InputField from "@/components/InputField";

function AdminMemberProfile() {
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [formdata, setFormData] = useState({
    first_name: "Kelli",
    middle_name: "",
    last_name: "Jenner",
    dob: "1980-06-21",
    ssn: "#1011",
    phone: "123-321-4567",
    email: "Kelli.jenner0@example.com",
    address: "5754 Airport Rd",
    state: "Coosda",
    zipcode: "36020",
    city: "lahore",
  });

  const handleCloseModal = () => setModalType(null);

  const handleConfirmDelete = () => handleCloseModal();

  const handleProfileChangeSubmit = (e: any) => {
    e.preventDefault();
    handleCloseModal();
  };

  const documentData = [
    {
      src: "/myImages/document.png",
      viewSrc: "/myImages/view.png",
      downloadSrc: "/myImages/downloads.png",
    },
    {
      src: "/myImages/document.png",
      viewSrc: "/myImages/view.png",
      downloadSrc: "/myImages/downloads.png",
    },
    {
      src: "/myImages/document.png",
      viewSrc: "/myImages/view.png",
      downloadSrc: "/myImages/downloads.png",
    },
    {
      src: "/myImages/document.png",
      viewSrc: "/myImages/view.png",
      downloadSrc: "/myImages/downloads.png",
    },
    {
      src: "/myImages/document.png",
      viewSrc: "/myImages/view.png",
      downloadSrc: "/myImages/downloads.png",
    },
  ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <AuthWrapper>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <Circles
              height="80"
              width="80"
              color="#491161"
              ariaLabel="loading-spinner"
              visible={true}
            />
          </div>
        )}
        <div className="p-5">
          <div className="shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] px-3 lg:px-[26px] py-[26px] rounded-[22px] mb-15">
            <div className="flex justify-between flex-col lg:flex-row border-b border-gray-300 pb-5">
              <span className="text-2xl font-bold">Member Details</span>
              <div className="gap-4 flex mt-4 lg:mt-0 flex-col lg:flex-row">
                <Button
                  className="border-0 text-[#751A9B] font-medium underline"
                  onClick={() => setModalType("delete")}
                >
                  <IoTrash className="mr-1" /> Delete Profile
                </Button>

                <Button
                  className="border border-2 border-[#751A9B] text-[#751A9B] font-medium hover:bg-[#751A9B] h-[40px] hover:text-white rounded-md w-full xl:w-[128px]"
                  onClick={() => setModalType("editProfile")}
                >
                  Edit Profile
                </Button>
                <Link href="/auth/change-password">
                  <Button className="bg-[#751A9B] text-white font-medium hover:bg-blue-500 h-[40px] rounded-md w-full lg:w-[150px]">
                    Change Password
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:p-2">
              <div className="bg-white p-6 flex flex-col items-start lg:border-r-2 lg:border-dashed lg:border-gray-400 h-full">
                <div className="profile-fix flex flex-col sm:flex-row items-center mb-4 w-full">
                  <Image
                    src="/myImages/Avatar pixel.png"
                    alt="Profile Image"
                    className="object-cover h-[150px] w-[150px] rounded-full"
                    height={150}
                    width={150}
                  />
                  <div className="flex flex-col sm:ml-4 sm:mt-4 xl:mt-0 lg:mt-4 md:mt-4 text-left sm:text-left w-full">
                    <span className="text-xl font-bold text-gray-800 truncate w-[70%]">
                      Kelli Jenner
                    </span>
                    <span className="flex items-center sm:justify-start text-sm font-semibold mt-2 truncate w-full">
                      <span className="truncate w-[70%] mt-2 text-[#53565d]">
                        Member ID : #1011
                      </span>
                    </span>
                    <span className="flex items-center sm:justify-start text-sm text-[#2bd56f] font-semibold my-4 truncate w-full">
                      Active Yearly Subscriber
                    </span>
                    <span className="truncate w-[70%] font-semibold text-[#53565d]">
                      Social Security number : #1011
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white max-w-[780px] lg:mx-auto mx-4 p-5">
                <ul className="list-none pl-0">
                  <li className="mb-4 text-sm text-[#53565d] font-semibold">
                    Phone : 123-321-4567
                  </li>
                  <li className="mb-4 text-sm text-[#53565d] font-semibold">
                    Email ID : Kelli.jenner0@example.com
                  </li>
                  <li className="mb-4 text-sm text-[#53565d] font-semibold">
                    Address : 5754 Airport Rd, Coosda, AL, 36020
                  </li>
                  <li className="mb-4 flex flex-col lg:flex-row justify-between text-sm text-[#53565d] font-semibold">
                    <span>Sex : Female</span>
                    <span>DOB : 06/21/1980</span>
                  </li>
                  <li className="mb-4 text-sm text-[#53565d] font-semibold">
                    Disease : Heart Stroke
                  </li>
                </ul>
              </div>
            </div>

            <div className="my-4 pb-4 border-b-2">
              <span className="text-2xl font-bold text-gray-800 mb-4">
                Medical History
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b-2 pb-4">
              <div className="flex flex-col gap-4 my-2">
                <span className="font-semibold text-xl">
                  HSA / FSA Administrator
                </span>
                <span className="font-semibold text-xl text-[#53565d]">
                  Navia
                </span>
              </div>
              <div className="flex flex-col gap-4 my-2">
                <span className="font-semibold text-xl">
                  Family Member History
                </span>
                <span className="font-semibold text-xl text-[#53565d]">
                  Heart Stroke
                </span>
              </div>
              <div className="flex flex-col gap-4 my-2">
                <span className="font-semibold text-xl">
                  Member Certification
                </span>
                <span className="font-semibold text-xl text-[#53565d]">
                  Heart Stroke
                </span>
              </div>
            </div>

            <div className="my-7 pb-5 border-b-2">
              <span className="text-2xl font-bold text-gray-800 mb-4">
                All Documents
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 my-4 gap-6">
              {documentData.map((image, index) => (
                <div key={index} className="relative group w-full">
                  <Image
                    src={image.src}
                    alt={`doc-${index}`}
                    layout="responsive"
                    width={90}
                    height={88}
                    className="w-full"
                  />
                  <div className="absolute inset-0 gap-3 bg-black bg-opacity-50 cursor-pointer opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity duration-300">
                    <span className="text-white flex items-center justify-center w-10 h-10 bg-white rounded-md">
                      <Image
                        src={image.viewSrc}
                        alt="view"
                        height={20}
                        width={20}
                      />
                    </span>
                    <span className="text-white flex items-center justify-center w-10 h-10 bg-white rounded-md">
                      <Image
                        src={image.downloadSrc}
                        alt="download"
                        height={15}
                        width={15}
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {modalType === "delete" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg w-[90%] md:w-[60%] lg:w-[40%] shadow-lg">
              <h2 className="text-xl font-bold mb-4">
                Are you sure you want to delete this profile?
              </h2>
              <div className="flex justify-end gap-4 mt-4">
                <Button
                  className="border border-[#751A9B] text-[#751A9B] font-medium h-[40px]   rounded-md w-full md:w-[128px]"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#751A9B] text-white font-medium h-[40px]  rounded-md w-full md:w-[128px]"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {modalType === "editProfile" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg w-[90%] md:w-[80%] lg:w-[60%] shadow-lg">
              <h2 className=" flex  justify-center item-center text-3xl font-bold mb-4">
                Edit Profile
              </h2>
              <form onSubmit={handleProfileChangeSubmit}>
                <div className="space-y-6 p-4 sm:p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-4">
                    <InputField
                      onChange={handleChange}
                      name="first_name"
                      type="text"
                      id="first_name"
                      value={formdata.first_name}
                      placeholder="First Name"
                      label="Member Name"
                    />
                    <InputField
                      onChange={handleChange}
                      required={false}
                      name="middle_name"
                      placeholder="Middle Name"
                      value={formdata.middle_name}
                      id="middle_name"
                      type="text"
                    />
                    <InputField
                      onChange={handleChange}
                      required={true}
                      name="last_name"
                      type="text"
                      id="last_name"
                      value={formdata.last_name}
                      placeholder="Last Name"
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <InputField
                        type="date"
                        label="Date of Birth:"
                        className="border border-gray-300 w-full p-2 rounded-md"
                        value={formdata.dob}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <InputField
                        type="text"
                        label="Social Security Number:"
                        className="border border-gray-300 w-full p-2 rounded-md"
                        value={formdata.ssn}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col mb-4">
                      <InputField
                        type="text"
                        label="TelePhone Number:"
                        className="border border-gray-300 w-full p-2 rounded-md"
                        value={formdata.phone}
                        name="phone"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col mb-4">
                      <InputField
                        type="email"
                        label="Email:"
                        className="border border-gray-300 w-full p-2 rounded-md"
                        value={formdata.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col mb-4">
                      <InputField
                        type="text"
                        label="Address:"
                        className="border border-gray-300 w-full p-2 rounded-md"
                        value={formdata.address}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col mb-4">
                      <InputField
                        type="text"
                        label="City:"
                        className="border border-gray-300 w-full p-2 rounded-md"
                        value={formdata.city}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col mb-4">
                      <InputField
                        type="text"
                        label="State:"
                        className="border border-gray-300 w-full p-2 rounded-md"
                        value={formdata.state}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col mb-4">
                      <InputField
                        type="text"
                        label="ZIP Code:"
                        className="border border-gray-300 w-full p-2 rounded-md"
                        value={formdata.zipcode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button
                    className="border border-[#751A9B] text-[#751A9B] font-medium h-[40px] rounded-md w-full md:w-[128px]"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-[#751A9B] text-white font-medium h-[40px]  rounded-md w-full md:w-[128px]"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AuthWrapper>
    </>
  );
}

export default AdminMemberProfile;
