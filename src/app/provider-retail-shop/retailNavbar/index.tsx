import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function RetailNavbar() {
    const router = useRouter();
	const [isProviderOpen, setIsProviderOpen] = useState(false);
	const [firstName, setFirstName] = useState<string | null>(null);
	const { data: session, status } = useSession(); // Access session data
	const toggleProviderMenu = () => {
		setIsProviderOpen(!isProviderOpen);
	};

    useEffect(() => {
		if (status === "authenticated" && session) {
			if (session.user)
				setFirstName(session.user?.first_name || null);
			// Redirect based on role
		}
	}, [status, session, router]);

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
    <div>
        <nav className="relative z-10 bg-gradient-to-b from-[#491161] to-[#721A97] py-3 flex flex-col justify-between items-center">
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
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg lg:hidden"
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

                {/* Menu Items for Large Screens */}
                <div
                    className="hidden lg:flex lg:items-center lg:w-auto"
                    id="provider-navbar"
                >
                    <ul className="mb-0 font-medium flex flex-col py-4 items-center lg:flex-row lg:space-x-3 lg:mt-0 lg:border-0 text-white list-none">
                        <li className="m-0-imp whitespace-nowrap flex">
                            <Link
                                href="#"
                                className="block text-base py-2 px-3 rounded transform transition-transform duration-300 hover:scale-105"
                            >
                                <Image src="/myImages/search.svg" alt='...' height={48} width={48} />
                            </Link>
                        </li>
                        <li className="m-0-imp whitespace-nowrap flex">
                            <Link
                                href="#"
                                className="block text-base py-2 pr-3 rounded transform transition-transform duration-300 hover:scale-105"
                            >
                                <Image src="/myImages/suitcase.svg" alt='...' height={48} width={48} />
                            </Link>
                        </li>
                        <li className="m-0-imp whitespace-nowrap flex">
                            <Link
                                href="#"
                                className="flex justify-center items-center bg-white h-[48px] w-[148px] rounded-lg text-base text-[#721A97] font-semibold transform transition-transform duration-300 hover:scale-105"
                            >
                                Shop Now
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`w-full lg:hidden ${isProviderOpen ? "block" : "hidden"}`}
                id="provider-navbar"
            >
                <ul className="mb-0 sm:ml-0 lg:ml-5 md:ml-5 font-medium flex flex-col py-4 lg:flex-row lg:space-x-3 lg:mt-0 lg:border-0 text-white list-none">
                    <li className="m-0-imp whitespace-nowrap flex">
                                <Link
                                    href="#"
                                    className="block text-base py-2 rounded transform transition-transform duration-300 hover:scale-105"
                                >
                                    <Image src="/myImages/search.svg" alt='...' height={48} width={48} />
                                </Link>
                    </li>
                    <li className="m-0-imp whitespace-nowrap flex">
                        <Link
                            href="#"
                            className="block text-base py-2 rounded transform transition-transform duration-300 hover:scale-105"
                        >
                            <Image src="/myImages/suitcase.svg" alt='...' height={48} width={48} />
                        </Link>
                    </li>
                    <li className="m-0-imp whitespace-nowrap flex">
                        <Link
                            href="#"
                            className="flex justify-center my-3 items-center bg-white h-[48px] w-[148px] rounded-lg text-base text-[#721A97] font-semibold transform transition-transform duration-300 hover:scale-105"
                        >
                            Shop Now
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default RetailNavbar