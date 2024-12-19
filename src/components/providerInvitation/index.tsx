"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";

function ProviderInvitation() {
  const [seconds, setSeconds] = useState(12000);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const { data: session, status }: any = useSession();

  useEffect(() => {
    console.log("ID:", id);
  }, [session, id]);

  // Timer logic for countdown
  useEffect(() => {
    const submissionTime = localStorage.getItem("submissionTime");

    if (submissionTime) {
      const submissionDate = new Date(submissionTime).getTime();
      const currentTime = new Date().getTime();
      const timePassed = Math.floor((currentTime - submissionDate) / 1000);

      if (timePassed < 12000) {
        setSeconds(12000 - timePassed);
      } else {
        setSeconds(0);
        localStorage.removeItem('submissionTime');
      }
    }
  }, [router]);

  // Countdown effect
  useEffect(() => {
    console.log(seconds);
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
        if (seconds % 10 === 0) {
          fetchData();
        }
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setSeconds(0);
      localStorage.removeItem('submissionTime');
    }
  }, [seconds, router]);

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const remainingSeconds = sec % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const fetchData = async () => {
    try {
      const token = session.token;
      console.log("API Request with token:", token);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/virtual-request/show/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.data.result.status === "Pending"){
        router.push(`/provider-invitation/${id}`);
      }else{
        router.push(`/virtual-consultation/${id}`);
        localStorage.removeItem('submissionTime');
      }
    } catch (error: any) {
      console.error("API Error:", error.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient">
      <div className="shadow-2xl p-10 rounded-lg bg-white text-center space-y-4">
        <div className="flex justify-center items-center">
          <Image src="/myImages/logo-purple.svg"  alt="..." height={300} width={300} />
        </div>
        <div className="text-[50px] font-extrabold text-[#751a9b]">
          {formatTime(seconds)}
        </div>
        <div className="font-bold text-3xl">
          Waiting for provider to Accept Request
        </div>
      </div>
    </div>
  );
}

export default ProviderInvitation;
