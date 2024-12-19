"use client";
import Footer from "@/components/Footer";
import Image from "next/image";
import NavbarOther from "@/components/NavbarOther/page";
import Banner from "@/components/Banner/page";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import { useSession } from "next-auth/react";
import { Circles } from "react-loader-spinner";

export default function Login() {
  const router = useRouter();
  // const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession(); // Access session data

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/login`,
        formData
      );
      if (response.status === 200) {
        localStorage.setItem("email", formData.email);
        router.push("/auth/otp");
        localStorage.setItem('isLoggedIn', '0')
      }

      setFormData({
        email: "",
        password: "",
      });
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // const cancelLogout = () => {
  //   setModalOpen(false);
  // };

  // const HandleProviderAccount = () => {
  //   setModalOpen(false);
  //   router.push("/auth/signup");
  // };

  // const HandleMemberAccount = () => {
  //   setModalOpen(false);
  //   router.push("/auth/create-member");
  // };

  useEffect(() => {
    if (status === "authenticated" && session) {
      if (session.user?.role === "Member") {
        router.push('/overview');
      } else {
        if (session.user?.role === "Admin") {
          router.push('/admin/overview');
        }
        else {
          router.push('/provider-dashboard');
        }
      }
    }
  }, [status, session, router]);

  return (
    <div>

      <Circles
        height="80"
        width="80"
        color="#491161 "
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass="loading-spinner-overlay"
        visible={isSubmitting}
      />
      <NavbarOther />
      <Banner title="Login" />
      <div className="flex justify-center items-center">
        <div className="shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] bg-white w-[516px] my-[80px] mx-4 rounded-[22px] px-[32px] py-[32px]">
          <div className="mb-[24px] text-center">
            <span className="text-[28px] font-semibold">
              Sign in to your account
            </span>
          </div>
          <div className="h-[50px] bg-F8F9FB w-full rounded-lg flex justify-center items-center mb-4">
            <Image
              src="/myImages/devicon_google.png"
              alt="..."
              width={20}
              height={20}
            />
            <Link href="/coming-soon">
              <button className="text-base font-normal ml-3 cursor-pointer" type="button">
                Login with Google
              </button>
            </Link>
          </div>
          <form className="flex flex-col mt-0" onSubmit={handleSubmit}>
            <InputField
              label="Email Address"
              type="email"
              placeholder="Type your email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <InputField
              label=" Password"
              type="password"
              placeholder="Type your password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <div className="flex justify-end mb-[24px]">
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium"
              >
                Forgot <span className="text-7C2B91 underline">password?</span>
              </Link>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`h-[48px] rounded-lg text-base font-semibold text-white bg-751A9B 
              hover:bg-purple-700 flex justify-center items-center ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                  ></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
            <div className="my-[20px] text-center">
              <span className="text-lg font-medium">Or</span>
            </div>
            <button
              type="button"
              onClick={() => router.push("/auth/create-member")}
              className="h-[48px] w-full text-base font-semibold hover:bg-[#751A9B] hover:text-white text-[#751A9B] border-2 border-[#751A9B] rounded-lg bg-transparent"
            >
              Create new account
            </button>
          </form>
        </div>
      </div>
      <Footer />
      {/* {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={cancelLogout}
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
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Create a New Account
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Are you sure you want to create a new account?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-[#751A9B] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={HandleMemberAccount}
              >
                Member Account
              </button>
              <button
                className="border border-2 border-[#751A9B] text-[#751A9B] px-6 py-3 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={HandleProviderAccount}
              >
                Provider Account
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
