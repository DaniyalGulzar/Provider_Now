"use client"

import React from "react";
import { useEffect, useState } from "react";
import AuthWrapper from "@/components/AuthWrapper";
import TableLayout from "@/components/TableLayout";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useSession } from "next-auth/react";
import moment from "moment";
import Detail from "@/components/MemberDetails";
import Pagination from "../Pagination";
import Button from "../Button";
import toast from "react-hot-toast";

const RequestManagementScreen = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
	const [role, setRole] = useState<string | null>(null);
	const { data: session }: any = useSession();
	const handleAccept = async (id: string) => {
		try {
			const token = session.token;
			await axios.get(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}api/lmn-request/reset/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			toast.success("Request Successfull!");
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			setLoading(false);
		}
	}
	const columns: any = role == 'Provider' ? [
		{
			header: "Request ID",
			accessor: "id",
			Cell: ({ value }: { value: string }) => <span>{value}</span>,
		},
		{
			header: "Member Name",
			accessor: "member",
			renderImage: ({
				value,
			}: {
				value: { avatar: string; full_name: string };
			}) => (
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
				  <span className="absolute z-[1] left-10 ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
					{value} {/* Tooltip shows the full address */}
				  </span>
				</div>
			  ),
		},
		{
			header: "Date",
			accessor: "created_at",
			Cell: ({ value }: { value: string }) => <span>{moment(value).format('YYYY-MM-DD')}</span>,
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
			Cell: ({ value }: { value: any }) => (
				<button
					className="underline cursor-pointer"
					onClick={() => openModal(value)}
				>
					View Details
				</button>
			),
		},
	] : [
		{
			header: "Request ID",
			accessor: "id",
			Cell: ({ value }: { value: string }) => <span>{value}</span>,
		},
		{
			header: "Doctor Name",
			accessor: "provider",
			renderImage: ({
				value,
			}: {
				value: { avatar: string; full_name: string };
			}) => (
				value == null ? 'N/A' :
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
				  <span className="absolute z-[1] left-10 ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
					{value} {/* Tooltip shows the full address */}
				  </span>
				</div>
			  ),
		},
		{
			header: "Created At",
			accessor: "created_at",
			Cell: ({ value }: { value: string }) => (
				<div className="relative group">
					<span className="w-44 truncate block">
						{value ? (
							`${moment.duration(moment().diff(moment(value))).hours().toString().padStart(2, '0')}h 
							${moment.duration(moment().diff(moment(value))).minutes().toString().padStart(2, '0')}m 
							${moment.duration(moment().diff(moment(value))).seconds().toString().padStart(2, '0')}s`
						) : (
							'N/A'
						)}
					</span>
				<span className="absolute z-[1] left-20 ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
					{value} {/* Tooltip shows the full address */}
				</span>
				</div>
			),
		},
		{
			header: "Accepted At",
			accessor: "accepted_at",
			Cell: ({ value }: { value: string }) => (
				<div className="relative group">
					<span className="w-44 truncate block">
						{value ? (
							`${moment.duration(moment().diff(moment(value))).hours().toString().padStart(2, '0')}h 
							${moment.duration(moment().diff(moment(value))).minutes().toString().padStart(2, '0')}m 
							${moment.duration(moment().diff(moment(value))).seconds().toString().padStart(2, '0')}s`
						) : (
							'N/A'
						)}
					</span>
				<span className="absolute z-[1] left-20 ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
					{value} {/* Tooltip shows the full address */}
				</span>
				</div>
			),
		},
		{
			header: "Completed At",
			accessor: "completed_at",
			Cell: ({ value }: { value: string }) => (
				<div className="relative group">
					<span className="w-44 truncate block">
						{value ? (
							`${moment.duration(moment().diff(moment(value))).hours().toString().padStart(2, '0')}h 
							${moment.duration(moment().diff(moment(value))).minutes().toString().padStart(2, '0')}m 
							${moment.duration(moment().diff(moment(value))).seconds().toString().padStart(2, '0')}s`
						) : (
							'N/A'
						)}
					</span>
				<span className="absolute z-[1] left-20 ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
					{value} {/* Tooltip shows the full address */}
				</span>
				</div>
			),
		},
		{
			header: "Time to accept",
			accessor: "time_to_accept",
		},
		{
			header: "Time to complete",
			accessor: "time_to_complete",
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
			Cell: ({ value }: { value: string }) => {
				return(
				<>
					<div className="flex gap-4 items-center">
						<Button
							onClick={() => handleAccept(value)}
						 	className="border border-[#751A9B] rounded-lg hover:bg-[#751A9B] hover:text-white text-[#751A9B] px-4 py-2">Reset</Button>
						<Button
							className="underline cursor-pointer"
							onClick={() => openModal(value)}
						>
							View Details
						</Button>
					</div>
				</>
				)
			},
		},
	];

	useEffect(() => {
		if (!session) return; 
		setRole(session.user.role);
	}, [session]);

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

	const [loading, setLoading] = useState(true);
	const [paginationData, setPaginationData] = useState<any>([]);
	const [requests, setRequests] = useState([]);
	const itemsPerPage = 10;
	const [currentPage, setCurrentPage] = useState(1);

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		if (!session) return;

		const fetchData = async () => {
			try {
				const token = session.token; 
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}api/lmn-request/list?page=${currentPage}`,
					{
						headers: {
							Authorization: `Bearer ${token}`, // Replace yourToken with the actual token
						},
					}
				);
				setRequests(response.data.result.data);
				setPaginationData(response.data.result);
			} catch (error) {
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [session]);

	const openModal = async (id: string) => {
		const requestDetails = requests.find((req: any) => req.id === id);
		setSelectedRequest(requestDetails);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setSelectedRequest(null);
	};

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
				<br />
				<div className="mt-5">
				<TableLayout
					title="List of all letter of medical necessity requests"
					columns={columns}
					data={requests}
					boxShadow={true}
				/>
				{requests.length > 0 && (
					<Pagination
					data={paginationData}
					currentPage={currentPage}
					lastPage={paginationData?.last_page}
					onPageChange={handlePageChange}
					/>
				)}
				</div>
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
						/>
					</div>
				</div>
			)}
		</>
	);
};
export default RequestManagementScreen;