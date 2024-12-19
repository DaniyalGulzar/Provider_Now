"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaChevronDown, FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import moment from "moment";

interface AuthNavbarProps {
  welcomeText?: string; 
}

const AuthNavbar: React.FC<AuthNavbarProps> = ({ welcomeText = "" }) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navbarDropdownOpen, setNavbarDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<any>("")
  const [loading, setLoading] = useState(false);
  const { data: session }: any = useSession();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
      setNavbarDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setModalOpen(true);
  };

  const confirmLogout = async () => {
    if(modalOpen)
    setModalOpen(false);
    try {
      await signOut({ redirect: false });
      toast.success("Logout successful!");
      router.push('/auth/login'); 
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout.");
    }
  };

  const toggleDropdown = () => {
    setNavbarDropdownOpen((prev) => !prev);
  };

  const cancelLogout = () => {
    setModalOpen(false);
  };

  // const notifications = [
  //   { id: 1, title: "New LMN Request", description: "You have received a new LMN Request." },
  //   { id: 2, title: "New Letter Request", description: "You have received a new Letter Request." },
  //   { id: 3, title: "New LMN Request", description: "You have received a new LMN Request." },
  // ]

  useEffect(() => {
    if (!session) return;
  
    const fetchData = async () => {
      try {
        const token = session.token;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/notification/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotifications(response.data.result.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(intervalId);
  }, [session]);
  

  return (
    <div className="bg-white text-black flex justify-between items-center py-4 shadow-md">
      <div className="text-lg font-bold mx-3 lg:mx-10">{welcomeText}</div>
      {/* <p>Time since login: {timeDifference}</p> */}

      <div className="flex items-center space-x-4">
        {/* <div className="relative lg:w-72 md:w-72 w-20">
          <input
            type="text"
            placeholder="Search LMN Request or etc.."
            className="py-2 pl-4 text-sm rounded-full border border-gray-300 text-black w-full hidden sm:block"
          />
          <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
        </div> */}

      <div className="relative" ref={dropdownRef}>
        {session?.user?.role !== "Admin" ?
        <div className="rounded-full border border-[#00000033] p-2 cursor-pointer" onClick={toggleDropdown}>
          <Image src="/notify.svg" alt="Notifications" width={24} height={24} />
        </div>
        : null}
        {navbarDropdownOpen && (
          <div className="absolute right-0 mt-2 w-[370px] max-h-[400px] overflow-auto rounded-xl shadow-lg bg-white z-50">
            {notifications.length > 0 ? (
              notifications.map((notification:any) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-4 p-4 border-b last:border-none hover:bg-gray-100 transition-colors duration-200"
                >
                  {/* Icon or Avatar */}
                  <div className="text-xl text-blue-600">
                    <FaUserCircle className="text-5xl text-gray-400" />
                  </div>
                  {/* Notification Content */}
                  <div className="flex-1">
                    {/* <div className="text-sm text-gray-800 font-semibold">
                      {notification.title}
                    </div> */}
                    <p className="text-sm text-gray-600">
                      {notification.text}
                    </p>
                    <div className="text-xs text-gray-400 mt-1">
                      {notification.created_at && (
                        moment(notification.created_at).isValid() ? (
                          `${moment.duration(moment().diff(moment(notification.created_at))).hours().toString().padStart(2, '0')}h 
                          ${moment.duration(moment().diff(moment(notification.created_at))).minutes().toString().padStart(2, '0')}m 
                          ${moment.duration(moment().diff(moment(notification.created_at))).seconds().toString().padStart(2, '0')}s`
                        ) : (
                          'N/A'
                        )
                      )}
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-semibold text-gray-600">
                No new notifications
              </div>
            )}
          </div>
        )}
      </div>

        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-2 bg-white border-0 p-2 rounded-full text-black"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {session && (
              <>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${session.user.avatar}`}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                <span className="font-bold hidden lg:block">
                  {session.user.first_name}
                </span>
              </>
            )}
            <FaChevronDown className="text-gray-500" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-10 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-[1]">
              <Link
                href="/profile"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

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
            <div className="flex justify-center items-center space-x-4">
              <button
                className="bg-[#751A9B] flex justify-center items-center px-6 py-3 font-medium text-white border-2 border-white h-[48px] w-[161px] text-base rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={confirmLogout}
              >
                Logout
              </button>
              <button
                className="text-[#751A9B] flex justify-center items-center px-6 py-3 bg-white font-medium text-base border-2 border-[#751A9B]  h-[48px] w-[161px] rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={cancelLogout}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthNavbar;
