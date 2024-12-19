"use client";

import AuthWrapper from "@/components/AuthWrapper";
import Button from "@/components/Button";
import TableLayout from "@/components/TableLayout";
import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import withAuth from '@/app/auth/auth/authHOC'

const Profile = () => {
	const router = useRouter();
	const { data: session }: any = useSession();
	const [data, setData] = useState([]);

	const [loading, setLoading] = useState(true);
	const [userInfo, setUserInfo] = useState<any | {}>({});
	const [role, setRole] = useState<string | null>(null);

	const [isAlert, setIsAlert] = useState(Boolean);
	const [formData, setFormData] = useState({
		is_alerts: 0,
	});

	const handleToggle = async () => {
		const newValue = !isAlert;
		setIsAlert(newValue);

		setFormData((prevData) => ({
			...prevData,
			is_alerts: newValue ? 1 : 0,
		}));

		try {
			const token = session.token;
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/toggle-alerts`, {
				is_alerts: newValue ? 1 : 0,
			}, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			fetchData();
		} catch (error) {
			console.error('Error while sending toggle state:', error);
		}
	};

	useEffect(() => {
		if (!session) return;
		setRole(session.user.role);
	}, [session]);

	const fetchData = async () => {
		try {
			const token = session.token; // Access token from user object
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/user`,
				{
					headers: {
						Authorization: `Bearer ${token}`, // Replace yourToken with the actual token
					},
				}
			);
			setUserInfo(response.data.result);
			setIsAlert(response.data.result.info.is_alerts)

		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!session) return; // Early return if session is not available
		fetchData();
	}, [session]);

	useEffect(() => {
		if (!session) return; // Early return if session is not available

		const fetchData = async () => {
			try {
				const token = session.token; // Access token from user object

				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}api/transaction/list`,
					{
						headers: {
							Authorization: `Bearer ${token}`, // Replace yourToken with the actual token
						},
					}
				);
				setData(response.data.result);
				// setPaginationData(response.data.result);
				console.log(response.data.result.total_member_profiles)
			} catch (error) {
				// setError((error as Error).message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [session]);

	const handleChangePassword = () => {
		router.push("/auth/change-password");
	};

	const columns = [
		{
			header: "amount",
			accessor: "amount",
			Cell: ({ value }: { value: string }) => <span>$ {value}</span>,
		},
		{
			header: "Created Date",
			accessor: "created_at",
			Cell: ({ value }: { value: string }) => (
				<span>{moment(value).format("YYYY-MM-DD")}</span>
			),
		},
	];

	const padIdWithZeros = (id: any) => {
		return String(id).padStart(5, '0');
	};

	return (
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
			<div className="xl:mx-8 lg:mx-8 md:mx-8 mx-3 mt-4 mb-4">
				<div className="mb-5 flex justify-between items-center">
					<span className="text-[28px] font-bold">Profile</span>
					{role === 'provider' &&
						<div className="flex items-center gap-3">
							<div>
								<span className="text-lg font-bold">Turn {isAlert ? "off" : "on"} alerts</span>
							</div>
							<div
								className={`relative w-12 h-6 flex items-center px-1 rounded-full cursor-pointer transition-colors duration-300 
								onClick={handleToggle} 
							${isAlert ? 'bg-green-500' : 'bg-gray-300'}`}
							>
								<div
									className={`absolute w-5 h-5 bg-white rounded-full transition-transform duration-300 
								${isAlert ? 'translate-x-6' : 'translate-x-0'}`}
								/>

							</div>
						</div>
					}
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="bg-white  rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] p-6 flex flex-col items-start">
						<div className="profile-fix flex flex-col sm:flex-row items-center mb-4 w-full">

							{userInfo ? (
								<Image
									src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${userInfo?.info?.avatar}`}
									alt="Profile Image Preview"
									className="object-cover min-h-[150px] min-w-[150px] rounded-full h-[150px] w-[150px]"
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
							<div className="flex flex-col sm:ml-4 sm:mt-4 xl:mt-0 lg:mt-4 md:mt-4 text-left sm:text-left w-full">
								<div className="flex items-center justify-between">
									<span
										className="text-xl font-bold text-gray-800 truncate w-[70%]"
										title={userInfo?.info?.full_name}
									>
										{userInfo?.info?.full_name}
									</span>
									<span className="truncate w-[70%]">
										<strong>ID:</strong> {padIdWithZeros(userInfo?.info?.id)}
									</span>
								</div>
								<span className="flex items-center sm:justify-start text-sm font-medium mt-2 truncate w-full">
									<Image
										src="/myImages/mail.png"
										alt="mail"
										width={20}
										height={20}
										className="mr-2 my-3"
									/>
									<span className="truncate w-[70%]" title={userInfo?.info?.email}>Email ID: {userInfo?.info?.email}</span>
								</span>
								<span className="flex items-center sm:justify-start text-sm font-medium mt-2 truncate w-full">
									<Image
										src="/myImages/phone-call.png"
										alt="phone"
										width={20}
										height={20}
										className="mr-2"
									/>
									<span className="truncate" title={userInfo?.info?.phone}>Phone: {userInfo?.info?.phone}</span>
								</span>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row justify-center gap-4 w-full mt-4">
							<Button
								className="bg-[#751A9B] text-white font-medium whitespace-nowrap px-4 hover:bg-purple-700 h-[48px] rounded-lg w-full xl:w-[161px]"
								onClick={handleChangePassword}
							>
								Change Password
							</Button>
							{role == 'Provider' ?
								<Link href="/edit-profile-provider">
									<Button
										className="border-2 border-[#751A9B] whitespace-nowrap px-4 text-[#751A9B] font-medium hover:bg-[#751A9B] h-[48px] hover:text-white rounded-md w-full xl:w-[161px]"
									>
										Edit Profile
									</Button>
								</Link>
								:
								<Link href="/edit-profile">
									<Button
										className="border-2 whitespace-nowrap border-[#751A9B] text-[#751A9B] font-medium hover:bg-[#751A9B] h-[48px] hover:text-white rounded-md w-full xl:w-[161px]"
									>
										Edit Profile
									</Button>
								</Link>
							}
						</div>
					</div>
					<div className="bg-white  rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] p-6">
						<h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
						<ul className="list-none pl-0">
							<li className="mb-2 text-sm font-medium">Name: {userInfo?.info?.full_name}</li>
							<li className="mb-2 text-sm font-medium">Address: {userInfo?.info?.address}</li>
							<li className="mb-2 text-sm font-medium">Address 2: {userInfo?.info?.address2 || '---'}</li>
							<li className="mb-2 text-sm font-medium">State: {userInfo?.info?.state}</li>
							<li className="mb-2 text-sm font-medium">Zip code: {userInfo?.info?.zip}</li>
						</ul>
					</div>
				</div>
			</div>
			{role == 'Member' ?
				<div className="xl:mx-8 lg:mx-8 md:mx-8 mx-3">
					<div className="mb-4 pb-4 border-b-2">
						<span className="text-xl font-bold text-gray-800 mb-4">Medical History</span>
					</div>
					<div className="bg-[#F8F9FB] rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
						<div className="p-6">
							<h3 className="text-lg font-bold text-gray-700 mb-2">Medical History</h3>
							<ul className="list-none pl-4">
								<li className="text-sm font-semibold flex items-center">
									<div className="w-[10px] h-[10px] rounded-full bg-black mr-2 flex-shrink-0 mt-[3px]"></div>
									{(
										userInfo?.info?.medical_history?.mhcp1?.map((option: any) => {
											if (option === 'Other' && userInfo?.info?.medical_history?.mhcp1Other) {
												return `${option} (${userInfo?.info?.medical_history.mhcp1Other})`;
											} else if (option === 'An Autoimmune Disease' && userInfo?.info?.medical_history?.mhcp1AI) {
												return `${option} (${userInfo?.info?.medical_history.mhcp1AI})`;
											}
											return option;
										})
											.filter(Boolean) // Remove any falsy values from the array
											.join(', ') // Join the array into a string
									) || 'N/A'}
								</li>
							</ul>
							<h3 className="text-lg font-bold text-gray-700 mb-2 mt-4">Family History</h3>
							<ul className="list-none pl-4">
								<li className="text-sm font-semibold flex items-center">
									<div className="w-[10px] h-[10px] rounded-full bg-black mr-2 flex-shrink-0 mt-[3px]"></div>
									<span>
										{(
											userInfo?.info?.medical_history?.fh?.map((option: any) => {
												if (option === 'Other' && userInfo?.info?.medical_history?.fhOther) {
													return `${option} (${userInfo?.info?.medical_history.fhOther})`;
												} else if (option === 'An Autoimmune Disease' && userInfo?.info?.medical_history?.fhAI) {
													return `${option} (${userInfo?.info?.medical_history.fhAI})`;
												}
												return option;
											})
												.filter(Boolean) // Remove any falsy values from the array
												.join(', ') // Join the array into a string
										) || 'N/A'}
									</span>
								</li>
							</ul>

						</div>
						<div className="p-6">
							<h2 className="text-xl font-bold text-gray-800 mb-4">Preventive Health</h2>
							<ul className="list-none pl-4">
								<li className="text-sm font-semibold flex items-center">
									<div className="w-[10px] h-[10px] rounded-full bg-black mr-2 flex-shrink-0 mt-[3px]"></div>
									{(
										userInfo?.info?.medical_history?.phs?.map((option: any) => {
											if (option === 'Other' && userInfo?.info?.medical_history?.phsOther) {
												return `${option} (${userInfo?.info?.medical_history.phsOther})`;
											} else if (option === 'An Autoimmune Disease' && userInfo?.info?.medical_history?.phsAI) {
												return `${option} (${userInfo?.info?.medical_history.phsAI})`;
											}
											return option;
										})
											.filter(Boolean) // Remove any falsy values from the array
											.join(', ') // Join the array into a string
									) || 'N/A'}
								</li>
							</ul>
						</div>
					</div>
				</div>
				: null}
			<TableLayout
				title="Payment History"
				columns={columns}
				data={data}
				boxShadow={true}
			/>
		</AuthWrapper>
	);
}

export default withAuth(Profile,  ['Provider','Member']);
