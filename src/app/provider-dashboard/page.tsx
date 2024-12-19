"use client";
import React, { useEffect, useState } from "react";
import TableLayout from "@/components/TableLayout";
import AuthWrapper from "@/components/AuthWrapper";
import pagesvg from "../../../public/Group185.svg";
import box from "../../../public/Group186.svg";
import money from "../../../public/Group187.svg";
import DashboardStats from "@/components/DashboardStats";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useSession } from "next-auth/react";
import moment from "moment";
import Detail from "@/components/MemberDetails";
import withAuth from '@/app/auth/auth/authHOC'

const ProviderDashboard = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
	const [requests, setRequests] = useState<any[]>([]);
	const [result, setResult] = useState<any | {}>({});
	const [loading, setLoading] = useState(true);
	const { data: session }: any = useSession();

	const columns = [
		{
			header: "Request ID",
			accessor: "id",
			Cell: ({ value }: { value: string }) => <span>{value}</span>,
		},
		{
			header: "Member Name",
			accessor: "member",
			renderImage: ({ value }: { value: { avatar: string; full_name: string } }) => (
				<div className="flex items-center space-x-4">
				{value ? (
					<>
					<img
						src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${value.avatar}`}
						alt={value.full_name}
						className="w-10 h-10 rounded-full min-w-10 min-h-10"
					/>
					<div className="relative group">
						<span className="w-44 truncate block">{value.full_name}</span>
						<span className="absolute z-10 left-16 ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
						{value.full_name} {/* Tooltip shows the full name */}
						</span>
					</div>
					</>
				) : (
					<div>N/A</div>
				)}
				</div>
			),
		},
		{
			header: "Location",
			accessor: "full_address",
			Cell: ({ value }: { value: string }) => (
				<div className="relative group">
				  <span className="w-44 truncate block">{value}</span>
				  <span className="absolute z-[1] left-[90%] ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
					{value} {/* Tooltip shows the full address */}
				  </span>
				</div>
			),
		},
		{
			header: "Date",
			accessor: "created_at",
			Cell: ({ value }: { value: string }) => (
				<span>{moment(value).format("YYYY-MM-DD")}</span>
			),
		},
		{
			header: "Status",
			accessor: "status",
			Cell: ({ value }: { value: string }) => (
				<span className={`px-2 py-1 rounded ${getStatusClass(value)}`}>
					{value}
				</span>
			),
		},
		{
			header: "Action",
			accessor: "id",
			Cell: ({ value }: { value: string }) => (
				<button
					className="underline cursor-pointer"
					onClick={() => openModal(value)}
				>
					View Details
				</button>
			),
		},
	];

	const openModal = async (id: string) => {
		const requestDetails = requests.find((req: any) => req.id === id);
		setSelectedRequest(requestDetails);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setSelectedRequest(null);
	};

	const getStatusClass = (status: string) => {
		switch (status) {
			case "Pending":
				return "bg-yellow-100 text-yellow-800";
			case "Accepted":
				return "bg-green-100 text-green-800";
			case "Approved":
				return "bg-green-100 text-green-800";
			case "Rejected":
				return "bg-red-100 text-red-800";
			case "Requested Info":
				return "bg-orange-100 text-orange-800";
			case "Waiting":
				return "bg-blue-100 text-blue-800";
			case "Processing":
				return "bg-teal-100 text-teal-800";
			case "Completed":
				return "bg-indigo-100 text-indigo-800";
			default:
				return "";
		}
	};

	const fetchData = async () => {
		setLoading(true);
		try {
			const token = session.token;
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}api/dashboard`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setRequests(response.data.result.lmn_requests);
			setResult(response.data.result);
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!session) return;
		fetchData();
	}, [session]);

	return (
		<>
			<AuthWrapper>
				<Circles
					height="80"
					width="80"
					color="#491161 "
					ariaLabel="bars-loading"
					wrapperStyle={{}}
					wrapperClass="loading-spinner-overlay"
					visible={loading}
				/>
				<DashboardStats
					stats1={{
						icon: pagesvg,
						number: result?.total_lmn_requests,
						description: "Total ProviderNow LMN Requests",
					}}
					stats2={{
						icon: box,
						number: result?.total_providernow_requests,
						description: "Total providerNow Virtual consultants",
					}}
					stats3={{
						icon: money,
						number: result?.total_earnings ? "$" + result?.total_earnings : "$0",
						description: "Total Earning",
					}}
				/>
				<TableLayout
					title="List of LMN Request"
					columns={columns}
					boxShadow={true}
					data={requests}
					viewalllink={{ href: "/list-lmn", text: "View All" }}
				/>
			</AuthWrapper>

			{modalOpen && selectedRequest && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-60 backdrop-blur-sm">
					<div className="bg-white mx-4 lg:max-w-5xl h-[700px] overflow-auto w-full relative">
						<button
							className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
							onClick={closeModal}
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
						<Detail
							id={selectedRequest.id}
							dismissRequest={closeModal}
							refreshRequest={fetchData}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default withAuth(ProviderDashboard, ['Provider']);
