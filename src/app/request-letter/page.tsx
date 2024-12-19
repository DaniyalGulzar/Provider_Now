"use client"
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import AuthWrapper from "@/components/AuthWrapper";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Card from "@/components/Cards";
import CheckboxGroup from "@/components/Checkbox";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Circles } from "react-loader-spinner";
import CheckboxWithTextAreaGroup from "@/components/CheckboxWithTextArea";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useStripe, useElements, CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AiFillQuestionCircle } from "react-icons/ai";
import Image from "next/image";
import withAuth from '@/app/auth/auth/authHOC'

const stripePromise = loadStripe("pk_test_51Q4k3tA3UuIWAPiNhvNZ18C2ORa5YfhtRVN34mhWwp81gywCfpMGzcoCHoklIn6g7BodtMValoLccaBGiVhTy3Jc00vbBCez6l");

const RequestLetter = () => {
	const { data: session }: any = useSession();
	const router = useRouter();
	const [status, setStatus] = useState(1);
	const [loading, setLoading] = useState(false);
	const stripe = useStripe();
	const elements = useElements();
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const autoimmunemhcp1Ref = useRef(null);
	const autoimmunephsRef = useRef(null);
	const autoimmunefhRef = useRef(null);
	const [scrollCheck, setScrollCheck] = useState(false)

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const files = Array.from(e.dataTransfer.files);
		if (files.length) {
			setSelectedFiles((prev) => [...prev, ...files]);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files) {
			const newFiles = Array.from(e.target.files);
			setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
		}
	};

	const uploadImages = async () => {
		try {
			setLoading(true);

			const formData = new FormData();
			selectedFiles.forEach((file: File) => {
				formData.append("files[]", file);
			});

			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}api/messages/upload-files`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${session?.token}`,
					},
				}
			);
			setFormData((prevState: any) => ({
				...prevState,
				documents: response.data.paths,
			}));
			setStatus(2);
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			setLoading(false);
		}
	};

	const [formData, setFormData] = useState({
		employer: "",
		first_name: "",
		middle_name: "",
		last_name: "",
		phone: "",
		dob: "",
		address: "",
		address2: "",
		city: "",
		state: [],
		language: "",
		zip: "",
		cnic: "",
		documents: [],
		medical_history: {
			mhcp1: [],
			phs: [],
			fh: [],
			mhcp2: [],
			mhcp1Other: "",
			phsOther: "",
			fhOther: "",
			mhcp1AI: "",
			phsAI: "",
			fhAI: "",
			pha: [],
			provider: "BoA",
			demographicsVeteran: "",
			demographicsGender: "",
			demographicsEthnicity: "",
			demographicsRace: "",
			demographicsRaceOther: "",
			is_submitted_for_declined_claim: false,
			is_submitted_for_declined_claim_reason: "",
			additional_comments: "",
			mc: {
				"signature": "",
				"date": ""
			}
		},
		email: "",
		provider_id: "0",
	})

	const handleRemoveFile = (index: any) => {
		setSelectedFiles(selectedFiles.filter((_, idx) => idx !== index));
	};

	useEffect(() => {
		if (!session) return;

		const fetchData = async () => {
			try {
				const token = session.token;
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/user`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				let data = response.data.result.info;
				console.log( data?.medical_history)
				setFormData({
					...formData,
					employer: data.employer === 'null' ? "" : data.employer,
					language: data.language,
					first_name: data.first_name,
					middle_name: data.middle_name,
					last_name: data.last_name,
					dob: data.dob,
					phone: data.phone,
					cnic: data.cnic ?? '',
					address: data.address,
					city: data.city,
					state: data.state,
					zip: data.zip,
					email: data.email,
					medical_history: {
						...formData.medical_history,
						mhcp1: data?.medical_history?.mhcp1,
						fh: data?.medical_history?.fh,
						phs: data?.medical_history?.phs,
						mhcp2: data?.medical_history?.mhcp2,
						mhcp1Other: data?.medical_history?.mhcp1Other,
						phsOther: data?.medical_history?.phsOther,
						fhOther: data?.medical_history?.fhOther,
						mhcp1AI: data?.medical_history?.mhcp1AI,
						fhAI: data?.medical_history?.fhAI,
						demographicsVeteran: data?.medical_history?.demographicsVeteran,
						demographicsGender: data?.medical_history?.demographicsGender,
						demographicsEthnicity: data?.medical_history?.demographicsEthnicity,
						demographicsRace: data?.medical_history?.demographicsRace,
						demographicsRaceOther: data?.medical_history?.demographicsRaceOther,	
					},
				});

				const phsArray = data.medical_history.phs;
				const updatedPHS = phs.map(element => ({
					...element,
					value: phsArray.includes(element.name)
				}));
				setPHS(updatedPHS);

				const fhArray = data.medical_history.fh;
				const updatedFh = fh.map(element => ({
					...element,
					value: fhArray.includes(element.name)
				}));
				setFH(updatedFh);

				const mhcp1Array = data.medical_history.mhcp1;
				const updatedMHCP1 = mhcp1.map(element => ({
					...element,
					value: mhcp1Array.includes(element.name)
				}));
				setMCHP(updatedMHCP1);

				const mhcp2Array = data.medical_history.mhcp2;
				const updatedMHCP2 = mhcp2.map(element => ({
					...element,
					value: mhcp2Array.includes(element.name)
				}));
				setMCHP2(updatedMHCP2);

			} catch (error) {
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [session]);

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

	const cardsData1 = [
		{ text: "BoA" },
		{ text: "FSA FEEDS" },
		{ text: "HEQ FSA/HRA" },
		{ text: "HEQ HSA" },
		{ text: "Inspira" },
		{ text: "Lively" },
		{ text: "Navia" },
		{ text: "Optum FSA" },
		{ text: "Optum HSA" },
		{ text: "Other" },
		{ text: "P&A Group" },
	];

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
	const [pha, setPha] = useState([
		{ name: "Environment as medicine", label: "Environment_As_Medicine", text: '', value: false },
		{ name: "Exercise as medicine", label: "Exercise_As_Medicine", text: '', value: false },
		{ name: "Food as medicine", label: "Food_As_Medicine", text: '', value: false },
		{ name: "Sleep as medicine", label: "Sleep_As_Medicine", text: '', value: false },
		{ name: "Wellness as medicine", label: "Wellness_As_Medicine", text: '', value: false },
	]);

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
		{ name: "Arthritis", value: false },
		{ name: "Asthma", value: false },
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

	useEffect(() => {
		const names = phs.filter(item => item.value).map(item => item.name);
		setFormData((prevState: any) => ({
			...prevState,
			medical_history: {
				...prevState.medical_history,
				phs: names,
			},
		}));
	}, [phs]);

	useEffect(() => {
		const names = fh.filter(item => item.value).map(item => item.name);
		setFormData((prevState: any) => ({
			...prevState,
			medical_history: {
				...prevState.medical_history,
				fh: names,
			},
		}));
	}, [fh])

	useEffect(() => {
		const names = mhcp1.filter(item => item.value).map(item => item.name);
		setFormData((prevState: any) => ({
			...prevState,
			medical_history: {
				...prevState.medical_history,
				mhcp1: names,
			},
		}));
	}, [mhcp1]);

	useEffect(() => {
		const names = mhcp2.filter(item => item.value).map(item => item.name);
		setFormData((prevState: any) => ({
			...prevState,
			medical_history: {
				...prevState.medical_history,
				mhcp2: names,
			},
		}));
	}, [mhcp2]);

	useEffect(() => {
		const names = pha.filter(item => item.value).map(item => ({
			name: item.name,
			text: item.text
		}));
		setFormData((prevState: any) => ({
			...prevState,
			medical_history: {
				...prevState.medical_history,
				pha: names,
			},
		}));
	}, [pha]);

	const handleCheckboxTextChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const { name, value } = event.target;
		setPha((prevState) =>
			prevState.map((item) =>
				item.label === name ? { ...item, text: value } : item
			)
		);
	};

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		groupName: string
	) => {
		setScrollCheck(true)
		const { name, checked } = event.target;
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
		} else if (groupName === "pha_group") {
			setPha((prevState) =>
				prevState.map((item) =>
					item.label === name
						? { ...item, value: true }
						: { ...item, value: false }
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

	const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			medical_history: {
				...prevState.medical_history,
				[name]: value === 'yes' ? true : false
			}
		}));
	};

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

	const handleChangeClaimText = (e: any) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			medical_history: {
				...prevState.medical_history,
				[name]: value
			}
		}));
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

	const language = [
		"English", "Spanish", "English & Spanish"
	];

	const handleChange = (event: any) => {
		const { name, value, options, type } = event.target;
		const keys = name.split('.');
		setFormData((prevData) => {
			let updatedData = { ...prevData };
			let current: any = updatedData;

			for (let i = 0; i < keys.length - 1; i++) {
				current = current[keys[i]];
			}

			if (type === 'select-multiple') {
				const selectedStates: string[] = [];
				for (const option of options) {
					if (option.selected) {
						selectedStates.push(option.value);
					}
				}
				current[keys[keys.length - 1]] = selectedStates;
			} else {
				current[keys[keys.length - 1]] = value;
			}
			return updatedData;
		});
	};

	const handleBack = async () => {
		setStatus(1)
	}

	const handleSubmitStripe = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!stripe || !elements) return;
		setLoading(true);
		const cardElement = elements.getElement(CardElement);
		if (!cardElement) {
			console.error("Card element not found");
			setLoading(false);
			return;
		}
		const { token, error } = await stripe.createToken(cardElement);
		if (error) {
			console.error(error);
		} else {
			console.log('Stripe Token:', token);
			handleSubmitFinal(token.id);
		}
		setLoading(false);
	};

	const handleSubmitFinal = async (stripeToken: string) => {
		setLoading(true);
		try {
			const token = session.token;
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}api/lmn-request/store`,
				{ ...formData, stripe_token: stripeToken },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			toast.success(response.data.message);
			router.push('/list-lmn');
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (selectedFiles.length > 0) {
			uploadImages();
		} else {
			setStatus(2);
		}
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
				{
					(status === 1) ?
						<form onSubmit={handleSubmit}>
							<div className="xl:mx-8 lg:mx-8 md:mx-8 mx-3 mt-5">
								<h2 className="text-xl font-bold mb-4">Request a Letter of Medical Necessity by answering a few quick questions below</h2>
								<div className="mt-5 shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] rounded-md p-5">
									<div className="relative">
										<p className="text-xl text-FF1F9D text-center font-bold">Member Information</p>
										<div className="flex items-center justify-between w-full mb-5">
											<div className="flex-grow flex justify-center">
												<span className="text-center font-bold text-[28px]">
													Please fill the form
												</span>
											</div>
										</div>
										<div className="gap-4">
											<InputField
												onChange={handleChange}
												required={false}
												type="text"
												id="employer"
												name="employer"
												value={formData.employer}
												label="Employer (if HSA / FSA provided by employer)"
											/>
											<div className="grid grid-cols-1 md:grid-cols-3 items-end gap-4">
												<InputField
													onChange={handleChange}
													required={true}
													name="first_name"
													type="text"
													id="first_name"
													value={formData.first_name}
													placeholder="First Name"
													label="Member Name"
												/>
												<InputField
													onChange={handleChange}
													required={false}
													name="middle_name"
													placeholder="Middle Name"
													value={formData.middle_name}
													id="middle_name"
													type="text"
												/>
												<InputField
													onChange={handleChange}
													required={true}
													name="last_name"
													type="text"
													id="last_name"
													value={formData.last_name}
													placeholder="Last Name"
												/>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<InputField
													onChange={handleChange}
													required={true}
													type="date"
													name="dob"
													placeholder="Date of Birth"
													value={formData.dob}
													label="Date Of Birth"
												/>
												<InputField
													onChange={handleChange}
													required={false}
													name="cnic"
													placeholder="Social Security Number"
													type="number"
													value={formData.cnic}
													label="Social Security Number"
												/>
												<InputField
													onChange={handleChange}
													required={true}
													name="phone"
													placeholder="Telephone Number"
													label="Telephone Number"
													value={formData.phone}
													type="number"
												/>
												<InputField
													onChange={handleChange}
													required={true}
													type="email"
													name="email"
													placeholder="Email Address"
													label="Email Address"
													value={formData.email}
												/>
												<InputField
													onChange={handleChange}
													required={true}
													name="address"
													placeholder="Address"
													label="Address"
													type="text"
													value={formData.address}
												/>
												<InputField
													onChange={handleChange}
													required={true}
													name="address2"
													placeholder="Address2"
													label="Address 2"
													type="text"
													value={formData.address2}
												/>
												<InputField
													onChange={handleChange}
													required={true}
													type="text"
													name="city"
													placeholder="city"
													label="City"
													value={formData.city}
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
															className="mt-1 h-[48px] block w-full border border-[#cccccc] rounded-md shadow-sm focus:border-FF1F9D focus:ring focus:ring-FF1F9D focus:ring-opacity-50"
														>
															<option value="">Select State</option>
															{states.map(state => (
																<option key={state} value={state}>{state}</option>
															))}
														</select>
													</div>
												</div>
												<InputField
													onChange={handleChange}
													required={true}
													type="text"
													name="zip"
													placeholder="zipcode"
													label="Zipcode"
													value={formData.zip}
												/>
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
															className="mt-1 h-[48px] block w-full border border-[#cccccc] rounded-md shadow-sm focus:border-FF1F9D focus:ring focus:ring-FF1F9D focus:ring-opacity-50"
														>
															<option value="">Select Language</option>
															{language.map(state => (
																<option key={state} value={state}>{state}</option>
															))}
														</select>
													</div>
												</div>
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
									<hr className="my-4 border-gray-300" />
									<div className="mt-8 relative w-full">
										<p className="text-center text-gray-600 mb-2">HSA/FSA Provider Selection</p>
										<h3 className="text-lg font-bold text-center mb-3 flex items-center justify-center space-x-2">
											<span>Select Your HSA/FSA Provider</span>
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											{cardsData1.slice(0, 11).map((card: any, index: any) => (
												<Card
													key={index}
													name="provider"
													text={card.text}
													onChange={handleRadio}
													showIcon={true}
													checked={formData.medical_history.provider === card.text}
												/>
											))}
										</div>
									</div>

									<hr className="my-4 border-gray-300" />
									<div className="mt-8 relative w-full p-4 sm:p-6 md:p-8">
										<h3 className="text-lg font-bold text-center mb-6 mt-5">
											<span>
												Is this form submitted for a previously denied claim within the calendar year
												beginning in January and ending in December?
											</span>
										</h3>
										<div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-10">
											<div className="flex items-center justify-center space-x-10">
												<label className="flex items-center space-x-2">
													<input
														type="radio"
														name="is_submitted_for_declined_claim"
														value="yes"
														checked={formData?.medical_history?.is_submitted_for_declined_claim == true}
														onChange={handleChangeRadio}
														className="form-radio text-blue-600"
													/>
													<span className="text-gray-700">Yes</span>
												</label>
												<label className="flex items-center space-x-2">
													<input
														type="radio"
														name="is_submitted_for_declined_claim"
														value="no"
														checked={formData?.medical_history?.is_submitted_for_declined_claim == false || formData?.medical_history?.is_submitted_for_declined_claim == undefined}
														onChange={handleChangeRadio}
														className="form-radio text-red-600"
													/>
													<span className="text-gray-700">No</span>
												</label>
											</div>
											<div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
												<span className="text-gray-700 font-bold text-center md:text-left">
													(If Yes, Provide the Claim Number:)
												</span>
												<InputField
													disabled={!formData.medical_history.is_submitted_for_declined_claim}
													onChange={handleChangeClaimText}
													type="text"
													name="is_submitted_for_declined_claim_reason"
													placeholder="Type Number"
													value={formData.medical_history.is_submitted_for_declined_claim_reason}
												/>
											</div>
										</div>
									</div>

									<hr className="my-4 border-gray-300 mb-10" />
									<div className="mt-8 relative w-full">
										<h3 className="text-lg font-bold text-center mb-6 flex items-center justify-center space-x-2 mt-3">
											{"Select all desired methods for preventive medicine (200 characters limit)"}
										</h3>
										<div className="flex flex-col space-y-2 font-bold">
											<CheckboxWithTextAreaGroup
												checkboxes={pha}
												onChange={handleCheckboxChange}
												onChangeText={handleCheckboxTextChange}
												groupName="pha_group"
											/>
										</div>
									</div>
									<hr className="my-4 border-gray-300" />
									<div className="mt-8 relative w-full">
										<p className="text-center text-gray-600 mb-2">Medical History</p>
										<h3 className="text-lg font-bold text-center mb-3 flex items-center justify-center space-x-2">
											<span>Have you been diagnosed  with or experienced any of the following conditions?</span>
										</h3>
										<p className="text-center text-gray-600 mb-3 font-semibold">
											(Select all applicable)
										</p>
										<CheckboxGroup
											checkboxes={mhcp1}
											onChange={handleCheckboxChange}
											groupName="group"
										/>
										{mhcp1[mhcp1.length - 1]?.value &&
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
									</div>

									<hr className="my-4 border-gray-300" />
									<div className="mt-8 relative w-full">
										<p className="text-center text-gray-600 mb-2">Preventive Health Selection</p>
										<h3 className="text-lg font-bold text-center mb-3 flex items-center justify-center space-x-2">
											<span>Are you focused on preventing any of the following conditions?</span>
										</h3>
										<CheckboxGroup
											checkboxes={phs}
											onChange={handleCheckboxChange}
											groupName="group1"
										/>
										{phs[phs.length - 1].value &&
											<InputField
												onChange={handleChangeOther}
												required={true}
												type="text"
												name="phsOther"
												placeholder="Other"
												label="Describe"
												value={formData.medical_history.phsOther}
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
									</div>

									<hr className="my-4 border-gray-300" />
									<div className="mt-8 relative w-full">
										<p className="text-center text-gray-600 mb-2">Family History</p>
										<h3 className="text-lg font-bold text-center mb-3 flex items-center justify-center space-x-2">
											<span>Do you have family members with any of the following conditions?</span>
										</h3>
										<CheckboxGroup
											checkboxes={fh}
											onChange={handleCheckboxChange}
											groupName="groupFh"
										/>
										{fh[fh.length - 1]?.value &&
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
									</div>

									<hr className="my-4 border-gray-300" />
									<div className="mt-8 relative w-full">
										<p className="text-center text-gray-600 mb-2">Additional Patient Comments</p>
										<h3 className="text-lg font-bold text-center mb-6 flex items-center justify-center space-x-2 ">
											<span>
												Is there anything that you would like to share about the conditions
												that you <br></br>are looking to prevent or reverse?
											</span>
										</h3>
										<textarea
											id="message"
											rows={4}
											maxLength={500}
											name="additional_comments"
											onChange={handleChangeClaimText}
											className="mb-10 flex items-center justify-center p-2.5 w-full text-sm text-black bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
											placeholder="Type your Problem (500 Max Characters)"
										></textarea>
									</div>
									<hr className="my-4 border-gray-300" />
									<div className="mt-8 w-full">
										<div
											className={`w-full border-2 ${isDragging ? "border-blue-400" : "border-gray-400"} border-dotted w-4/5 p-6 flex flex-col items-center justify-center text-center mb-5`}
											onDragOver={handleDragOver}
											onDragLeave={handleDragLeave}
											onDrop={handleDrop}
										>
											<input
												type="file"
												multiple
												className="hidden"
												id="fileUpload"
												onChange={handleFileChange}
											/>
											<label htmlFor="fileUpload" className="flex flex-col items-center cursor-pointer">
												<FaUpload className="text-gray-600 mb-2" />
												<span className="font-bold text-gray-500">Browse files</span>
											</label>
											<p className="text-gray-600 mb-2">Drag and drop files here</p>
											{selectedFiles.length > 0 && (
												<div className="mt-4 flex flex-wrap gap-2">
													{selectedFiles.map((file, idx) => (
														<>
															<div className="flex justify-between w-auto items-center p-2 bg-white rounded-lg shadow whitespace-nowrap"
															>
																<div className="flex items-center">
																	<Image
																		src="/myImages/new-document.svg"
																		alt="File Icon"
																		width={24}
																		height={24}
																	/>
																	<span className="ml-2 text-sm truncate" title={file.name}>{file.name}</span>
																</div>
																<button
																	type="button"
																	className="ml-2 text-red-500 hover:text-red-700"
																	onClick={() => handleRemoveFile(idx)}
																>
																	&times;
																</button>
															</div>
														</>
													))}
												</div>
											)}
										</div>
									</div>

									{/* <hr className="my-4 border-gray-300" />
									<div className="mt-8 w-full">
										<h3 className="text-lg font-bold text-center mb-5 flex items-center justify-center space-x-2">
											<span>Member Certification</span>
										</h3>
										<div className="flex flex-col md:flex-row justify-center px-4 md:px-8 lg:px-16">
											<div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl">
												<div className="flex-1">
													<label
														htmlFor="signatureType"
														className="text-xl mb-2 font-semibold block"
													>
														Signature
													</label>
													<InputField
														onChange={handleChange}
														name="signatureType"
														placeholder="Signature Type"
														className="w-full h-[48px] p-2"
													/>
												</div>
												<div className="flex-1">
													<label
														htmlFor="dobSignature"
														className="text-xl mb-2 font-semibold block"
													>
														Date
													</label>
													<InputField
														onChange={handleChange}
														type="date"
														name="dobSignature"
														placeholder="Date of Birth"
														className="w-full h-[48px] p-2"
													/>
												</div>
											</div>
										</div>
*/}
									<div className="flex flex-col md:flex-row justify-center mt-8 gap-4 w-full  px-4 md:px-8 lg:px-16">
										<Button type="button" onClick={handleBack} className="bg-transparent h-12 border-2 border-[#751A9B] font-bold text-[#751A9B] hover:bg-purple-700 hover:text-white px-4 py-2 rounded w-full md:w-40">
											Back
										</Button>
										<Button type="submit" className="bg-[#751A9B] text-white h-12 font-semibold hover:bg-purple-700 text-base w-full md:w-40 py-2 px-4 rounded-md">
											Next
										</Button>
									</div>
									{/* </div>  */}
								</div>
							</div>
						</form>
						:
						<div className="m-8">
							<h2 className="text-2xl font-bold mb-4">Request for letter of medical neccesity</h2>
							<div className="shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] rounded-md bg-white">
								<div className="px-4 lg:px-40 rounded-md py-4">
									<h3 className="flex justify-center text-2xl font-bold text-left mt-5 mb-3">
										Pay Now
									</h3>
									<span className="flex justify-center font-bold items-center mb-4">
										(We accept HSA and FSA)
									</span>
									<div className="bg-white shadow-lg mb-10 p-5">
										<h2 className="text-xl font-bold mb-4">Price Detail</h2>
										<hr className="my-4 border-gray-300" />
										<div className="grid grid-cols-1 gap-4 mb-4">
											<div className="flex justify-between items-center border-b pb-2">
												<span className="font-medium text-gray-500">Subtotal</span>
												<span>$40.00</span>
											</div>
											<div className="flex justify-between items-center border-b pb-2">
												<span className="font-medium text-gray-500">Tax</span>
												<span>$0.00</span>
											</div>
											<div className="flex justify-between items-center border-b pb-2">
												<span className="font-medium text-gray-500">Discount</span>
												<span>$0.00</span>
											</div>
											<div className="flex justify-between items-center font-semibold">
												<span className="font-bold">Total Price</span>
												<span>$40.00</span>
											</div>
										</div>
									</div>
									<span className="text-xl font-semibold">Discount</span>
									<div className="grid grid-cols-1 gap-4 mb-4 mt-3">
										<div className="flex lg:flex-row border border-rounded items-center px-15">
											<input
												name="bar"
												placeholder=""
												className="flex-1 h-[48px] border-none pl-4 outline-none"
											/>
											<Button className="bg-[#631681] text-white w-[150px] h-[50px] rounded-lg">
												Redeem now
											</Button>
										</div>
									</div>
									{/* <div className="bg-white shadow-md p-5">
										<h2 className="text-xl font-bold mb-4">Rewards Balance</h2>
										<hr className="my-4 border-gray-300" />
										<div className="grid grid-cols-1 gap-4 mb-4">
											<div className="flex justify-between items-center border-b pb-2">
												<div className="flex flex-col">
													<span className="font-medium text-gray-500">Total Reward Points</span>
													<span className="font-semi-bold text-gray-500">
														Minimum $10 can be redeemed at one transaction
													</span>
												</div>
												<span className="font-bold text-3xl">$5</span>
											</div>
											<div className="flex lg:flex-row border border-rounded items-center px-15">
												<input
													name="bar"
													placeholder=""
													className="flex-1 h-[48px] border-none pl-4 outline-none"
												/>
												<Button className="bg-[#631681] text-white w-[150px] h-[50px] rounded-lg">
													Redeem now
												</Button>
											</div>
										</div>
									</div> */}
									<form onSubmit={handleSubmitStripe} className="space-y-2 mt-5">
										<div className="space-y-2">
											<InputField
												name="name"
												placeholder="Type Your Name"
												label="Card Holder Name"
											/>
										</div>
										<div className="space-y-2">
											<label htmlFor="card-element" className="block font-bold mb-2">Card Details</label>
											<div className="border rounded-md p-4 border-gray-300">
												<CardElement
													id="card-element"
													options={{
														style: {
															base: {
																fontSize: '16px',
																color: '#424770',
																'::placeholder': {
																	color: '#aab7c4',
																},
															},
															invalid: {
																color: '#9e2146',
															},
														},
													}}
												/>
											</div>
										</div>
										<div className="bg-white p-6 mb-5 border-2 border-dotted border-gray-400">
											<div className="flex flex-col w-full">
												<p className="font-bold text-gray-700 mb-2">Disclaimer:</p>
												<p className="text-gray-600">
													This is a disclaimer text that provides important information about file uploads.
												</p>
												<p className="font-bold text-gray-700 mb-2">Accepted payment methods:</p>
												<p className="text-gray-600"> Visa, Mastercard, Amex, Discover, ACH, Zelle, Paypal, Venmo, CashApp
												</p>
											</div>
										</div>
										<div className="flex justify-center mt-8 gap-4 w-full">
											<Button onClick={handleBack} className="bg-white border border-[#631681] text-[#631681] font-semibold px-4 py-2 rounded w-40">
												Back
											</Button>
											<Button type="submit" className="bg-[#631681] text-white px-4 py-2 font-semibold rounded w-40" disabled={loading}>
												{loading ? 'Processing...' : 'Pay Now'}
											</Button>
										</div>
									</form>
								</div>
							</div>
						</div>
				}
			</AuthWrapper>
		</>
	);
};
const PaymentComWithStripe = () => (
	<Elements stripe={stripePromise}>
		<RequestLetter />
	</Elements>
);

export default withAuth(PaymentComWithStripe,  ['Provider','Member']);
