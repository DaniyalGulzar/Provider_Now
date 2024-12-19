import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar: React.FC = () => {
	const router = useRouter();
	const [isProviderOpen, setIsProviderOpen] = useState(false);
	const [firstName, setFirstName] = useState<string | null>(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { data: session, status } = useSession(); // Access session data
	const toggleProviderMenu = () => {
		setIsProviderOpen(!isProviderOpen);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	  };

	useEffect(() => {
		if (status === "authenticated" && session) {
			if (session.user)
				setFirstName(session.user?.first_name || null);
		}
	}, [status, session, router]);

	const confirmLogout = async () => {
		try {
		  await signOut({ redirect: false });
	
		  toast.success("Logout successful!");
		  setIsDropdownOpen(false)
		  router.push("/auth/login");
		} catch (error) {
		  console.error("Logout error:", error);
		  toast.error("Failed to logout.");
		}
	  };

	const handleRoute = () => {
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
	};

	return (
		<>
			<nav className="relative z-10 bg-gradient-to-b from-[#491161] to-[#721A97] py-3 flex flex-col justify-between items-center rounded-b-[40px]">
				<div className="max-w-[85%] mx-auto flex items-center justify-between w-full">
					<Link href="/">
						<Image
							src="/myImages/providerNow-logo-RGB-color-inverse.svg"
							className="w-[300px] min-w-[150px] lg:block md:hidden sm:block"
							width={170}
							height={100}
							alt="Healthcare"
						/>
						<Image
							src="/myImages/providerNow-icon-RGB-color-1024.png"
							className="lg:hidden md:block hidden h-[45px] pr-[216px] min-w-[150px]"
							width={260}
							height={45}
							alt="Sidebar Logo"
						/>
					</Link>
					<button
						onClick={toggleProviderMenu}
						type="button"
						className="toggle-button inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg lg:hidden"
						aria-controls="provider-navbar"
						aria-expanded={isProviderOpen}
					>
						<span className="sr-only">Open provider menu</span>
						<svg
							className="w-5 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 17 14"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 1h15M1 7h15M1 13h15"
							/>
						</svg>
					</button>
					<div
						className={`responsive-hidden lg:flex lg:items-center lg:w-auto ${isProviderOpen ? "block" : "hidden"} lg:block`}
						id="provider-navbar"
					>
						<ul className="mb-0 font-medium flex flex-col py-4 items-center lg:flex-row lg:space-x-3 lg:mt-0 lg:border-0 text-white list-none">
							<li className="m-0-imp whitespace-nowrap flex">
								<Link
									href="/LMN"
									className="block text-base py-2 px-3 rounded transform transition-transform duration-300 hover:scale-105"
								>
									Request a Letter of Medical Necessity
								</Link>
							</li>
							<li className="m-0-imp whitespace-nowrap flex">
								<Link
									href="/RP"
									className="block text-base py-2 px-3 rounded transform transition-transform duration-300 hover:scale-105"
								>
									Request a ProviderNow
								</Link>
							</li>
							<li className="m-0-imp whitespace-nowrap flex">
								<Link
									href="/provider-retail-shop"
									className="block text-base py-2 px-3 rounded transform transition-transform duration-300 hover:scale-105"
								>
									Shop
								</Link>
							</li>
							<li className="m-0-imp whitespace-nowrap flex">
								<Link
									href="/about-us"
									className="block text-base py-2 px-3 rounded transform transition-transform duration-300 hover:scale-105"
								>
									About us
								</Link>
							</li>
							<li className="m-0-imp whitespace-nowrap flex">
								<Link
									href="/policy"
									className="block text-base py-2 px-3 rounded transform transition-transform duration-300 hover:scale-105"
								>
									Privacy Policy
								</Link>
							</li>
							<li className="m-0-imp whitespace-nowrap flex">
								{status === "authenticated" ? (
									<div className="relative inline-block">
									<span
									  onClick={toggleDropdown}
									  className="border cursor-pointer block text-base py-2 px-3 rounded transform transition-transform duration-300 hover:scale-105 hover:bg-white hover:text-[#751A9B]"
									>
									  Hi, {firstName}
									</span>
							  
									{isDropdownOpen && (
									  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50">
										<ul className="py-1">
										  <li
											onClick={handleRoute}
											className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
										  >
											Dashboard
										  </li>
										  <li
											onClick={confirmLogout}
											className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
										  >
											Logout
										  </li>
										</ul>
									  </div>
									)}
								  </div>
								  
								) : (
									<Link
										href="/auth/login"
										className="block text-base py-2 px-3 border border-white rounded transform transition-transform duration-300 hover:scale-105 hover:bg-white hover:text-[#751A9B]"
									>
										Login
									</Link>
								)}
							</li>
						</ul>
					</div>
				</div>

				<div className={`w-full ${isProviderOpen ? "block" : "hidden"} 1250:hidden`} id="provider-navbar">
    				<ul className="mb-0 sm:ml-0 md:ml-5 font-medium flex flex-col py-4 lg:flex-row lg:space-x-3 lg:mt-0 lg:border-0 text-white list-none">
						<li className="m-0-imp whitespace-nowrap flex">
							<Link
								href="/LMN"
								className="block text-base py-2 px-3 rounded transform transition-transform duration-300 hover:scale-105"
							>
								Request a Letter of Medical Necessity
							</Link>
						</li>
						<li className="m-0-imp whitespace-nowrap flex">
							<Link
								href="/RP"
								className="block text-base py-2 px-3 rounded transform transition-transform duration-300 hover:scale-105"
							>
								Request a ProviderNow
							</Link>
						</li>
						<li className="m-0-imp whitespace-nowrap flex">
							<Link
								href="/provider-retail-shop"
								className="block text-base py-2 px-3 rounded transform transition-transform duration-300 hover:scale-105"
							>
								Shop
							</Link>
						</li>
						<li className="m-0-imp whitespace-nowrap flex">
							<Link
								href="/about-us"
								className="block text-base py-2 px-3 rounded transform transition-transform duration-300 hover:scale-105"
							>
								About us
							</Link>
						</li>
						<li className="m-0-imp whitespace-nowrap flex">
							<Link
								href="/policy"
								className="block text-base py-2 px-3 rounded transform transition-transform duration-300 hover:scale-105"
							>
								Privacy Policy
							</Link>
						</li>
						<span className="hidden 1250:block mx-4 h-6 w-px bg-gray-300 dark:bg-gray-600"></span>
						<li className="m-0-imp whitespace-nowrap flex">
							{status === "authenticated" ? (
								<div className="relative inline-block">
								<span
									onClick={toggleDropdown}
										className="border cursor-pointer block text-base py-2 px-3 rounded transform transition-transform duration-300 hover:scale-105 hover:bg-white hover:text-[#751A9B]"
								>
									Hi, {firstName}
								</span>
								{isDropdownOpen && (
									<div
									className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50"
									>
									<ul className="py-1">
										<li
										onClick={handleRoute}
										className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
										>
										Dashboard
										</li>
										<li
										onClick={confirmLogout}
										className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
										>
										Logout
										</li>
									</ul>
									</div>
								)}
								</div>
							) : (
								<Link
									href="/auth/login"
									className="block text-base py-2 px-3 rounded transform transition-transform duration-300 hover:scale-105 hover:bg-white hover:text-[#751A9B]"
								>
									Login
								</Link>
							)}
						</li>
					</ul>
				</div>

				<div className="text-left mt-5 max-w-[85%] mx-auto w-full">
					<span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[41px] font-bold">
						The first choice for your{" "}
						<span className="text-[#13C1E8]">immediate</span> healthcare needs
					</span>
					<div className="my-4">
						<span className="text-white text-lg sm:text-xl md:text-2xl lg:text-[24px] font-semibold">
							Choose simplicity, choose ease, choose ProviderNow
						</span>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
