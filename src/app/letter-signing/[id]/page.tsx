"use client";

import React, { useEffect, useState } from "react";
import AuthWrapper from "@/components/AuthWrapper";
import Link from "next/link";
import moment from "moment";
import { Circles } from "react-loader-spinner";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import Signature from "@/components/Signature";
import { useSession } from "next-auth/react";
import InputField from "@/components/InputField";
import withAuth from '@/app/auth/auth/authHOC'

const LetterSigning = () => {
	const [editorContent, setEditorContent] = useState("");
	const param = useParams<any>();
	const router = useRouter();
	const [data, setData] = useState<any | null>({});
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [sign, setSign] = useState<string>("");
	const { data: session }: any = useSession();
	const formattedDate = moment().format("MMMM Do YYYY");

	const [formData, setFormData] = useState({
		employer: "",
		state: "",
		startDate: "",
		endDate: "",
	});

	const handleEditorChange = (content: string) => {
		setEditorContent(content);
	};

	useEffect(() => {
		if (!session) return;

		const fetchData = async () => {
			const token = session.token;
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}api/lmn-request/show/${param.id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setData(response.data.result);
			} catch (error: any) {
				toast.error(error.response.data.message)
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [session]);

	const callBackSignature = async (image: any) => {
		setIsModalOpen(false);
		setSign(image);
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async () => {
		if (sign == '') {
			toast.error("Please draw your signatures to proceed!");
			return;
		}
		setLoading(true);
		try {
			const token = session.token; // Access token from user object
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}api/lmn-request/submit-letter/${param.id}`, // Replace with your API endpoint
				{ letter: editorContent, letter_signature: sign, status: "Approved" },
				{
					headers: {
						Authorization: `Bearer ${token}`, // Replace with your actual token
					},
				}
			);
			toast.success("Letter Signed Successfully!");
			router.push(`/member-detail/${param.id}`);
			console.log("API response:", response.data);
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			setLoading(false);
		}
	};
	const states = ["Chronic condition", "Lifelong treatment"];

	return (
		<AuthWrapper>
			<div className={`mx-3 lg:mx-10`}>
				<div className="my-5 shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] p-6 rounded-[22px]">
					<span className="font-bold text-2xl">Letter Siging</span>
					<hr className="my-4 border-gray-300" />

					<Circles
						height="80"
						width="80"
						color="#491161 "
						ariaLabel="bars-loading"
						wrapperStyle={{}}
						wrapperClass="loading-spinner-overlay"
						visible={loading}
					/>
					<div className="mt-5">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 rounded-md bg-gray-200">
							<div className="my-4 lg:my-10">
								<Image
									src="/myImages/logo-purple.svg"
									alt="Profile"
									width={45}
									height={45}
									className="h-[45px] w-[150px] lg:w-[500px] ml-0 lg:ml-5"
								/>
							</div>
							<div className="flex flex-col items-start lg:items-center my-2 lg:my-5">
								<div className="space-y-2">
									<div className="flex flex-col lg:flex-row">
										<span className="font-bold text-black">Name :</span>
										<span className="text-gray-500 lg:ml-2">
											{data.provider?.full_name}
										</span>
									</div>
									<div className="flex flex-col lg:flex-row">
										<span className="font-bold text-black">Email :</span>
										<span className="text-gray-500 lg:ml-2">
											{data.provider?.email}
										</span>
									</div>
									<div className="flex flex-col lg:flex-row">
										<span className="font-bold text-black">License No :</span>
										<span className="text-gray-500 lg:ml-2">
											{data.provider?.license_details[0].state}
										</span>
									</div>
									<div className="flex flex-col lg:flex-row">
										<span className="font-bold text-black">License State :</span>
										<span className="text-gray-500 lg:ml-2">
											{data.provider?.license_details[0].number}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="my-5">
						<span className="font-bold text-2xl">
							Medical Necessity Information
						</span>
						<form className="my-10 space-y-6">
							<div className="grid grid-cols-1">
								<span className="text-xl font-semibold">
									Describe treatment and frequency and dosage (Massage therapy
									once a week for the year)
								</span>
								<textarea
									id="employer"
									name="employer"
									placeholder="i: Specific products and services ii: CPT Code"
									required={true}
									value={formData.employer}
									onChange={handleChange}
									className="border p-4 mt-[12px] h-[100px] rounded-xl outline-none"
								/>
							</div>
							<div className="grid grid-cols-1">
								<div>
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
												{states.map((state) => (
													<option key={state} value={state}>
														{state}
													</option>
												))}
											</select>
										</div>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
								<div>
									<InputField
										label="Start Date"
										name="startDate"
										value={formData.startDate}
										placeholder="Start Date"
										type="date"
										onChange={handleChange}
										required={true}
									/>
								</div>
								{formData.state !== "Lifelong treatment" && (
									<div>
										<InputField
											label="End Date"
											name="endDate"
											value={formData.endDate}
											placeholder="End Date"
											type="date"
											onChange={handleChange}
											required={true}
										/>
									</div>
								)}
							</div>
						</form>
					</div>

					<div className="my-5">
						<SunEditor
							height="300px"
							setOptions={{
								buttonList: [
									["bold", "underline", "italic"],
									["font", "fontSize", "formatBlock"],
									["align", "list", "lineHeight"],
									["table", "link", "image"],
								],
							}}
							setContents={editorContent}
							onChange={handleEditorChange}
							placeholder="Write your content here..."
						/>
					</div>

					<div className="flex justify-between bg-gray-200 rounded-md mt-10 p-4">
						<div className="text-sm">
							<span className="font-semibold">Date: </span>
							<span>{formattedDate}</span>
						</div>
					</div>
					<div className="bg-gray-200 rounded-md mt-5 p-4">
						<div className="grid grid-cols-1">
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
						</div>
					</div>

					<div className="flex flex-col items-center sm:flex-row sm:justify-center mt-8 mx-3 lg:mx-10 gap-4">
						<Link href="/list-lmn">
							<Button className="bg-white w-[150px] border border-[#631681] text-[#631681] font-semibold px-4 py-2 rounded hover:bg-[#631681] hover:text-white">
								Back
							</Button>
						</Link>
						<Button
							onClick={handleSubmit}
							className="bg-[#631681]  w-[150px] font-semibold text-white px-4 py-2 rounded hover:bg-purple-700"
						>
							Submit
						</Button>
					</div>
				</div>
				{/* Modal for logout confirmation */}
				{isModalOpen && (
					<div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-60 backdrop-blur-sm">
						<div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 relative">
							<button
								className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
							// onClick={cancelLogout}
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
		</AuthWrapper>
	);
};

export default withAuth(LetterSigning,  ['Provider','Member']);
