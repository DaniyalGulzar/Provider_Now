"use client";
import React, { useState } from "react";
import AuthWrapper from "../AuthWrapper";
import TableLayout from "../TableLayout";
import DashboardStats from "../DashboardStats";
import pagesvg from "../../../public/Group185.svg";
import box from "../../../public/Group186.svg";
import money from "../../../public/Group187.svg";
import Link from "next/link";
import moment from "moment";
import Pagination from "../Pagination";

const NewsletterSub = () => {
  const [result, setResult] = useState<any | {}>({});
  const columns1 = [
    {
      header: "Member's Name",
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
      header: "Plan",
      accessor: "plan",
      Cell: ({ value }: { value: string }) => <span>{value}</span>,
    },
    {
      header: "Status",
      accessor: "status",
      Cell: ({ value }: { value: string }) => <span>{value}</span>,
    },
  ];

  const requestnewsletter = [
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
      plan: "4 Months",
      status: "Subcribed",
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
      plan: "4 Months",
      status: "Subcribed",
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
      plan: "4 Months",
      status: "Subcribed",
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
      plan: "4 Months",
      status: "Subcribed",
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
      plan: "4 Months",
      status: "Subcribed",
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
      plan: "4 Months",
      status: "Subcribed",
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
      plan: "4 Months",
      status: "Subcribed",
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
      plan: "4 Months",
      status: "Subcribed",
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
      plan: "4 Months",
      status: "Subcribed",
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
      plan: "4 Months",
      status: "Subcribed",
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
      plan: "4 Months",
      status: "Subcribed",
    },
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requestnewsletter.slice(
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
            title="Newsletter Subscribers"
            showSearch={true}
            columns={columns1}
            data={currentItems}
            boxShadow={true}
          />

          {/* {requestnewsletter.length > 0 && (
            <Pagination
            data={pagintedData}
            currentPage={currentPage}
            lastPage={pagintedData?.last_page}
            onPageChange={handlePageChange}
            />
          )} */}
        </div>
      </AuthWrapper>
    </>
  );
};

export default NewsletterSub;
