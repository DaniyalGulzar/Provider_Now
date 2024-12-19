"use client"

import React from "react";
import { useEffect, useState } from "react";
import TableLayout from "@/components/TableLayout";
import pagesvg from "../../../public/Group185.svg";
import box from "../../../public/Group186.svg";
import money from "../../../public/Group187.svg";
import Button from "@/components/Button";
import AuthWrapper from "@/components/AuthWrapper";
import Link from "next/link";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useSession } from "next-auth/react";
import moment from "moment";
import Detail from "@/components/MemberDetails";
import StatsBox from "@/components/StatsBox";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import withAuth from '@/app/auth/auth/authHOC'
import { FaEye } from "react-icons/fa";

const Overview = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
	const columns = [
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
	];

	const getStatusClass = (status: string) => {
		switch (status) {
			case "Pending":
				return "bg-yellow-100 text-yellow-800"; // Yellow for Pending
			case "Accepted":
				return "bg-green-100 text-green-800";
			case "Approved":
				return "bg-green-100 text-green-800"; // Green for Approved
			case "Approved":
				return "bg-green-100 text-green-800"; // Green for Approved
			case "Rejected":
				return "bg-red-100 text-red-800"; // Red for Rejected
			case "Requested Info":
				return "bg-orange-100 text-orange-800"; // Orange for Requested Info
			case "Waiting":
				return "bg-blue-100 text-blue-800"; // Blue for Waiting
			case "Processing":
				return "bg-teal-100 text-teal-800"; // Teal for Processing
			case "Completed":
				return "bg-indigo-100 text-indigo-800"; // Indigo for Completed
			default:
				return "";
		}
	};

	const [loading, setLoading] = useState(true);
	const [requests, setRequests] = useState([]);
	const [virtualRequests, setVirtualRequests] = useState([]);
	const [result, setResult] = useState<any | {}>({});
    const router = useRouter();
	const { data: session }: any = useSession(); // Access session data
	const sortOrder = 'desc';
    const [paginationData, setPaginationData] = useState<any>([]);

	const fetcVirtualhData = async () => {
        try {
            const token = session.token;

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}api/virtual-request/list?sortOrder=${sortOrder ?? ''}&page=${currentPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setVirtualRequests(response.data.result);
            setPaginationData(response.data.result);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

	const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        if (!session) return;
        fetcVirtualhData();
    }, [session, currentPage]);

	useEffect(() => {
		if (!session) return; // Early return if session is not available

		const fetchData = async () => {
			try {
				const token = session.token; // Access token from user object
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}api/dashboard`,
					{
						headers: {
							Authorization: `Bearer ${token}`, // Replace yourToken with the actual token
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

		fetchData();
	}, [session]);

	const openDetails = (id: any) => {
        router.push(`/virtual-consultation/${id}`)
    }

    const handleAccept = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to accept this request.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = session.token;
                    await axios.get(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/virtual-request/accept/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    openDetails(id)
                    toast.success("Request accepted successfully");
                    fetcVirtualhData();
                } catch (error: any) {
                    toast.error(error.response.data.message)
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    const handleReject = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to reject this request.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = session.token;
                    await axios.get(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/virtual-request/reject/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    toast.success("Request rejected successfully");
                    fetcVirtualhData();
                } catch (error: any) {
                    toast.error(error.response.data.message)
                } finally {
                    setLoading(false);
                }
            }
        });
    };

	const columns1: any = [
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
			Cell: ({ row }: { row: any }) => {
				const status = row.status;
				const id = row.id;
				const provider = row.provider;

				return (
					<div className="flex space-x-4">
						{(session && status === "Pending" && session.user.role === 'Provider') ? (
							<>
								<button
									className="bg-[#C7F0D9] text-black px-2 py-1 rounded hover:bg-green-600"
									onClick={() => handleAccept(id)}
								>
									Accept
								</button>
								<button
									className="bg-[#F9C7C9] text-black px-2 py-1 rounded hover:bg-red-600"
									onClick={() => handleReject(id)}
								>
									Reject
								</button>
							</>
						) : (
							provider ?
							// <button
							// 	className="underline w-8 h-8 bg-gradient flex justify-center items-center rounded cursor-pointer"
							// 	onClick={() => { openDetails(id) }}
							// >
							// 	<FaEye color="white" />
							// </button>

							<button
								className="underline cursor-pointer"
								onClick={() => { openDetails(id) }}
							>
								View Details
							</button>
							:
							"N/A"
						)}

					</div>
				);
			},
		}
	];

	const statsCard = [{
		icon: pagesvg,
		number: result?.total_lmn_requests,
		description: "Total ProviderNow LMN Request",
	},
	{
		icon: box,
		number: result?.total_providernow_requests,
		description: "Total providerNow Virtual consultants",
	}, {
		icon: money,
		number: '$' + result?.total_spendings,
		description: "Total Spendings",
	}];

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
			<div>
				<div className="flex flex-col sm:flex-row sm:justify-end mt-8 gap-4  xl:mx-8 lg:mx-8 md:mx-8 mx-3 ">
					<Link href="/request-letter">
						<Button className="bg-white border border-[#631681] text-[#631681] text-sm lg:text-base w-full font-semibold px-4 py-2 rounded w-90 hover:bg-[#631681] hover:text-white">
							Request a Letter of Medical Necessity
						</Button>
					</Link>
					<Link href="/request-provider">
						<Button className="bg-[#631681] font-semibold text-white px-4 py-2 text-sm lg:text-base w-full rounded w-90 hover:bg-purple-700">
							Request a ProviderNow
						</Button>
					</Link>
				</div>
				<div className="flex flex-wrap lg:flex-nowrap justify-between mt-8 gap-4 xl:mx-8 lg:mx-8 md:mx-8 mx-3">
					{statsCard.map((stat, index) => (
						<StatsBox
							key={index}
							icon={stat.icon} // Assuming icons are SVGs
							number={stat.number}
							description={stat.description}
						/>
					))}
				</div>
				<div>
				<TableLayout
					title="List of LMN Request"
					columns={columns}
					boxShadow={true}
					data={requests}
					viewalllink={{ href: "/list-lmn", text: "View All" }}
				/>
				<TableLayout
                    title="List of virtual consultation requests"
                    columns={columns1}
                    data={virtualRequests}
                    boxShadow={true}
                />
				{virtualRequests.length > 10 &&
					<Pagination
						data={paginationData}
						currentPage={currentPage}
						lastPage={paginationData?.last_page}
						onPageChange={handlePageChange}
					/>
				}
				</div>
			</div>
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
		</AuthWrapper>
	);
};
export default withAuth(Overview,  ['Member']);