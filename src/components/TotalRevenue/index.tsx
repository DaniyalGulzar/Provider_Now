"use client";
import React, { useState } from "react";
import TableLayout from "../TableLayout";
import AuthWrapper from "../AuthWrapper";
import DashboardStats from "../DashboardStats";
import pagesvg from "../../../public/Group185.svg";
import box from "../../../public/Group186.svg";
import money from "../../../public/Group187.svg";
import moment from "moment";

const Overview = () => {
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

  const columns2 = [
    {
      header: "Invoice",
      accessor: "invoice",
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
      header: "Subscription",
      accessor: "subscription",
      Cell: ({ value }: { value: string }) => <span>{value}</span>,
    },
    {
      header: "Category",
      accessor: "category",
      Cell: ({ value }: { value: string }) => <span>{value}</span>,
    },
    {
      header: "Paid Date",
      accessor: "paidDate",
      Cell: ({ value }: { value: string }) => (
        <span>{moment(value).format("YYYY-MM-DD")}</span>
      ),
    },
    {
      header: "Payment Type",
      accessor: "paymentType",
      Cell: ({ value }: { value: string }) => <span>{value}</span>,
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      Cell: ({ value }: { value: string }) => (
        <span>{moment(value).format("YYYY-MM-DD")}</span>
      ),
    },
    {
      header: "Amount",
      accessor: "amount",
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
  ];

  const requests2 = [
    {
      invoice: "#INV1001",
      profile: {
        profilePic:
          "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        name: "John Doe",
      },
      subscription: "Premium",
      category: "Health",
      paidDate: "2024-08-05",
      paymentType: "Credit Card",
      dueDate: "2024-09-05",
      amount: "$500",
      status: "paid",
    },

    {
      invoice: "#INV1002",
      profile: {
        profilePic:
          "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
        name: "Jane Smith",
      },
      subscription: "Standard",
      category: "Fitness",
      paidDate: "2024-07-15",
      paymentType: "Paypal",
      dueDate: "2024-08-15",
      amount: "$300",
      status: "unpaid",
    },

    {
      invoice: "#INV1002",
      profile: {
        profilePic:
          "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
        name: "Jane Smith",
      },
      subscription: "Standard",
      category: "Fitness",
      paidDate: "2024-07-15",
      paymentType: "Paypal",
      dueDate: "2024-08-15",
      amount: "$300",
      status: "unpaid",
    },
    {
      invoice: "#INV1002",
      profile: {
        profilePic:
          "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
        name: "Jane Smith",
      },
      subscription: "Standard",
      category: "Fitness",
      paidDate: "2024-07-15",
      paymentType: "Paypal",
      dueDate: "2024-08-15",
      amount: "$300",
      status: "paid",
    },

    {
      invoice: "#INV1002",
      profile: {
        profilePic:
          "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
        name: "Jane Smith",
      },
      subscription: "Standard",
      category: "Fitness",
      paidDate: "2024-07-15",
      paymentType: "Paypal",
      dueDate: "2024-08-15",
      amount: "$300",
      status: "paid",
    },

    {
      invoice: "#INV1002",
      profile: {
        profilePic:
          "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
        name: "Jane Smith",
      },
      subscription: "Standard",
      category: "Fitness",
      paidDate: "2024-07-15",
      paymentType: "Paypal",
      dueDate: "2024-08-15",
      amount: "$300",
      status: "paid",
    },

    {
      invoice: "#INV1002",
      profile: {
        profilePic:
          "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
        name: "Jane Smith",
      },
      subscription: "Standard",
      category: "Fitness",
      paidDate: "2024-07-15",
      paymentType: "Paypal",
      dueDate: "2024-08-15",
      amount: "$300",
      status: "paid",
    },

    {
      invoice: "#INV1002",
      profile: {
        profilePic:
          "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
        name: "Jane Smith",
      },
      subscription: "Standard",
      category: "Fitness",
      paidDate: "2024-07-15",
      paymentType: "Paypal",
      dueDate: "2024-08-15",
      amount: "$300",
      status: "unpaid",
    },

    {
      invoice: "#INV1002",
      profile: {
        profilePic:
          "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
        name: "Jane Smith",
      },
      subscription: "Standard",
      category: "Fitness",
      paidDate: "2024-07-15",
      paymentType: "Paypal",
      dueDate: "2024-08-15",
      amount: "$300",
      status: "paid",
    },

    {
      invoice: "#INV1002",
      profile: {
        profilePic:
          "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
        name: "Jane Smith",
      },
      subscription: "Standard",
      category: "Fitness",
      paidDate: "2024-07-15",
      paymentType: "Paypal",
      dueDate: "2024-08-15",
      amount: "$300",
      status: "paid",
    },

    {
      invoice: "#INV1002",
      profile: {
        profilePic:
          "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
        name: "Jane Smith",
      },
      subscription: "Standard",
      category: "Fitness",
      paidDate: "2024-07-15",
      paymentType: "Paypal",
      dueDate: "2024-08-15",
      amount: "$300",
      status: "unpaid",
    },

    {
      invoice: "#INV1002",
      profile: {
        profilePic:
          "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
        name: "Jane Smith",
      },
      subscription: "Standard",
      category: "Fitness",
      paidDate: "2024-07-15",
      paymentType: "Paypal",
      dueDate: "2024-08-15",
      amount: "$300",
      status: "paid",
    },

    {
      invoice: "#INV1002",
      profile: {
        profilePic:
          "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
        name: "Jane Smith",
      },
      subscription: "Standard",
      category: "Fitness",
      paidDate: "2024-07-15",
      paymentType: "Paypal",
      dueDate: "2024-08-15",
      amount: "$300",
      status: "paid",
    },
    {
      invoice: "#INV1002",
      profile: {
        profilePic:
          "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
        name: "Jane Smith",
      },
      subscription: "Standard",
      category: "Fitness",
      paidDate: "2024-07-15",
      paymentType: "Paypal",
      dueDate: "2024-08-15",
      amount: "$300",
      status: "unpaid",
    },
    // Additional dummy data entries here
  ];

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
            title="Total Revenue"
            showSearch={false}
            columns={columns2}
            data={requests2}
            boxShadow={true}
          />
        </div>
      </AuthWrapper>
    </>
  );
};

export default Overview;
