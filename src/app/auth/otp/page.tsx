"use client";
import Footer from "@/components/Footer";
import Image from "next/image";
import Button from "@/components/Button";
import NavbarOther from "@/components/NavbarOther/page";
import Banner from "@/components/Banner/page";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Circles } from "react-loader-spinner";

export default function Otp() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [code, setCode] = useState(['', '', '', '']);
    const [email, setEmail] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        const storedEmail = typeof window !== "undefined" ? localStorage.getItem('email') : null;
        setEmail(storedEmail);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const otpCode = code.join('');
        const res: any = await signIn("credentials", {
            redirect: false,
            otp: otpCode,
            email: email
        });

        if (res.ok) {
            toast.success("Login Successful");
            router.push('/auth/otp');
        } else {
            console.error('Sign-in error:', res.error);
            toast.error(res.error || 'Failed to sign in');
            setIsResending(false);
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;

        if (/^\d$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (index < code.length - 1) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                if (nextInput) {
                    (nextInput as HTMLInputElement).focus();
                }
            }
        } else if (value === '') {
            const newCode = [...code];
            newCode[index] = '';
            setCode(newCode);

            if (index > 0) {
                const prevInput = document.getElementById(`otp-${index - 1}`);
                if (prevInput) {
                    (prevInput as HTMLInputElement).focus();
                }
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, code.length - index); // Get pasted data and limit its length

        const newCode = [...code];
        for (let i = 0; i < pasteData.length; i++) {
            if (/^\d$/.test(pasteData[i])) { // Only paste numeric characters
                newCode[index + i] = pasteData[i];
            }
        }
        setCode(newCode);

        const nextIndex = Math.min(index + pasteData.length, code.length - 1);
        const nextInput = document.getElementById(`otp-${nextIndex}`);
        if (nextInput) {
            (nextInput as HTMLInputElement).focus();
        }
    };

    const handleResendCode = async () => {
        setIsResending(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/resend-otp`, { email: email });
            if (response.status === 200) {
                toast.success("Verification code resent successfully!");
            } else {
                toast.error("Failed to resend the code. Please try again.");
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            setIsResending(false);
            setIsSubmitting(false);
        }
    };

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
                <form onSubmit={handleSubmit} className="p-8 text-center bg-white max-w-[516px] mx-4 rounded-[22px] my-[80px] shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)]">
                    <span className="text-[28px] font-bold">Two Factor Authentication</span>
                    <div className="flex justify-center py-[26px]">
                        <Image height={56} width={56} src="/myImages/secure-mail.png" className="w-[56px] h-[56px]" alt="Two Factor Authentication" />
                    </div>
                    <span className="text-base font-medium text-center">
                        A verification code has been sent to your email. <br />
                        Please enter the code below to verify your account.
                    </span>
                    <div className="code-inputs py-8 flex justify-center">
                        {code.map((digit, index) => (
                            <input
                                id={`otp-${index}`}
                                className="w-[83px] text-center text-2xl font-bold mx-3 outline-none border-b border-[#0000004D]"
                                key={index}
                                type="text"
                                maxLength={1}
                                minLength={1}
                                required={true}
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onPaste={(e) => handlePaste(e, index)}
                            />
                        ))}
                    </div>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-[#751A9B] rounded-lg text-white h-[48px] w-full cursor-pointer text-base font-semibold ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
                    >
                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </Button>
                    <div className="pt-6">
                        <p className="text-sm font-bold">
                            Not received a code?{" "}
                            <span
                                className={`text-[#7C2B91] cursor-pointer ${isResending ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleResendCode}
                            >
                                {isResending ? 'Resending...' : 'Resend code'}
                            </span>
                        </p>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}
