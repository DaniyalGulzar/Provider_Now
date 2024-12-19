"use client";
import React, { useState } from "react";
import AuthWrapper from "../AuthWrapper";
import TableLayout from "../TableLayout";
import DashboardStats from "../DashboardStats";
import pagesvg from "../../../public/Group185.svg";
import box from "../../../public/Group186.svg";
import money from "../../../public/Group187.svg";
import Link from "next/link";
import Modal from "../Modal";
import Button from "../Button";
import Pagination from "../Pagination";

const ProviderList = () => {
  const openModal = () => {
    setModalIsOpen(true);
    console.log(modalIsOpen);
  };
  const closeModal = () => setModalIsOpen(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    socialSecurityNumber: "",
    telephoneNumber: "",
    emailAddress: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    password: "",
    confirmPassword: "",

    showPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordToggle = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    closeModal(); // Close the modal after submission
  };
  const [result, setResult] = useState<any | {}>({});

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"; // Yellow for Pending
      case "Accepted":
        return "bg-green-100 text-green-800";
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

  const columns1 = [
    {
      header: "providers's Name",
      accessor: "profile",
      renderImage: ({
        value,
      }: {
        value: { profilePic: string; name: string };
      }) => (
        <div className="flex items-center space-x-4">
				{value ? (
					<>
					<img
						src={`${value.profilePic}`}
						alt={value.name}
						className="w-10 h-10 rounded-full min-w-10 min-h-10"
					/>
					<div className="relative group">
						<span className="w-44 truncate block">{value.name}</span>
						<span className="absolute z-10 left-16 ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
						{value.name} {/* Tooltip shows the full name */}
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
      accessor: "contact",
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
      header: "Email",
      accessor: "email",
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
      header: "State",
      accessor: "state",
      Cell: ({ value }: { value: string }) => <span>{value}</span>,
    },
    {
      header: "Category",
      accessor: "category",
      Cell: ({ value }: { value: string }) => <span>{value}</span>,
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
      accessor: "action",
      Cell: ({ row }: { row: any }) => (
        <div className="flex space-x-2">
          <Link
            href={`/members-detail/${row.id}`}
            className="text-blue-600 underline cursor-pointer hover:text-blue-800"
          >
            View
          </Link>
          <Link
            href={`/members-detail/${row.id}`}
            className="text-blue-600 underline cursor-pointer hover:text-blue-800"
          >
            Edit
          </Link>
        </div>
      ),
    },
  ];

  const requestproviderlist = [
    {
      requestId: "#1001",
      profile: {
        profilePic:
          "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: "John Doe",
      },
      contact: "07676-86868",
      email: "john.doe@example.com",
      state: "NY",
      category: "HeartIssue",
      status: "Active",
    },
    {
      requestId: "#1001",
      profile: {
        profilePic:
          "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: "John Doe",
      },
      contact: "07676-86868",
      email: "john.doe@example.com",
      state: "NY",
      category: "HeartIssue",
      status: "Inactive",
    },
    {
      requestId: "#1001",
      profile: {
        profilePic:
          "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: "John Doe",
      },
      contact: "07676-86868",
      email: "john.doe@example.com",
      state: "NY",
      category: "HeartIssue",
      status: "Active",
    },
    {
      requestId: "#1001",
      profile: {
        profilePic:
          "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: "John Doe",
      },
      contact: "07676-86868",
      email: "john.doe@example.com",
      state: "NY",
      category: "HeartIssue",
      status: "Active",
    },
    {
      requestId: "#1001",
      profile: {
        profilePic:
          "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: "John Doe",
      },
      contact: "07676-86868",
      email: "john.doe@example.com",
      state: "NY",
      category: "HeartIssue",
      status: "Active",
    },
    {
      requestId: "#1001",
      profile: {
        profilePic:
          "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: "John Doe",
      },
      contact: "07676-86868",
      email: "john.doe@example.com",
      state: "NY",
      category: "HeartIssue",
      status: "Inactive",
    },
    {
      requestId: "#1001",
      profile: {
        profilePic:
          "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: "John Doe",
      },
      contact: "07676-86868",
      email: "john.doe@example.com",
      state: "NY",
      category: "HeartIssue",
      status: "Inactive",
    },
    {
      requestId: "#1001",
      profile: {
        profilePic:
          "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: "John Doe",
      },
      contact: "07676-86868",
      email: "john.doe@example.com",
      state: "NY",
      category: "HeartIssue",
      status: "Inactive",
    },
    {
      requestId: "#1001",
      profile: {
        profilePic:
          "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: "John Doe",
      },
      contact: "07676-86868",
      email: "john.doe@example.com",
      state: "NY",
      category: "HeartIssue",
      status: "Active",
    },
    {
      requestId: "#1001",
      profile: {
        profilePic:
          "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: "John Doe",
      },
      contact: "07676-86868",
      email: "john.doe@example.com",
      state: "NY",
      category: "HeartIssue",
      status: "Active",
    },
    {
      requestId: "#1001",
      profile: {
        profilePic:
          "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: "John Doe",
      },
      contact: "07676-86868",
      email: "john.doe@example.com",
      state: "NY",
      category: "HeartIssue",
      status: "Active",
    },
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requestproviderlist.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <AuthWrapper>
        <DashboardStats
          stats1={{
            icon: pagesvg,
            number: result?.total_lmn_requests,
            description: "Total ProviderNow LMN Request",
          }}
          stats2={{
            icon: box,
            number: result?.total_providernow_requests,
            description: "Total ProviderNow Virtual consultants",
          }}
          stats3={{
            icon: money,
            number: "$" + result?.total_spendings,
            description: "Total Spendings",
          }}
        />

        <div className="p-4 mx-8">
          <TableLayout
            title="Provider List"
            showSearch={true}
            columns={columns1}
            data={currentItems}
            boxShadow={true}
            button={
              <Button
                className="bg-[#631681] border border-[#631681] text-white font-semibold px-6 py-2 rounded-md w-full mx-auto md:w-50"
                onClick={openModal}
              >
                + Add Provider
              </Button>
            }
          />

          {/* {requestproviderlist.length > 0 && (
            <Pagination
              totalItems={requestproviderlist.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          )} */}

          <Modal
            modalIsOpen={modalIsOpen}
            modalTitle="Add New provider"
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            handlePasswordToggle={handlePasswordToggle}
          />
        </div>
      </AuthWrapper>
    </>
  );
};

export default ProviderList;
