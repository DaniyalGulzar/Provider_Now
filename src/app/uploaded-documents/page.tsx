"use client";
import AuthWrapper from "@/components/AuthWrapper";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";
import withAuth from '@/app/auth/auth/authHOC'

function UploadedDocument() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { data: session }: any = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (!session) return;
      setLoading(true);
      try {
        const token = session.token;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/lmn-document/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.result);
      } catch (error) {
        toast.error("Error fetching documents");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  return (
    <div>
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
        <div className="xl:mx-8 lg:mx-8 md:mx-8 mx-3 my-4">
          <span className="text-2xl font-bold mb-4">Documents</span>
          <div className="mt-5 shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] rounded-md py-5">
            {data && data.length > 0 ? (
              <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5">
                {(data.map((doc: any) => (
                  <div key={doc.id}>
                    <a
                      href={process.env.NEXT_PUBLIC_STORAGE_PATH + doc.path}
                      download
                      className="text-sm mb-0 flex flex-col py-3 items-center bg-white rounded-lg mx-4 shadow-lg whitespace-nowrap"
                      target="_blank"
                      rel="noopener noreferrer"
                      title={doc.path.split("/").pop()}
                    >
                      <Image
                        src="/myImages/document.svg"
                        alt="File Icon"
                        width={100}
                        height={100}
                      />
                      <span className="truncate w-full text-center">
                        &nbsp; {doc.path.split("/").pop()}
                      </span>
                    </a>
                  </div>
                ))
                )}
              </div>
            ) : (
              <p className="text-lg flex justify-center font-semibold">No documents available</p>
            )}
          </div>
        </div>
      </AuthWrapper>
    </div>
  );
}

export default withAuth(UploadedDocument,  ['Provider','Member']);
