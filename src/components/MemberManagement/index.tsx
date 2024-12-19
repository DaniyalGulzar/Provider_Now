"use client";
import React, { useEffect, useState } from "react";
import AuthWrapper from "../AuthWrapper";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import TableLayout from "../TableLayout";
import Pagination from "../Pagination";
import Detail from "../MemberDetails";
import Button from "../Button";
import { IoTrash } from "react-icons/io5";
import toast from "react-hot-toast";
import moment from "moment";

const MemberManagement = () => {
  const [memberRequests, setMemberRequest] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [pagintedData, setPaginatedData] = useState<any>([]);
  const { data: session }: any = useSession();
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  const [blockedMembers, setBlockedMembers] = useState<{ [key: string]: boolean }>({});

  const openDetailModal = (id: string) => {
    const requestDetails = memberRequests.find((req: any) => req.id === id);
    setSelectedRequest(requestDetails);
    setModalOpen(true);
  };

  const closeDetailModal = () => {
    setModalOpen(false);
    setSelectedRequest(null);
  };

  const handleOpenDeleteModal = (id: string) => {
    setMemberToDelete(id);
    setModalType("delete");
  };

  const handleConfirmDelete = async () => {
    if (!memberToDelete) return; // Ensure we have a member to delete

    try {
      setLoading(true);
      const token = session.token; // Access token from user object

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/user/delete/${memberToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token
        },
      });
      fetchData(currentPage);

      toast.success("Deleted successfully!");

      setMemberRequest((prevMembers: any[]) =>
        prevMembers.filter((member) => member.id !== memberToDelete)
      );

      setLoading(false);
      setModalType(null);
    } catch (error) {
      toast.error("Failed to delete!");
      setLoading(false);
    }
  };

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


  const memberColumn = [
    {
      header: "Member Name",
      accessor: "full_name",
      Cell: ({ row }: { row: any }) => (
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
      ),
    },
    {
      header: "Contact",
      accessor: "phone",
      Cell: ({ value }: { value: string }) => (
        <div className="relative group">
          <span className="w-44 truncate block">{value}</span>
          <span className="absolute z-[1] left-20 ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
            {value} {/* Tooltip shows the full address */}
          </span>
        </div>
      ),
    },
    {
      header: "State",
      accessor: "state",
      Cell: ({ value }: { value: string }) => <span>{value}</span>,
    },
    {
      header: "Action",
      accessor: "id",
      Cell: ({ value }: { value: string }) => (
        <div className="flex gap-3">
          <button
            className="underline cursor-pointer"
            onClick={() => openDetailModal(value)}
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
      ),
    }

  ];


  const handleCloseModal = () => setModalType(null);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

 const fetchData = async (currentPage: number) => {
      try {
        const token = session.token; // Access token from user object
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/user/list?type=member&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMemberRequest(response.data.result.data);
        setPaginatedData(response.data.result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (!session) return;
    fetchData(currentPage);
  }, [session, currentPage]);

  return (
    <>
      <Circles
        height="80"
        width="80"
        color="#491161"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass="loading-spinner-overlay"
        visible={loading}
      />
      <AuthWrapper>
        <div className="mt-5">
          <TableLayout
            title="Members List"
            showSearch={true}
            columns={memberColumn}
            data={memberRequests}
            boxShadow={true}
          />
          {memberRequests.length > 0 && (
            <Pagination
            data={pagintedData}
            currentPage={currentPage}
            lastPage={pagintedData?.last_page}
            onPageChange={handlePageChange}
            />
          )}

          {/* Detail Modal */}
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
                  <strong>Middle Name:</strong> {`${selectedRequest.middle_name || "N/A"}`}
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
                  <strong>State:</strong>  {selectedRequest.state}
                </div>
                <hr />
              </div>
            </div>
          </div>
        )}

          {modalType === "delete" && memberToDelete && (
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
        </div>
      </AuthWrapper>
    </>
  );
};

export default MemberManagement;
