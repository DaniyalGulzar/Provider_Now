import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ColorBar from "../ColorBar";
import Button from "../Button";
import axios from "axios";
import toast from "react-hot-toast";

const Footer = () => {
	const [formData, setFormData] = useState({
		email: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}api/contact/subscribe`,
				formData
			);
			toast.success("Message sent successfully!");
			setFormData({
				email: "",
			});
		} catch (error:any) {
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

	return (
		<>
			<ColorBar type={2} />
			<footer className="bg-gradient text-white">
				<div className="max-w-[85%] mx-auto py-[50px] flex flex-col lg:flex-row justify-between items-start space-y-6 lg:space-y-0">
					<div className="w-full lg:w-1/4 md:w-1/2 px-4">
						<h3 className="text-left text-[22px] font-semibold">
							Quick navigations
						</h3>
						<ul className="space-y-[24px] text-left mt-4 list-none p-0">
							<li className="transition-transform transform hover:scale-105 truncate">
								<Link
									href="/"
									className="text-sm font-semibold whitespace-nowrap overflow-hidden"
								>
									Home
								</Link>
							</li>
							<li className="transition-transform transform hover:scale-105 truncate">
								<Link
									href="/LMN"
									className="text-sm font-semibold whitespace-nowrap overflow-hidden"
								>
									Request a Letter of Medical Necessity
								</Link>
							</li>
							<li className="transition-transform transform hover:scale-105 truncate">
								<Link
									href="/RP"
									className="text-sm font-semibold whitespace-nowrap overflow-hidden"
								>
									Request a ProviderNow
								</Link>
							</li>
							<li className="transition-transform transform hover:scale-105 truncate">
								<Link
									href="/provider-retail-shop"
									className="text-sm font-semibold whitespace-nowrap overflow-hidden"
								>
									Shop
								</Link>
							</li>
							<li className="transition-transform transform hover:scale-105 truncate">
								<Link
									href="/about-us"
									className="text-sm font-semibold whitespace-nowrap overflow-hidden"
								>
									About us
								</Link>
							</li>
						</ul>
					</div>
					<div className="w-full lg:w-1/4 md:w-1/2 px-4">
						<ul className="space-y-[24px] text-left lg:mt-[50px] mt-4 list-none p-0">
							<li className="transition-transform transform hover:scale-105 truncate">
								<Link
									href="/contact-us"
									className="text-sm font-semibold whitespace-nowrap overflow-hidden"
								>
									Contact us
								</Link>
							</li>
							<li className="transition-transform transform hover:scale-105 truncate">
								<Link
									href="/auth/login"
									className="text-sm font-semibold whitespace-nowrap overflow-hidden"
								>
									Login
								</Link>
							</li>
							<li className="transition-transform transform hover:scale-105 truncate">
								<Link
									href="/policy"
									className="text-sm font-semibold whitespace-nowrap overflow-hidden"
								>
									Privacy Policy
								</Link>
							</li>
							<li className="transition-transform transform hover:scale-105 truncate">
								<Link
									href="/terms"
									className="text-sm font-semibold whitespace-nowrap overflow-hidden"
								>
									Terms of use
								</Link>
							</li>
						</ul>
					</div>
					<div className="w-full lg:w-1/4 md:w-1/2 px-4">
						<h3 className="text-lg text-left font-bold mb-4">
							Connect with us on
						</h3>
						<div className="social-links flex space-x-4">
							<a
								href="https://www.facebook.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="/myImages/facebook.svg"
									className="h-[32px] w-[32px] transform transition-transform duration-200 hover:scale-105"
									width={32}
									height={32}
									alt="Facebook"
								/>
							</a>
							<a
								href="https://www.linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="/myImages/linkedin.svg"
									className="h-[32px] w-[32px] transform transition-transform duration-200 hover:scale-105"
									width={32}
									height={32}
									alt="LinkedIn"
								/>
							</a>
							<a
								href="https://www.instagram.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="/myImages/insta.svg"
									className="h-[32px] w-[32px] transform transition-transform duration-200 hover:scale-105"
									width={32}
									height={32}
									alt="Instagram"
								/>
							</a>
							<a
								href="https://www.tiktok.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src="/myImages/tiktok.svg"
									className="h-[32px] w-[32px] transform transition-transform duration-200 hover:scale-105"
									width={32}
									height={32}
									alt="TikTok"
								/>
							</a>
						</div>
					</div>
					<div className="lg:w-1/4 md:w-full px-4">
						<h3 className="text-lg font-bold text-left">Get free health tips</h3>
						<div className="text-left my-4">
							<span className="text-sm font-normal">
								Sign up for our newsletter
							</span>
						</div>
						<form
							onSubmit={handleSubmit}
							className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2"
						>
							<div className="flex rounded-lg border-2 h-[48px] border-white p-1">
								<input
									type="email"
									id="email"
									name="email"
									placeholder="Email"
									className="p-2 rounded-md bg-transparent text-white outline-none"
									value={formData.email}
									onChange={handleInputChange}
								/>
								<Button
									disabled={isSubmitting}
									type="submit"
									className="bg-blue-600 bg-800080 hover:bg-purple-700 text-white h-[36px] w-[49px] rounded-md"
								>
									<Image
										src="/myImages/arrow-up.png"
										className="h-[20px] w-[20px]"
										alt="Arrow up"
										width={20}
										height={20}
									/>
								</Button>
							</div>
						</form>
					</div>
				</div>
				<div className="border-t border-white mx-4"></div>
				<div className="py-4 text-center md:text-center">
					Copyright © 2024 ProviderNow.
				</div>
			</footer>
		</>
	);
};

export default Footer;
