"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import Chatpage from "../Chats";
import Button from "../Button";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import InputField from "../InputField";

interface DetailProps {
	id?: any;
	dismissRequest?: any
	refreshRequest?: any
}

const Detail: React.FC<DetailProps> = ({
	id,
	dismissRequest,
	refreshRequest
}) => {
	const [object, setObject] = useState<any | null>({});
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<any | null>({});
	const [license, setLicense] = useState<any | null>({});

	const [role, setRole] = useState<string | null>(null);
	const [status, setStatus] = useState<string | null>(null);

	const { data: session }: any = useSession();
	const formattedDate = moment().format("MMMM Do YYYY");

	const conditions = ["Chronic condition", "Lifelong treatment"];
	const [isReadOnly, setIsReadOnly] = useState<Boolean>(true);
	const [formData, setFormData] = useState({
		treatment: '',
		conditionType: 'Lifelong treatment',
		startDate: '',
		endDate: '',
		diagnosis: '',
		how_to_alleviate: '',
		additional_comment: '',
		useSignature: false
	});

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

	const handleChangeCheckBox = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, checked } = e.target; // Use 'checked' instead of 'value'
		setFormData((prevData) => ({
			...prevData,
			[name]: checked, // Update with the checkbox checked state
		}));
	};

	useEffect(() => {
		if (!session) return;
		fetchUser();
		setRole(session.user.role);
	}, [session, id]);

	const fetchUser = async () => {
		const token = session.token;

		setLoading(true)
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/user`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setUser(response.data.result.info);
			console.log(response.data.result.info)

			const stateToMatch = object.state;
			const matchingLicense = response.data.result.info.license_details.find(
				(license: any) => license.state === stateToMatch
			);

			// Set the matching license to state
			setLicense(matchingLicense);
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	const requestInfo = async () => {
		setLoading(true)
		const token = session.token;

		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}api/lmn-request/request-info/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			toast.success(response.data.message);
			setLoading(false);
			fetchCallback();
			// dismissRequest();
		} catch (error) {
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	const acceptForReview = async () => {
		setLoading(true)
		const token = session.token;

		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}api/lmn-request/accept-for-review/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			toast.success(response.data.message);
			setLoading(false);
			fetchCallback();
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			setLoading(false);
		}
	};

	const rejectForReview = async () => {
		setLoading(true)
		const token = session.token;

		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}api/lmn-request/reject-for-review/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			toast.success(response.data.message);
			setLoading(false);
			dismissRequest();
			refreshRequest();
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!session) return;
		fetchCallback();
	}, [session]);

	const fetchCallback = async () => {
		try {
			const token = session.token;
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}api/lmn-request/show/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.data.result.id === parseInt(id)) {
				setObject(response.data.result);
				setFormData({
					treatment: response.data.result?.letter?.treatment ?? '',
					conditionType: response.data.result?.letter?.conditionType ?? 'Lifelong treatment',
					startDate: response.data.result?.letter?.startDate ?? '',
					endDate: response.data.result?.letter?.endDate ?? '',
					diagnosis: response.data.result?.letter?.diagnosis ?? '',
					how_to_alleviate: response.data.result?.letter?.how_to_alleviate ?? '',
					additional_comment: response.data.result?.letter?.additional_comment ?? '',
					useSignature: response.data.result?.letter?.useSignature ? response.data.result?.letter?.useSignature : false,
				});

				setIsReadOnly((response.data.result?.status === 'Approved' || response.data.result?.status === 'Rejected') ? true : false);
			} else {
			}
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			setLoading(false);
		}
	};

	const startDownload = async () => {
		setLoading(true)

		let name = object?.medical_history?.provider.replace(/\s+/g, '');
		if (name == 'P&AGroup')
			name = 'PAGroup';
		if (name == 'HEQFSA/HRA')
			name = 'HEQFSAHRA';

		const formData: any = {
			data: object,
			filename: name  //data?.medical_history?.provider.replace(/\s+/g, ''), // Removes all spaces from the provider string
		}
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}backend/api/pdf/addData`,
				formData
			);

			if (!response.data.result.error) {
				const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}backend/${response.data.result}`;
				if (url) {
					window.open(url, '_blank');
				}
			}
			else {
				toast.success('Tempalte Coming Soon!')
			}
			setLoading(false);
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			setLoading(false);
		}
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (user?.signature == '' || user?.signature == null || user?.signature == undefined) {
			toast.error("Please draw your signatures to proceed!");
			return;
		}

		if (status === 'Rejected' && (formData.additional_comment == '' || formData.additional_comment == null)) {
			toast.error('Additional comments are required when rejecting the request.');
		}
		setLoading(true);

		try {
			const token = session.token; // Access token from user object
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}api/lmn-request/submit-letter/${object.id}`, // Replace with your API endpoint
				{ letter: { ...formData }, letter_signature: user?.signature, status: status },
				{
					headers: {
						Authorization: `Bearer ${token}`, // Replace with your actual token
					},
				}
			);
			fetchCallback();
			toast.success("Letter Signed Successfully!");
			console.log("API response:", response.data);
			dismissRequest();

		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={`mx-3 lg:mx-10`}>
			<Circles
				height="80"
				width="80"
				color="#491161"
				ariaLabel="bars-loading"
				wrapperStyle={{}}
				wrapperClass="loading-spinner-overlay"
				visible={loading}
			/>
			{(session && id) &&
				<div className="my-5">
					<span className="font-bold text-2xl">{'Details'}</span>

					{(object?.status === 'Pending' && role === 'Provider') && (
						<div className="flex flex-col">
							<hr className="my-5 border-gray-300" />
							<div className="flex gap-4 mt-3 items-center">
								<span className="text-lg font-bold">Do you accept to review this LMN request?</span>
								{object?.status === 'Pending' ? <Button onClick={() => acceptForReview()} className="bg-[#751A9B] text-white h-12 font-semibold w-[161px] hover:bg-purple-700 text-base py-2 px-4 rounded-md">Yes</Button> : null}
								<Button onClick={rejectForReview} className="border border-[#751A9B] text-[#751A9B] h-12 font-semibold w-[161px] hover:text-white hover:bg-purple-700 text-base py-2 px-4 rounded-md">No</Button>
							</div>
						</div>)
					}
					<hr className="my-4 border-gray-300" />
					<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
						<div className="flex flex-col lg:flex-row md:flex-row items-center gap-4">
							<Image
								src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${object?.member?.avatar}`}
								alt={'Avatar'}
								className="object-cover min-h-[80px] min-w-[80px] rounded-full h-[80px] w-[80px]"
								height={80}
								width={80}
							/>
							{object?.id && (
								<div className="flex flex-col w-full">
									<div className="flex w-full">
										<div className="ml-3 mb-3 font-bold text-[#484b52] whitespace-nowrap">
											Request ID:
										</div>
										<div className="ml-3 text-[#484b52] w-full truncate">
											{object?.id}
										</div>
									</div>
									<div className="flex w-full">
										<div className="ml-3 mb-3 font-bold text-[#484b52]">
											Name:
										</div>
										<div className="ml-3 text-[#484b52] w-full truncate">
											<p>{object?.first_name} {object?.middle_name} {object?.last_name}</p>
										</div>
									</div>
								</div>
							)}
						</div>
						<div>
							{object?.email && (
								<div className="flex flex-col w-full">
									<div className="flex w-full">
										<div className="ml-3 mb-3 font-bold text-[#484b52] whitespace-nowrap">
											Email ID:
										</div>
										<div className="ml-3 text-[#484b52] w-full truncate">
											{object?.email}
										</div>
									</div>
									<div className="flex w-full mt-1">
										<div className="ml-3 mb-3 font-bold text-[#484b52]">
											Phone:
										</div>
										<div className="ml-3 text-[#484b52] w-full truncate">
											{object?.phone}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
					<hr className="my-5 border-gray-300" />
					<div className="my-3">
						<span className="font-bold text-2xl">Survey Details</span>
					</div>
					<div className="grid grid-cols-1">
						{[
							'Claim number?',
							'Select Your HSA/FSA provider',
							'Have you been diagnosed with any of the following conditions?',
							'Are You Focused on preventing any of the following conditions?',
							'Do you have family members with any of the following conditions?',
							'Do any of the following apply to you?',
							'Demographics?',
							'Is there anything that you would like to share about the conditions that you are looking to prevent or reverse?',
						].map((heading, index) => (
							<div key={index} className="flex flex-col">
								<span className="text-lg font-bold">{heading}</span>
								<span className="text-[#484b52] mt-3">
									{heading === 'Demographics?'
										? [
											"demographicsVeteran: ", object.medical_history?.demographicsVeteran ?? 'N/A',
											object.medical_history?.demographicsGender ?? 'N/A',
											object.medical_history?.demographicsEthnicity ?? 'N/A',
											object.medical_history?.demographicsRace=== 'Other' ?'' :object.medical_history?.demographicsRace, // Join array for race
											object.medical_history?.demographicsRaceOther ? `Other (${object.medical_history?.demographicsRaceOther})` : 'N/A', // Handling "Other" race
										].filter(Boolean).join(', ') // Filter out any empty values
										: [
											object.medical_history?.is_submitted_for_declined_claim
												? object.medical_history?.is_submitted_for_declined_claim_reason
												: 'N/A',
											object.medical_history?.provider ?? 'N/A',
											[
												object.medical_history?.mhcp1?.map((option: any) =>
													option === 'Other' && object.medical_history?.mhcp1Other
														? `${option} (${object.medical_history?.mhcp1Other})`
														: option === 'An Autoimmune Disease' && object.medical_history?.mhcp1AI
															? `${option} (${object.medical_history?.mhcp1AI})`
															: option
												).join(', '),
											].filter(Boolean).join(', ') || 'N/A',

											// phs with "Other" and "An Autoimmune Disease" handling
											[
												object.medical_history?.phs?.map((option: any) =>
													option === 'Other' && object.medical_history?.phsOther
														? `${option} (${object.medical_history?.phsOther})`
														: option === 'An Autoimmune Disease' && object.medical_history?.phsAI
															? `${option} (${object.medical_history?.phsAI})`
															: option
												).join(', '),
											].filter(Boolean).join(', ') || 'N/A',

											// fh with "Other" and "An Autoimmune Disease" handling
											[
												object.medical_history?.fh?.map((option: any) =>
													option === 'Other' && object.medical_history?.fhOther
														? `${option} (${object.medical_history?.fhOther})`
														: option === 'An Autoimmune Disease' && object.medical_history?.fhAI
															? `${option} (${object.medical_history?.fhAI})`
															: option
												).join(', '),
											].filter(Boolean).join(', ') || 'N/A',

											// object.medical_history?.mhcp2?.join(', ') || 'N/A',
											object.medical_history?.additional_comments ?? 'N/A',
										][index]
									}
								</span>
								<hr className="my-5 border-gray-300" />
							</div>
						))}
					</div>

					<div className="grid grid-cols-1">
						{[
							"Do you have any Preventive Health Activity 'As Medicine Selection?"
						].map((heading, index) => (
							<div key={index} className="flex flex-col">
								<span className="text-lg font-bold">{heading}</span>
								{object.medical_history?.pha && object.medical_history?.pha.map((pha: any, index: any) => (
									<div key={index}><b>{pha.name}</b>: {pha.text}    <br />
									</div>

								))}
								<hr className="my-5 border-gray-300" />
							</div>
						))}
					</div>

					<div className="my-3">
						<span className="font-bold text-2xl">Uploaded Documents</span>
					</div>
					{object.documents && object.documents.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 my-4 gap-4">
							{
								object.documents.map((doc: any) => (
									<div key={doc.id}>
										<a
											href={process.env.NEXT_PUBLIC_STORAGE_PATH + doc.path}
											download
											className="text-sm mb-0 flex flex-col py-3 items-center bg-white rounded-lg shadow whitespace-nowrap"
											target="_blank"
											rel="noopener noreferrer"
										>
											<Image
												src="/myImages/document.svg"
												alt="File Icon"
												width={100}
												height={100}
											/>
											&nbsp; {doc.path.split("/").pop()}
										</a>
									</div>
								))
							}
						</div>
					) : (
						<p>No documents available</p>
					)}

					{role === 'Provider' &&
						user != null ?
						<>
							{object?.status !== 'Pending' &&
								<form onSubmit={handleSubmit} className="mb-5">
									<div className="mt-2">
										<span className="font-bold text-2xl">
											TO BE FILLED OUT BY LICENSED PRACTITIONER
										</span>
										<div className="mt-5">
											<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 rounded-md bg-gray-200">
												<div className="my-4 lg:my-10">
													<Image
														src="/myImages/logo-purple.svg"
														alt="Profile"
														width={45}
														height={45}
														className="h-[45px] w-[150px] lg:w-[500px] ml-0 lg:ml-5" // Adjusted width for responsive screens
													/>
												</div>
												<div className="flex flex-col items-start lg:items-center my-2 lg:my-5">
													<div className="space-y-2">
														<div className="flex flex-col lg:flex-row">
															<span className="font-bold text-black">Name :</span>
															<span className="text-gray-500 lg:ml-2">
																{user?.full_name}
															</span>
														</div>
														<div className="flex flex-col lg:flex-row">
															<span className="font-bold text-black">Email :</span>
															<span className="text-gray-500 lg:ml-2">
																{user?.email}
															</span>
														</div>
														<div className="flex flex-col lg:flex-row">
															<span className="font-bold text-black">License No :</span>
															<span className="text-gray-500 lg:ml-2">
																{license?.number}
															</span>
														</div>
														<div className="flex flex-col lg:flex-row">
															<span className="font-bold text-black">License State :</span>
															<span className="text-gray-500 lg:ml-2">
																{license?.state}
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="my-5">
											<div className="grid grid-cols-1 mt-2">
												<span className="text-xl font-semibold ,">
													Medical Diagnosis & Code<span className="text-red-500">&nbsp;*</span>
												</span>
												<textarea
													id="diagnosis"
													name="diagnosis"
													placeholder="Example: 724.2 (Lumbar Back Pain)"
													required={true}
													value={formData.diagnosis}
													onChange={handleChange}
													disabled={isReadOnly ? true : false}
													className="border p-4 mt-[12px] h-[100px] rounded-xl outline-none"
												/>
											</div>
											<div className="grid grid-cols-1 mt-5">
												<span className="text-xl font-semibold">
													Describe treatment, frequency, and dosage<span className="text-red-500">&nbsp;*</span>
												</span>
												<textarea
													id="treatment"
													name="treatment"
													placeholder="Example: Massage therapy once a week for the year"
													required={true}
													value={formData.treatment}
													onChange={handleChange}
													disabled={isReadOnly ? true : false}
													className="border p-4 mt-[12px] h-[100px] rounded-xl outline-none"
												/>
											</div>
											<div className="grid grid-cols-1 mt-5">
												<span className="text-xl font-semibold ,">
													How will the treatment alleviate the diagnosed condition? <span className="text-red-500">&nbsp;*</span>
												</span>
												<textarea
													id="how_to_alleviate"
													name="how_to_alleviate"
													placeholder="Treatment alleviate the diagnosed condition"
													required={true}
													value={formData.how_to_alleviate}
													onChange={handleChange}
													disabled={isReadOnly ? true : false}
													className="border p-4 mt-[12px] h-[100px] rounded-xl outline-none"
												/>
											</div>
											<div className="grid grid-cols-1 mt-5">
												<div>
													<div className="w-full">
														<label className="block mb-2 text-xl font-semibold ,">
															Condition Type<span className="text-red-500">&nbsp;*</span>
														</label>
														<div className="mt-[12px]">
															<select
																name="conditionType"
																value={formData.conditionType}
																onChange={handleChange}
																required
																disabled={isReadOnly ? true : false}
																className="mt-1 h-[48px] block w-full border-[#cccccc] rounded-md shadow-sm focus:border-FF1F9D focus:ring focus:ring-FF1F9D focus:ring-opacity-50"
															>
																{conditions.map((condition) => (
																	<option key={condition} value={condition}>
																		{condition}
																	</option>
																))}
															</select>
														</div>
													</div>
												</div>
											</div>
											<div className="grid grid-cols-1 mt-5 lg:grid-cols-2 md:grid-cols-2 gap-4">
												<div>
													<InputField
														label="Start Date"
														name="startDate"
														value={formData.startDate}
														placeholder="Start Date"
														type="date"
														onChange={handleChange}
														disabled={isReadOnly ? true : false}
														required={true}
													/>
												</div>
												{formData.conditionType !== "Lifelong treatment" && (
													<div>
														<InputField
															label="End Date"
															name="endDate"
															value={formData.endDate}
															placeholder="End Date"
															type="date"
															onChange={handleChange}
															disabled={isReadOnly ? true : false}
															required={true}
														/>
													</div>
												)}
											</div>
										</div>

										<div className="grid grid-cols-1 my-5">
											<label className="block mb-2 text-xl font-semibold ,">
												Additional Comments
											</label>

											<textarea
												id="additional_comment"
												name="additional_comment"
												placeholder=""
												value={formData.additional_comment}
												onChange={handleChange}
												disabled={isReadOnly ? true : false}
												className="border p-4 mt-[12px] h-[100px] rounded-xl outline-none"
											/>
										</div>
										<div className="flex items-center mt-4">
											<input
												type="checkbox"
												id="useSignature"
												name="useSignature"
												checked={formData.useSignature}
												onChange={handleChangeCheckBox}
												disabled={isReadOnly ? true : false}
												className="mr-2"
											/>
											<label htmlFor="useSignature" className="text-lg">
												Use signature on file
											</label>
										</div>

										<div className="flex justify-between bg-gray-200 rounded-md mt-5 p-4">
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
														{!(user?.signature == "" || user?.signature == null || user?.signature == undefined) ? (
															<span>
																<img src={user?.signature} alt={"Signature"} />
															</span>
														) : null}
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="mx-3 lg:mx-10 grid grid-cols-1 mb-5">
										<div className="flex justify-center gap-4">
											{(object?.status == 'Processing' || object?.status == 'Requested Info') ? <Button type="submit" className="bg-[#751A9B] text-white h-12 font-semibold w-[161px] hover:bg-purple-700 text-base py-2 px-4 rounded-md" disabled={!formData.useSignature} onClick={() => setStatus('Approved')} >Accept Request</Button> : null}
											{object?.status == 'Processing' ? < Button type="button" className="bg-[#491161] text-white h-12 font-semibold w-[161px] hover:bg-purple-700 text-base py-2 px-4 rounded-md" onClick={() => requestInfo()}> Request Info</Button> : null}
											{(object?.status == 'Processing' || object?.status == 'Requested Info') ? <Button type="submit" className="bg-transparent border border-[#751A9B] text-[#751A9B] h-12 font-semibold w-[161px] hover:bg-purple-700 hover:text-white text-base py-2 px-4 rounded-md" onClick={() => setStatus('Rejected')}>Reject Request</Button> : null}
										</div>
									</div>
								</form>
							}
						</>
						:
						<></>
					}
					{object?.status == 'Requested Info' &&
						<Chatpage id={id} user_id={user.id} user={user} chatmessage="Query Details" entity="lmn" />
					}
					<div className="mx-3 lg:mx-10 grid grid-cols-1 my-7">
						<div className="flex justify-center gap-4">
							{object?.status == 'Approved' ? < Button type="button" className="bg-[#491161] text-white h-12 font-semibold w-[181px] hover:bg-purple-700 text-base py-2 px-4 rounded-md nowrap" onClick={() => startDownload()}> Download Letter</Button> : null}
						</div>
					</div>
				</div>
			}
		</div >
	);
};

export default Detail;
