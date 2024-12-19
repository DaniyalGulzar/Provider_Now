"use client"
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { useParams, useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import AuthWrapper from "@/components/AuthWrapper";
import Chat from "@/components/Chats";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withAuth from '@/app/auth/auth/authHOC'

const VirtualConsultation = () => {
    const { data: session, status }: any = useSession();
    const [requests, setRequests] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const params = useParams();
    const id = params?.id as string | undefined;
    const [user, setUser] = useState<any | null>({});
    const router = useRouter();

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    const fetchUser = async () => {
        if (!session) return;

        const token = session.token; // Access token from user object

        setLoading(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/user`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            setUser(response.data.result.info);

        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async () => {
        try {
            if (!session) return;
            const token = session.token;
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}api/virtual-request/show/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setRequests(response.data.result);
        } catch (error: any) {
            toast.error(error.data.message)
        } finally {
            setLoading(false);
        }
    };

    const handleCompleted = async () => {
        if (!session) return;
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to accept this request.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = session.token;
                    await axios.get(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/virtual-request/complete/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    toast.success("Request accepted successfully");
                    router.push('/list-provider')
                } catch (error: any) {
                    toast.error(error.response.data.message)
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    useEffect(() => {
        if (!session && !id) return;
        fetchData();
        fetchUser();
    }, [session, id]);

    return (
        <AuthWrapper>
            <Circles
                height="80"
                width="80"
                color="#491161"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass="loading-spinner-overlay"
                visible={loading}
            />
            <br />
            <div className="xl:mx-8 lg:mx-8 md:mx-8 mx-3 mt-5">
            <div className="justify-end flex">
                {
                    (session && session.user.role === "Provider" && !requests.completed_at) &&
                    <button
                        className="bg-[#C7F0D9] text-black px-2 py-1 rounded hover:bg-green-600 w-min mr-3"
                        onClick={() => handleCompleted()}
                    >
                        Complete
                    </button>

                }
            </div>
            <div className={`p-4 bg-white rounded-lg my-10 max-w-8xl mt-2 mx-3 lg:mx-5 shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)]`}>
                <div className="flex flex-col sm:flex-row items-center sm:space-x-4 justify-between mb-3">
                    {requests && (
                        <>
                            {
                                (session && session.user.role === "Provider") ?
                                    <div className="flex items-center space-x-4">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${requests.member?.avatar}`}
                                            alt="Profile Image Preview"
                                            className="object-cover rounded-full h-[40px] w-[40px]"
                                            height={80}
                                            width={80}
                                        />
                                        <span className="font-semibold text-base sm:text-lg">
                                            {requests.member?.full_name}
                                        </span>
                                    </div>
                                    :
                                    <div className="flex items-center space-x-4">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${requests.provider?.avatar}`}
                                            alt="Profile Image Preview"
                                            className="object-cover rounded-full h-[40px] w-[40px]"
                                            height={80}
                                            width={80}
                                        />
                                        <span className="font-semibold text-base sm:text-lg">
                                            {requests.provider?.full_name}
                                        </span>
                                    </div>
                            }
                            <div className="relative mt-4 sm:mt-0">
                                <span
                                    className="text-[#751A9B] font-semibold text-sm sm:text-md cursor-pointer underline"
                                    onClick={handleClick}
                                >
                                    View member Medical history and reason for visit
                                </span>

                                {isVisible && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-gray-300 rounded-md shadow-md p-4 z-10 whitespace-normal w-[90%] sm:w-[350px] max-w-[90%]">
                                        <div className="relative">
                                            <button
                                                className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 text-lg"
                                                onClick={handleClose}
                                            >
                                                &times;
                                            </button>

                                            <span className="font-bold block">Medical History</span>
                                            <div className="border-b border-gray-300 my-2"></div>

                                            <span className="font-semibold text-sm block">
                                                What are your reasons for requesting a virtual consultation?
                                            </span>
                                            <div className="border-b border-gray-300 mb-3 py-2">
                                                {requests.reason}
                                            </div>

                                            <span className="font-semibold text-sm block">
                                                How long have you been experiencing this issue?
                                            </span>
                                            <div className="border-b border-gray-300 mb-3 py-2">
                                                {requests.issue_time}
                                            </div>

                                            <span className="font-semibold text-sm block">
                                                Have you sought support for this issue before?
                                            </span>
                                            <div className="border-b border-gray-300 py-2">
                                                {requests.support_before}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <div className="border-b border-gray-300"></div>
                <div className="grid grid-cols-12 my-5 gap-5">
                    <div className="lg:col-span-8 col-span-12">
                        <div className="flex justify-between">
                            <Image
                                src="/myImages/about-image.png"
                                alt="Profile"
                                className="rounded-lg w-full"
                                height={100}
                                width={100}
                            />
                        </div>
                    </div>
                    {id &&
                        <div className="lg:col-span-4 col-span-12">
                            <Chat chatmessage="Messages" user_id={user.id} id={id} user={user} entity="vc" />
                        </div>
                    }
                </div>
            </div>
            </div>
        </AuthWrapper>
    );
};

export default withAuth(VirtualConsultation,  ['Provider','Member']);
