"use client";
import Banner from "@/components/Banner/page";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import InputField from "@/components/InputField";
import NavbarOther from "@/components/NavbarOther/page";
import Signature from "@/components/Signature";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillQuestionCircle } from "react-icons/ai";
import { Circles } from "react-loader-spinner";
import withAuth from "../auth/authHOC";

function SignUp() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession(); // Access session data
  const [sign, setSign] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const paramNetwork = searchParams?.get('n') || "";

  const [formData, setFormData] = useState({
    network: paramNetwork || "",
    first_name: "",
    middle_name: "",
    last_name: "",
    dob: "",
    phone: "",
    license_details: [
      {
        number: "",
        state: "",
      },
    ],
    address: "",
    city: "",
    zip: "",
    role: "Provider",
    language: "",
    email: "",
    password: "",
    confirmPassword: "",
    medical_history: {},
    state: "N/A",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const callBackSignature = async (image: any) => {
    setIsModalOpen(false);
    setSign(image);
  };

  const handleLicenseChange = (e: any, index: number, field: string) => {
    const newLicenseDetails: any = [...formData.license_details];
    newLicenseDetails[index][field] = e.target.value;
    setFormData({ ...formData, license_details: newLicenseDetails });
  };

  const addLicenseRow = () => {
    setFormData({
      ...formData,
      license_details: [...formData.license_details, { number: "", state: "" }],
    });
  };

  const removeLicenseRow = (index: number) => {
    const updatedLicenseDetails = formData.license_details.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, license_details: updatedLicenseDetails });
  };

  const language = ["English", "Spanish" ,  "English & Spanish" ];

  useEffect(() => {
    if (status === "authenticated" && session) {
      if (session.user?.role === "Member") {
        router.push('/overview');
      } else {
        if (session.user?.role === "Admin") {
          router.push('/admin/overview');
        }
        else {
          router.push('/provider-dashboard');
        }
      }
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password do not match!");
      setIsSubmitting(false);
      return;
    }
  
    if (!sign) {
      toast.error("Please draw a signature to submit!");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const formDataToSend = new FormData();
  
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "license_details") {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value as string);
        }
      });
      formDataToSend.append("signature", sign);
  
      // Send the form data including the `n` parameter
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/signup`,
        formDataToSend
      );
  
      if (response.status === 200) {
        router.push("/auth/login");
      }
      toast.success("Created Successfully!");
      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        dob: "",
        language: "",
        phone: "",
        license_details: [
          {
            number: "",
            state: "",
          },
        ],
        address: "",
        city: "",
        zip: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Provider",
        medical_history: {},
        state: "N/A",
        network: paramNetwork || "", // Reset the `n` parameter in the form
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ];

  return (
    <>
      <Circles
        height="80"
        width="80"
        color="#491161 "
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass="loading-spinner-overlay"
        visible={isSubmitting}
      />
      <NavbarOther />
      <Banner title="Sign up" />
      <div className="text-center mt-[80px]">
        <span className="text-[40px] font-bold">Create Provider Account</span>
      </div>
      <div className="bg-white rounded-[22px] shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] max-w-[85%] mx-auto my-[80px] px-[32px] py-[32px]">
        <div className="flex flex-col justify-center">
          <span className="text-xl text-FF1F9D text-center font-bold">
            Medical Practitioner
          </span>
          <span className="text-center font-bold text-[28px]">
            Please fill the form
          </span>
        </div>
        <form className="my-10 space-y-6" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <InputField
                type="text"
                id="firstName"
                name="first_name"
                label="Provider Name"
                placeholder="First Name"
                required={true}
                value={formData.first_name}
                onChange={handleChange}
                className="w-full h-[50px] text-sm font-normal px-4 text-gray-500 outline-none border border-gray-300 rounded-lg"
              />
              <InputField
                type="text"
                name="middle_name"
                placeholder="Middle Name"
                value={formData.middle_name}
                required={false}
                onChange={handleChange}
                className="w-full h-[50px] text-sm font-normal px-4 text-gray-500 outline-none border border-gray-300 rounded-lg"
              />
              <InputField
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required={true}
                className="w-full h-[50px] text-sm font-normal px-4 text-gray-500 outline-none border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              id="dateOfBirth"
              name="dob"
              label="Date of Birth"
              placeholder="MM/DD/YYYY"
              value={formData.dob}
              type="date"
              onChange={handleChange}
              required={true}
              className="w-full h-[50px] text-sm font-normal px-4 text-gray-500 outline-none border border-gray-300 rounded-lg"
            />

            <InputField
              type="number"
              name="phone"
              label="Telephone Number"
              placeholder="Type your phone number"
              value={formData.phone}
              onChange={handleChange}
              required={true}
              className="w-full h-[50px] text-sm font-normal px-4 text-gray-500 outline-none border border-gray-300 rounded-lg"
            />

            <InputField
              type="email"
              name="email"
              label="Email Address"
              placeholder="Type your email"
              value={formData.email}
              onChange={handleChange}
              required={true}
              className="w-full h-[50px] text-sm font-normal px-4 text-gray-500 outline-none border border-gray-300 rounded-lg"
            />

            <InputField
              type="text"
              name="address"
              label="Address"
              placeholder="Type your residential address"
              value={formData.address}
              onChange={handleChange}
              required={true}
              className="w-full h-[50px] text-sm font-normal px-4 text-gray-500 outline-none border border-gray-300 rounded-lg"
            />

            <InputField
              type="text"
              name="city"
              label="City"
              placeholder="Type your city"
              value={formData.city}
              onChange={handleChange}
              required={true}
              className="w-full h-[50px] text-sm font-normal px-4 text-gray-500 outline-none border border-gray-300 rounded-lg"
            />

            <InputField
              type="text"
              name="zip"
              label="Zip code"
              placeholder="Type your zip code"
              value={formData.zip}
              onChange={handleChange}
              required={true}
              className="w-full h-[50px] text-sm font-normal px-4 text-gray-500 outline-none border border-gray-300 rounded-lg"
            />

            <InputField
              type="password"
              name="password"
              label="Password"
              placeholder="Type your password"
              value={formData.password}
              onChange={handleChange}
              required={true}
              className="w-full h-[50px] text-sm font-normal px-4 text-gray-500 outline-none border border-gray-300 rounded-lg"
            />

            <InputField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required={true}
              className="w-full h-[50px] text-sm font-normal px-4 text-gray-500 outline-none border border-gray-300 rounded-lg"
            />
          </div>
          <div className="w-full relative">
            <div className="absolute right-0 top-5 group">
              <AiFillQuestionCircle />
              <div className="absolute right-0 mt-2 hidden group-hover:flex bg-gray-700 text-white text-xs rounded-lg px-2 py-1 w-28">
                Select language so that we can link you with a provider that
                speaks the same language
              </div>
            </div>

            <label className="block mb-2 text-xl font-semibold">Language</label>
            <div className="mt-[12px]">
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="mt-1 h-[48px] block w-full border-[#cccccc] rounded-md shadow-sm focus:border-FF1F9D focus:ring focus:ring-FF1F9D focus:ring-opacity-50"
              >
                <option value="">Select Language</option>
                {language.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {formData.license_details.map((license, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center relative"
              >
                <InputField
                  type="text"
                  name={`licenseNumber-${index}`}
                  label="License Number"
                  placeholder="License Number"
                  value={license.number}
                  required={true}
                  onChange={(e) => handleLicenseChange(e, index, "number")}
                  className="w-full h-[50px] text-sm font-normal px-4 text-gray-500 outline-none border border-gray-300 rounded-lg"
                />
                <div className="w-full mb-4">
                  <label className="block text-xl font-semibold">
                    State
                  </label>
                  <div className="">
                    <select
                      name="state"
                      value={license.state}
                      onChange={(e) => handleLicenseChange(e, index, "state")}
                      required
                      className="mt-1 h-[48px] block w-full border-[#cccccc] rounded-md shadow-sm focus:border-FF1F9D focus:ring focus:ring-FF1F9D focus:ring-opacity-50"
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {formData.license_details.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLicenseRow(index)}
                    className="h-[25px] w-[25px] text-white bg-red-500 rounded-lg absolute top-[38px] right-[-29px]"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={addLicenseRow}
                className="w-[50px] h-[50px] text-white bg-green-500 rounded-lg"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center lg:justify-between md:justify-between">
            <div className="text-sm mb-2 sm:mb-0 sm:mr-4 text-center sm:text-left">
              <span className="font-semibold">Signature:</span>
              {!(sign == "" || sign == null || sign == undefined) ? (
                <span>
                  <img src={sign} alt={"Signature"} />
                </span>
              ) : null}
            </div>
            <div>
              <Button
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                }}
                className="bg-[#751A9B] text-white h-12 font-semibold hover:bg-purple-700 text-sm w-44 py-2 px-4 rounded-md"
              >
                Draw Signature
              </Button>
            </div>
          </div>
          <div className="flex justify-center pt-[48px]">
            <button
              type="submit"
              className="max-w-[60%] h-[50px] text-center bg-751A9B text-white rounded-lg text-base font-semibold cursor-pointer hover:bg-purple-700 mx-auto w-full sm:w-full"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 relative">
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Signature callbackFunction={callBackSignature} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
const SignUpPage: React.FC = () => (
	<Suspense fallback={<div>Loading...</div>}>
		<SignUp />
	</Suspense>
);

export default SignUpPage;
