"use client";

import Link from "next/link";
import Image from "next/image";
import ColorBar from "@/components/ColorBar";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { Circles } from "react-loader-spinner";

export default function ComingSoon() {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		phone: "",
		email: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);
	const [isEnglish, setIsEnglish] = useState(true);

	const handlePlayClick = () => {
		setIsVideoPlaying(true);
	};

	const handleLanguageSwitch = () => {
		setIsEnglish((prev) => !prev);
		setIsVideoPlaying(false);
	};


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}api/contact/coming-soon`,
				formData
			);
			toast.success("Message sent successfully!");
			setFormData({
				first_name: "",
				last_name: "",
				phone: "",
				email: "",
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
	return (
		<div className="h-[100vh]">
			<Circles
				height="80"
				width="80"
				color="#491161 "
				ariaLabel="bars-loading"
				wrapperStyle={{}}
				wrapperClass="loading-spinner-overlay"
				visible={isSubmitting}
			/>
			<nav className="sticky top-0 z-10 bg-gradient-to-b from-[#491161] to-[#721A97] py-4 flex items-center justify-center rounded-b-[40px]">
				<Link href="/">
					<Image
						src="/myImages/providerNow-logo-RGB-color-inverse.svg"
						className="w-[300px] min-w-[150px]"
						width={170}
						height={100}
						alt="Healthcare"
					/>
				</Link>
			</nav>

			<div className="flex md:flex-row flex-col px-10 gap-5">
				<div className="w-full lg:w-[35%] justify-center flex py-3 md:h-[90vh] h-[75vh] mx-3">
					<video
						className="rounded-lg w-[355px]"
						src={isEnglish ? process.env.NEXT_PUBLIC_LANDING_PAGE_VIDEO_URL_COMING_SOON_NEW_VIDEO : process.env.NEXT_PUBLIC_LANDING_PAGE_VIDEO_URL_COMING_SOON_SPANISH}
						controls
						loop
						style={{ objectFit: 'cover' }}
					>
						Your browser does not support the video tag.
					</video>
				</div>

				<div className="w-full lg:w-[65%] py-5 lg:pr-16 md:pr-0 flex flex-col justify-center">
					<div className="max-w-[100%] my-5 text-center mx-auto w-full">
						<span className="text-[20px] sm:text-[25px] md:text-[28px] lg:text-[32px] font-bold">
							The first choice for your{' '}
							<span className="text-[#13C1E8]">immediate healthcare </span> needs
						</span>
					</div>
					<div className="text-center">
						<span className="text-[18px] sm:text-[22px] md:text-[25px] lg:text-[30px] font-semibold text-[#751A9B]">
							ProviderNow Coming Soon
						</span>
						<div className="text-base font-normal text-[#53565d] mt-1">
							Get exclusive offers for early subscribers
						</div>
					</div>

					{/* Form */}
					<form className="mt-6" onSubmit={handleSubmit}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<InputField
								name="firstname"
								id="first_name"
								placeholder="First Name"
								required
								label="First Name"
								type="text"
								value={formData.first_name}
								onChange={handleInputChange}
							/>
							<InputField
								type="text"
								name="lastname"
								id="last_name"
								required
								placeholder="Last Name"
								label="Last Name"
								value={formData.last_name}
								onChange={handleInputChange}
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
							<InputField
								name="phone"
								id="phone"
								placeholder="Enter Phone number"
								required
								label="Phone"
								type="number"
								value={formData.phone}
								onChange={handleInputChange}
							/>
							<InputField
								type="email"
								name="email"
								id="email"
								required
								placeholder="Type Your Email"
								label="Email"
								value={formData.email}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex justify-center mt-8">
							<Button
								type="submit"
								className="w-[161px] h-[48px] bg-[#751A9B] hover:bg-purple-700 text-white text-base font-semibold rounded-lg"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Joining..." : "Join Now"}
							</Button>
						</div>
					</form>
				</div>
			</div>


			{/* <div className="ml-[18%] mt-[-5%]">
				<button
					className="w-auto px-4 h-[48px] bg-[#751A9B] hover:bg-purple-700 text-white text-base font-semibold rounded-lg"
					onClick={handleLanguageSwitch}
				>
					{isEnglish ? 'Switch to Spanish video' : 'Switch to English video'}
				</button>
				</div> */}
			{/* <div className="pt-5">
				<ColorBar type={2} />
			</div> */}
			<footer className="bg-gradient text-white py-5 w-full">
				<div className="max-w-[85%] mx-auto flex flex-col md:flex-row items-center justify-center">
					<div className="py-5 text-center md:text-left">
						Copyright © 2024 ProviderNow.
					</div>
					{/* <div className="social-links flex space-x-4 mt-4 md:mt-0">
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
					</div> */}
				</div>
			</footer>
		</div>
	);
}