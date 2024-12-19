"use client";
import AuthWrapper from "@/components/AuthWrapper";
import InputField from "@/components/InputField";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import Signature from "@/components/Signature";
import Button from "@/components/Button";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import withAuth from '@/app/auth/auth/authHOC'

function EditProfileProvider() {
	const [loading, setLoading] = useState(true);
	const { data: session }: any = useSession(); // Access session data
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [sign, setSign] = useState<string>("");
	const language = ["English", "Spanish", "English & Spanish"	];
	const router = useRouter();

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

	const [formData, setFormData] = useState({
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
		cnic: "",
		language: "",
		address: "",
		city: "",
		state: "",
		zip: "",
		email: "",
	});

	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const handleChange = (e: any) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
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

		if (sign == '') {
			toast.error("Please draw your signatures to proceed!");
			setLoading(false);
			return;
		}

		try {
			const token = session.token; // Access token from user object
			const formDataToSend = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
				if (key == "license_details")
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
				router.push('/profile')
			}
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!session) return;
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
				setFormData({
					first_name: data.first_name,
					middle_name: data.middle_name,
					last_name: data.last_name,
					dob: data.dob,
					phone: data.phone,
					cnic: data.cnic,
					address: data.address,
					language: data.language,
					city: data.city,
					state: data.state,
					zip: data.zip,
					email: data.email,
					license_details: data.license_details,
				});

				if (data.avatar) {
					setImagePreview(data.avatar); // Set the existing image as the preview
				}
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
				<div className="mx-3 lg:mx-10 my-5">
					<div className="my-5">
						<span className="text-[28px] font-bold">Edit Profile</span>
					</div>
					<div className="shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] px-6 lg:px-[90px] md:px-[60px] sm:px-[30px] py-[50px] rounded-[22px]">
						<form className="my-10 space-y-6" onSubmit={handleSubmit}>
							<div className="relative flex justify-center">
								{imagePreview ? (
									<Image
										src={
											imagePreview.startsWith("blob:") ||
												imagePreview.startsWith("data:")
												? imagePreview
												: `${process.env.NEXT_PUBLIC_API_BASE_URL}${imagePreview}`
										}
										alt="Profile Image Preview"
										className="object-cover h-[150px] w-[150px] rounded-full"
										height={150}
										width={150}
									/>
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
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
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
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
									name="city"
									placeholder="Type your city"
									label="City"
									value={formData.city}
									onChange={handleChange}
									required={true}
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-1 gap-4">
								<InputField
									type="text"
									name="zip"
									label="Zip Code"
									placeholder="Type your zip code"
									value={formData.zip}
									onChange={handleChange}
									required={true}
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
							<div className="grid grid-cols-1 gap-4">
								{formData?.license_details?.map((license, index) => (
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
													name={`state-${index}`}
													value={license.state}
													onChange={(e) =>
														handleLicenseChange(e, index, "state")
													}
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
export default withAuth(EditProfileProvider, ['Provider']);
