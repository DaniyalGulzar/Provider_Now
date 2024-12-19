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
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import withAuth from '@/app/auth/auth/authHOC'

const ListProvider = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const { data: session, }: any = useSession();
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const router = useRouter();
    const [paginationData, setPaginationData] = useState<any>([]);

    const sortOrder = 'desc';
    const dropdownOptions = [
        { label: "Oldest First", href: "/list-lmn?sortOrder=asc" },
        { label: "Latest First", href: "/list-lmn?sortOrder=desc" },
    ];

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
                    fetchData();
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
                    fetchData();
                } catch (error: any) {
                    toast.error(error.response.data.message)
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    const columns: any = role === 'Provider' ? [
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
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${value.avatar}`}
                        alt={value.full_name}
                        className="w-10 h-10 rounded-full min-w-10 min-h-10"
                    />
                    <span>{value.full_name}</span>
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

                return (
                    <div className="flex space-x-4">
                        {(status === "Pending" && session.user.role === 'Provider') ? (
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
                            <button
                                className="underline cursor-pointer"
                                onClick={() => { openDetails(id) }}
                            >
                                View Details
                            </button>
                        )}

                    </div>
                );
            },
        }
    ] :
        [
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
                            <img
                                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${value.avatar}`}
                                alt={value.full_name}
                                className="w-10 h-10 rounded-full min-w-10 min-h-10"
                            />
                            <span>{value.full_name}</span>
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
                            {(status === "Pending" && session.user.role === 'Provider') ? (
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
        ]

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

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const fetchData = async () => {
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
            setRequests(response.data.result);
            setPaginationData(response.data.result);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!session) return;
        fetchData();
    }, [session, currentPage]);

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
                <TableLayout
                    title="List of virtual consultation requests"
                    columns={columns}
                    data={requests}
                    boxShadow={true}
                    dropdown={{
                        label: "Sort By",
                        options: dropdownOptions,
                    }}
                />
                <Pagination
                    data={paginationData}
                    currentPage={currentPage}
                    lastPage={paginationData?.last_page}
                    onPageChange={handlePageChange}
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
                        <Detail id={selectedRequest.id} />
                    </div>
                </div>
            )}
        </>
    );
};
export default withAuth(ListProvider, ['Provider','Member']);