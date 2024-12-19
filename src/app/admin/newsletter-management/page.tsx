"use client";
import AuthWrapper from '@/components/AuthWrapper'
import Pagination from '@/components/Pagination';
import TableLayout from '@/components/TableLayout'
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

function NewsLetterManagement() {
  const [newsletterRequests, setNewsletterRequest] = useState([]);
  const { data: session, status }: any = useSession(); // Access session data
  const [error, setError] = useState<string | null>(null);
  const [paginatedData, setPaginatedData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!session) return; // Early return if session is not available

    const fetchData = async () => {
      try {
        const token = session.token; // Access token from user object

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/dashboard?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Replace yourToken with the actual token
            },
          }
        );
        setNewsletterRequest(response.data.result.newsletters_list);
        setPaginatedData(response.data.result);
        console.log(response.data.result.total_member_profiles)
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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

  return (
    <div>
      <AuthWrapper>
        <div className='mt-5'>
          <TableLayout
            title="Newsletter List"
            columns={newsletterColumn}
            data={newsletterRequests}
            boxShadow={true}
            viewalllink={{ href: "/admin/newsletter-management", text: "View All" }}
          />
           <Pagination
            data={paginatedData}
            currentPage={currentPage}
            lastPage={paginatedData?.last_page}
            onPageChange={handlePageChange}
            />
        </div>
      </AuthWrapper>
    </div>
  )
}

export default NewsLetterManagement