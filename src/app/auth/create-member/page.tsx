"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InputField from "@/components/InputField";
import NavbarOther from "@/components/NavbarOther/page";
import Banner from "@/components/Banner/page";
import CheckboxGroup from "@/components/Checkbox";
import Signature from "@/components/Signature";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { Circles } from "react-loader-spinner";
import Button from "@/components/Button";

const CreateAccountForm: React.FC = () => {

  const router = useRouter(); // Initialize useNavigate
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const id: any = searchParams?.get('id') || '';
  const { data: session, status } = useSession(); // Access session data
  const autoimmunemhcp1Ref = useRef(null);
  const autoimmunephsRef = useRef(null);
  const [sign, setSign] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const autoimmunefhRef = useRef(null);

  const [formData, setFormData] = useState({
    employer: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    dob: "",
    cnic: "",
    phone: "",
    email: "",
    address: "",
    address2: "",
    language: "",
    city: "",
    state: "",
    role: "Member",
    zip: "",
    password: "",
    confirmPassword: "",
    referred_by: '',
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
    },
  });

  const callBackSignature = async (image: any) => {
    setIsModalOpen(false);
    setSign(image);
  };


  useEffect(() => {
    console.log(formData)
  }, [formData])

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

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    required: "",
  });

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
    if (mhcp1[1]?.value) {
      const element = document.getElementById("autoimmunemhcp1Ref");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [mhcp1[1]?.value]);

  useEffect(() => {
    if (phs[0]?.value) {
      const element = document.getElementById("autoimmunephsRef");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [phs[0]?.value]);

  useEffect(() => {
    if (fh[1]?.value) {
      const element = document.getElementById("autoimmunefhRef");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [fh[1]?.value]);

  const language = [
    "English", "Spanish", "English & Spanish"
  ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const names = phs.filter(item => item.value).map(item => item.name);

    setFormData((prevState: any) => ({
      ...prevState,
      medical_history: {
        mhcp1: prevState.medical_history.mhcp1,
        fh: prevState.medical_history.fh,
        phs: names,
        mhcp2: prevState.medical_history.mhcp2,
        mhcp1Other: prevState?.medical_history?.mhcp1Other,
        phsOther: prevState?.medical_history?.phsOther,
        fhOther: prevState?.medical_history?.fhOther,
      },
    }));

  }, [phs]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      referred_by: id,
    }));
  }, [id])

  useEffect(() => {
    const names = fh.filter(item => item.value).map(item => item.name);

    setFormData((prevState: any) => ({
      ...prevState,
      medical_history: {
        mhcp1: prevState.medical_history.mhcp1,
        fh: names,
        phs: prevState.medical_history.phs,
        mhcp2: prevState.medical_history.mhcp2,
        mhcp1Other: prevState?.medical_history?.mhcp1Other,
        phsOther: prevState?.medical_history?.phsOther,
        fhOther: prevState?.medical_history?.fhOther,
      },
    }));

  }, [phs])

  useEffect(() => {
    const names = mhcp1.filter(item => item.value).map(item => item.name);

    setFormData((prevState: any) => ({
      ...prevState,
      medical_history: {
        mhcp1: names,
        fh: prevState.medical_history.fh,
        phs: prevState.medical_history.phs,
        mhcp2: prevState.medical_history.mhcp2,
        mhcp1Other: prevState?.medical_history?.mhcp1Other,
        phsOther: prevState?.medical_history?.phsOther,
        fhOther: prevState?.medical_history?.fhOther,
      },
    }));

  }, [mhcp1]);

  useEffect(() => {
    const names = mhcp2.filter(item => item.value).map(item => item.name);

    setFormData((prevState: any) => ({
      ...prevState,
      medical_history: {
        mhcp1: prevState.medical_history.mhcp1,
        fh: prevState.medical_history.fh,
        phs: prevState.medical_history.phs,
        mhcp2: names,
        mhcp1Other: prevState?.medical_history?.mhcp1Other,
        phsOther: prevState?.medical_history?.phsOther,
        fhOther: prevState?.medical_history?.fhOther,
      },
    }));

  }, [mhcp2])

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    groupName: string
  ) => {
    const { name, checked } = event.target;
    if (groupName === "groupPHS") {
      setPHS((prevState) =>
        prevState.map((item) =>
          item.name === name ? { ...item, value: checked } : item
        )
      );
    } else if (groupName === "groupMHCP2") {
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

  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      required: "",
    };

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      console.log(formData)
      if (formData.password !== formData.confirmPassword) {
        toast.error("Password and Confirm Password does not match!");
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
          {
            formDataToSend.append(key, value as string);
          }
        });
        formDataToSend.append("signature", sign);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/signup`,
          formDataToSend
        );
        if (response.status === 200) {
          router.push("/auth/login");
          toast.success("Created Successfully!");
        }
      } catch (error: any) {
        toast.error(error.response.data.message)
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChangeOther = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevState: any) => ({
      ...prevState,
      medical_history: {
        ...prevState.medical_history,
        [name]: value,
      },
    }));
  }

  return (
    <div>
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
      <Banner title="Create an account" />
      <div className="text-center mt-[80px]">
        <span className="text-[40px] font-bold">Create Member Account</span>
      </div>
      <div className="bg-white rounded-[22px] shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] max-w-[85%] mx-auto my-[80px] px-[32px] py-[32px]">
        <div className="flex flex-col justify-center">
          <span className="text-xl text-FF1F9D text-center font-bold">
            Member Information
          </span>
          <span className="text-center font-bold text-[28px]">
            Please fill the form
          </span>
        </div>
        <form onSubmit={handleSubmit} className="my-10 space-y-6">
          <InputField
            type="text"
            id="employer"
            name="employer"
            required={false}
            value={formData.employer}
            onChange={handleChange}
            label="Employer (if HSA / FSA provided by employer)"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 items-end gap-4">
            <InputField
              name="first_name"
              type="text"
              required={true}
              placeholder="First name"
              value={formData.first_name}
              onChange={handleChange}
              label="Member Name"
            />
            <InputField
              name="middle_name"
              placeholder="Middle name"
              value={formData.middle_name}
              required={false}
              onChange={handleChange}
              type="text"
            />
            <InputField
              name="last_name"
              type="text"
              required={true}
              placeholder="Last name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              id="dob"
              name="dob"
              type="date"
              placeholder="MM/DD/YYYY"
              required={true}
              label="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
            />
            <InputField
              id="cnic"
              name="cnic"
              required={false}
              placeholder="Type your social security number"
              label="Social Security Number"
              value={formData.cnic}
              onChange={handleChange}
            />
            <InputField
              id="phone"
              name="phone"
              required={true}
              label="Day Telephone Number"
              placeholder="Type your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            <InputField
              id="email"
              name="email"
              required={true}
              type="email"
              placeholder="Type your email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
            <InputField
              id="address"
              name="address"
              placeholder="Type your residential address"
              label="Address"
              required={true}
              value={formData.address}
              onChange={handleChange}
            />
            <InputField
              id="address2"
              name="address2"
              placeholder="Type your residential address"
              label="Address 2"
              required={true}
              value={formData.address2}
              onChange={handleChange}
            />
            <InputField
              id="city"
              name="city"
              required={true}
              placeholder="Type your city"
              label="City"
              value={formData.city}
              onChange={handleChange}
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
                  className="mt-1 h-[48px] block w-full border-[#cccccc]  rounded-md shadow-sm focus:border-FF1F9D focus:ring focus:ring-FF1F9D focus:ring-opacity-50"
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
            <InputField
              id="zip"
              name="zip"
              required={true}
              label="ZipCode"
              placeholder="Type your zip code"
              value={formData.zip}
              onChange={handleChange}
            />
            <InputField
              id="password"
              name="password"
              type="password"
              required={true}
              label="Password"
              placeholder="Type your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
            <InputField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required={true}
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword}
              </span>
            )}
            <div className="w-full relative">
              <div className="absolute right-0 top-5 group">
                <AiFillQuestionCircle />
                <div className="absolute right-0 mt-2 hidden group-hover:flex bg-gray-700 text-white text-xs rounded-lg px-2 py-1 w-28">
                  Select language so that we can link you with a provider that speaks the same language
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
                  {language.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <hr />
          <div className="flex flex-col justify-center">
            <span className="text-xl text-FF1F9D text-center font-bold">
              Medical History
            </span>
            <span className="text-center font-bold my-3 text-[28px]">
              Have you been diagnosed with or experienced any of the following
              conditions?
            </span>
            <span className="text-sm text-center mt-0 font-bold">
              (Select all applicable)
            </span>
          </div>
          <CheckboxGroup
            checkboxes={mhcp1}
            onChange={handleCheckboxChange}
            groupName="groupMHCP1"
          />
          {mhcp1[mhcp1.length - 1].value &&
            <InputField
              onChange={handleChangeOther}
              required={true}
              type="text"
              name="mhcp1Other"
              placeholder="Other"
              label="Describe"
              value={formData.medical_history.mhcp1Other}
            />
          }
          {mhcp1[1]?.value &&
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
          }
          <hr />
          <div className="text-xl text-FF1F9D text-center font-bold">
            Preventive Health Selection          </div>
          <div className="text-center font-bold my-3 text-[28px]">
            Are you focused on preventing any of the following conditions?
          </div>
          <CheckboxGroup
            checkboxes={phs}
            onChange={handleCheckboxChange}
            groupName="groupPHS"
          />
          {phs[phs.length - 1]?.value &&
            <InputField
              onChange={handleChangeOther}
              required={true}
              type="text"
              name="phsOther"
              placeholder="Other"
              label="Describe"
              value={formData.medical_history.fhAI}
            />
          }
          {phs[0]?.value &&
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
          }
          <hr />
          <div className="flex flex-col justify-center">
            <span className="text-xl text-FF1F9D text-center font-bold">
              Family History
            </span>
            <span className="text-center font-bold my-3 text-[28px]">
              Do you have family members with any of the following conditions?
            </span>
          </div>
          <CheckboxGroup
            checkboxes={fh}
            onChange={handleCheckboxChange}
            groupName="groupFh"
          />
          {fh[fh.length - 1].value &&
            <InputField
              onChange={handleChangeOther}
              required={true}
              type="text"
              name="fhOther"
              placeholder="Other"
              label="Describe"
              value={formData.medical_history.fhOther}
            />
          }
          {fh[1]?.value &&
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
          }
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
          <div className="flex justify-center">
            <button
              type="submit"
              className="max-w-[60%] h-[50px] text-center bg-751A9B font-semibold text-white rounded-lg text-base cursor-pointer hover:bg-purple-700 mx-auto w-full sm:w-full"
            >
              Create Account
            </button>
          </div>
          {errors.required && <span className="error">{errors.required}</span>}
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
    </div>
  );

}
const CreateAccountFormPage: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CreateAccountForm />
  </Suspense>
);

export default CreateAccountFormPage;