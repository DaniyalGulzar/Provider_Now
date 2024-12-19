"use client";
import React, { useEffect, useState } from "react";
import AuthWrapper from "../AuthWrapper";
import TableLayout from "../TableLayout";
import DashboardStats from "../DashboardStats";
import pagesvg from "../../../public/Group185.svg";
import box from "../../../public/Group186.svg";
import money from "../../../public/Group187.svg";
import Link from "next/link";
import moment from "moment";
import Pagination from "../Pagination";
import { useSession } from "next-auth/react";
import axios from "axios";
import Detail from "../MemberDetails";
import Button from "../Button";
import toast from "react-hot-toast";
import { IoTrash } from "react-icons/io5";

const ProviderManagement = () => {
  const [memberRequests, setMemberRequest] = useState<any>([]);
  const { data: session, status }: any = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [paginatedData, setPaginatedData] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [isReadOnly, setIsReadOnly] = useState<Boolean>(true);
  const [modalType, setModalType] = useState<string | null>(null);
  const [providerToDelete, setProviderToDelete] = useState<string | null>(null);
  const [blockedMembers, setBlockedMembers] = useState<{ [key: string]: boolean }>({});

  const handleOpenDeleteModal = (id: string) => {
    setProviderToDelete(id);
    setModalType("delete");
  };

  const handleConfirmDelete = async () => {
    if (!providerToDelete) return; // Ensure we have a member to delete

    try {
      setLoading(true);
      const token = session.token; // Access token from user object

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/user/delete/${providerToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token
        },
      });
      toast.success("Deleted successfully!");
fetchData();
      setMemberRequest((prevMembers: any[]) =>
        prevMembers.filter((member) => member.id !== providerToDelete)
      );

      setLoading(false);
      setModalType(null);
    } catch (error) {
      toast.error("Failed to delete!");
      setLoading(false);
    }
  };

  const handleCloseModal = () => setModalType(null);


  const handleBlockToggle = async (id: string) => {
    const isCurrentlyBlocked = blockedMembers[id];

    try {
      setLoading(true);
      const token = session.token;

      const apiEndpoint = isCurrentlyBlocked
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}api/user/un-block/${id}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}api/user/block/${id}`;

      await axios.get(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      toast.success(`${isCurrentlyBlocked ? "Unblocked" : "Blocked"} successfully!`);

      setBlockedMembers((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));

    } catch (error) {
      toast.error(`Failed to ${isCurrentlyBlocked ? "unblock" : "block"} the member!`);
    } finally {
      setLoading(false);
    }
  };

  const providerColumn = [
    {
      header: "Provider Name",
      accessor: "full_name", // Ensuring we're using the correct field
      Cell: ({ row }: { row: any }) => {
        return (
          <div className="flex items-center space-x-4">
            {row ? (
              <>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${row.avatar}`}
                  alt={row.full_name}
                  className="w-10 h-10 rounded-full min-w-10 min-h-10"
                />
                <div className="relative group">
                  <span className="w-44 truncate block">{row.full_name}</span>
                  <span className="absolute z-10 left-16 ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                    {row.full_name} {/* Tooltip shows the full name */}
                  </span>
                </div>
              </>
            ) : (
              <div>N/A</div>
            )}
          </div>
        );
      },
    },
    {
      header: "Contact",
      accessor: "phone",
      Cell: ({ value }: { value: string }) => (
        <div className="relative group">
          <span className="w-44 truncate block">{value}</span>
          <span className="absolute z-[1] left-16 ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
            {value} {/* Tooltip shows the full address */}
          </span>
        </div>
      ),
    },
    {
      header: "Network",
      accessor: "network",
      Cell: ({ value }: { value: string }) => (
        <div className="relative group">
          <span className="w-44 truncate block">{value || "N/A"}</span>
          <span className="absolute z-[1] left-16 ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
          {value || "N/A"} {/* Tooltip shows the full address */}
          </span>
        </div>
      ),
    },
    {
      header: "Verified",
      accessor: "is_approved",
      Cell: ({ value }: { value: any }) => (
        <span className={`px-2 py-1 rounded ${getStatusClass(value)}`}>
          {value === 0 ? "Pending" : value === 1 ? "Accepted" : "Rejected"}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: "id", // Pass the correct ID for each member
      Cell: ({ value }: { value: string }) => (
        <>
          <div className="flex gap-3">
            <button
              className="underline cursor-pointer"
              onClick={() => openDetailModal(value)} // Open the modal with the correct ID
            >
              View Details
            </button>

            <Button
            className="border-0 bg-red-500 flex justify-center items-center text-white w-[40px] h-[40px] rounded font-medium underline"
            onClick={() => handleOpenDeleteModal(value)} // Open delete modal
            >
            <IoTrash />
            </Button>

            <Button
            onClick={() => handleBlockToggle(value)}
            className={`text-white rounded px-5 ${blockedMembers[value] ? 'bg-red-500' : 'bg-[#751A9B]'}`}
            >
            {blockedMembers[value] ? 'Unblock' : 'Block'}
            </Button>
        </div>
      </>
      ),
    },
  ];

  const openDetailModal = (id: string) => {
    const requestDetails = memberRequests.find((req: any) => req.id === id);
    setSelectedRequest(requestDetails);
    setModalOpen(true); // This ensures the modal opens
  };

  const closeDetailModal = () => {
    setModalOpen(false); // This ensures the modal closes
    setSelectedRequest(null);
  };

  const getStatusClass = (status: any) => {
    switch (status) {
      case 0:
        return "bg-yellow-100 text-yellow-800"; // Yellow for Pending
      case 1:
        return "bg-green-100 text-green-800";
      case 2:
        return "bg-red-300 text-green-800";
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/user/list?type=provider&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.result.data);
      setMemberRequest(response.data.result.data);
      setPaginatedData(response.data.result);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    fetchData();
  }, [session, currentPage]);

  const handleApprove = async (id: string) => {
    try {
      setLoading(true);
      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/user/approve/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      toast.success("User approved successfully!");
      setModalOpen(false);
      const updatedRequests = memberRequests.map((request: any) =>
        request.id === id ? { ...request, status: "Approved" } : request
      );
      setMemberRequest(updatedRequests);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setLoading(true);
      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/user/reject/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      toast.success("User Rejected successfully!");
      setModalOpen(false);
      const updatedRequests = memberRequests.map((request: any) =>
        request.id === id ? { ...request, status: "Rejected" } : request
      );
      setMemberRequest(updatedRequests);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthWrapper>
        <div className="mt-5">
          <TableLayout
            title="Provider List"
            showSearch={true}
            columns={providerColumn}
            data={memberRequests}
            boxShadow={true}
          />
          {memberRequests.length > 0 && (
             <Pagination
             data={paginatedData}
             currentPage={currentPage}
             lastPage={paginatedData?.last_page}
             onPageChange={handlePageChange}
             />
          )}
        </div>

        {modalOpen && selectedRequest && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-60 backdrop-blur-sm">
            <div className="bg-white mx-4 lg:max-w-5xl h-[700px] overflow-auto w-full relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={closeDetailModal}
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
              <div className="text-2xl font-semibold pl-6 mt-3">Detail</div>
              <div className="p-6">
                <div className="mb-4">
                  <strong>First Name:</strong> {selectedRequest.first_name}
                </div>
                <hr />
                <div className="my-4">
                  <strong>Middle Name:</strong> {selectedRequest.middle_name}
                </div>
                <hr />
                <div className="my-4">
                  <strong>Last Name:</strong>{selectedRequest.last_name}
                </div>
                <hr />
                <div className="my-4">
                  <strong>Phone:</strong> {selectedRequest.phone}
                </div>
                <hr />
                <div className="my-4">
                  <strong>Date of Birth:</strong>{" "}
                  {moment(selectedRequest.dob).format("MMMM Do, YYYY")}
                </div>
                <hr />
                <div className="my-4">
                  <strong>Address:</strong> {selectedRequest.address}
                </div>
                <hr />
                <div className="my-4">
                  <strong>City:</strong>  {selectedRequest.city}
                </div>
                <hr />
                <div className="my-4">
                  <strong>Network:</strong>  {selectedRequest.network || "N/A"}
                </div>
                <hr />
                <div className="my-4">
                  <strong>License Details:</strong>
                  {selectedRequest.license_details ? (
                    <>
                      <ul>
                        {(Array.isArray(selectedRequest.license_details)
                          ? selectedRequest.license_details
                          : JSON.parse(selectedRequest.license_details)
                        )?.map((license: any, index: any) => (
                          <li key={index}>
                            <strong>State:</strong> {license.state || 'N/A'}, <strong>Number:</strong> {license.number || 'N/A'}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
                <hr />
                {/* {selectedRequest.is_approved === 0 && */}
                  <div className="my-4 flex justify-center items-center gap-4">
                    <Button
                      onClick={() => handleApprove(selectedRequest?.id)}
                      className="text-[#751A9B] border border-[#751a9b] bg-white h-[48px] w-[161px] font-semibold text-base py-2 px-4 rounded-md hover:bg-purple-700 hover:text-white"
                    >
                      Approve
                    </Button>
                    <Button onClick={() => handleReject(selectedRequest?.id)} className="bg-[#751A9B] text-white h-12 font-semibold hover:bg-purple-700 text-base w-44 py-2 px-4 rounded-md">Reject</Button>
                  </div>
                {/* } */}
              </div>
            </div>
          </div>
        )}

        {modalType === "delete" && providerToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg w-[90%] md:w-[60%] lg:w-[40%] shadow-lg">
              <h2 className="text-xl font-bold mb-4">
                Are you sure you want to delete this profile?
              </h2>
              <div className="flex justify-end gap-4 mt-4">
                <Button
                  className="border border-[#751A9B] text-[#751A9B] font-medium h-[40px] rounded-md w-full md:w-[128px]"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#751A9B] text-white font-medium h-[40px] rounded-md w-full md:w-[128px]"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

      </AuthWrapper>
    </>
  );
};

export default ProviderManagement;
