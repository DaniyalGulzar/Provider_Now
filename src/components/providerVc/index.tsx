"use client";
import React, { useState } from "react";
import AuthWrapper from "../AuthWrapper";
import TableLayout from "../TableLayout";
import Link from "next/link";
import Pagination from "../Pagination";

const ProviderVC = () => {
  const columns1 = [
    {
      header: "Provider's Name",
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
            href={"#"}
            className="text-black-600 underline cursor-pointer hover:text-blue-800"
          >
            View
          </Link>
          <Link
            href={"#"}
            className="text-black-600 underline cursor-pointer hover:text-blue-800"
          >
            Edit
          </Link>
        </div>
      ),
    },
  ];

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

  const requestprovidervc = [
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
      category: "Cardiologist",
      status: "VC",
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
      category: "Cardiologist",
      status: "VC",
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
      category: "Cardiologist",
      status: "VC",
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
      category: "Cardiologist",
      status: "VC",
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
      category: "Cardiologist",
      status: "VC",
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
      category: "Cardiologist",
      status: "VC",
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
      category: "Cardiologist",
      status: "VC",
    },
  ];
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requestprovidervc.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  return (
    <>
      <AuthWrapper>
        <div className="p-4 mx-8">
          <TableLayout
            title="Provider Working On VC"
            showSearch={true}
            columns={columns1}
            data={currentItems}
            boxShadow={true}
          />
          {/* {requestprovidervc.length > 0 && (
            <Pagination
              totalItems={requestprovidervc.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          )} */}
        </div>
      </AuthWrapper>
    </>
  );
};

export default ProviderVC;
