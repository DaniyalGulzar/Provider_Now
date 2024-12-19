"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { IoDocumentText, IoList } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { relative } from "path";

export default function Sidebar() {
  const { data: session }: any = useSession();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const currentPath = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleSidebar = () => {
    const shouldOpenSidebar = !isSidebarOpen;
    setIsSidebarOpen(shouldOpenSidebar);

    // Show overlay when the sidebar is open and screen is 900px or less
    if (shouldOpenSidebar && isSmallScreen) {
      setIsOverlayVisible(true);
    } else {
      setIsOverlayVisible(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    setRole(session.user.role);
  }, [session]);

  const handleLogout = () => {
    setModalOpen(true);
  };

  const confirmLogout = async () => {
    setModalOpen(false);
    try {
      await signOut({ redirect: false });

      toast.success("Logout successful!");
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout.");
    }
  };

  const cancelLogout = () => {
    setModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  const isDropdownActive =
    currentPath === "/list-lmn" || currentPath === "/request-letter";
  const isDropdownActive1 =
    currentPath === "/list-provider" || currentPath === "/request-provider";

    useEffect(() => {
      const handleResize = () => {
        const windowWidth = window.innerWidth;
  
        // Check if screen size is 900px or less
        if (windowWidth <= 900) {
          setIsSmallScreen(true);
          setIsSidebarOpen(false); // By default, sidebar closed on small screens
        } else {
          setIsSmallScreen(false);
          setIsSidebarOpen(true); // Sidebar open by default on larger screens
          setIsOverlayVisible(false); // No overlay on larger screens
        }
      };
  
      // Set initial sidebar state based on screen size
      handleResize();
  
      // Add event listener to handle window resize
      window.addEventListener("resize", handleResize);
  
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);


  return (
      <div className="relative">
        {isOverlayVisible && isSmallScreen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleSidebar}
          ></div>
        )}
  
        <div
          className={`h-full bg-gradient flex flex-col transition-all duration-300 z-50 ${
            isSidebarOpen ? "w-72" : "w-20"
          } ${isSmallScreen ? "top-0 left-0" : "relative"} ${isSidebarOpen ? "fixed" : "relative"}`}
        >
        <div className="flex justify-end">
        <button
          onClick={toggleSidebar}
          className="p-2 text-white mr-[-14px] bg-purple-700 hover:bg-purple-600 transition duration-300 rounded-full"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? <IoMdClose size={18} /> : <IoMdMenu size={18} />}
        </button>
        </div>
      <Link href="/">
        <Image
          src="/myImages/providerNow-logo-RGB-color-inverse.svg"
          className={`m-5 mt-5 w-[250px] min-w-[150px]  object-contain ${isSidebarOpen? "block" : "hidden"}`}
          width={170}
          height={100}
          alt="providernow"
        />
      </Link>
      <Link href="/">
        <Image
          src="/myImages/providerNow-icon-RGB-color-1024.png"
          alt="providernow"
          width={200}
          height={43}
          className={`my-5 h-[43px] object-contain ${isSidebarOpen? "hidden" : "block"}`}
        />
      </Link>
      {role === "Member" && (
        <>
          <Link
            href="/overview"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/overview"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/dashboard.svg"
              alt="dashboard"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/overview"
                ? "filter invert"
                : "filter invert-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-4 ${currentPath === "/overview" ? "text-black" : "text-white"
                }`}
            >
              Overview
            </span>

            <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Overview
            </span>
          </Link>

          <div className="flex flex-col">
              <div
                className={`flex items-center p-3 mb-2 cursor-pointer transition-colors duration-300 ${isDropdownActive
                  ? "bg-white text-black"
                  : "text-white hover:bg-purple-700"
                  }`}
                onClick={toggleDropdown}
              >
                <Image
                  src="/myImages/list.svg"
                  alt="list"
                  className={`ml-3 h-6 w-6 transition-colors duration-300 ${isDropdownActive ? "filter invert" : "filter invert-0"
                    }`}
                  height={24}
                  width={24}
                />
                <span className={`${isSidebarOpen ? "block" : "hidden"} pl-4 ${isDropdownActive ? "text-black" : "text-white"
                  }`}>
                  Request a LMN
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-auto h-5 w-5 transform ${isDropdownOpen || isDropdownActive ? "rotate-180" : ""
                    }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {(isDropdownOpen || isDropdownActive) && (
                <div className="mx-5 bg-[#ba51e5] rounded-xl lg:ml-7">
                  <Link
                    href="/request-letter"
                    className={`relative flex items-center ${!isSidebarOpen ? "p-0 justify-center mt-2" : "p-3 justify-start"} mb-2 transition-colors duration-300 group ${currentPath === "/request-letter"
                      ? "bg-white text-black"
                      : "text-white hover:bg-purple-700"
                      }`}
                  >
                    <IoDocumentText className={`${isSidebarOpen ? "mr-3" : "mr-0"} w-[20px] text-xl`} />
                    <span className={`${isSidebarOpen ? "block" : "hidden"} text-sm ${!isDropdownActive ? "text-white" : "text-black"}`}>
                      Request a LMN
                    </span>
                    {/* Tooltip */}
                    <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Request a LMN
                    </span>
                  </Link>

                  <Link
                    href="/list-lmn"
                    className={`relative flex items-center ${!isSidebarOpen ? "p-0 justify-center mt-2" : "p-3 justify-start"} mb-2 transition-colors duration-300 group ${currentPath === "/list-lmn"
                      ? "bg-white text-black"
                      : "text-white hover:bg-purple-700"
                      }`}
                  >
                    <IoList className={`${isSidebarOpen ? "mr-3" : "mr-0"} w-[20px] text-xl`} />
                    <span className={`${isSidebarOpen ? "block" : "hidden"} ${!isDropdownActive ? "text-white" : "text-black"} text-sm`}>
                      List of all LMN Requests
                    </span>
                    {/* Tooltip */}
                    <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      List of all LMN Requests
                    </span>
                  </Link>
                </div>
              )}
          </div>
          <div className="flex flex-col">
            <div
              className={`flex items-center p-3 mb-2 cursor-pointer transition-colors duration-300 ${isDropdownActive1
                ? "bg-white text-black"
                : "text-white hover:bg-purple-700"
                }`}
              onClick={toggleDropdown1}
            >
              <Image
                src="/myImages/list.svg"
                alt="list"
                className={`ml-3 h-6 w-6 transition-colors duration-300 ${isDropdownActive1 ? "filter invert" : "filter invert-0"
                  }`}
                height={24}
                width={24}
              />
              <span className={`${isSidebarOpen ? "block" : "hidden"} pl-4 ${isDropdownActive1 ? "text-black" : "text-white"
                }`}>
                Request a ProviderNow
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`ml-auto h-5 w-5 transform ${isDropdownOpen1 || isDropdownActive1 ? "rotate-180" : ""
                  }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {(isDropdownOpen1 || isDropdownActive1) && (
              <div className="mx-5 bg-[#ba51e5] rounded-xl lg:ml-7">
                <Link
                  href="/request-provider"
                  className={`relative flex items-center ${!isSidebarOpen ? "p-0 justify-center mt-2" : "p-3 justify-start"} mb-2 transition-colors duration-300 group ${currentPath === "/request-provider"
                    ? "bg-white text-black"
                    : "text-white hover:bg-purple-700"
                    }`}
                >
                  <IoDocumentText className={`${isSidebarOpen ? "mr-3" : "mr-0"} w-[20px] text-xl`} />
                  <span className={`${!isSidebarOpen ? "hidden" : "block"} text-sm ${!isDropdownActive1 ? "text-white" : "text-black"}`}>
                    Request a ProviderNow
                  </span>
                  {/* Tooltip */}
                  <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Request a ProviderNow
                  </span>
                </Link>

                <Link
                  href="/list-provider"
                  className={`relative flex items-center ${!isSidebarOpen ? "p-0 justify-center mt-2" : "p-3 justify-start"} mb-2 transition-colors duration-300 group ${currentPath === "/list-provider"
                    ? "bg-white text-black"
                    : "text-white hover:bg-purple-700"
                    }`}
                >
                  <IoList className={`${isSidebarOpen ? "mr-3" : "mr-0"} w-[20px] text-xl`} />
                  <span className={`${!isSidebarOpen ? "hidden" : "block"} text-sm ${!isDropdownActive1 ? "text-white" : "text-black"}`}>
                    List of All ProviderNow Requests
                  </span>
                  <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    List of All ProviderNow Requests
                  </span>
                </Link>
              </div>
            )}
          </div>


          <Link
            href="/provider-retail-shop"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/provider-retail-shop"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/list.svg"
              alt="dashboard"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/provider-retail-shop"
                ? "filter invert"
                : "filter invert-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-4 ${currentPath === "/provider-retail-shop" ? "text-black" : "text-white"
                }`}
            >
              Shop
            </span>

            <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Shop
            </span>
          </Link>

          <Link
            href="/uploaded-documents"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/uploaded-documents"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/list.svg"
              alt="dashboard"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/uploaded-documents"
                ? "filter invert"
                : "filter invert-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-4 ${currentPath === "/uploaded-documents" ? "text-black" : "text-white"
                }`}
            >
              Uploaded Document
            </span>
            {/* Tooltip */}
            <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Uploaded Document
            </span>
          </Link>

          <Link
            href="/profile"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/profile"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/person.svg"
              alt="profile"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/profile"
                ? "filter invert-0"
                : "filter invert brightness-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2 ${currentPath === "/profile" ? "text-black" : "text-white"
                }`}
            >
              My Profile
            </span>
            {/* Tooltip */}
            <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              My Profile
            </span>
          </Link>

          <Link
            href="/refer-other"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/refer-other"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/list.svg"
              alt="dashboard"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/refer-other"
                ? "filter invert"
                : "filter invert-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-4 ${currentPath === "/refer-other" ? "text-black" : "text-white"
                }`}
            >
              Refer Others
            </span>
            {/* Tooltip */}
            <span className="z-[1] absolute pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Refer Others
            </span>
          </Link>

          <Link
            href="#"
            onClick={handleLogout}
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group text-white hover:bg-purple-700`}
          >
            <Image
              src="/myImages/logout.svg"
              alt="logout"
              className="ml-3 h-6 w-6 transition-colors duration-300 filter invert-0"
              height={24}
              width={24}
            />
            <span className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2`}>Logout</span>
            {/* Tooltip */}
            <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Logout
            </span>
          </Link>
        </>
      )}
      {role === "Provider" && (
        <>
          <Link
            href="/provider-dashboard"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/provider-dashboard"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/dashboard.svg"
              alt="dashboard"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/provider-dashboard"
                ? "filter invert"
                : "filter invert-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2 ${currentPath === "/provider-dashboard"
                ? "text-black"
                : "text-white"
                }`}
            >
              Overview
            </span>
            {/* Tooltip */}
            <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Overview
            </span>
          </Link>

          <Link
            href="/list-lmn"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/list-lmn"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/list.svg"
              alt="list"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/list-lmn"
                ? "filter invert"
                : "filter invert-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2 ${currentPath === "/list-lmn" ? "text-black" : "text-white"
                }`}
            >
              LMN Request
            </span>
            {/* Tooltip */}
            <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              LMN Request
            </span>
          </Link>

          <Link
            href="/list-provider"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/list-provider"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/virtual-event.svg"
              alt="coming-soon"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/list-provider"
                ? "filter invert"
                : "filter invert-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2 ${currentPath === "/list-provider" ? "text-black" : "text-white"
                }`}
            >
              ProviderNow Request
            </span>
            {/* Tooltip */}
            <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              ProviderNow Request
            </span>
          </Link>

          <Link
            href="/uploaded-documents"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/uploaded-documents"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/notification.svg"
              alt="notification"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/uploaded-documents"
                ? "filter invert"
                : "filter invert-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2 ${currentPath === "/uploaded-documents" ? "text-black" : "text-white"
                }`}
            >
              Uploaded Documents
            </span>
            {/* Tooltip */}
            <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Uploaded Documents
            </span>
          </Link>

          <Link
            href="/profile"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/profile"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/person.svg"
              alt="profile"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/profile"
                ? "filter invert-0"
                : "filter invert brightness-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2 ${currentPath === "/profile" ? "text-black" : "text-white"
                }`}
            >
              My Profile
            </span>
            {/* Tooltip */}
            <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              My Profile
            </span>
          </Link>

          <Link
            href="#"
            onClick={handleLogout}
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group text-white hover:bg-purple-700`}
          >
            <Image
              src="/myImages/logout.svg"
              alt="logout"
              className="ml-3 h-6 w-6 transition-colors duration-300 filter invert-0"
              height={24}
              width={24}
            />
            <span className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2`}>Logout</span>
            {/* Tooltip */}
            <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Logout
            </span>
          </Link>
        </>
      )}
      {role === "Admin" && (
        <>
         <Link
          href="/admin/overview"
          className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/admin/overview"
            ? "bg-white text-black"
            : "text-white hover:bg-purple-700"
            }`}
        >
          <Image
            src="/myImages/dashboard.svg"
            alt="dashboard"
            className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/admin/overview"
              ? "filter invert"
              : "filter invert-0"
              }`}
            height={24}
            width={24}
          />
          <span
            className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2 ${currentPath === "/admin/overview"
              ? "text-black"
              : "text-white"
              }`}
          >
            Overview
          </span>
          {/* Tooltip */}
          <span className="absolute z-[1] left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
            Overview
          </span>
        </Link>


          <Link
            href="/admin/member-management"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/admin/member-management"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/list.svg"
              alt="list"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/admin/member-management"
                ? "filter invert"
                : "filter invert-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2 ${currentPath === "/admin/member-management" ? "text-black" : "text-white"
                }`}
            >
              Member Management
            </span>
            {/* Tooltip */}
            <span className="absolute z-[1] left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
            Member Management
            </span>
          </Link>

          <Link
            href="/admin/provider-management"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/admin/provider-management"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/list.svg"
              alt="list"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/admin/provider-management"
                ? "filter invert"
                : "filter invert-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2 ${currentPath === "/admin/provider-management" ? "text-black" : "text-white"
                }`}
            >
              Provider Management
            </span>
            {/* Tooltip */}
            <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Provider Management
            </span>
          </Link>


          <Link
            href="/admin/contacts"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/admin/contacts"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/list.svg"
              alt="list"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/admin/contacts"
                ? "filter invert"
                : "filter invert-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2 ${currentPath === "/admin/contacts" ? "text-black" : "text-white"
                }`}
            >
              Contact
            </span>
            {/* Tooltip */}
            <span className="absolute z-[1] pointer-events-none left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Contacts
            </span>
          </Link>

          <Link
            href="/admin/newsletter-management"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/admin/newsletter-management"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/list.svg"
              alt="list"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/admin/newsletter-management"
                ? "filter invert"
                : "filter invert-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2 ${currentPath === "/admin/newsletter-management" ? "text-black" : "text-white"
                }`}
            >
              NewsLetter Management
            </span>
            {/* Tooltip */}
            <span className="absolute pointer-events-none z-[1] left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              NewsLetter management
            </span>
          </Link>

          <Link
            href="/admin/cms-management"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/admin/cms-management"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/list.svg"
              alt="list"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/admin/cms-management"
                ? "filter invert"
                : "filter invert-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2 ${currentPath === "/admin/cms-management" ? "text-black" : "text-white"
                }`}
            >
              CMS Management
            </span>
            {/* Tooltip */}
            <span className="absolute pointer-events-none z-[1] left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              CMS management
            </span>
          </Link>

          <Link
            href="/admin/lmn-request"
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group ${currentPath === "/admin/lmn-request"
              ? "bg-white text-black"
              : "text-white hover:bg-purple-700"
              }`}
          >
            <Image
              src="/myImages/list.svg"
              alt="list"
              className={`ml-3 h-6 w-6 transition-colors duration-300 ${currentPath === "/admin/lmn-request"
                ? "filter invert"
                : "filter invert-0"
                }`}
              height={24}
              width={24}
            />
            <span
              className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2 ${currentPath === "/admin/lmn-request" ? "text-black" : "text-white"
                }`}
            >
              LMN Management
            </span>
            {/* Tooltip */}
            <span className="absolute pointer-events-none z-[1] left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              LMN Management
            </span>
          </Link>

          <Link
            href="#"
            onClick={handleLogout}
            className={`relative flex items-center p-3 mb-2 transition-colors duration-300 group text-white hover:bg-purple-700`}
          >
            <Image
              src="/myImages/logout.svg"
              alt="logout"
              className="ml-3 h-6 w-6 transition-colors duration-300 filter invert-0"
              height={24}
              width={24}
            />
            <span className={`${isSidebarOpen? "block" : "hidden"} pl-2 ml-2`}>Logout</span>
            {/* Tooltip */}
            <span className="absolute pointer-events-none z-[1] left-full ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Logout
            </span>
          </Link>
        </>
      )}
      {/* Modal for logout confirmation */}
      {modalOpen && (
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
              Confirm Logout
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-[#751A9B] px-6 py-3 text-white border-2 border-white h-[48px] w-[161px] font-semibold text-base rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={confirmLogout}
              >
                Logout
              </button>
              <button
                className="text-[#751A9B] px-6 py-3 bg-white border-2 border-[#751A9B]  h-[48px] w-[161px] font-semibold text-base rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={cancelLogout}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}