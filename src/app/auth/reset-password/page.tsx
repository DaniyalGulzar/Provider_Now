"use client";

import Banner from '@/components/Banner/page';
import Footer from '@/components/Footer';
import InputField from '@/components/InputField';
import NavbarOther from '@/components/NavbarOther/page';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react';
import toast from 'react-hot-toast';
import { Circles } from 'react-loader-spinner';

const ResetPassword: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();
    const email = searchParams?.get('email') || '';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirm_password: "",
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

    useEffect(() => {
        if (email) {
            setFormData(prevState => ({
                ...prevState,
                email: email
            }));
        }
    }, [email]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (formData.password !== formData.confirm_password) {
            toast.error("Password and Confirm Password do not match!");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/password/reset`, formData);

            if (response.status === 200) {
                setFormData({
                    password: "",
                    confirm_password: "",
                    email: email,
                });
                toast.success("Password reset successfully!");
                router.push("/auth/login");
            }
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
            <Banner title="Reset Password" />
            <div className="flex justify-center items-center">
                <div className="shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] bg-white w-[516px] my-[80px] mx-auto rounded-[22px] px-[32px] py-[32px]">
                    <div className="mb-[24px] text-center">
                        <span className="text-[28px] font-semibold">Reset Password</span>
                    </div>

                    <form className="flex flex-col mt-0" onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <InputField
                                type="password"
                                placeholder="Type your Password"
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                label="Password"
                            />
                        </div>
                        <div className="form-group mb-4">
                            <InputField
                                type="password"
                                placeholder="Type your Confirm Password"
                                id="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleInputChange}
                                required
                                label="Confirm Password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="h-[48px] rounded-lg text-base font-semibold hover:bg-purple-700 text-white bg-751A9B"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

const ResetPasswordPage: React.FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword />
    </Suspense>
);

export default ResetPasswordPage;
