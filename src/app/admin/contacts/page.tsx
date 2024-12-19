"use client";
import AuthWrapper from '@/components/AuthWrapper'
import Button from '@/components/Button';
import TableLayout from '@/components/TableLayout'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { IoTrash } from 'react-icons/io5';
import Pagination from '@/components/Pagination';

function ContactList() {
    const [memberRequests, setMemberRequest] = useState<any>([]);
    const { data: session }: any = useSession();
    const [pagintedData, setPaginatedData] = useState<any>([]);
    const [loading, setLoading] = useState(true);

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

    const ContactColumn = [
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
              <Button
                className="border-0 bg-red-500 flex justify-center items-center text-white w-[40px] h-[40px] rounded font-medium underline"
                // onClick={() => handleOpenDeleteModal(value)}
              >
                <IoTrash />
              </Button>
            </div>
          ),
        }
    
      ];

  return (
    <div>
        <AuthWrapper>
        <div className="mt-5">
          <TableLayout
            title="Members List"
            showSearch={true}
            columns={ContactColumn}
            data={memberRequests}
            boxShadow={true}
          />
        </div>
        {memberRequests.length > 0 && (
            <Pagination
            data={pagintedData}
            currentPage={currentPage}
            lastPage={pagintedData?.last_page}
            onPageChange={handlePageChange}
            />
          )}
        </AuthWrapper>
    </div>
  )
}

export default ContactList