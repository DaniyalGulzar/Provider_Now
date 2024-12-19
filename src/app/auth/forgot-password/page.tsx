"use client"
import Footer from "@/components/Footer";
import NavbarOther from "@/components/NavbarOther/page";
import Banner from "@/components/Banner/page";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import InputField from "@/components/InputField";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Circles } from "react-loader-spinner";

export default function ForgotPassword() {
	const { data: session, status } = useSession(); // Access session data
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
	});

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/password/forgot`, formData);
			toast.success(response.data.message);
			setFormData({
				email: "",
			});
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

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
			<Banner title="Forgot Password" />
			<div className="flex justify-center items-center">
				<div className="shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] bg-white w-[516px] my-[80px] mx-auto rounded-[22px] px-[32px] py-[32px]">
					<div className="mb-[24px] text-center">
						<span className="text-[28px] font-semibold">Forgot Password</span>
					</div>

					<form className="flex flex-col mt-0" onSubmit={handleSubmit}>
						<div className="form-group mb-4">
							<InputField
								type="text"
								placeholder="Type your email"
								id="email"
								value={formData.email}
								onChange={handleInputChange}
								required={true}
								label="Email Address"
							/>
						</div>
						<button type="submit" disabled={isSubmitting} className={`h-[48px] rounded-lg text-base font-semibold hover:bg-purple-700 text-white bg-751A9B ${isSubmitting ? "cursor-not-allowed opacity-50" : ""
							}`}>Submit</button>
					</form>
				</div>
			</div>

			<Footer />
		</div>
	);
}
