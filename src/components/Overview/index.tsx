"use client";
import React, { useEffect, useState } from "react";
import TableLayout from "../TableLayout";
import AuthWrapper from "../AuthWrapper";
import pagesvg from "../../../public/Group185.svg";
import box from "../../../public/Group186.svg";
import money from "../../../public/Group187.svg";
import moment from "moment";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Circles } from "react-loader-spinner";
import Detail from "../MemberDetails";
import StatsBox from "../StatsBox";

const Overview = () => {
  const [result, setResult] = useState<any | {}>({});
  const [memberRequests, setMemberRequest] = useState([]);
  const [providerRequests, setProviderRequest] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [selectedRequest1, setSelectedRequest1] = useState<any | null>(null);
  const [newsletterRequests, setNewsletterRequest] = useState([]);
  const { data: session, status }: any = useSession(); // Access session data
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProviderOpen, setModalProviderOpen] = useState(false);

  const memberColumn = [
    {
      header: "Member Name",
      accessor: "full_name",
      Cell: ({ row }: { row: any }) => {
        return (
          <div className="flex items-center space-x-4">
            {row ? (
              <>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${row.avatar}`}
                  alt={row.full_name}
                  onError={(e) => {
                    e.currentTarget.src = "/default-avatar.jpg";
                  }}
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
      header: "State",
      accessor: "state",
      Cell: ({ value }: { value: string }) => <span>{value}</span>,
    },
    // {
    //   header: "Action",
    //   accessor: "id",
    //   Cell: ({ value }: { value: any }) => (
    //     <button
    //       className="underline cursor-pointer"
    //       onClick={() => openModal(value)}
    //     >
    //       View Details
    //     </button>
    //   ),
    // },
  ];

  const providerColumn = [
    {
      header: "Provider Name",
      accessor: "full_name",
      Cell: ({ row }: { row: any }) => {
        return (
          <div className="flex items-center space-x-4">
            {row ? (
              <>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${row.avatar}`}
                  alt={row.full_name}
                  onError={(e) => {
                    e.currentTarget.src = "/default-avatar.jpg";
                  }}
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
    // {
    //   header: "Action",
    //   accessor: "id",
    //   Cell: ({ value }: { value: any }) => (
    //     <button
    //       className="underline cursor-pointer"
    //       onClick={() => openModalProvider(value)}
    //     >
    //       View Details
    //     </button>
    //   ),
    // },
  ];

  const statsCard = [{
    icon: pagesvg,
    number: result?.total_member_profiles,
    description: "Total member profiles",
  }, {
    icon: box,
    number: result?.total_provider_profiles,
    description: "Total provider profiles",
  }, {
    icon: money,
    number: result?.total_newsletters,
    description: "Total newsletter",
  }]

  const newsletterColumn = [
    {
      header: "email",
      accessor: "email",
      Cell: ({ value }: { value: string }) => <span>{value}</span>,
    },
    {
      header: "Created Date",
      accessor: "created_at",
      Cell: ({ value }: { value: string }) => (
        <span>{moment(value).format("YYYY-MM-DD")}</span>
      ),
    },
  ];

  useEffect(() => {
    if (!session) return;

    const fetchData = async () => {
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
        setMemberRequest(response.data.result.members_list);
        setProviderRequest(response.data.result.providers_list);
        setNewsletterRequest(response.data.result.newsletters_list);
        setResult(response.data.result);
        console.log(response.data.result.total_member_profiles)
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session]);

  const openModal = async (id: string) => {
    const requestDetails = memberRequests.find((req: any) => req.id === id);
    setSelectedRequest(requestDetails);
    setModalOpen(true);
  };

  const openModalProvider = async (id: string) => {
    const requestDetails = providerRequests.find((req: any) => req.id === id);
    setSelectedRequest1(requestDetails);
    setModalProviderOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRequest(null);
  };

  const closeModalProvider = () => {
    setModalProviderOpen(false);
    setSelectedRequest1(null);
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
        {result &&
          <div className="flex flex-wrap lg:flex-nowrap justify-between xl:mx-8 lg:mx-8 md:mx-8 mx-3 mt-5 gap-4">
            {statsCard.map((stat, index) => (
              <StatsBox
                key={index}
                icon={stat.icon} // Assuming icons are SVGs
                number={stat.number}
                description={stat.description}
              />
            ))}
          </div>
        }

        <div className="grid grid-cols-1">
          {memberRequests &&
            <TableLayout
              title="Members List"
              showSearch={false}
              columns={memberColumn}
              data={memberRequests}
              boxShadow={true}
              viewalllink={{ href: "/admin/member-management", text: "View All" }}
            />
          }
          {providerRequests &&
            <TableLayout
              title="Provider List"
              showSearch={false}
              columns={providerColumn}
              data={providerRequests}
              boxShadow={true}
              viewalllink={{ href: "/admin/provider-management", text: "View All" }}
            />
          }
        </div>
        <div className="mt-4">
          {newsletterRequests &&
            <TableLayout
              title="Newsletter List"
              showSearch={false}
              columns={newsletterColumn}
              data={newsletterRequests}
              boxShadow={true}
              viewalllink={{ href: "/admin/newsletter-management", text: "View All" }}
            />
          }
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
        {modalProviderOpen && selectedRequest1 && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-60 backdrop-blur-sm">
            <div className="bg-white mx-4 lg:max-w-5xl h-[700px] overflow-auto w-full relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={closeModalProvider}
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
              <Detail id={selectedRequest1.id} />
            </div>
          </div>
        )}

      </AuthWrapper>
    </>
  );
};

export default Overview;
