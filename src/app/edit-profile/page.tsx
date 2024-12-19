"use client";
import AuthWrapper from "@/components/AuthWrapper";
import InputField from "@/components/InputField";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Circles } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import CheckboxGroup from "@/components/Checkbox";
import { useSession } from "next-auth/react";
import { AiFillQuestionCircle } from "react-icons/ai";
import Signature from "@/components/Signature";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import withAuth from "@/app/auth/auth/authHOC";
import Card from "@/components/Cards";

function EditProfile() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    employer: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    dob: "",
    phone: "",
    cnic: "",
    address: "",
    address2: "",
    language: "",
    city: "",
    state: [],
    zip: "",
    email: "",
    license_details: [
      {
        number: "",
        state: "",
      },
    ],
    medical_history: {
      mhcp1: [],
      phs: [],
      fh: [],
      mhcp2: [],
      mhcp1Other: "",
      phsOther: "",
      fhOther: "",
      mhcp1AI: "",
      fhAI: "",
      phsAI: "",
      demographicsVeteran: "",
      demographicsGender: "",
      demographicsEthnicity: "",
      demographicsRace: "",
      demographicsRaceOther: "",
    },
  });

  const language = ["English", "Spanish", "English & Spanish"];

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { data: session, update }: any = useSession(); // Access session data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sign, setSign] = useState<string>("");
  const autoimmunemhcp1Ref = useRef(null);
  const autoimmunephsRef = useRef(null);
  const autoimmunefhRef = useRef(null);
  const [scrollCheck, setScrollCheck] = useState(false)
  const router = useRouter();
  const demographicsRace = [
		{ text: "American Indian Or Alaska Native" },
		{ text: "Asian" },
		{ text: "Black Or African American" },
		{ text: "Multiracial" },
		{ text: "Native Hawaiian Or Other Pacific Islander" },
		{ text: "White" },
		{ text: "Other" },
	];

	const demographicsEthnicity = [
		{ text: "Hispanic Or Latino" },
		{ text: "Not Hispanic Or Latino" },
	];

	const demographicsGender = [
		{ text: "Agender" },
		{ text: "Cisgender" },
		{ text: "Gender Fluid" },
		{ text: "Gender Non-Conforming" },
		{ text: "Genderqueer" },
		{ text: "Man/Male/Masculine" },
		{ text: "Non-Binary" },
		{ text: "Trans Or Transgender" },
		{ text: "Women/Female/Feminine" },
	];

	const demographicsVeteran = [
		{ text: "I Am A Veteran" },
		{ text: "Not A Veteran" },
	];

  const [mhcp1, setMCHP] = useState([
    { name: "Acne", value: false },
    { name: "An Autoimmune Disease", value: false },
    { name: "Anxiety", value: false },
    { name: "Arthritis", value: false },
    { name: "Asthma", value: false },
    { name: "Cancer", value: false },
    { name: "Chronic Fatigue", value: false },
    { name: "Chronic Lower Respiratory", value: false },
    { name: "Chronic Pain / Fibromyalgia", value: false },
    { name: "Dementia", value: false },
    { name: "Depression", value: false },
    { name: "Fatty Liver Disease", value: false },
    { name: "Heart Disease", value: false },
    { name: "History Of Stroke", value: false },
    { name: "Hypertension", value: false },
    { name: "Kidney Disease", value: false },
    { name: "Migraines", value: false },
    { name: "Obesity", value: false },
    { name: "Polycystic Ovarian Syndrome", value: false },
    { name: "Pre-Diabetes", value: false },
    { name: "Type 1 Diabetes", value: false },
    { name: "Type 2 Diabetes", value: false },
    { name: "Sciatica", value: false },
    { name: "Other", value: false },
  ]);

  const [fh, setFH] = useState([
    { name: "Acne", value: false },
    { name: "An Autoimmune Disease", value: false },
    { name: "Anxiety", value: false },
    { name: "Asthma", value: false },
    { name: "Arthritis", value: false },
    { name: "Cancer", value: false },
    { name: "Chronic Fatigue", value: false },
    { name: "Chronic Lower Respiratory", value: false },
    { name: "Chronic Pain/Fibromyalgia", value: false },
    { name: "Dementia", value: false },
    { name: "Depression", value: false },
    { name: "Fatty Liver Disease", value: false },
    { name: "Heart Disease", value: false },
    { name: "History Of Stroke", value: false },
    { name: "Kidney Disease", value: false },
    { name: "Migraines", value: false },
    { name: "Obesity", value: false },
    { name: "Polycystic Ovarian Syndrome", value: false },
    { name: "Pre-Diabetes", value: false },
    { name: "Type 1 Diabetes", value: false },
    { name: "Type 2 Diabetes", value: false },
    { name: "Sciatica", value: false },
    { name: "Other", value: false },
  ]);

  const [phs, setPHS] = useState([
    { name: "An Autoimmune Disease", value: false },
    { name: "Asthma", value: false },
    { name: "Cancer", value: false },
    { name: "Chronic Lower Respiratory", value: false },
    { name: "Dementia", value: false },
    { name: "Depression", value: false },
    { name: "Fatty Liver Disease", value: false },
    { name: "Heart Disease", value: false },
    { name: "Kidney Disease", value: false },
    { name: "Migraines", value: false },
    { name: "Obesity", value: false },
    { name: "Stroke", value: false },
    { name: "Type 1 Diabetes", value: false },
    { name: "Type 2 Diabetes", value: false },
    { name: "Sciatica", value: false },
    { name: "Other", value: false },
  ]);

  const [mhcp2, setMCHP2] = useState([
    { name: "All Of The Above", value: false },
    { name: "High Blood Presseure", value: false },
    { name: "High Cholesterol", value: false },
    { name: "High Fasting Glucose", value: false },
  ]);

  useEffect(() => {
    if (scrollCheck) {
      setScrollCheck(false)
      if (mhcp1[1]?.value) {
        const element = document.getElementById("autoimmunemhcp1Ref");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  }, [mhcp1[1]?.value]);

  useEffect(() => {
    if (scrollCheck) {
      setScrollCheck(false)
      if (phs[0]?.value) {
        const element = document.getElementById("autoimmunephsRef");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  }, [phs[0]?.value]);

  useEffect(() => {
    if (scrollCheck) {
      setScrollCheck(false)
      if (fh[1]?.value) {
        const element = document.getElementById("autoimmunefhRef");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  }, [fh[1]?.value]);

  const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData(prevState => ({
			...prevState,
			medical_history: {
				...prevState.medical_history,
				[name]: value,
			}
		}));
	};

  useEffect(() => {
    const names = phs.filter((item) => item.value).map((item) => item.name);

    setFormData((prevState: any) => ({
      ...prevState,
      medical_history: {
        mhcp1: prevState?.medical_history?.mhcp1,
        fh: prevState?.medical_history?.fh,
        phs: names,
        mhcp2: prevState?.medical_history?.mhcp2,
        mhcp1AI: prevState?.medical_history?.mhcp1AI,
        mhcp1Other: prevState?.medical_history?.mhcp1Other,
        fhAI: prevState?.medical_history?.fhAI,
        fhOther: prevState?.medical_history?.fhOther,
        phsAI: prevState?.medical_history?.phsAI,
        phsOther: prevState?.medical_history?.phsOther,
        demographicsVeteran: prevState?.medical_history?.demographicsVeteran,
        demographicsGender: prevState?.medical_history?.demographicsGender,
        demographicsEthnicity: prevState?.medical_history?.demographicsEthnicity,
        demographicsRace: prevState?.medical_history?.demographicsRace,
        demographicsRaceOther: prevState?.medical_history?.demographicsRaceOther,
      },
    }));
  }, [phs]);

  useEffect(() => {
    const names = fh.filter((item) => item.value).map((item) => item.name);

    setFormData((prevState: any) => ({
      ...prevState,
      medical_history: {
        mhcp1: prevState?.medical_history?.mhcp1,
        fh: names,
        phs: prevState?.medical_history?.phs,
        mhcp2: prevState?.medical_history?.mhcp2,
        mhcp1AI: prevState?.medical_history?.mhcp1AI,
        mhcp1Other: prevState?.medical_history?.mhcp1Other,
        fhAI: prevState?.medical_history?.fhAI,
        fhOther: prevState?.medical_history?.fhOther,
        phsAI: prevState?.medical_history?.phsAI,
        phsOther: prevState?.medical_history?.phsOther,
        demographicsVeteran: prevState?.medical_history?.demographicsVeteran,
        demographicsGender: prevState?.medical_history?.demographicsGender,
        demographicsEthnicity: prevState?.medical_history?.demographicsEthnicity,
        demographicsRace: prevState?.medical_history?.demographicsRace,
        demographicsRaceOther: prevState?.medical_history?.demographicsRaceOther,
      },
    }));
  }, [fh]);

  useEffect(() => {
    const names = mhcp1.filter((item) => item.value).map((item) => item.name);

    setFormData((prevState: any) => ({
      ...prevState,
      medical_history: {
        mhcp1: names,
        fh: prevState?.medical_history?.fh,
        phs: prevState?.medical_history?.phs,
        mhcp2: prevState?.medical_history?.mhcp2,
        mhcp1AI: prevState?.medical_history?.mhcp1AI,
        mhcp1Other: prevState?.medical_history?.mhcp1Other,
        fhAI: prevState?.medical_history?.fhAI,
        fhOther: prevState?.medical_history?.fhOther,
        phsAI: prevState?.medical_history?.phsAI,
        phsOther: prevState?.medical_history?.phsOther,
        demographicsVeteran: prevState?.medical_history?.demographicsVeteran,
        demographicsGender: prevState?.medical_history?.demographicsGender,
        demographicsEthnicity: prevState?.medical_history?.demographicsEthnicity,
        demographicsRace: prevState?.medical_history?.demographicsRace,
        demographicsRaceOther: prevState?.medical_history?.demographicsRaceOther,
      },
    }));
  }, [mhcp1]);

  const callBackSignature = async (image: any) => {
    setIsModalOpen(false);
    setSign(image);
  };

  useEffect(() => {
    const names = mhcp2.filter((item) => item.value).map((item) => item.name);

    setFormData((prevState: any) => ({
      ...prevState,
      medical_history: {
        mhcp1: prevState?.medical_history?.mhcp1,
        fh: prevState?.medical_history?.fh,
        phs: prevState?.medical_history?.phs,
        mhcp2: names,
        mhcp1AI: prevState?.medical_history?.mhcp1AI,
        mhcp1Other: prevState?.medical_history?.mhcp1Other,
        fhAI: prevState?.medical_history?.fhAI,
        fhOther: prevState?.medical_history?.fhOther,
        phsAI: prevState?.medical_history?.phsAI,
        phsOther: prevState?.medical_history?.phsOther,
        demographicsVeteran: prevState?.medical_history?.demographicsVeteran,
        demographicsGender: prevState?.medical_history?.demographicsGender,
        demographicsEthnicity: prevState?.medical_history?.demographicsEthnicity,
        demographicsRace: prevState?.medical_history?.demographicsRace,
        demographicsRaceOther: prevState?.medical_history?.demographicsRaceOther,
      },
    }));
  }, [mhcp2]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    groupName: string
  ) => {
    const { name, checked } = event.target;
    setScrollCheck(true)
    if (groupName === "group1") {
      setPHS((prevState) =>
        prevState.map((item) =>
          item.name === name ? { ...item, value: checked } : item
        )
      );
    } else if (groupName === "group2") {
      setMCHP2((prevState) =>
        prevState.map((item) =>
          item.name === name ? { ...item, value: checked } : item
        )
      );
    } else if (groupName === "groupFh") {
      setFH((prevState) =>
        prevState.map((item) =>
          item.name === name ? { ...item, value: checked } : item
        )
      );
    } else {
      setMCHP((prevState) =>
        prevState.map((item) =>
          item.name === name ? { ...item, value: checked } : item
        )
      );
    }
  };

  const handleChange = (event: any) => {
    const { name, value, options, type } = event.target;

    if (type === "select-multiple") {
      const selectedStates: string[] = [];
      for (const option of options) {
        if (option.selected) {
          selectedStates.push(option.value);
        }
      }
      setFormData((prevData) => ({ ...prevData, [name]: selectedStates }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (sign == "") {
      toast.error("Please draw your signatures to proceed!");
      setLoading(false);
      return;
    }
    const token = session.token;

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key == "medical_history")
          formDataToSend.append(key, JSON.stringify(value));
        else formDataToSend.append(key, value as string);
      });
      formDataToSend.append("signature", sign);
      if (selectedImage) {
        formDataToSend.append("avatar", selectedImage); // Append the image file
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/profile-update`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
          },
        }
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        localStorage.setItem("avatar", response.data.result.avatar);
        await update({ ...session, user: response.data.result });
        router.push("/profile");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return; // Early return if session is not available
    const fetchData = async () => {
      const token = session.token; // Access token from user object
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let data = response.data.result.info;
        setSign(data.signature);
        // if (data.avatar) {
        setImagePreview(data.avatar);
        // }
        setFormData({
          employer: data.employer === "null" ? "" : data.employer,
          first_name: data.first_name,
          middle_name: data.middle_name,
          last_name: data.last_name,
          dob: data.dob,
          phone: data.phone,
          cnic: data.cnic,
          address: data.address,
          address2: data.address2,
          city: data.city,
          state: data.state,
          language: data.language,
          zip: data.zip,
          email: data.email,
          license_details: data.license_details,
          medical_history: {
            mhcp1: data?.medical_history?.mhcp1,
            fh: data?.medical_history?.fh,
            phs: data?.medical_history?.phs,
            mhcp2: data?.medical_history?.mhcp2,
            mhcp1Other: data?.medical_history?.mhcp1Other,
            phsOther: data?.medical_history?.phsOther,
            fhOther: data?.medical_history?.fhOther,
            mhcp1AI: data?.medical_history?.mhcp1AI,
            fhAI: data?.medical_history?.fhAI,
            phsAI: data?.medical_history?.phsAI,
            demographicsVeteran: data?.medical_history?.demographicsVeteran,
            demographicsGender: data?.medical_history?.demographicsGender,
            demographicsEthnicity: data?.medical_history?.demographicsEthnicity,
            demographicsRace: data?.medical_history?.demographicsRace,
            demographicsRaceOther: data?.medical_history?.demographicsRaceOther,
          },
        });
        const phsArray = data.medical_history.phs; // Assume this is the array you're checking against
        const updatedPHS = phs.map((element) => ({
          ...element,
          value: phsArray.includes(element.name),
        }));
        setPHS(updatedPHS);
        const fhArray = data.medical_history.fh; // Assume this is the array you're checking against
        const updatedFh = fh.map((element) => ({
          ...element,
          value: fhArray.includes(element.name),
        }));
        setFH(updatedFh);

        const mhcp1Array = data.medical_history.mhcp1; // Assume this is the array you're checking against
        const updatedMHCP1 = mhcp1.map((element) => ({
          ...element,
          value: mhcp1Array.includes(element.name),
        }));
        setMCHP(updatedMHCP1);

        const mhcp2Array = data.medical_history.mhcp2; // Assume this is the array you're checking against
        const updatedMHCP2 = mhcp2.map((element) => ({
          ...element,
          value: mhcp2Array.includes(element.name),
        }));
        setMCHP2(updatedMHCP2);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session]);

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
    "Wyoming",
  ];

  const handleChangeOther = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevState: any) => ({
      ...prevState,
      medical_history: {
        ...prevState.medical_history,
        [name]: value,
      },
    }));
  };

  return (
    <>
      <AuthWrapper>
        <Circles
          height="80"
          width="80"
          color="#491161"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass="loading-spinner-overlay"
          visible={loading}
        />
        <div className="mx-3 lg:mx-10">
          <div className="my-5">
            <span className="text-[28px] font-bold">Edit Profile</span>
          </div>
          <div className="shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] p-5 rounded-[22px] mb-5">
            <form className="" onSubmit={handleSubmit}>
              <div className="relative flex justify-center">
                {!(
                  imagePreview == "" ||
                  imagePreview == null ||
                  imagePreview == undefined
                ) ? (
                  <span>
                    <img
                      className="object-cover h-[150px] w-[150px] rounded-full border"
                      src={
                        imagePreview.startsWith("blob:") ||
                          imagePreview.startsWith("data:")
                          ? imagePreview
                          : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${imagePreview}`
                      }
                      alt={"imagePreview"}
                    />
                  </span>
                ) : (
                  <Image
                    src="/myImages/Avatar pixel.png"
                    alt="img"
                    className="object-cover h-[150px] w-[150px] rounded-full"
                    height={150}
                    width={150}
                  />
                )}
                <label className="absolute bottom-0 ml-[100px] mb-[8px] cursor-pointer">
                  <Image
                    src="/myImages/selectImg.png"
                    alt="img"
                    className="object-cover h-[32px] w-[32px]"
                    height={32}
                    width={32}
                  />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="md:grid-cols-3 gap-4 items-end">
                <InputField
                  onChange={handleChange}
                  required={false}
                  type="text"
                  id="employer"
                  name="employer"
                  value={formData.employer}
                  label="Employer (if HSA / FSA provided by employer)"
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  items-end gap-4">
                  <InputField
                    type="text"
                    id="firstName"
                    name="first_name"
                    label="Member Name"
                    placeholder="First Name"
                    required={true}
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    name="middle_name"
                    placeholder="Middle name"
                    value={formData.middle_name}
                    required={false}
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    name="last_name"
                    placeholder="Last name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  id="dateOfBirth"
                  name="dob"
                  placeholder="MM/DD/YYYY"
                  label="Date of Birth"
                  value={formData.dob}
                  type="date"
                  onChange={handleChange}
                  required={true}
                />
                <InputField
                  type="text"
                  name="cnic"
                  label="Social Security Number"
                  placeholder="Social Security Number"
                  value={formData.cnic}
                  onChange={handleChange}
                />

                <InputField
                  type="text"
                  name="phone"
                  label="Day Telephone Number"
                  placeholder="Type your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required={true}
                />
                <InputField
                  type="email"
                  name="email"
                  label="Email Address"
                  placeholder="Type your email"
                  value={formData.email}
                  onChange={handleChange}
                  required={true}
                />

                <InputField
                  type="text"
                  name="address"
                  label="Address"
                  placeholder="Type your residential address"
                  value={formData.address}
                  onChange={handleChange}
                  required={true}
                />
                <InputField
                  type="text"
                  name="address2"
                  label="Address 2"
                  placeholder="Type your residential address"
                  value={formData.address2}
                  onChange={handleChange}
                  required={true}
                />
                <InputField
                  type="text"
                  name="city"
                  placeholder="Type your city"
                  label="City"
                  value={formData.city}
                  onChange={handleChange}
                  required={true}
                />
                <div className="w-full">
                  <label className="block mb-2 text-xl font-semibold">
                    State
                  </label>
                  <div className="mt-[12px]">
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
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
                <InputField
                  type="text"
                  name="zip"
                  label="Zip Code"
                  placeholder="Type your zip code"
                  value={formData.zip}
                  onChange={handleChange}
                  required={true}
                />
                <div className="w-full relative">
                  <div className="absolute right-0 top-5 group">
                    <AiFillQuestionCircle />
                    <div className="absolute right-0 mt-2 hidden group-hover:flex bg-gray-700 text-white text-xs rounded-lg px-2 py-1 w-28">
                      Select language so that we can link you with a provider that
                      speaks the same language
                    </div>
                  </div>

                  <label className="block mb-2 text-xl font-semibold">
                    Language
                  </label>
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
              </div>

              <hr className="my-4 border-gray-300" />
									<div className="mt-8 relative w-full">
										<p className="text-center text-gray-600 mb-2">Demographics</p>
										<h3 className="text-lg font-bold text-center mb-3 flex items-center justify-center space-x-2">
											<span>Race</span>
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											{demographicsRace.map((card: any, index: any) => (
												<Card
													key={index}
													name="demographicsRace"
													text={card.text}
													showIcon={false}
													onChange={handleRadio}
													checked={formData.medical_history.demographicsRace === card.text}
												/>
											))}
										</div>
										<div className="mt-4">

											{formData.medical_history.demographicsRace === "Other" &&
												<InputField
													onChange={handleChangeOther}
													required={true}
													type="text"
													name="demographicsRaceOther"
													placeholder="Other"
													label="Describe"
													value={formData.medical_history.demographicsRaceOther}
												/>
											}
										</div>
										<h3 className="text-lg mt-10 font-bold text-center mb-3 flex items-center justify-center space-x-2">
											<span>Ethnicity</span>
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											{demographicsEthnicity.map((card: any, index: any) => (
												<Card
													key={index}
													name="demographicsEthnicity"
													text={card.text}
													showIcon={false}
													onChange={handleRadio}
													checked={formData.medical_history.demographicsEthnicity === card.text}
												/>
											))}
										</div>
										<h3 className="text-lg mt-10 font-bold text-center mb-3 flex items-center justify-center space-x-2">
											<span>Gender</span>
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											{demographicsGender.map((card: any, index: any) => (
												<Card
													key={index}
													text={card.text}
													name="demographicsGender"
													onChange={handleRadio}
													showIcon={false}
													checked={formData.medical_history.demographicsGender === card.text}
												/>
											))}
										</div>
										<h3 className="text-lg mt-10 font-bold text-center mb-3 flex items-center justify-center space-x-2">
											<span>Veteran</span>
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											{demographicsVeteran.map((card: any, index: any) => (
												<Card
													key={index}
													name="demographicsVeteran"
													text={card.text}
													onChange={handleRadio}
													showIcon={false}
													checked={formData.medical_history.demographicsVeteran === card.text}
												/>
											))}
										</div>
									</div>
              <hr className="mt-5" />

              <div className="flex flex-col justify-center">
                <span className="text-xl text-FF1F9D text-center font-bold">
                  Medical History
                </span>
                <span className="text-center font-bold my-3 text-[28px]">
                  Have you been diagnosed with or experienced any of the
                  following conditions?
                </span>
                <span className="text-sm text-center mt-0 font-bold">
                  (Select all applicable)
                </span>
              </div>
              <CheckboxGroup
                checkboxes={mhcp1}
                onChange={handleCheckboxChange}
                groupName="group"
              />
              {mhcp1[mhcp1.length - 1]?.value && (
                <InputField
                  onChange={handleChangeOther}
                  required={true}
                  type="text"
                  name="mhcp1Other"
                  placeholder="Other"
                  label="Describe"
                  value={formData.medical_history.mhcp1Other}
                />
              )}
              {mhcp1[1]?.value && (
                <div ref={autoimmunemhcp1Ref} id="autoimmunemhcp1Ref">
                  <InputField
                    onChange={handleChangeOther}
                    required={true}
                    type="text"
                    name="mhcp1AI"
                    placeholder="Autoimmune description"
                    label="Autoimmune Description"
                    value={formData.medical_history.mhcp1AI}
                  />
                </div>
              )}
              <hr />
              <div className="text-xl text-FF1F9D text-center font-bold">
                Preventive Health Selection{" "}
              </div>
              <div className="text-center font-bold my-3 text-[28px]">
                Are you focused on preventing any of the following conditions?
              </div>
              <CheckboxGroup
                checkboxes={phs}
                onChange={handleCheckboxChange}
                groupName="group1"
              />
              {phs[phs.length - 1]?.value && (
                <InputField
                  onChange={handleChangeOther}
                  required={true}
                  type="text"
                  name="phsOther"
                  placeholder="Other"
                  label="Describe"
                  value={formData.medical_history.phsOther}
                />
              )}
              {phs[0]?.value && (
                <div ref={autoimmunephsRef} id="autoimmunephsRef">
                  <InputField
                    onChange={handleChangeOther}
                    required={true}
                    type="text"
                    name="phsAI"
                    placeholder="Autoimmune description"
                    label="Autoimmune Description"
                    value={formData.medical_history.phsAI}
                  />
                </div>
              )}
              <hr />
              <div className="flex flex-col justify-center">
                <div className="text-xl text-FF1F9D text-center font-bold">
                  Family History
                </div>
                <div className="text-center font-bold my-3 text-[28px]">
                  Do you have family members with any of the following
                  conditions?
                </div>
              </div>
              <CheckboxGroup
                checkboxes={fh}
                onChange={handleCheckboxChange}
                groupName="groupFh"
              />
              {fh[fh.length - 1]?.value && (
                <InputField
                  onChange={handleChangeOther}
                  required={true}
                  type="text"
                  name="fhOther"
                  placeholder="Other"
                  label="Describe"
                  value={formData.medical_history.fhOther}
                />
              )}
              {fh[1]?.value && (
                <div ref={autoimmunefhRef} id="autoimmunefhRef">
                  <InputField
                    onChange={handleChangeOther}
                    required={true}
                    type="text"
                    name="fhAI"
                    placeholder="Autoimmune description"
                    label="Autoimmune Description"
                    value={formData.medical_history.fhAI}
                  />
                </div>
              )}
              <hr />

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
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-[48px]">
                <button
                  type="submit"
                  className="h-[48px] text-center bg-751A9B text-white rounded-lg text-base font-semibold cursor-pointer hover:bg-purple-700 w-full sm:w-[161px]"
                >
                  Save Changes
                </button>
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
            </form>
          </div>
        </div>
      </AuthWrapper>
    </>
  );
}
export default withAuth(EditProfile,['Member']);
